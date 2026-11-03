import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function Disclaimer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex gap-2 rounded-lg bg-secondary p-3 text-sm text-secondary-foreground", className)}>
      <Info className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
