import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/app/page-header";
import { FormPanel, PageShell } from "@/components/app/page-shell";
import { QuizFlow } from "./quiz-flow";

export default async function QuizPage() {
  const t = await getTranslations("quiz");
  return (
    <PageShell size="narrow">
      <PageHeader title={t("title")} />
      <FormPanel>
        <QuizFlow />
      </FormPanel>
    </PageShell>
  );
}
