"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Heart,
  User,
  Bell,
  Settings,
  LogOut,
  MessageSquare,
} from "lucide-react";

const accountLinks = [
  { href: "/account", label: "My Bookings", icon: CalendarDays },
  { href: "/account/favorites", label: "Favorites", icon: Heart },
  { href: "/account/reviews", label: "My Reviews", icon: MessageSquare },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {accountLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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
      <hr className="my-2" />
      <Link
        href="/"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Link>
    </nav>
  );
}
