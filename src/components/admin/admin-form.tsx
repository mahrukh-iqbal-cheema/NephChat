"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { AdminFormState } from "@/actions/admin";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

/** Form bound to a server action. On success the action redirects, or (resetOnSuccess) the form clears. */
export function AdminForm({
  action,
  submitLabel = "Save",
  resetOnSuccess = false,
  children,
}: {
  action: (prev: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  submitLabel?: string;
  resetOnSuccess?: boolean;
  children: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const submitted = useRef(false);

  useEffect(() => {
    if (!pending && submitted.current && !state?.error && resetOnSuccess) {
      formRef.current?.reset();
      toast.success("Saved");
    }
  }, [pending, state, resetOnSuccess]);

  return (
    <form
      ref={formRef}
      action={(fd) => {
        submitted.current = true;
        formAction(fd);
      }}
    >
      <FieldGroup>
        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
        {children}
        <div>
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
