import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BookOpen, BriefcaseMedical, Calculator, Hospital, Salad, Stethoscope } from "lucide-react";
import { LogoMark } from "@/components/app/logo";
import { NavCard } from "@/components/app/nav-card";
import { buttonVariants } from "@/components/ui/button";
import { isAdmin, requireUser } from "@/lib/session";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const user = await requireUser();
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  return (
    <>
      <section className="relative mb-8 overflow-hidden rounded-2xl sm:mb-10 sm:border sm:bg-card sm:p-10 lg:p-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">{common("appName")}</h1>
          <p className="mt-2 text-lg text-foreground sm:text-xl">{common("tagline")}</p>
          <p className="mt-3 hidden text-muted-foreground sm:block">{t("heroBody")}</p>
          <Link href="/quiz" className={cn(buttonVariants({ size: "lg" }), "mt-6 hidden h-11 px-5 text-base sm:inline-flex")}>
            {t("start")}
            <ArrowRight className="rtl:rotate-180" />
          </Link>
        </div>
        <LogoMark className="pointer-events-none absolute -end-10 -bottom-16 hidden size-72 opacity-[0.07] sm:block lg:size-96" />
      </section>

      <h2 className="mb-4 hidden text-lg font-semibold sm:block">{t("toolsTitle")}</h2>
      <nav className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <NavCard variant="tile" href="/quiz" icon={Stethoscope} title={t("risk")} description={t("riskSub")} emphasis />
        <NavCard variant="tile" href="/egfr" icon={Calculator} title={t("egfr")} description={t("egfrSub")} />
        <NavCard variant="tile" href="/learn" icon={BookOpen} title={t("learn")} description={t("learnSub")} />
        <NavCard variant="tile" href="/diet" icon={Salad} title={t("diet")} description={t("dietSub")} />
        <NavCard variant="tile" href="/camps" icon={Hospital} title={t("camps")} description={t("campsSub")} />
        {isAdmin(user) && (
          <NavCard variant="tile" href="/doctor" icon={BriefcaseMedical} title={common("doctorTools")} description={common("adminPortal")} />
        )}
      </nav>
    </>
  );
}
