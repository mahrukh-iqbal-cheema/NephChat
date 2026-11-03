import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Trash2 } from "lucide-react";
import { deleteMyAccount } from "@/actions/patient";
import { ConfirmAction } from "@/components/app/confirm-action";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isAdmin, requireUser } from "@/lib/session";

export default async function AccountPage() {
  const user = await requireUser();
  const t = await getTranslations("account");
  const common = await getTranslations("common");

  return (
    <PageShell size="narrow">
      <PageHeader title={t("title")} description={t("signedInAs", { email: user.email })} />
      <div className="flex flex-col gap-4">
        {!isAdmin(user) && (
          <Card>
            <CardHeader>
              <CardTitle>{t("deleteTitle")}</CardTitle>
              <CardDescription>{t("deleteBody")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ConfirmAction
                action={deleteMyAccount}
                trigger={
                  <>
                    <Trash2 /> {t("deleteConfirm")}
                  </>
                }
                title={t("deleteDialogTitle")}
                description={t("deleteBody")}
                confirmLabel={t("deleteConfirm")}
                cancelLabel={common("cancel")}
                size="default"
              />
            </CardContent>
          </Card>
        )}
        <Link href="/privacy" className="text-sm text-primary underline-offset-4 hover:underline">
          {common("privacy")}
        </Link>
      </div>
    </PageShell>
  );
}
