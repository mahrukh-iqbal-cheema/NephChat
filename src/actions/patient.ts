"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { ckdEpi2021, computeRisk, STAGES } from "@/lib/clinical";

export type FormState = { error?: string } | undefined;

const yesNoUnsure = z.enum(["yes", "no", "notsure"]);
const quizSchema = z.object({
  age: z.coerce.number().int().min(1).max(120),
  diabetes: yesNoUnsure,
  bp: yesNoUnsure,
  family: yesNoUnsure,
  stones: z.enum(["yes", "no"]),
  abnormal: yesNoUnsure,
  symptoms: z.array(z.enum(["frothy", "blood", "swelling", "reduced", "none"])).min(1),
  nsaid: z.enum(["yes", "no", "sometimes", "notsure"]),
});

export async function saveQuizResult(input: unknown): Promise<FormState> {
  const user = await requireUser();
  const parsed = quizSchema.safeParse(input);
  if (!parsed.success) return { error: "invalid" };
  const risk = computeRisk(parsed.data);
  const row = await db.quizResult.create({
    data: { userId: user.id, answers: parsed.data, score: risk.score, level: risk.level, urgent: risk.urgent },
  });
  redirect(`/quiz/${row.id}`);
}

const egfrSchema = z.object({
  age: z.coerce.number().int().min(18).max(120),
  sex: z.enum(["FEMALE", "MALE"]),
  creatinine: z.coerce.number().positive().max(30),
});

export async function saveEgfrResult(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser();
  const parsed = egfrSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "invalid" };
  const { age, sex, creatinine } = parsed.data;
  const row = await db.egfrResult.create({
    data: { userId: user.id, age, sex, creatinine, egfr: ckdEpi2021(age, sex === "FEMALE", creatinine) },
  });
  redirect(`/egfr/${row.id}`);
}

const dietSchema = z.object({
  stage: z.enum(STAGES),
  vegetarian: z.boolean(),
  foodIds: z.array(z.string()).max(500),
});

export async function saveDietPlan(input: unknown): Promise<FormState> {
  const user = await requireUser();
  const parsed = dietSchema.safeParse(input);
  if (!parsed.success) return { error: "invalid" };
  const known = await db.food.findMany({ where: { id: { in: parsed.data.foodIds } }, select: { id: true } });
  const row = await db.dietPlan.create({
    data: {
      userId: user.id,
      stage: parsed.data.stage,
      vegetarian: parsed.data.vegetarian,
      foodIds: known.map((f) => f.id),
    },
  });
  redirect(`/diet/${row.id}`);
}

/** Permanently deletes the signed-in patient and (via cascade) all their saved results and sessions. */
export async function deleteMyAccount(): Promise<FormState> {
  const user = await requireUser();
  if (user.role === "admin") return { error: "Doctor accounts must be removed by another admin." };
  await db.user.delete({ where: { id: user.id } });
  redirect("/login");
}
