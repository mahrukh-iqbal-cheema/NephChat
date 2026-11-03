import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/app/page-header";
import { EgfrForm } from "./egfr-form";

export default async function EgfrPage() {
  const t = await getTranslations("egfr");
  return (
    <>
      <PageHeader title={t("title")} />
      <EgfrForm />
    </>
  );
}
