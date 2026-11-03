import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Disclaimer } from "@/components/app/disclaimer";
import { PageHeader } from "@/components/app/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { egfrBand } from "@/lib/clinical";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { cn } from "@/lib/utils";

export default async function EgfrResultPage({ params }: PageProps<"/egfr/[id]">) {
  const { id } = await params;
  const user = await requireUser();
  const result = await db.egfrResult.findFirst({ where: { id, userId: user.id } });
  if (!result) notFound();

  const t = await getTranslations("egfr");
  const common = await getTranslations("common");

  return (
    <>
      <PageHeader title={t("title")} backHref="/egfr" />
      <div className="flex flex-1 flex-col items-center gap-6">
        <div className="flex size-44 flex-col items-center justify-center rounded-full border-[10px] border-secondary bg-card text-center">
          <span className="font-sans text-5xl font-bold text-primary">{result.egfr}</span>
          <span className="mt-1 font-sans text-xs text-muted-foreground" dir="ltr">
            {t("unit")}
          </span>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{t("yourEgfr")}</p>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{t("whatMeans")}</CardTitle>
          </CardHeader>
          <CardContent>{t(`band.${egfrBand(result.egfr)}`)}</CardContent>
        </Card>

        <div className="mt-auto flex w-full flex-col gap-3">
          <Link href="/learn/egfr" className={cn(buttonVariants({ size: "lg" }), "h-11 text-base")}>
            {t("learnMore")}
          </Link>
          <Link href="/egfr" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11")}>
            {t("newCalc")}
          </Link>
          <Disclaimer>{common("screeningDisclaimer")}</Disclaimer>
        </div>
      </div>
    </>
  );
}
