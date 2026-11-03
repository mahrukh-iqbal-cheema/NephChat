import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AppNav } from "@/components/app/app-nav";
import { LocaleToggle } from "@/components/app/locale-toggle";
import { LogoMark } from "@/components/app/logo";
import { UserMenu } from "@/components/app/user-menu";
import { isAdmin, requireUser } from "@/lib/session";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser();
  const t = await getTranslations("common");
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-semibold text-primary">
            <LogoMark className="size-7" />
            {t("appName")}
          </Link>
          <AppNav />
          <div className="ms-auto flex items-center gap-2">
            <LocaleToggle />
            <UserMenu name={user.name} isAdmin={isAdmin(user)} />
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </main>
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="max-w-2xl">{t("screeningDisclaimer")}</p>
          <Link href="/privacy" className="shrink-0 hover:text-foreground">
            {t("privacy")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
