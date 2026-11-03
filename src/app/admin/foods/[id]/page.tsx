import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { db } from "@/lib/db";
import { FoodForm } from "../food-form";

export const metadata = { title: "Edit food" };

export default async function EditFoodPage({ params }: PageProps<"/admin/foods/[id]">) {
  const { id } = await params;
  const food = await db.food.findUnique({ where: { id } });
  if (!food) notFound();
  return (
    <>
      <AdminPageHeader title="Edit food" />
      <FoodForm food={food} />
    </>
  );
}
