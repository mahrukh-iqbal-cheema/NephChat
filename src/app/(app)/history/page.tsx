import Link from "next/link";
import { getFormatter, getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { RiskBadge } from "@/components/app/risk-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

const LIMIT = 20;

export default async function HistoryPage() {
  const user = await requireUser();
  const t = await getTranslations("history");
  const quiz = await getTranslations("quiz");
  const egfr = await getTranslations("egfr");
  const format = await getFormatter();

  const where = { userId: user.id };
  const orderBy = { createdAt: "desc" } as const;
  const [quizzes, egfrs, plans] = await Promise.all([
    db.quizResult.findMany({ where, orderBy, take: LIMIT }),
    db.egfrResult.findMany({ where, orderBy, take: LIMIT }),
    db.dietPlan.findMany({ where, orderBy, take: LIMIT }),
  ]);
  const date = (d: Date) => format.dateTime(d, { dateStyle: "medium" });

  return (
    <>
      <PageHeader title={t("title")} />
      <div className="flex flex-col gap-4">
        <Section title={t("quiz")} empty={t("empty")}>
          {quizzes.map((r) => (
            <Row key={r.id} href={`/quiz/${r.id}`} date={date(r.createdAt)}>
              <RiskBadge level={r.level.toLowerCase() as "green" | "amber" | "red"} className="text-xs">
                {quiz(`level.${r.level}.label`)}
              </RiskBadge>
            </Row>
          ))}
        </Section>
        <Section title={t("egfr")} empty={t("empty")}>
          {egfrs.map((r) => (
            <Row key={r.id} href={`/egfr/${r.id}`} date={date(r.createdAt)}>
              <span className="font-sans font-semibold" dir="ltr">
                {r.egfr} <span className="text-xs font-normal text-muted-foreground">{egfr("unit")}</span>
              </span>
            </Row>
          ))}
        </Section>
        <Section title={t("diet")} empty={t("empty")}>
          {plans.map((r) => (
            <Row key={r.id} href={`/diet/${r.id}`} date={date(r.createdAt)}>
              <span className="font-semibold">{r.stage}</span>
            </Row>
          ))}
        </Section>
      </div>
    </>
  );
}

function Section({ title, empty, children }: { title: string; empty: string; children: React.ReactNode[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="divide-y">
        {children.length ? children : <p className="text-muted-foreground">{empty}</p>}
      </CardContent>
    </Card>
  );
}

function Row({ href, date, children }: { href: string; date: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 hover:text-primary">
      {children}
      <span className="ms-auto text-xs text-muted-foreground">{date}</span>
      <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
    </Link>
  );
}
