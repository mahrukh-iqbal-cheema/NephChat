import { AdminPageHeader } from "@/components/admin/admin-page";
import { FoodForm } from "../food-form";

export const metadata = { title: "Add food" };

export default function NewFoodPage() {
  return (
    <>
      <AdminPageHeader title="Add food" />
      <FoodForm />
    </>
  );
}
