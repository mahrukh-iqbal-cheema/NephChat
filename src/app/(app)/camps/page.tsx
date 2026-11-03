import { getFormatter, getTranslations } from "next-intl/server";
import { CalendarDays, Hospital, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

export default async function CampsPage() {
  const t = await getTranslations("camps");
  const format = await getFormatter();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const camps = await db.camp.findMany({ where: { date: { gte: today } }, orderBy: { date: "asc" }, take: 100 });

  return (
    <>
      <PageHeader title={t("title")} />
      {camps.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-secondary">
            <Hospital className="size-6 text-primary" />
          </span>
          <p className="font-medium">{t("empty")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("emptySub")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {camps.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  {c.address}
                </p>
                <p className="flex gap-2">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>
                    {format.dateTime(c.date, { dateStyle: "medium", timeZone: "UTC" })}
                    {c.time && ` · ${c.time}`}
                  </span>
                </p>
                {c.contact && (
                  <p className="flex gap-2">
                    <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span dir="ltr">{c.contact}</span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
