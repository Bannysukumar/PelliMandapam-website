"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sravani & Venkat",
    location: "Hyderabad",
    text: "We found the perfect mandapam within minutes. The Gold Package at Sri Lakshmi was incredible - everything was handled flawlessly. Our guests are still talking about the event!",
    rating: 5,
  },
  {
    name: "Priya & Karthik",
    location: "Vijayawada",
    text: "Transparent pricing and real photos made our decision so much easier. The booking process was smooth, and the vendor was very responsive. Highly recommend PelliMandapam!",
    rating: 5,
  },
  {
    name: "Deepika & Ravi",
    location: "Visakhapatnam",
    text: "As a family from the US planning a destination wedding, this platform was a lifesaver. We could compare venues, see reviews, and book everything online. The Annapurna Grand was stunning!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <div className="text-center">
        <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
          Loved by Families
        </h2>
        <p className="mt-2 text-muted-foreground">
          Real stories from real couples
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-full border bg-card">
              <CardContent className="flex h-full flex-col p-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t.text}
                </p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3 border-t pt-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {t.name
                        .split(" ")[0]
                        .charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
