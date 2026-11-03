import { getLocale, getTranslations } from "next-intl/server";
import { articleIcon } from "@/components/app/article-icon";
import { NavCard } from "@/components/app/nav-card";
import { PageHeader } from "@/components/app/page-header";
import { db } from "@/lib/db";

export default async function LearnPage() {
  const t = await getTranslations("learn");
  const ur = (await getLocale()) === "ur";
  const articles = await db.article.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { slug: true, icon: true, titleEn: true, titleUr: true },
  });

  return (
    <>
      <PageHeader title={t("title")} description={t("question")} />
      <div className="flex flex-col gap-3">
        {articles.map((a) => (
          <NavCard key={a.slug} href={`/learn/${a.slug}`} icon={articleIcon(a.icon)} title={ur ? a.titleUr : a.titleEn} />
        ))}
        {articles.length === 0 && <p className="text-muted-foreground">{t("empty")}</p>}
      </div>
    </>
  );
}
