import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { db } from "@/lib/db";
import { ArticleForm } from "../article-form";

export const metadata = { title: "Edit article" };

export default async function EditArticlePage({ params }: PageProps<"/admin/articles/[id]">) {
  const { id } = await params;
  const article = await db.article.findUnique({ where: { id } });
  if (!article) notFound();
  return (
    <>
      <AdminPageHeader title="Edit article" />
      <ArticleForm article={article} />
    </>
  );
}
