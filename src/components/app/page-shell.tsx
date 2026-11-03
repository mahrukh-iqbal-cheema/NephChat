import { cn } from "@/lib/utils";

const WIDTHS = {
  narrow: "max-w-2xl",
  default: "max-w-4xl",
  wide: "max-w-none",
};

/** Centers a page's content at a width that suits it: forms and reading are narrow, lists use the full width. */
export function PageShell({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof WIDTHS;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto flex w-full flex-1 flex-col", WIDTHS[size], className)}>{children}</div>;
}

/** Bordered panel on tablet/desktop, flat on phones. Wraps step-by-step forms. */
export function FormPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-1 flex-col sm:flex-none sm:rounded-2xl sm:border sm:bg-card sm:p-8 sm:shadow-xs", className)}>
      {children}
    </div>
  );
}
