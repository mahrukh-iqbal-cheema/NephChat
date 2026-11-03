"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { saveEgfrResult } from "@/actions/patient";
import { SingleChoice } from "@/components/app/choice-list";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function EgfrForm() {
  const t = useTranslations("egfr");
  const common = useTranslations("common");
  const [state, action, pending] = useActionState(saveEgfrResult, undefined);
  const [sex, setSex] = useState("FEMALE");

  return (
    <form action={action}>
      <FieldGroup>
        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{common("error")}</AlertDescription>
          </Alert>
        )}
        <Field>
          <FieldLabel htmlFor="age">{t("age")}</FieldLabel>
          <Input id="age" name="age" type="number" inputMode="numeric" min={18} max={120} required placeholder="45" className="h-12 text-lg" />
        </Field>
        <FieldSet>
          <FieldLegend variant="label">{t("sex")}</FieldLegend>
          <SingleChoice
            name="sex"
            value={sex}
            onChange={setSex}
            options={[
              { value: "FEMALE", label: t("female") },
              { value: "MALE", label: t("male") },
            ]}
          />
        </FieldSet>
        <Field>
          <FieldLabel htmlFor="creatinine">{t("creatinine")}</FieldLabel>
          <Input
            id="creatinine"
            name="creatinine"
            type="number"
            inputMode="decimal"
            step="0.01"
            min={0.1}
            max={30}
            required
            placeholder="1.1"
            className="h-12 text-lg"
          />
        </Field>
        <Button type="submit" size="lg" className="h-11 text-base" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          {t("calculate")}
        </Button>
      </FieldGroup>
    </form>
  );
}
