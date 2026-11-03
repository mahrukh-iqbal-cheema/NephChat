import { removeUser } from "@/actions/admin";
import { AdminPageHeader } from "@/components/admin/admin-page";
import { ConfirmAction } from "@/components/app/confirm-action";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { NewUserForm } from "./new-user-form";
import { RoleToggle } from "./role-toggle";

export const metadata = { title: "Users" };

export default async function AdminUsersPage() {
  const me = await requireAdmin();
  const users = await db.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
    take: 500,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Patients sign up themselves. Doctor accounts can only be created here, by an existing doctor."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Joined</TableHead>
                <TableHead className="w-56" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <span className="font-medium">{u.name}</span>
                    <span className="block text-xs text-muted-foreground">{u.email}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                      {u.role === "admin" ? "Doctor" : "Patient"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{u.createdAt.toISOString().slice(0, 10)}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    {u.id === me.id ? (
                      <span className="text-xs text-muted-foreground">You</span>
                    ) : (
                      <>
                        <RoleToggle userId={u.id} role={u.role} name={u.name} />
                        <ConfirmAction
                          action={removeUser.bind(null, u.id)}
                          trigger="Remove"
                          title={`Remove ${u.name}?`}
                          description="The account and all of its saved results are permanently deleted."
                          confirmLabel="Remove"
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className="self-start">
          <CardHeader>
            <CardTitle>Add a user</CardTitle>
            <CardDescription>Share the password with them securely; they can sign in straight away.</CardDescription>
          </CardHeader>
          <CardContent>
            <NewUserForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
