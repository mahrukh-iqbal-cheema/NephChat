import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function AdminPageHeader({
  title,
  description,
  newHref,
  newLabel,
}: {
  title: string;
  description?: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {newHref && (
        <Link href={newHref} className={buttonVariants()}>
          <Plus /> {newLabel}
        </Link>
      )}
    </div>
  );
}
