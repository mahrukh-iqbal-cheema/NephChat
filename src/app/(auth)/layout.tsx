import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BookOpen, Calculator, Salad } from "lucide-react";
import { LocaleToggle } from "@/components/app/locale-toggle";
import { LogoMark } from "@/components/app/logo";
import { getSession } from "@/lib/session";

export default async function AuthLayout({ children }: LayoutProps<"/">) {
  if (await getSession()) redirect("/");
  const t = await getTranslations("common");
  const a = await getTranslations("auth");
  const features = [
    { icon: Calculator, text: a("feature1") },
    { icon: BookOpen, text: a("feature2") },
    { icon: Salad, text: a("feature3") },
  ];

  return (
    <div className="grid flex-1 lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground">
            <LogoMark className="size-6" />
          </span>
          {t("appName")}
        </div>
        <div className="my-auto max-w-md">
          <h2 className="text-4xl leading-tight font-bold">{a("panelTitle")}</h2>
          <ul className="mt-8 space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-primary-foreground/90">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Icon className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-primary-foreground/70">{t("screeningDisclaimer")}</p>
      </aside>

      <div className="flex flex-col px-4 py-6 sm:px-6">
        <div className="flex justify-end">
          <LocaleToggle />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <LogoMark className="size-12" />
            <p className="mt-3 text-2xl font-bold text-primary">{t("appName")}</p>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
