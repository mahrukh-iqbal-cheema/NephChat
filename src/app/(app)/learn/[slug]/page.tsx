import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ArticleIcon } from "@/components/app/article-icon";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { db } from "@/lib/db";

export default async function ArticlePage({ params }: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const article = await db.article.findUnique({ where: { slug } });
  if (!article || !article.published) notFound();

  const ur = (await getLocale()) === "ur";
  const paragraphs = ur && article.bodyUr.length ? article.bodyUr : article.bodyEn;

  return (
    <PageShell size="narrow">
      <PageHeader title="" backHref="/learn" className="mb-2" />
      <article>
        <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <ArticleIcon name={article.icon} className="size-6" />
        </span>
        <h1 className="mb-4 text-2xl leading-snug font-bold text-primary sm:text-3xl">{ur ? article.titleUr : article.titleEn}</h1>
        <div className="space-y-4 leading-relaxed sm:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
