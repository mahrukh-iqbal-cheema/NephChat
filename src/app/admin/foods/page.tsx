import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { deleteFood } from "@/actions/admin";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { ConfirmAction } from "@/components/app/confirm-action";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";
import { CATEGORY_LABELS } from "./labels";

export const metadata = { title: "Foods" };

export default async function AdminFoodsPage({ searchParams }: PageProps<"/admin/foods">) {
  const q = String((await searchParams).q ?? "").trim();
  const where: Prisma.FoodWhereInput = q
    ? { OR: [{ nameEn: { contains: q, mode: "insensitive" } }, { nameUr: { contains: q } }, { slug: { contains: q } }] }
    : {};
  const foods = await db.food.findMany({ where, orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });

  return (
    <>
      <AdminPageHeader
        title="Diet foods"
        description="Stage-specific portions shown in “My kidney diet”."
        newHref="/admin/foods/new"
        newLabel="Add food"
      />
      <form className="mb-4 max-w-sm">
        <Input name="q" defaultValue={q} placeholder="Search foods…" aria-label="Search foods" />
      </form>
      <Card className="py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden lg:table-cell">CKD3 / CKD4 / CKD5 / ESRD</TableHead>
              <TableHead className="w-40" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {foods.map((f) => {
              const portions = f.portionsEn as Record<string, string> | null;
              const flags = [
                f.potassium && `K: ${f.potassium}`,
                f.phosphorus && `P: ${f.phosphorus}`,
                f.sodium && `Na: ${f.sodium}`,
              ].filter(Boolean);
              return (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">
                    {f.nameEn}
                    <span className="block text-xs font-normal text-muted-foreground" dir="rtl">
                      {f.nameUr}
                    </span>
                  </TableCell>
                  <TableCell>
                    {CATEGORY_LABELS[f.category]}
                    {!f.vegetarian && (
                      <Badge variant="outline" className="ms-2">
                        Non-veg
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden max-w-md text-xs whitespace-normal text-muted-foreground lg:table-cell">
                    {portions
                      ? [portions.CKD3, portions.CKD4, portions.CKD5, portions.ESRD].join(" / ")
                      : flags.join(", ") || "—"}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Link href={`/admin/foods/${f.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                      Edit
                    </Link>
                    <ConfirmAction
                      action={deleteFood.bind(null, f.id)}
                      trigger="Delete"
                      title="Delete this food?"
                      description={`"${f.nameEn}" will be removed from the diet module.`}
                      confirmLabel="Delete"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
