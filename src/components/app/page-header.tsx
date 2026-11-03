import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  backHref = "/",
  className,
}: {
  title: string;
  description?: string;
  backHref?: string | null;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex items-start gap-3", className)}>
      {backHref && (
        <Link href={backHref} aria-label="Back" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "shrink-0 rounded-full")}>
          <ChevronLeft className="rtl:rotate-180" />
        </Link>
      )}
      <div className="min-w-0">
        <h1 className="text-xl leading-tight font-semibold">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
