import type { Metadata, Viewport } from "next";
import { Noto_Nastaliq_Urdu, Work_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const sans = Work_Sans({ variable: "--font-sans", subsets: ["latin"] });
const urdu = Noto_Nastaliq_Urdu({ variable: "--font-urdu", subsets: ["arabic"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: { default: "NephChat", template: "%s · NephChat" },
  description: "Your simple guide to kidney health.",
  applicationName: "NephChat",
};

export const viewport: Viewport = {
  themeColor: "#1b4b43",
  viewportFit: "cover",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      dir={locale === "ur" ? "rtl" : "ltr"}
      className={`${sans.variable} ${urdu.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
