import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { db } from "@/lib/db";

const SYMPTOM_LABELS: Record<string, string> = {
  frothy: "Frothy urine",
  blood: "Blood in urine",
  swelling: "Swelling of feet or face",
  reduced: "Reduced urine output",
};

// Aggregate, anonymous counts only. Individual patient results are not exposed in the portal.
export default async function AdminOverviewPage() {
  const [patients, doctors, quizTotal, levels, egfrTotal, dietTotal, symptoms] = await Promise.all([
    db.user.count({ where: { role: "user" } }),
    db.user.count({ where: { role: "admin" } }),
    db.quizResult.count(),
    db.quizResult.groupBy({ by: ["level"], _count: true }),
    db.egfrResult.count(),
    db.dietPlan.count(),
    db.$queryRaw<{ symptom: string; count: bigint }[]>`
      SELECT s AS symptom, COUNT(*) AS count
      FROM "QuizResult", jsonb_array_elements_text(answers -> 'symptoms') AS s
      WHERE s <> 'none'
      GROUP BY s ORDER BY count DESC`,
  ]);
  const levelCount = (l: string) => levels.find((x) => x.level === l)?._count ?? 0;

  const stats = [
    { label: "Patients", value: patients },
    { label: "Doctors / admins", value: doctors },
    { label: "Risk checks completed", value: quizTotal },
    { label: "eGFR calculations", value: egfrTotal },
    { label: "Diet plans created", value: dietTotal },
  ];

  return (
    <>
      <AdminPageHeader title="Overview" description="Anonymous usage counts across all patients." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{s.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk check outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["GREEN", "Low factors", "bg-primary"],
              ["AMBER", "Check recommended", "bg-warning"],
              ["RED", "See a doctor soon", "bg-destructive"],
            ].map(([level, label, color]) => (
              <Bar key={level} label={label} value={levelCount(level)} total={quizTotal} color={color} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Flagged symptoms</CardTitle>
            <CardDescription>Share of risk checks reporting each symptom.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {symptoms.length === 0 && <p className="text-muted-foreground">No symptoms reported yet.</p>}
            {symptoms.map((s) => (
              <Bar
                key={s.symptom}
                label={SYMPTOM_LABELS[s.symptom] ?? s.symptom}
                value={Number(s.count)}
                total={quizTotal}
                color="bg-chart-2"
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Bar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground tabular-nums">
          {value} · {pct}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
