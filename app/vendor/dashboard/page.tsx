"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Building2,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { bookings, vendorKPIs } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";

export default function VendorDashboardPage() {
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Sri Lakshmi Mandapams
          </p>
        </div>
        <Button asChild>
          <Link href="/vendor/mandapams/new">
            <Building2 className="mr-2 h-4 w-4" />
            Add Mandapam
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vendorKPIs.map((kpi, index) => (
          <KPICard key={kpi.title} data={kpi} index={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Bookings</CardTitle>
              <CardDescription>Latest booking activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/vendor/bookings">
                View All
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {booking.mandapamName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(booking.eventDate)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {formatCurrency(booking.totalAmount)}
                    </span>
                    <StatusBadge status={booking.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Events</CardTitle>
            <CardDescription>Events in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings
                .filter((b) => b.status === "confirmed")
                .slice(0, 4)
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-xs font-bold">
                        {new Date(booking.eventDate).getDate()}
                      </span>
                      <span className="text-[10px]">
                        {new Date(booking.eventDate).toLocaleString("en", {
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {booking.eventType}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {booking.mandapamName} - {booking.guestCount} guests
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      Upcoming
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
