import Link from "next/link";
import { deleteArticle } from "@/actions/admin";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { ArticleIcon } from "@/components/app/article-icon";
import { ConfirmAction } from "@/components/app/confirm-action";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";

export const metadata = { title: "Articles" };

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <AdminPageHeader
        title="Education articles"
        description="Shown in “Learn about kidneys”, in the order below."
        newHref="/admin/articles/new"
        newLabel="Add article"
      />
      <Card className="py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Urdu title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-40" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="tabular-nums">{a.sortOrder}</TableCell>
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2">
                    <ArticleIcon name={a.icon} className="size-4 text-muted-foreground" />
                    {a.titleEn}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell" dir="rtl">
                  {a.titleUr}
                </TableCell>
                <TableCell>
                  <Badge variant={a.published ? "secondary" : "outline"}>{a.published ? "Published" : "Draft"}</Badge>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Link href={`/admin/articles/${a.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Edit
                  </Link>
                  <ConfirmAction
                    action={deleteArticle.bind(null, a.id)}
                    trigger="Delete"
                    title="Delete this article?"
                    description={`"${a.titleEn}" will be permanently removed.`}
                    confirmLabel="Delete"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
