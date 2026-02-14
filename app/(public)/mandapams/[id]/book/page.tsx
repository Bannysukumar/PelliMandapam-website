"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  CreditCard,
  CheckCircle2,
  Shield,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { mandapams } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const mandapam = mandapams.find((m) => m.id === id) || mandapams[0];
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("full");

  const venueCharge = mandapam.pricePerDay;
  const serviceTax = Math.round(venueCharge * 0.18);
  const total = venueCharge + serviceTax;
  const advanceAmount = Math.round(total * 0.3);

  function handleConfirm() {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 2000);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/mandapams/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Book {mandapam.name}</h1>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {["Event Details", "Guest Info", "Payment", "Confirmation"].map(
          (label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                  step > i + 1
                    ? "bg-primary text-primary-foreground"
                    : step === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > i + 1 ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`hidden text-xs sm:inline ${
                  step === i + 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < 3 && (
                <div
                  className={`h-0.5 w-6 sm:w-10 ${
                    step > i + 1 ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          )
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Step 1: Event Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>
                  Tell us about your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select defaultValue="wedding">
                    <SelectTrigger id="event-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding Ceremony</SelectItem>
                      <SelectItem value="reception">Reception</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="mehendi">Mehendi / Haldi</SelectItem>
                      <SelectItem value="other">Other Function</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Event Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="event-date"
                        type="date"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Expected Guests</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="guests"
                        type="number"
                        placeholder="500"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special-requests">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Any dietary preferences, decoration themes, music requirements..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={() => setStep(2)}>Continue</Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Guest Info */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Who is this booking for?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Full name"
                      defaultValue="Ramesh Sharma"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      defaultValue="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    defaultValue="ramesh@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt-contact">
                    Alternate Contact (Optional)
                  </Label>
                  <Input
                    id="alt-contact"
                    type="tel"
                    placeholder="+91 98765 43211"
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>Continue</Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Choose your payment option</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-start gap-3 rounded-lg border p-4">
                    <RadioGroupItem value="full" id="full" className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor="full" className="cursor-pointer font-medium">
                        Pay Full Amount
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(total)} - No balance due
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Recommended
                    </Badge>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border p-4">
                    <RadioGroupItem
                      value="advance"
                      id="advance"
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="advance"
                        className="cursor-pointer font-medium"
                      >
                        Pay 30% Advance
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(advanceAmount)} now, rest before event
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Payment Method</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-lg border p-3 bg-accent/50">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">UPI / Net Banking</p>
                        <p className="text-xs text-muted-foreground">
                          GPay, PhonePe, Paytm
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Credit / Debit Card</p>
                        <p className="text-xs text-muted-foreground">
                          Visa, Mastercard, RuPay
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleConfirm} disabled={isSubmitting}>
                  {isSubmitting
                    ? "Processing..."
                    : `Pay ${formatCurrency(
                        paymentMethod === "full" ? total : advanceAmount
                      )}`}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <Card className="text-center">
              <CardContent className="py-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">Booking Confirmed!</h2>
                <p className="mb-6 text-muted-foreground">
                  Your booking at {mandapam.name} has been confirmed.
                  <br />A confirmation email has been sent to your email.
                </p>
                <div className="mx-auto mb-6 max-w-xs rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-mono text-lg font-bold">BK-2026-0042</p>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button asChild>
                    <Link href="/account">View My Bookings</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/mandapams">Browse More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-16 w-16 shrink-0 rounded-lg bg-muted" />
                <div>
                  <p className="font-medium leading-tight">{mandapam.name}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {mandapam.city}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Venue Charge</span>
                  <span>{formatCurrency(venueCharge)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Tax (18%)</span>
                  <span>{formatCurrency(serviceTax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
                {step === 3 && paymentMethod === "advance" && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Due Now (30%)</span>
                    <span className="font-medium">
                      {formatCurrency(advanceAmount)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              Your payment is secured. Free cancellation up to 7 days before the
              event date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
