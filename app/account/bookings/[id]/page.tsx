"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock,
  IndianRupee,
  Phone,
  Mail,
  Users,
  Download,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { bookings } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/shared/status-badge";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const booking = bookings.find((b) => b.id === id) || bookings[0];

  const timeline = [
    { label: "Booking Requested", date: "Feb 1, 2026", done: true },
    { label: "Payment Received", date: "Feb 1, 2026", done: true },
    { label: "Vendor Confirmed", date: "Feb 2, 2026", done: true },
    {
      label: "Event Day",
      date: formatDate(booking.eventDate),
      done: booking.status === "completed",
    },
    {
      label: "Review & Feedback",
      date: "",
      done: booking.status === "completed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/account">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Venue Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {booking.mandapamName}
                </CardTitle>
                <StatusBadge status={booking.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Event Date</p>
                    <p className="font-medium">
                      {formatDate(booking.eventDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Event Type</p>
                    <p className="font-medium">{booking.eventType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium">{booking.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="font-medium">{booking.guestCount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Venue Charge</span>
                <span>{formatCurrency(booking.totalAmount * 0.85)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Tax (18%)</span>
                <span>{formatCurrency(booking.totalAmount * 0.15)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>{formatCurrency(booking.totalAmount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm text-success">
                <span>Paid</span>
                <span>{formatCurrency(booking.paidAmount)}</span>
              </div>
              {booking.paidAmount < booking.totalAmount && (
                <div className="flex justify-between text-sm text-destructive">
                  <span>Balance Due</span>
                  <span>
                    {formatCurrency(booking.totalAmount - booking.paidAmount)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Booking Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {step.done ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/40" />
                      )}
                      {i < timeline.length - 1 && (
                        <div
                          className={`mt-1 h-6 w-0.5 ${
                            step.done ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          step.done ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-xs text-muted-foreground">
                          {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vendor Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vendor Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-medium">{booking.vendorName}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>vendor@example.com</span>
              </div>
              <Button className="w-full" variant="outline" size="sm">
                Contact Vendor
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            {booking.status === "pending" && (
              <Button variant="destructive" className="w-full">
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
