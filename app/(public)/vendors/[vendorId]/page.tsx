"use client";

import { use } from "react";
import { Star, MapPin, CalendarDays, Phone, Mail, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MandapamCard } from "@/components/shared/mandapam-card";
import { vendors, mandapams } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

export default function VendorProfilePage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = use(params);
  const vendor = vendors.find((v) => v.id === vendorId) || vendors[0];
  const vendorMandapams = mandapams.filter((m) => m.vendorId === vendor.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Vendor Header */}
      <Card className="overflow-hidden border bg-card">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent" />
        <CardContent className="relative -mt-12 px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Avatar className="h-20 w-20 border-4 border-card">
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {vendor.businessName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-card-foreground">{vendor.businessName}</h1>
                  <Badge className="gap-1 border-0 bg-success/15 text-success">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {vendor.city}, {vendor.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {vendor.rating} ({vendor.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> Joined {formatDate(vendor.joinedAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Phone className="h-4 w-4" /> Call
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Mail className="h-4 w-4" /> Email
              </Button>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {vendor.description}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              { label: "Total Bookings", value: vendor.totalBookings },
              { label: "Avg. Rating", value: vendor.rating },
              { label: "Listings", value: vendorMandapams.length },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor's Listings */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-foreground">
          Venues by {vendor.businessName}
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendorMandapams.map((m, i) => (
            <MandapamCard key={m.id} mandapam={m} index={i} />
          ))}
        </div>
        {vendorMandapams.length === 0 && (
          <Card className="border bg-card">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <p className="text-lg font-semibold text-card-foreground">No venues listed yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This vendor has not added any mandapams yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
