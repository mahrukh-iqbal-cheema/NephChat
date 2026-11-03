"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/camps", label: "Camps" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/foods", label: "Foods" },
  { href: "/admin/users", label: "Users" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 text-sm">
      {LINKS.map((l) => {
        const active = l.href === "/admin" ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
              active && "bg-secondary font-medium text-secondary-foreground",
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
