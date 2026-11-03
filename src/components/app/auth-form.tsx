"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isSignUp = mode === "signup";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    setPending(true);
    setError(null);
    const { error } = isSignUp
      ? await authClient.signUp.email({ name: String(form.get("name")), email, password })
      : await authClient.signIn.email({ email, password });
    setPending(false);
    if (error) return setError(error.message ?? "Error");
    router.replace("/");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{isSignUp ? t("signUpTitle") : t("signInTitle")}</CardTitle>
        <CardDescription>{isSignUp ? t("signUpSub") : t("signInSub")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form method="post" onSubmit={onSubmit}>
          <FieldGroup>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isSignUp && (
              <Field>
                <FieldLabel htmlFor="name">{t("name")}</FieldLabel>
                <Input id="name" name="name" autoComplete="name" required className="h-10" />
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
              <Input id="email" name="email" type="email" autoComplete="email" dir="ltr" required className="h-10" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                minLength={8}
                dir="ltr"
                required
                className="h-10"
              />
              {isSignUp && <FieldDescription>{t("passwordHint")}</FieldDescription>}
            </Field>
            <Button type="submit" size="lg" className="h-11 text-base" disabled={pending}>
              {pending && <Loader2 className="animate-spin" />}
              {isSignUp ? t("signUp") : t("signIn")}
            </Button>
            {isSignUp && (
              <FieldDescription className="text-center">
                <Link href="/privacy" className="underline underline-offset-4">
                  {t("agree")}
                </Link>
              </FieldDescription>
            )}
            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? t("haveAccount") : t("noAccount")}{" "}
              <Link href={isSignUp ? "/login" : "/signup"} className="font-medium text-primary underline-offset-4 hover:underline">
                {isSignUp ? t("signIn") : t("signUp")}
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
