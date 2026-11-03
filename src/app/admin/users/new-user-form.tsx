"use client";

import { createUser } from "@/actions/admin";
import { AdminForm } from "@/components/admin/admin-form";
import { FormSelect } from "@/components/admin/form-select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function NewUserForm() {
  return (
    <AdminForm action={createUser} submitLabel="Create account" resetOnSuccess>
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" name="name" required />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" name="email" type="email" required />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Temporary password</FieldLabel>
        <Input id="password" name="password" type="password" minLength={8} autoComplete="new-password" required />
      </Field>
      <Field>
        <FieldLabel htmlFor="role">Role</FieldLabel>
        <FormSelect
          id="role"
          name="role"
          defaultValue="admin"
          options={[
            { value: "admin", label: "Doctor (can edit content)" },
            { value: "user", label: "Patient" },
          ]}
        />
      </Field>
    </AdminForm>
  );
}
