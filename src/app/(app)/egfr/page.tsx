import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/app/page-header";
import { FormPanel, PageShell } from "@/components/app/page-shell";
import { EgfrForm } from "./egfr-form";

export default async function EgfrPage() {
  const t = await getTranslations("egfr");
  return (
    <PageShell size="narrow">
      <PageHeader title={t("title")} />
      <FormPanel>
        <EgfrForm />
      </FormPanel>
    </PageShell>
  );
}
