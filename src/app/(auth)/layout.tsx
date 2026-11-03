import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LocaleToggle } from "@/components/app/locale-toggle";
import { LogoMark } from "@/components/app/logo";
import { getSession } from "@/lib/session";

export default async function AuthLayout({ children }: LayoutProps<"/">) {
  if (await getSession()) redirect("/");
  const t = await getTranslations("common");
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-6">
      <div className="flex justify-end">
        <LocaleToggle />
      </div>
      <div className="mt-10 mb-8 flex flex-col items-center text-center">
        <LogoMark className="size-12" />
        <p className="mt-3 text-2xl font-bold text-primary">{t("appName")}</p>
        <p className="text-sm text-muted-foreground">{t("tagline")}</p>
      </div>
      {children}
    </div>
  );
}
