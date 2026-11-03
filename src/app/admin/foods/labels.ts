import type { FoodCategory, MealSlot } from "@/lib/clinical";

export const CATEGORY_LABELS: Record<FoodCategory, string> = {
  FRUITS: "Fruits",
  VEGETABLES: "Vegetables",
  DRY_FRUITS: "Dry fruits & nuts",
  GRAINS: "Grains & snacks",
  DAIRY: "Dairy & drinks",
  PROTEIN: "Meat, fish & legumes",
  OTHER: "Other",
};

export const MEAL_LABELS: Record<MealSlot, string> = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  SNACK: "Snack",
};
