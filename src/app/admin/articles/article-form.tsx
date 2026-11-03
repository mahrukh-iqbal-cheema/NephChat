"use client";

import type { Article } from "@prisma/client";
import { saveArticle } from "@/actions/admin";
import { AdminForm } from "@/components/admin/admin-form";
import { FormSelect } from "@/components/admin/form-select";
import { ARTICLE_ICONS } from "@/components/app/article-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const ICON_OPTIONS = Object.keys(ARTICLE_ICONS).map((k) => ({ value: k, label: k }));

export function ArticleForm({ article }: { article?: Article }) {
  return (
    <Card className="max-w-3xl">
      <CardContent>
        <AdminForm action={saveArticle.bind(null, article?.id ?? null)}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input id="slug" name="slug" required defaultValue={article?.slug} placeholder="what-is-ckd" />
              <FieldDescription>Used in the URL: /learn/slug</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="icon">Icon</FieldLabel>
              <FormSelect id="icon" name="icon" defaultValue={article?.icon ?? "book"} options={ICON_OPTIONS} />
            </Field>
            <Field>
              <FieldLabel htmlFor="sortOrder">Order</FieldLabel>
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={article?.sortOrder ?? 0} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="titleEn">Title (English)</FieldLabel>
              <Input id="titleEn" name="titleEn" required defaultValue={article?.titleEn} />
            </Field>
            <Field>
              <FieldLabel htmlFor="titleUr">Title (Urdu)</FieldLabel>
              <Input id="titleUr" name="titleUr" required dir="rtl" defaultValue={article?.titleUr} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="bodyEn">Body (English)</FieldLabel>
            <Textarea id="bodyEn" name="bodyEn" rows={10} required defaultValue={article?.bodyEn.join("\n\n")} />
            <FieldDescription>Separate paragraphs with a blank line.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="bodyUr">Body (Urdu)</FieldLabel>
            <Textarea id="bodyUr" name="bodyUr" rows={10} dir="rtl" defaultValue={article?.bodyUr.join("\n\n")} />
            <FieldDescription>If empty, the English text is shown to Urdu readers.</FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Switch id="published" name="published" defaultChecked={article?.published ?? true} />
            <FieldContent>
              <FieldLabel htmlFor="published">Published</FieldLabel>
            </FieldContent>
          </Field>
        </AdminForm>
      </CardContent>
    </Card>
  );
}
