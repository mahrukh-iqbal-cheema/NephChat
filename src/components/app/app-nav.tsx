"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/quiz", key: "risk" },
  { href: "/egfr", key: "egfr" },
  { href: "/learn", key: "learn" },
  { href: "/diet", key: "diet" },
  { href: "/camps", key: "camps" },
] as const;

/** Primary navigation for tablet and desktop; phones use the home screen cards. */
export function AppNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {LINKS.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              active && "bg-secondary text-secondary-foreground",
            )}
          >
            {t(l.key)}
          </Link>
        );
      })}
    </nav>
  );
}
