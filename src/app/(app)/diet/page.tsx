import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/app/page-header";
import { db } from "@/lib/db";
import { DietFlow } from "./diet-flow";

export default async function DietPage() {
  const t = await getTranslations("diet");
  const foods = await db.food.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameEn: "asc" }],
    select: { id: true, nameEn: true, nameUr: true, category: true, vegetarian: true },
  });
  return (
    <>
      <PageHeader title={t("title")} />
      <DietFlow foods={foods} />
    </>
  );
}
