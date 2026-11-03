"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { setLocale } from "@/actions/locale";
import { Button } from "@/components/ui/button";

export function LocaleToggle() {
  const locale = useLocale();
  const t = useTranslations("common");
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => setLocale(locale === "ur" ? "en" : "ur"))}
    >
      <Languages />
      {t("switchLanguage")}
    </Button>
  );
}
