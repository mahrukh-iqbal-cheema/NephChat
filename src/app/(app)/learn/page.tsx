import { getLocale, getTranslations } from "next-intl/server";
import { articleIcon } from "@/components/app/article-icon";
import { NavCard } from "@/components/app/nav-card";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
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
    <PageShell size="wide">
      <PageHeader title={t("title")} description={t("question")} />
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {articles.map((a) => (
          <NavCard key={a.slug} href={`/learn/${a.slug}`} icon={articleIcon(a.icon)} title={ur ? a.titleUr : a.titleEn} />
        ))}
        {articles.length === 0 && <p className="text-muted-foreground">{t("empty")}</p>}
      </div>
    </PageShell>
  );
}
