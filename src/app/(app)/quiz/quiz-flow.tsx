"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { saveQuizResult } from "@/actions/patient";
import { MultiChoice, SingleChoice } from "@/components/app/choice-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { QUIZ } from "@/lib/clinical";

type Answers = Record<string, string | string[]>;

export function QuizFlow() {
  const t = useTranslations("quiz");
  const common = useTranslations("common");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pending, startTransition] = useTransition();

  const q = QUIZ[index];
  const isLast = index === QUIZ.length - 1;
  const value = answers[q.id];
  const answered = Array.isArray(value) ? value.length > 0 : Boolean(value);

  function set(v: string | string[]) {
    setAnswers((a) => ({ ...a, [q.id]: v }));
  }

  function toggleSymptom(v: string) {
    const current = (answers[q.id] as string[] | undefined) ?? [];
    if (v === "none") return set(current.includes("none") ? [] : ["none"]);
    const rest = current.filter((x) => x !== "none");
    set(rest.includes(v) ? rest.filter((x) => x !== v) : [...rest, v]);
  }

  function next() {
    if (!isLast) return setIndex(index + 1);
    startTransition(async () => {
      const result = await saveQuizResult(answers);
      if (result?.error) toast.error(common("error"));
    });
  }

  return (
    <div className="flex flex-1 flex-col">
      <Progress value={((index + 1) / QUIZ.length) * 100} className="mb-6" />
      <p className="mb-2 text-sm text-muted-foreground">{t("progress", { current: index + 1, total: QUIZ.length })}</p>
      <h2 className="mb-6 text-2xl leading-snug font-semibold">{t(q.label)}</h2>

      {q.type === "number" && (
        <div>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            max={120}
            autoFocus
            aria-label={t(q.label)}
            value={(value as string) ?? ""}
            onChange={(e) => set(e.target.value)}
            className="h-14 text-2xl font-semibold"
          />
          <p className="mt-2 text-sm text-muted-foreground">{t(q.hint)}</p>
        </div>
      )}
      {q.type === "single" && (
        <SingleChoice
          name={q.id}
          value={value as string | undefined}
          onChange={set}
          options={q.options.map((o) => ({ value: o.value, label: t(o.label) }))}
        />
      )}
      {q.type === "multi" && (
        <MultiChoice
          name={q.id}
          values={(value as string[] | undefined) ?? []}
          onToggle={toggleSymptom}
          options={q.options.map((o) => ({ value: o.value, label: t(o.label) }))}
        />
      )}

      <div className="mt-auto flex gap-3 pt-8">
        {index > 0 && (
          <Button variant="outline" size="lg" className="h-11 px-5" onClick={() => setIndex(index - 1)}>
            {common("back")}
          </Button>
        )}
        <Button size="lg" className="h-11 flex-1 text-base" disabled={!answered || pending} onClick={next}>
          {pending && <Loader2 className="animate-spin" />}
          {isLast ? t("seeResult") : common("next")}
        </Button>
      </div>
    </div>
  );
}
