import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { db } from "@/lib/db";
import { DietFlow } from "./diet-flow";

export default async function DietPage() {
  const t = await getTranslations("diet");
  const foods = await db.food.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameEn: "asc" }],
    select: { id: true, nameEn: true, nameUr: true, category: true, vegetarian: true },
  });
  return (
    <PageShell size="wide">
      <PageHeader title={t("title")} />
      <DietFlow foods={foods} />
    </PageShell>
  );
}
