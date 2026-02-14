"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import type { Booking } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/format";

interface BookingCardProps {
  booking: Booking;
  index?: number;
  isVendor?: boolean;
}

export function BookingCard({ booking, index = 0, isVendor }: BookingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={isVendor ? `/vendor/bookings` : `/account/bookings/${booking.id}`}>
        <Card className="group overflow-hidden border bg-card transition-all hover:shadow-md">
          <CardContent className="flex gap-4 p-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={booking.mandapamImage}
                alt={booking.mandapamName}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-sm font-semibold text-card-foreground">
                  {booking.mandapamName}
                </h3>
                <StatusBadge status={booking.status} />
              </div>
              {isVendor && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Booked by: {booking.userName}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(booking.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {booking.slotLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {booking.guests} guests
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-bold text-primary">
                  {formatCurrency(booking.totalAmount)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-primary hover:text-primary"
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
