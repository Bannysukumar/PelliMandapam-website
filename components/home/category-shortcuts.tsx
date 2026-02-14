"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Wallet, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    icon: MapPin,
    label: "By City",
    description: "Hyderabad, Vijayawada, Vizag...",
    href: "/mandapams?filter=city",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    label: "By Capacity",
    description: "50 to 2000+ guests",
    href: "/mandapams?filter=capacity",
    color: "bg-success/10 text-success",
  },
  {
    icon: Wallet,
    label: "By Budget",
    description: "Under 1L to 5L+",
    href: "/mandapams?filter=budget",
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    icon: UtensilsCrossed,
    label: "By Services",
    description: "Catering, Decor, DJ...",
    href: "/mandapams?filter=services",
    color: "bg-chart-5/15 text-chart-5",
  },
];

export function CategoryShortcuts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <h2 className="text-balance text-2xl font-bold text-foreground">Browse by Category</h2>
      <p className="mt-1 text-muted-foreground">Find venues that match your requirements</p>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Link href={cat.href}>
              <Card className="group border bg-card transition-all hover:shadow-md hover:-translate-y-1">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${cat.color}`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{cat.label}</h3>
                    <p className="text-sm text-muted-foreground">{cat.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
