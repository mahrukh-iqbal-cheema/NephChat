import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CircleAlert } from "lucide-react";
import { Disclaimer } from "@/components/app/disclaimer";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { RiskBadge } from "@/components/app/risk-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { cn } from "@/lib/utils";

export default async function QuizResultPage({ params }: PageProps<"/quiz/[id]">) {
  const { id } = await params;
  const user = await requireUser();
  const result = await db.quizResult.findFirst({ where: { id, userId: user.id } });
  if (!result) notFound();

  const t = await getTranslations("quiz");
  const common = await getTranslations("common");
  const level = result.level;

  return (
    <PageShell size="narrow">
      <PageHeader title={t("title")} />
      <div className="flex flex-1 flex-col gap-5">
        <RiskBadge level={level.toLowerCase() as "green" | "amber" | "red"} className="self-start">
          {t(`level.${level}.label`)}
        </RiskBadge>
        <div>
          <h2 className="text-2xl leading-snug font-bold">{t(`level.${level}.title`)}</h2>
          <p className="mt-2 text-muted-foreground">{t(`level.${level}.text`)}</p>
        </div>

        {result.urgent && (
          <Alert variant="destructive" className="bg-destructive-muted">
            <CircleAlert />
            <AlertTitle>{t("urgentTitle")}</AlertTitle>
            <AlertDescription>{t("urgentBody")}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{t("usefulChecks")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 ps-5">
              <li>{t("bpCheck")}</li>
              <li>{t("creatCheck")}</li>
              <li>{t("acrCheck")}</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-auto flex flex-col gap-3 pt-4 sm:mt-2">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "h-11 text-base")}>
            {common("home")}
          </Link>
          <Link href="/quiz" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11")}>
            {t("retake")}
          </Link>
          <Disclaimer>{common("screeningDisclaimer")}</Disclaimer>
        </div>
      </div>
    </PageShell>
  );
}
