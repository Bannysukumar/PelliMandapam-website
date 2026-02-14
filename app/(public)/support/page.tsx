"use client";

import { Phone, Mail, MessageSquare, Clock, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { faqs } from "@/lib/mock-data";

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-balance text-3xl font-bold text-foreground">How Can We Help?</h1>
        <p className="mt-2 text-muted-foreground">
          Find answers or reach out to our support team
        </p>
      </div>

      {/* Contact Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: Phone,
            title: "Call Us",
            detail: "+91 1800-123-4567",
            sub: "Toll Free, Mon-Sat 9AM-8PM",
          },
          {
            icon: Mail,
            title: "Email Us",
            detail: "support@pellimandapam.com",
            sub: "We respond within 24 hours",
          },
          {
            icon: MessageSquare,
            title: "Live Chat",
            detail: "Chat with us",
            sub: "Available during business hours",
          },
        ].map((c) => (
          <Card key={c.title} className="border bg-card text-center">
            <CardContent className="flex flex-col items-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <c.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-3 font-semibold text-card-foreground">{c.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{c.detail}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12" id="faq">
        <h2 className="text-center text-xl font-bold text-foreground">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-6">
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
      </div>

      {/* Support Ticket Form */}
      <Card className="mt-12 border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-primary" />
            Submit a Support Ticket
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking">Booking Issue</SelectItem>
                  <SelectItem value="payment">Payment / Refund</SelectItem>
                  <SelectItem value="vendor">Vendor Complaint</SelectItem>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="bookingId">Booking ID (optional)</Label>
              <Input id="bookingId" placeholder="e.g., B-12345" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="message">Describe your issue</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue in detail..."
                className="min-h-[120px]"
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full sm:w-auto">
                Submit Ticket
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
