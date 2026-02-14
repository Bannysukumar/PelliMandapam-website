"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MandapamCard } from "@/components/shared/mandapam-card";
import { mandapams } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export function FeaturedMandapams() {
  const featured = mandapams.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-balance text-2xl font-bold text-foreground">Featured Venues</h2>
          <p className="mt-1 text-muted-foreground">
            Hand-picked premium wedding mandapams
          </p>
        </div>
        <Link href="/mandapams">
          <Button variant="ghost" className="gap-1 text-primary hover:text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((m, i) => (
          <MandapamCard key={m.id} mandapam={m} index={i} />
        ))}
      </div>
    </section>
  );
}
