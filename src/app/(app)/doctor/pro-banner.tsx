import { ShieldCheck } from "lucide-react";

export function ProBanner({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg bg-primary p-3 text-sm font-medium text-primary-foreground">
      <ShieldCheck className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}
