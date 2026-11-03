import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavCard({
  href,
  icon: Icon,
  title,
  description,
  emphasis = false,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  emphasis?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-xs transition-colors hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-lg",
          emphasis ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        )}
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        {description && <span className="block text-sm text-muted-foreground">{description}</span>}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground rtl:rotate-180" />
    </Link>
  );
}
