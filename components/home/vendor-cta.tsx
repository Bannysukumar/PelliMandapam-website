"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Shield } from "lucide-react";

export function VendorCTA() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/85 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-balance text-2xl font-bold text-primary-foreground md:text-3xl">
            Own a Wedding Venue? List It Here
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-primary-foreground/80">
            Join 150+ verified vendors and reach thousands of families looking for their perfect mandapam. Free listing, transparent commissions.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
              <TrendingUp className="h-5 w-5" />
              3x More Bookings
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
              <Users className="h-5 w-5" />
              10,000+ Monthly Visitors
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
              <Shield className="h-5 w-5" />
              Secure Payouts
            </div>
          </div>
          <Link href="/vendor/dashboard" className="mt-8 inline-block">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 rounded-full text-secondary-foreground"
            >
              List Your Venue <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
