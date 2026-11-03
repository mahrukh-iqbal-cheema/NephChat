// Clinical logic shared by server actions and client calculators. Pure functions only.

export type RiskLevel = "GREEN" | "AMBER" | "RED";

export type QuizAnswers = {
  age: number;
  diabetes: "yes" | "no" | "notsure";
  bp: "yes" | "no" | "notsure";
  family: "yes" | "no" | "notsure";
  stones: "yes" | "no";
  abnormal: "yes" | "no" | "notsure";
  symptoms: ("frothy" | "blood" | "swelling" | "reduced" | "none")[];
  nsaid: "yes" | "no" | "sometimes" | "notsure";
};

type QuestionOption = { value: string; label: string };
export type QuizQuestion =
  | { id: "age"; type: "number"; label: string; hint: string }
  | { id: keyof QuizAnswers; type: "single" | "multi"; label: string; options: QuestionOption[] };

const yesNoUnsure = [
  { value: "yes", label: "yes" },
  { value: "no", label: "no" },
  { value: "notsure", label: "notSure" },
];

// `label` values are message keys under the "quiz" namespace.
export const QUIZ: QuizQuestion[] = [
  { id: "age", type: "number", label: "q_age", hint: "ageHint" },
  { id: "diabetes", type: "single", label: "q_diabetes", options: yesNoUnsure },
  { id: "bp", type: "single", label: "q_bp", options: yesNoUnsure },
  { id: "family", type: "single", label: "q_family", options: yesNoUnsure },
  { id: "stones", type: "single", label: "q_stones", options: yesNoUnsure.slice(0, 2) },
  { id: "abnormal", type: "single", label: "q_abnormal", options: yesNoUnsure },
  {
    id: "symptoms",
    type: "multi",
    label: "q_symptoms",
    options: [
      { value: "frothy", label: "sym_frothy" },
      { value: "blood", label: "sym_blood" },
      { value: "swelling", label: "sym_swelling" },
      { value: "reduced", label: "sym_reduced" },
      { value: "none", label: "none" },
    ],
  },
  {
    id: "nsaid",
    type: "single",
    label: "q_nsaid",
    options: [
      { value: "yes", label: "yes" },
      { value: "no", label: "no" },
      { value: "sometimes", label: "sometimes" },
      { value: "notsure", label: "notSure" },
    ],
  },
];

export function computeRisk(a: QuizAnswers): { score: number; level: RiskLevel; urgent: boolean } {
  let score = 0;
  if (a.age >= 60) score++;
  if (a.diabetes === "yes") score++;
  if (a.bp === "yes") score++;
  if (a.family === "yes") score++;
  if (a.stones === "yes") score++;
  if (a.abnormal === "yes") score++;
  if (a.nsaid === "yes" || a.nsaid === "sometimes") score++;
  const urgent = ["blood", "swelling", "reduced"].some((s) => a.symptoms.includes(s as never));
  if (a.symptoms.length > 0 && !a.symptoms.includes("none")) score++;

  let level: RiskLevel = "GREEN";
  if (urgent || score >= 4) level = "RED";
  else if (score >= 2) level = "AMBER";
  return { score, level, urgent };
}

/** 2021 CKD-EPI creatinine equation (race-free). Creatinine in mg/dL. */
export function ckdEpi2021(age: number, female: boolean, scr: number): number {
  const k = female ? 0.7 : 0.9;
  const a = female ? -0.241 : -0.302;
  const value =
    142 *
    Math.pow(Math.min(scr / k, 1), a) *
    Math.pow(Math.max(scr / k, 1), -1.2) *
    Math.pow(0.9938, age) *
    (female ? 1.012 : 1);
  return Math.round(value);
}

export type EgfrBand = "normal" | "mild" | "moderate" | "severe";
export function egfrBand(v: number): EgfrBand {
  if (v >= 90) return "normal";
  if (v >= 60) return "mild";
  if (v >= 30) return "moderate";
  return "severe";
}

/** 4-variable Kidney Failure Risk Equation (Tangri et al. 2011, North American calibration). ACR in mg/g. */
export function kfre(age: number, male: boolean, egfr: number, acr: number) {
  const L =
    -0.2201 * (age / 10 - 7.036) +
    0.2467 * ((male ? 1 : 0) - 0.5642) -
    0.5567 * (egfr / 5 - 7.222) +
    0.451 * (Math.log(acr) - 5.137);
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  return {
    risk2: clamp((1 - Math.pow(0.9832, Math.exp(L))) * 100),
    risk5: clamp((1 - Math.pow(0.9365, Math.exp(L))) * 100),
  };
}

// ---------- Diet ----------

export const STAGES = ["CKD3", "CKD4", "CKD5", "ESRD"] as const;
export type Stage = (typeof STAGES)[number];
export const MEALS = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const;
export type MealSlot = (typeof MEALS)[number];
export const FOOD_CATEGORIES = ["FRUITS", "VEGETABLES", "DRY_FRUITS", "GRAINS", "DAIRY", "PROTEIN", "OTHER"] as const;
export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

export type DietFood = {
  id: string;
  category: FoodCategory;
  portionsEn: Record<Stage, string> | null;
  portionsUr: Record<Stage, string> | null;
  potassium: "H" | "L" | null;
  phosphorus: "H" | "L" | null;
  sodium: "H" | "L" | null;
  meals: MealSlot[];
  mealExclude: boolean;
};

/**
 * How a food fits a stage. `key` is a message key under "diet.classify";
 * `portion` and `nutrient` are interpolation values for that message.
 */
export type FoodClass = {
  level: "green" | "amber" | "red";
  key: "avoid" | "normal" | "portion" | "highSodium" | "highNutrientCkd3" | "highNutrient" | "friendly";
  portion?: string;
  nutrient?: "potassium" | "phosphorus" | "both";
};

export function classifyFood(food: DietFood, stage: Stage, locale: string): FoodClass {
  if (food.portionsEn) {
    const en = food.portionsEn[stage] ?? "";
    if (/avoid/i.test(en)) return { level: "red", key: "avoid" };
    if (/^allowed in normal amount/i.test(en)) return { level: "green", key: "normal" };
    const portion = locale === "ur" ? (food.portionsUr?.[stage] ?? en) : en;
    return { level: "green", key: "portion", portion };
  }
  if (food.sodium === "H") return { level: "red", key: "highSodium" };
  const highK = food.potassium === "H";
  const highP = food.phosphorus === "H";
  if (highK || highP) {
    const nutrient = highK && highP ? "both" : highK ? "potassium" : "phosphorus";
    return stage === "CKD3"
      ? { level: "amber", key: "highNutrientCkd3", nutrient }
      : { level: "red", key: "highNutrient", nutrient };
  }
  return { level: "green", key: "friendly" };
}

const CATEGORY_DEFAULT_MEALS: Record<FoodCategory, MealSlot[]> = {
  FRUITS: ["BREAKFAST", "SNACK"],
  VEGETABLES: ["LUNCH", "DINNER"],
  DRY_FRUITS: ["SNACK"],
  GRAINS: ["LUNCH", "DINNER"],
  DAIRY: ["BREAKFAST", "SNACK"],
  PROTEIN: ["LUNCH", "DINNER"],
  OTHER: ["SNACK"],
};

/** Places each allowed food into its first preferred meal slot that still has room. */
export function buildMealPlan<T extends DietFood>(foods: T[], slotCap = 3): Record<MealSlot, T[]> {
  const slots: Record<MealSlot, T[]> = { BREAKFAST: [], LUNCH: [], DINNER: [], SNACK: [] };
  for (const f of foods) {
    if (f.mealExclude) continue;
    const preferred = f.meals.length ? f.meals : CATEGORY_DEFAULT_MEALS[f.category];
    const slot =
      preferred.find((s) => slots[s].length < slotCap) ??
      MEALS.reduce((a, b) => (slots[a].length <= slots[b].length ? a : b));
    slots[slot].push(f);
  }
  return slots;
}
