import { randomUUID } from "node:crypto";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ARTICLES, FOODS, PORTION_UR } from "./seed-data";

// Idempotent: existing content (matched by slug) is left alone so portal edits survive a re-seed.
async function seedContent() {
  for (const [i, a] of ARTICLES.entries()) {
    await db.article.upsert({ where: { slug: a.slug }, update: {}, create: { ...a, sortOrder: i } });
  }
  for (const [i, f] of FOODS.entries()) {
    const portionsUr = f.portions
      ? Object.fromEntries(Object.entries(f.portions).map(([s, v]) => [s, PORTION_UR[v] ?? v]))
      : undefined;
    await db.food.upsert({
      where: { slug: f.slug },
      update: {},
      create: {
        slug: f.slug,
        nameEn: f.nameEn,
        nameUr: f.nameUr,
        category: f.category,
        portionsEn: f.portions,
        portionsUr,
        potassium: f.potassium,
        phosphorus: f.phosphorus,
        sodium: f.sodium,
        vegetarian: f.vegetarian ?? true,
        meals: f.meals ?? [],
        mealExclude: f.mealExclude ?? false,
        sortOrder: i,
      },
    });
  }
  console.log(`Content: ${ARTICLES.length} articles, ${FOODS.length} foods`);
}

async function seedAdmin() {
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password, ADMIN_NAME: name = "Admin" } = process.env;
  if (!email || !password) {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set, skipping admin account");
    return;
  }
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    await db.user.update({ where: { id: existing.id }, data: { role: "admin" } });
    console.log(`Admin: ${email} already exists, ensured admin role`);
    return;
  }
  const ctx = await auth.$context;
  const userId = randomUUID();
  await db.user.create({
    data: {
      id: userId,
      name,
      email,
      role: "admin",
      emailVerified: true,
      accounts: {
        create: {
          id: randomUUID(),
          accountId: userId,
          providerId: "credential",
          password: await ctx.password.hash(password),
        },
      },
    },
  });
  console.log(`Admin: created ${email}`);
}

seedContent()
  .then(seedAdmin)
  .finally(() => db.$disconnect());
