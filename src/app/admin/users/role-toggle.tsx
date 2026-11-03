"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { setUserRole } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function RoleToggle({ userId, role, name }: { userId: string; role: string; name: string }) {
  const [pending, startTransition] = useTransition();
  const promote = role !== "admin";

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" size="sm" disabled={pending} />}>
        {promote ? "Make doctor" : "Make patient"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{promote ? `Give ${name} doctor access?` : `Remove doctor access from ${name}?`}</AlertDialogTitle>
          <AlertDialogDescription>
            {promote
              ? "Doctors can edit all medical content, manage users and use the doctor tools."
              : "They will keep their account but lose access to the admin portal and doctor tools."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const result = await setUserRole(userId, promote ? "admin" : "user");
                if (result?.error) toast.error(result.error);
              })
            }
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
