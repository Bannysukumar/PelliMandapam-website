import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccountSidebar } from "@/components/account/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="w-full lg:w-64 lg:shrink-0">
              <div className="sticky top-24 rounded-xl border bg-card p-4">
                <div className="mb-4 flex items-center gap-3 border-b pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    RS
                  </div>
                  <div>
                    <p className="font-medium">Ramesh Sharma</p>
                    <p className="text-xs text-muted-foreground">
                      ramesh@example.com
                    </p>
                  </div>
                </div>
                <AccountSidebar />
              </div>
            </aside>
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
