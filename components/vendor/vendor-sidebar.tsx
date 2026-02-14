"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  IndianRupee,
  Star,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const vendorLinks = [
  {
    href: "/vendor/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  { href: "/vendor/mandapams", label: "My Mandapams", icon: Building2 },
  { href: "/vendor/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/vendor/earnings", label: "Earnings", icon: IndianRupee },
  { href: "/vendor/reviews", label: "Reviews", icon: Star },
  { href: "/vendor/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/vendor/messages", label: "Messages", icon: MessageSquare },
  { href: "/vendor/settings", label: "Settings", icon: Settings },
];

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            P
          </div>
          <span className="font-bold">PelliMandapam</span>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Vendor Portal</p>
      </div>

      <div className="p-3">
        <Button size="sm" className="w-full justify-start" asChild>
          <Link href="/vendor/mandapams/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Mandapam
          </Link>
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {vendorLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/vendor/dashboard" &&
              pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <div className="mb-3 flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            SL
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Sri Lakshmi Mandapams
            </p>
            <p className="truncate text-xs text-muted-foreground">
              vendor@example.com
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Link>
      </div>
    </div>
  );
}
