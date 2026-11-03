import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { db } from "@/lib/db";
import { CampForm } from "../camp-form";

export const metadata = { title: "Edit camp" };

export default async function EditCampPage({ params }: PageProps<"/admin/camps/[id]">) {
  const { id } = await params;
  const camp = await db.camp.findUnique({ where: { id } });
  if (!camp) notFound();
  return (
    <>
      <AdminPageHeader title="Edit camp" />
      <CampForm camp={camp} />
    </>
  );
}
