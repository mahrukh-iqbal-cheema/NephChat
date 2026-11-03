import { CircleAlert, CircleCheck, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Level = "green" | "amber" | "red";

const STYLES: Record<Level, string> = {
  green: "bg-success-muted text-primary",
  amber: "bg-warning-muted text-warning",
  red: "bg-destructive-muted text-destructive",
};
const ICONS = { green: CircleCheck, amber: TriangleAlert, red: CircleAlert };

export function RiskBadge({ level, children, className }: { level: Level; children: React.ReactNode; className?: string }) {
  const Icon = ICONS[level];
  return (
    <Badge className={cn("h-auto gap-1.5 px-2.5 py-1 text-sm font-semibold", STYLES[level], className)}>
      <Icon />
      {children}
    </Badge>
  );
}
