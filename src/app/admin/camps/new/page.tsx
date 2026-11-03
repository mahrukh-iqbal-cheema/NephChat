import { AdminPageHeader } from "@/components/admin/admin-page";
import { CampForm } from "../camp-form";

export const metadata = { title: "Add camp" };

export default function NewCampPage() {
  return (
    <>
      <AdminPageHeader title="Add camp" />
      <CampForm />
    </>
  );
}
