"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, Users, Car, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Mandapam } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

interface MandapamCardProps {
  mandapam: Mandapam;
  index?: number;
}

export function MandapamCard({ mandapam, index = 0 }: MandapamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/mandapams/${mandapam.id}`}>
        <Card className="group overflow-hidden border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={mandapam.images[0]}
              alt={mandapam.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              {mandapam.hasAC && (
                <Badge className="bg-card/90 text-card-foreground text-xs backdrop-blur-sm border-0">
                  AC
                </Badge>
              )}
              {mandapam.hasCatering && (
                <Badge className="bg-card/90 text-card-foreground text-xs backdrop-blur-sm border-0">
                  Catering
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-4 w-4 text-card-foreground" />
              <span className="sr-only">Save venue</span>
            </Button>
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-primary text-primary-foreground text-xs border-0">
                Available
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-card-foreground">
                  {mandapam.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">
                    {mandapam.area}, {mandapam.city}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-accent px-2 py-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm font-semibold text-accent-foreground">{mandapam.rating}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {mandapam.capacity}
              </div>
              <div className="flex items-center gap-1">
                <Car className="h-3.5 w-3.5" />
                {mandapam.parkingSlots}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <div>
                <span className="text-xs text-muted-foreground">From</span>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(mandapam.pricePerSlot)}
                </p>
              </div>
              <Button size="sm" className="rounded-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
