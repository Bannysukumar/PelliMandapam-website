"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/mock-data";

export function FAQSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <div className="text-center">
        <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need to know about booking
        </p>
      </div>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
