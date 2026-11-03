import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/app/page-header";
import { QuizFlow } from "./quiz-flow";

export default async function QuizPage() {
  const t = await getTranslations("quiz");
  return (
    <>
      <PageHeader title={t("title")} />
      <QuizFlow />
    </>
  );
}
