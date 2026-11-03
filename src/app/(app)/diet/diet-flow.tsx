"use client";

import { useMemo, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { saveDietPlan } from "@/actions/patient";
import { MultiChoice, SingleChoice } from "@/components/app/choice-list";
import { Disclaimer } from "@/components/app/disclaimer";
import { FormPanel } from "@/components/app/page-shell";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { FOOD_CATEGORIES, STAGES, type FoodCategory, type Stage } from "@/lib/clinical";

type FoodOption = { id: string; nameEn: string; nameUr: string; category: FoodCategory; vegetarian: boolean };

export function DietFlow({ foods }: { foods: FoodOption[] }) {
  const t = useTranslations("diet");
  const common = useTranslations("common");
  const ur = useLocale() === "ur";
  const [step, setStep] = useState<"stage" | "select">("stage");
  const [stage, setStage] = useState<Stage>("CKD3");
  const [vegetarian, setVegetarian] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  const byCategory = useMemo(() => {
    const visible = foods.filter((f) => !vegetarian || f.vegetarian);
    return FOOD_CATEGORIES.map((c) => ({ category: c, foods: visible.filter((f) => f.category === c) })).filter(
      (g) => g.foods.length,
    );
  }, [foods, vegetarian]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  function submit() {
    startTransition(async () => {
      const result = await saveDietPlan({ stage, vegetarian, foodIds: selected });
      if (result?.error) toast.error(common("error"));
    });
  }

  if (step === "stage") {
    return (
      <FormPanel className="mx-auto w-full max-w-2xl gap-5">
        <h2 className="text-lg font-semibold">{t("stageQ")}</h2>
        <SingleChoice
          name="stage"
          value={stage}
          onChange={(v) => setStage(v as Stage)}
          options={STAGES.map((s) => ({ value: s, label: s }))}
          className="sm:grid-cols-2"
        />
        <FieldLabel htmlFor="veg" className="bg-card text-base *:data-[slot=field]:p-4">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle className="text-base font-medium">{t("vegOnly")}</FieldTitle>
            </FieldContent>
            <Switch id="veg" checked={vegetarian} onCheckedChange={setVegetarian} />
          </Field>
        </FieldLabel>
        <Disclaimer>{t("stageHint")}</Disclaimer>
        <Button
          size="lg"
          className="mt-auto h-11 text-base sm:mt-2"
          onClick={() => {
            setSelected([]);
            setStep("select");
          }}
        >
          {common("next")}
        </Button>
      </FormPanel>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-lg font-semibold">{t("selectTitle")}</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        {t("stageLabel", { stage })}
        {vegetarian && ` · ${t("vegLabel")}`}
      </p>
      <div className="flex flex-col gap-8 pb-6">
        {byCategory.map((g) => (
          <section key={g.category}>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{t(`categories.${g.category}`)}</h3>
            <MultiChoice
              name={g.category}
              values={selected}
              onToggle={toggle}
              options={g.foods.map((f) => ({ value: f.id, label: ur ? f.nameUr : f.nameEn }))}
              className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            />
          </section>
        ))}
      </div>
      <div className="sticky bottom-0 -mx-4 flex gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur sm:bottom-4 sm:mx-0 sm:justify-end sm:rounded-xl sm:border sm:bg-card/95 sm:p-3 sm:shadow-md">
        <Button variant="outline" size="lg" className="h-11 px-5" onClick={() => setStep("stage")}>
          {common("back")}
        </Button>
        <Button
          size="lg"
          className="h-11 flex-1 text-base sm:flex-none sm:px-6"
          disabled={pending || selected.length === 0}
          onClick={submit}
        >
          {pending && <Loader2 className="animate-spin" />}
          {t("seeMyPlan", { count: selected.length })}
        </Button>
      </div>
    </div>
  );
}
