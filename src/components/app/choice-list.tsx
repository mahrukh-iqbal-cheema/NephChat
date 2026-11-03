"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Option = { value: string; label: React.ReactNode };

const cardClass = "bg-card text-base *:data-[slot=field]:items-center *:data-[slot=field]:p-4";

export function SingleChoice({
  name,
  options,
  value,
  onChange,
  className,
}: {
  name: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <RadioGroup
      name={name}
      value={value ?? null}
      onValueChange={(v) => onChange(String(v))}
      className={cn("gap-3", className)}
    >
      {options.map((o) => (
        <FieldLabel key={o.value} htmlFor={`${name}-${o.value}`} className={cardClass}>
          <Field orientation="horizontal">
            <RadioGroupItem value={o.value} id={`${name}-${o.value}`} />
            <FieldContent>
              <FieldTitle className="text-base font-medium">{o.label}</FieldTitle>
            </FieldContent>
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}

export function MultiChoice({
  name,
  options,
  values,
  onToggle,
  className,
}: {
  name: string;
  options: Option[];
  values: string[];
  onToggle: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", className)}>
      {options.map((o) => (
        <FieldLabel key={o.value} htmlFor={`${name}-${o.value}`} className={cardClass}>
          <Field orientation="horizontal">
            <Checkbox
              id={`${name}-${o.value}`}
              checked={values.includes(o.value)}
              onCheckedChange={() => onToggle(o.value)}
            />
            <FieldContent>
              <FieldTitle className="text-base font-medium">{o.label}</FieldTitle>
            </FieldContent>
          </Field>
        </FieldLabel>
      ))}
    </div>
  );
}
