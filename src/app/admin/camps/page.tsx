import Link from "next/link";
import { deleteCamp } from "@/actions/admin";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { ConfirmAction } from "@/components/app/confirm-action";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";

export const metadata = { title: "Camps" };

export default async function AdminCampsPage() {
  const camps = await db.camp.findMany({ orderBy: { date: "desc" }, take: 500 });
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return (
    <>
      <AdminPageHeader
        title="Screening camps"
        description="Upcoming camps appear in the app immediately. Past camps are hidden automatically."
        newHref="/admin/camps/new"
        newLabel="Add camp"
      />
      <Card className="py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="w-40" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {camps.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No camps yet.
                </TableCell>
              </TableRow>
            )}
            {camps.map((c) => (
              <TableRow key={c.id} className={c.date < today ? "text-muted-foreground" : undefined}>
                <TableCell className="whitespace-nowrap">
                  {c.date.toISOString().slice(0, 10)}
                  {c.time && <span className="block text-xs text-muted-foreground">{c.time}</span>}
                </TableCell>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="hidden max-w-xs truncate md:table-cell">{c.address}</TableCell>
                <TableCell className="hidden md:table-cell">{c.contact}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Link href={`/admin/camps/${c.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Edit
                  </Link>
                  <ConfirmAction
                    action={deleteCamp.bind(null, c.id)}
                    trigger="Delete"
                    title="Delete this camp?"
                    description={`"${c.name}" will be removed from the app.`}
                    confirmLabel="Delete"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
