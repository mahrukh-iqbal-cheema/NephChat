import { AdminPageHeader } from "@/components/admin/admin-page";
import { ArticleForm } from "../article-form";

export const metadata = { title: "Add article" };

export default function NewArticlePage() {
  return (
    <>
      <AdminPageHeader title="Add article" />
      <ArticleForm />
    </>
  );
}
