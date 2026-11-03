"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { ARTICLE_ICONS } from "@/components/app/article-icon";
import { auth } from "@/lib/auth";
import { FOOD_CATEGORIES, MEALS, STAGES } from "@/lib/clinical";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export type AdminFormState = { error?: string } | undefined;

function firstIssue(error: z.ZodError) {
  const issue = error.issues[0];
  return issue ? `${issue.path.join(".") || "Form"}: ${issue.message}` : "Invalid input";
}

function friendlyDbError(e: unknown): string {
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") return "That slug is already in use.";
  throw e;
}

const optional = z
  .string()
  .trim()
  .transform((v) => v || null);
const slug = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9_-]+$/, "use lowercase letters, numbers, - or _");
const paragraphs = z
  .string()
  .transform((v) =>
    v
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  );

// ---------- Camps ----------

const campSchema = z.object({
  name: z.string().trim().min(1).max(200),
  address: z.string().trim().min(1).max(500),
  date: z.coerce.date(),
  time: optional,
  contact: optional,
});

export async function saveCamp(id: string | null, _prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = campSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  if (id) await db.camp.update({ where: { id }, data: parsed.data });
  else await db.camp.create({ data: parsed.data });
  revalidatePath("/camps");
  redirect("/admin/camps");
}

export async function deleteCamp(id: string) {
  await requireAdmin();
  await db.camp.delete({ where: { id } });
  revalidatePath("/admin/camps");
  revalidatePath("/camps");
}

// ---------- Articles ----------

const articleSchema = z.object({
  slug,
  icon: z.enum(Object.keys(ARTICLE_ICONS) as [string, ...string[]]),
  titleEn: z.string().trim().min(1).max(200),
  titleUr: z.string().trim().min(1).max(200),
  bodyEn: paragraphs.pipe(z.array(z.string()).min(1, "English body is required")),
  bodyUr: paragraphs,
  sortOrder: z.coerce.number().int().default(0),
  published: z.boolean(),
});

export async function saveArticle(id: string | null, _prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = articleSchema.safeParse({ ...Object.fromEntries(formData), published: formData.has("published") });
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  try {
    if (id) await db.article.update({ where: { id }, data: parsed.data });
    else await db.article.create({ data: parsed.data });
  } catch (e) {
    return { error: friendlyDbError(e) };
  }
  revalidatePath("/learn", "layout");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await db.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/learn", "layout");
}

// ---------- Foods ----------

const nutrient = z.enum(["H", "L", "NONE"]).transform((v) => (v === "NONE" ? null : v));
const foodSchema = z.object({
  slug,
  nameEn: z.string().trim().min(1).max(200),
  nameUr: z.string().trim().min(1).max(200),
  category: z.enum(FOOD_CATEGORIES),
  potassium: nutrient,
  phosphorus: nutrient,
  sodium: nutrient,
  vegetarian: z.boolean(),
  mealExclude: z.boolean(),
  meals: z.array(z.enum(MEALS)),
  sortOrder: z.coerce.number().int().default(0),
});

function readPortions(formData: FormData, lang: "En" | "Ur") {
  const entries = STAGES.map((s) => [s, String(formData.get(`portion${lang}_${s}`) ?? "").trim()] as const);
  return entries.every(([, v]) => !v) ? null : Object.fromEntries(entries);
}

export async function saveFood(id: string | null, _prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = foodSchema.safeParse({
    ...Object.fromEntries(formData),
    vegetarian: formData.has("vegetarian"),
    mealExclude: formData.has("mealExclude"),
    meals: formData.getAll("meals"),
  });
  if (!parsed.success) return { error: firstIssue(parsed.error) };

  const portionsEn = readPortions(formData, "En");
  const portionsUr = readPortions(formData, "Ur");
  if (portionsEn && Object.values(portionsEn).some((v) => !v)) {
    return { error: "Fill in the English portion for every stage, or leave all four empty." };
  }
  const data = {
    ...parsed.data,
    portionsEn: portionsEn ?? Prisma.DbNull,
    portionsUr: portionsEn && portionsUr ? portionsUr : Prisma.DbNull,
  };
  try {
    if (id) await db.food.update({ where: { id }, data });
    else await db.food.create({ data });
  } catch (e) {
    return { error: friendlyDbError(e) };
  }
  redirect("/admin/foods");
}

export async function deleteFood(id: string) {
  await requireAdmin();
  await db.food.delete({ where: { id } });
  revalidatePath("/admin/foods");
}

// ---------- Users ----------

const ROLES = ["user", "admin"] as const;
const newUserSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email(),
  password: z.string().min(8).max(128),
  role: z.enum(ROLES),
});

export async function createUser(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = newUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  try {
    await auth.api.createUser({ body: parsed.data, headers: await headers() });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not create user" };
  }
  revalidatePath("/admin/users");
  return undefined;
}

export async function setUserRole(userId: string, role: (typeof ROLES)[number]) {
  const me = await requireAdmin();
  if (userId === me.id) return { error: "You cannot change your own role." };
  await auth.api.setRole({ body: { userId, role: z.enum(ROLES).parse(role) }, headers: await headers() });
  revalidatePath("/admin/users");
}

export async function removeUser(userId: string) {
  const me = await requireAdmin();
  if (userId === me.id) return { error: "You cannot remove your own account." };
  await auth.api.removeUser({ body: { userId }, headers: await headers() });
  revalidatePath("/admin/users");
}
