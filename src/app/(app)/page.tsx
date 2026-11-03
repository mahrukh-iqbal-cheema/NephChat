import { getTranslations } from "next-intl/server";
import { BookOpen, BriefcaseMedical, Calculator, Hospital, Salad, Stethoscope } from "lucide-react";
import { NavCard } from "@/components/app/nav-card";
import { isAdmin, requireUser } from "@/lib/session";

export default async function HomePage() {
  const user = await requireUser();
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  return (
    <>
      <section className="pt-4 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">{common("appName")}</h1>
        <p className="mt-1 text-muted-foreground">{common("tagline")}</p>
      </section>
      <nav className="flex flex-col gap-3">
        <NavCard href="/quiz" icon={Stethoscope} title={t("risk")} description={t("riskSub")} emphasis />
        <NavCard href="/egfr" icon={Calculator} title={t("egfr")} description={t("egfrSub")} />
        <NavCard href="/learn" icon={BookOpen} title={t("learn")} description={t("learnSub")} />
        <NavCard href="/diet" icon={Salad} title={t("diet")} description={t("dietSub")} />
        <NavCard href="/camps" icon={Hospital} title={t("camps")} description={t("campsSub")} />
        {isAdmin(user) && <NavCard href="/doctor" icon={BriefcaseMedical} title={common("doctorTools")} />}
      </nav>
    </>
  );
}
