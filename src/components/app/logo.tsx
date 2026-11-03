import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" fill="none" aria-hidden className={cn("size-8", className)}>
      <path d="M26 6C15 6 8 16 8 27c0 11 8 19 18 19s18-8 18-19C44 16 37 6 26 6z" fill="var(--primary)" />
      <path
        d="M26 6C19 6 14 13 14 22c0 5 2 9 5 12"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
