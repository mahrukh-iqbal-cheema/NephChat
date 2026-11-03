import { createElement } from "react";
import {
  Bean,
  BookOpen,
  Calculator,
  Droplet,
  FlaskConical,
  HeartPulse,
  Hourglass,
  Pill,
  Salad,
  Siren,
  Stethoscope,
  TestTube,
  type LucideIcon,
} from "lucide-react";

// Article icons are stored by key so the admin portal can offer a fixed, consistent set.
export const ARTICLE_ICONS: Record<string, LucideIcon> = {
  bean: Bean,
  book: BookOpen,
  calculator: Calculator,
  droplet: Droplet,
  flask: FlaskConical,
  "heart-pulse": HeartPulse,
  hourglass: Hourglass,
  pill: Pill,
  salad: Salad,
  siren: Siren,
  stethoscope: Stethoscope,
  "test-tube": TestTube,
};

export function articleIcon(key: string): LucideIcon {
  return ARTICLE_ICONS[key] ?? BookOpen;
}

export function ArticleIcon({ name, className }: { name: string; className?: string }) {
  return createElement(articleIcon(name), { className });
}
