import Link from "next/link";
import { ArrowRight, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Link card. `row` is a compact list row; `tile` is a row on phones and a taller tile
 * from `sm` up, for card grids.
 */
export function NavCard({
  href,
  icon: Icon,
  title,
  description,
  emphasis = false,
  variant = "row",
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  emphasis?: boolean;
  variant?: "row" | "tile";
}) {
  const tile = variant === "tile";
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-xs transition-all hover:border-primary/30 hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        tile && "sm:h-full sm:flex-col sm:items-start sm:gap-5 sm:p-6",
      )}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-lg",
          tile && "sm:size-12",
          emphasis ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        )}
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block font-semibold", tile && "sm:text-lg")}>{title}</span>
        {description && <span className="mt-0.5 block text-sm text-muted-foreground">{description}</span>}
      </span>
      <ChevronRight className={cn("size-4 shrink-0 text-muted-foreground rtl:rotate-180", tile && "sm:hidden")} />
      {tile && (
        <ArrowRight className="hidden size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary sm:block rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      )}
    </Link>
  );
}
