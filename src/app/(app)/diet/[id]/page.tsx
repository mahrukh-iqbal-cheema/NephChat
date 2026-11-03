import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Disclaimer } from "@/components/app/disclaimer";
import { PageHeader } from "@/components/app/page-header";
import { RiskBadge } from "@/components/app/risk-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMealPlan, classifyFood, MEALS, type DietFood, type Stage } from "@/lib/clinical";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { cn } from "@/lib/utils";

export default async function DietPlanPage({ params }: PageProps<"/diet/[id]">) {
  const { id } = await params;
  const user = await requireUser();
  const plan = await db.dietPlan.findFirst({ where: { id, userId: user.id } });
  if (!plan) notFound();

  const locale = await getLocale();
  const ur = locale === "ur";
  const t = await getTranslations("diet");
  const rows = await db.food.findMany({ where: { id: { in: plan.foodIds } }, orderBy: { sortOrder: "asc" } });

  const stage = plan.stage as Stage;
  const foods = rows.map((f) => {
    const food = { ...f, portionsEn: f.portionsEn as DietFood["portionsEn"], portionsUr: f.portionsUr as DietFood["portionsUr"] };
    return { ...food, name: ur ? f.nameUr : f.nameEn, cls: classifyFood(food, stage, locale) };
  });
  const meals = buildMealPlan(foods.filter((f) => f.cls.level !== "red"));
  const hasMeals = MEALS.some((m) => meals[m].length);

  return (
    <>
      <PageHeader title={t("planTitle")} description={t("basedOn", { stage })} backHref="/diet" />
      <div className="flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{t("mealIdea")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {hasMeals ? (
              MEALS.filter((m) => meals[m].length).map((m) => (
                <p key={m}>
                  <span className="font-semibold">{t(`meals.${m}`)}: </span>
                  {meals[m].map((f) => f.name).join(ur ? "، " : ", ")}
                </p>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">{t("moreFoods")}</p>
            )}
          </CardContent>
        </Card>

        <h2 className="text-sm font-semibold text-muted-foreground">{t("yourFoods")}</h2>
        <div className="flex flex-col gap-3">
          {foods.map((f) => (
            <Card key={f.id} size="sm">
              <CardContent className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold">{f.name}</span>
                  <RiskBadge level={f.cls.level} className="text-xs">
                    {t(`levels.${f.cls.level}`)}
                  </RiskBadge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(`classify.${f.cls.key}`, {
                    stage,
                    portion: f.cls.portion ?? "",
                    nutrient: f.cls.nutrient ? t(`nutrient.${f.cls.nutrient}`) : "",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Link href="/diet" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11")}>
          {t("newPlan")}
        </Link>
        <Disclaimer>{t("disclaimer")}</Disclaimer>
      </div>
    </>
  );
}
