import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/app/page-header";
import { requireAdmin } from "@/lib/session";
import { ProBanner } from "../pro-banner";
import { KfreCalculator } from "./kfre-calculator";

export default async function KfrePage() {
  await requireAdmin();
  const t = await getTranslations("doctor");
  return (
    <>
      <PageHeader title={t("kfreTitle")} description={t("kfreSub")} backHref="/doctor" />
      <div className="flex flex-col gap-6">
        <ProBanner>{t("proOnly")}</ProBanner>
        <KfreCalculator />
      </div>
    </>
  );
}
