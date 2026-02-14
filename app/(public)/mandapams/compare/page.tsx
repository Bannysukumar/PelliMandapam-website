"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Star, Check, X } from "lucide-react";
import { mandapams } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function ComparePage() {
  const items = mandapams.slice(0, 3);

  const features = [
    { label: "Price / Day", getValue: (m: (typeof items)[0]) => formatCurrency(m.pricePerDay) },
    { label: "Capacity", getValue: (m: (typeof items)[0]) => `${m.capacity} guests` },
    { label: "City", getValue: (m: (typeof items)[0]) => m.city },
    { label: "Rating", getValue: (m: (typeof items)[0]) => `${m.rating} / 5` },
    { label: "AC Halls", getValue: (m: (typeof items)[0]) => m.amenities.includes("AC Halls") },
    { label: "Parking", getValue: (m: (typeof items)[0]) => m.amenities.includes("Parking") },
    { label: "Catering", getValue: (m: (typeof items)[0]) => m.amenities.includes("In-house Catering") },
    { label: "Rooms", getValue: (m: (typeof items)[0]) => m.amenities.includes("Bridal Suite") },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/mandapams">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Compare Mandapams</h1>
          <p className="text-sm text-muted-foreground">
            Side by side comparison of {items.length} venues
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">Feature</TableHead>
              {items.map((m) => (
                <TableHead key={m.id} className="min-w-[180px] text-center">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{m.name}</p>
                    <div className="flex items-center justify-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {m.rating}
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.label}>
                <TableCell className="font-medium">{feature.label}</TableCell>
                {items.map((m) => {
                  const val = feature.getValue(m);
                  return (
                    <TableCell key={m.id} className="text-center">
                      {typeof val === "boolean" ? (
                        val ? (
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        )
                      ) : (
                        val
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((m) => (
          <Button key={m.id} asChild className="w-full">
            <Link href={`/mandapams/${m.id}/book`}>
              Book {m.name.split(" ")[0]}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
