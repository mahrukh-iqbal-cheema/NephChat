"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SingleChoice } from "@/components/app/choice-list";
import { Disclaimer } from "@/components/app/disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { kfre } from "@/lib/clinical";

// Calculated in the browser and not saved: this is a clinician reference tool, not patient data.
export function KfreCalculator() {
  const t = useTranslations("doctor");
  const e = useTranslations("egfr");
  const [sex, setSex] = useState("MALE");
  const [result, setResult] = useState<{ risk2: number; risk5: number } | null>(null);

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    setResult(kfre(Number(f.get("age")), sex === "MALE", Number(f.get("egfr")), Number(f.get("acr"))));
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onSubmit} onChange={() => setResult(null)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="age">{e("age")}</FieldLabel>
            <Input id="age" name="age" type="number" inputMode="numeric" min={18} max={120} required placeholder="62" className="h-11" />
          </Field>
          <FieldSet>
            <FieldLegend variant="label">{e("sex")}</FieldLegend>
            <SingleChoice
              name="sex"
              value={sex}
              onChange={(v) => {
                setSex(v);
                setResult(null);
              }}
              options={[
                { value: "FEMALE", label: e("female") },
                { value: "MALE", label: e("male") },
              ]}
            />
          </FieldSet>
          <Field>
            <FieldLabel htmlFor="egfr">{t("egfr")}</FieldLabel>
            <Input id="egfr" name="egfr" type="number" inputMode="decimal" min={1} max={200} step="any" required placeholder="28" className="h-11" />
          </Field>
          <Field>
            <FieldLabel htmlFor="acr">{t("acr")}</FieldLabel>
            <Input id="acr" name="acr" type="number" inputMode="decimal" min={0.1} step="any" required placeholder="300" className="h-11" />
          </Field>
          <Button type="submit" size="lg" className="h-11 text-base">
            {t("calcRisk")}
          </Button>
        </FieldGroup>
      </form>

      {result && (
        <div className="grid grid-cols-2 gap-3">
          {[
            [result.risk2, t("risk2")],
            [result.risk5, t("risk5")],
          ].map(([v, label]) => (
            <Card key={label as string}>
              <CardContent className="text-center">
                <p className="font-sans text-3xl font-bold text-primary" dir="ltr">
                  {(v as number).toFixed(1)}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Disclaimer>{t("kfreNote")}</Disclaimer>
    </div>
  );
}
