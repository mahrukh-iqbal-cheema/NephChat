"use client";

import type { Camp } from "@prisma/client";
import { saveCamp } from "@/actions/admin";
import { AdminForm } from "@/components/admin/admin-form";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function CampForm({ camp }: { camp?: Camp }) {
  return (
    <Card className="max-w-2xl">
      <CardContent>
        <AdminForm action={saveCamp.bind(null, camp?.id ?? null)}>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" required defaultValue={camp?.name} />
          </Field>
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input id="address" name="address" required defaultValue={camp?.address} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input id="date" name="date" type="date" required defaultValue={camp?.date.toISOString().slice(0, 10)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="time">Time</FieldLabel>
              <Input id="time" name="time" placeholder="9:00 AM – 1:00 PM" defaultValue={camp?.time ?? ""} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="contact">Contact</FieldLabel>
            <Input id="contact" name="contact" placeholder="Phone or email" defaultValue={camp?.contact ?? ""} />
          </Field>
        </AdminForm>
      </CardContent>
    </Card>
  );
}
