"use client";

import type { Food } from "@prisma/client";
import { saveFood } from "@/actions/admin";
import { AdminForm } from "@/components/admin/admin-form";
import { FormSelect } from "@/components/admin/form-select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FOOD_CATEGORIES, MEALS, STAGES } from "@/lib/clinical";
import { CATEGORY_LABELS, MEAL_LABELS } from "./labels";

const NUTRIENT_OPTIONS = [
  { value: "NONE", label: "Not set" },
  { value: "H", label: "High" },
  { value: "L", label: "Low" },
];
const CATEGORY_OPTIONS = FOOD_CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] }));

export function FoodForm({ food }: { food?: Food }) {
  const portionsEn = (food?.portionsEn ?? {}) as Record<string, string>;
  const portionsUr = (food?.portionsUr ?? {}) as Record<string, string>;

  return (
    <AdminForm action={saveFood.bind(null, food?.id ?? null)}>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Food</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="nameEn">Name (English)</FieldLabel>
              <Input id="nameEn" name="nameEn" required defaultValue={food?.nameEn} />
            </Field>
            <Field>
              <FieldLabel htmlFor="nameUr">Name (Urdu)</FieldLabel>
              <Input id="nameUr" name="nameUr" required dir="rtl" defaultValue={food?.nameUr} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input id="slug" name="slug" required defaultValue={food?.slug} placeholder="green_peas" />
            </Field>
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <FormSelect id="category" name="category" defaultValue={food?.category ?? "FRUITS"} options={CATEGORY_OPTIONS} />
            </Field>
            <Field>
              <FieldLabel htmlFor="sortOrder">Order</FieldLabel>
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={food?.sortOrder ?? 0} />
            </Field>
          </div>
          <div className="flex flex-wrap gap-6">
            <Field orientation="horizontal" className="w-auto">
              <Switch id="vegetarian" name="vegetarian" defaultChecked={food?.vegetarian ?? true} />
              <FieldLabel htmlFor="vegetarian">Vegetarian</FieldLabel>
            </Field>
            <Field orientation="horizontal" className="w-auto">
              <Switch id="mealExclude" name="mealExclude" defaultChecked={food?.mealExclude ?? false} />
              <FieldContent>
                <FieldLabel htmlFor="mealExclude">Ingredient only</FieldLabel>
                <FieldDescription>Never shown as a meal item (salt, oil, spices).</FieldDescription>
              </FieldContent>
            </Field>
          </div>
          <FieldSet>
            <FieldLegend variant="label">Preferred meals</FieldLegend>
            <FieldDescription>Leave all unchecked to use the category default.</FieldDescription>
            <div className="flex flex-wrap gap-6">
              {MEALS.map((m) => (
                <Field key={m} orientation="horizontal" className="w-auto">
                  <Checkbox id={`meal-${m}`} name="meals" value={m} defaultChecked={food?.meals.includes(m)} />
                  <FieldLabel htmlFor={`meal-${m}`} className="font-normal">
                    {MEAL_LABELS[m]}
                  </FieldLabel>
                </Field>
              ))}
            </div>
          </FieldSet>
        </CardContent>
      </Card>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Portions by stage</CardTitle>
          <CardDescription>
            Fill all four English portions (write “Avoid” or “Allowed in normal amount” where relevant), or leave
            them all empty to classify the food by its nutrient levels instead.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {STAGES.map((s) => (
            <div key={s} className="grid items-center gap-3 sm:grid-cols-[4rem_1fr_1fr]">
              <span className="text-sm font-semibold">{s}</span>
              <Input name={`portionEn_${s}`} aria-label={`${s} portion (English)`} placeholder="English" defaultValue={portionsEn[s]} />
              <Input name={`portionUr_${s}`} aria-label={`${s} portion (Urdu)`} placeholder="اردو" dir="rtl" defaultValue={portionsUr[s]} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Nutrient levels</CardTitle>
          <CardDescription>Used only when no portions are set. High sodium is flagged at every stage.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          {(
            [
              ["potassium", "Potassium"],
              ["phosphorus", "Phosphorus"],
              ["sodium", "Sodium"],
            ] as const
          ).map(([key, label]) => (
            <Field key={key}>
              <FieldLabel htmlFor={key}>{label}</FieldLabel>
              <FormSelect id={key} name={key} defaultValue={food?.[key] ?? "NONE"} options={NUTRIENT_OPTIONS} />
            </Field>
          ))}
        </CardContent>
      </Card>
    </AdminForm>
  );
}
