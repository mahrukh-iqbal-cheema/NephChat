import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LocaleToggle } from "@/components/app/locale-toggle";
import { LogoMark } from "@/components/app/logo";
import { UserMenu } from "@/components/app/user-menu";
import { isAdmin, requireUser } from "@/lib/session";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser();
  const t = await getTranslations("common");
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-10">
      <header className="flex items-center gap-2 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
          <LogoMark className="size-7" />
          {t("appName")}
        </Link>
        <div className="ms-auto flex items-center gap-2">
          <LocaleToggle />
          <UserMenu name={user.name} isAdmin={isAdmin(user)} />
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
