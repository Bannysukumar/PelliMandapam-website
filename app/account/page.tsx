"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  MapPin,
  Clock,
  IndianRupee,
  Download,
  Eye,
  Star,
} from "lucide-react";
import { bookings } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/shared/status-badge";

export default function MyBookingsPage() {
  const [tab, setTab] = useState("all");

  const filtered =
    tab === "all"
      ? bookings
      : bookings.filter((b) => b.status === tab.toUpperCase());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          Manage and track all your mandapam bookings
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <div className="space-y-4">
            {filtered.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {booking.mandapamName}
                        </h3>
                        <StatusBadge status={booking.status} />
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{formatDate(booking.eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{booking.eventType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />
                          <span className="font-medium text-foreground">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                          {booking.paidAmount < booking.totalAmount && (
                            <Badge variant="outline" className="text-xs">
                              Due: {formatCurrency(booking.totalAmount - booking.paidAmount)}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Booking ID: {booking.id}
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 sm:flex-col">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/account/bookings/${booking.id}`}>
                          <Eye className="mr-1.5 h-3.5 w-3.5" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Receipt
                      </Button>
                      {booking.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Star className="mr-1.5 h-3.5 w-3.5" />
                          Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-medium">No bookings found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start exploring mandapams to make your first booking
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/mandapams">Browse Mandapams</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
