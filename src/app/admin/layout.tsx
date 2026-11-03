import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/app/logo";
import { requireAdmin } from "@/lib/session";
import { AdminNav } from "./admin-nav";

export const metadata = { title: { default: "Admin", template: "%s · NephChat Admin" } };

// The portal is English-only; it is used by a small group of clinicians.
export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireAdmin();
  return (
    <div dir="ltr" lang="en" className="flex flex-1 flex-col font-sans">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2 font-semibold text-primary">
            <LogoMark className="size-6" />
            NephChat Admin
          </Link>
          <AdminNav />
          <div className="ms-auto flex items-center gap-4 text-sm text-muted-foreground">
            <span className="hidden sm:inline">{user.email}</span>
            <Link href="/" className="flex items-center gap-1 hover:text-foreground">
              <ArrowLeft className="size-4" /> App
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
