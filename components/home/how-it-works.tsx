"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search & Compare",
    description:
      "Browse verified mandapams by city, capacity, budget, and amenities. Compare packages side by side.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book & Pay Securely",
    description:
      "Check real-time availability, select your date and slot, choose a package, and pay securely online.",
  },
  {
    icon: PartyPopper,
    step: "03",
    title: "Celebrate Your Day",
    description:
      "Show up and enjoy your special day. Our vendors handle every detail so you can focus on making memories.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            How It Works
          </h2>
          <p className="mt-2 text-muted-foreground">
            Book your dream wedding venue in 3 simple steps
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">
                Step {s.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
