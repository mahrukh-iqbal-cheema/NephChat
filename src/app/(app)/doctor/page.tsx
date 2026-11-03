import { getTranslations } from "next-intl/server";
import { Activity, Calculator } from "lucide-react";
import { NavCard } from "@/components/app/nav-card";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { requireAdmin } from "@/lib/session";
import { cn } from "@/lib/utils";
import { ProBanner } from "./pro-banner";

type Tone = "ok" | "warn" | "danger";
const TONE: Record<Tone, string> = { ok: "text-primary", warn: "text-warning", danger: "text-destructive" };

// Clinical reference content is kept in English (standard clinical terminology).
const GFR: [string, string, Tone][] = [
  ["G1", "≥90 — Normal or high", "ok"],
  ["G2", "60–89 — Mildly decreased", "ok"],
  ["G3a", "45–59 — Mildly–moderately decreased", "warn"],
  ["G3b", "30–44 — Moderately–severely decreased", "warn"],
  ["G4", "15–29 — Severely decreased", "danger"],
  ["G5", "<15 — Kidney failure", "danger"],
];
const ACR: [string, string, Tone][] = [
  ["A1", "<30 mg/g — Normal to mildly increased", "ok"],
  ["A2", "30–300 mg/g — Moderately increased", "warn"],
  ["A3", ">300 mg/g — Severely increased", "danger"],
];
const REFERRAL = [
  "eGFR <30 mL/min/1.73m² (G4–G5)",
  "Sustained ACR >300 mg/g (A3), or a sustained fall in eGFR of >25% within 12 months",
  "Rapid eGFR decline (sustained drop >5 mL/min/1.73m²/year)",
  "CKD with hypertension refractory to ≥4 antihypertensive agents",
  "Persistent significant hematuria after excluding urological causes",
  "Hereditary kidney disease, or recurrent/extensive kidney stones",
  "Uncertainty about the cause of kidney disease",
];

export default async function DoctorToolsPage() {
  await requireAdmin();
  const t = await getTranslations("doctor");

  return (
    <>
      <PageHeader title={t("title")} />
      <div className="flex flex-col gap-6">
        <ProBanner>{t("proOnly")}</ProBanner>
        <div className="flex flex-col gap-3">
          <NavCard href="/egfr" icon={Calculator} title="eGFR" description={t("egfrSub")} />
          <NavCard href="/doctor/kfre" icon={Activity} title={t("kfreTitle")} description={t("kfreSub")} />
        </div>
        <RefTable title={t("gfrCatTitle")} rows={GFR} />
        <RefTable title={t("acrCatTitle")} rows={ACR} />
        <section>
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{t("riskStratTitle")}</h2>
          <Card>
            <CardContent>{t("riskStratBody")}</CardContent>
          </Card>
        </section>
        <section dir="ltr">
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{t("referralTitle")}</h2>
          <Card>
            <CardContent>
              <ul className="list-disc space-y-2 ps-5">
                {REFERRAL.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

function RefTable({ title, rows }: { title: string; rows: [string, string, Tone][] }) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{title}</h2>
      <Card className="py-0">
        <Table dir="ltr">
          <TableBody>
            {rows.map(([tag, text, tone]) => (
              <TableRow key={tag}>
                <TableCell className={cn("w-14 font-bold", TONE[tone])}>{tag}</TableCell>
                <TableCell className="whitespace-normal">{text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
