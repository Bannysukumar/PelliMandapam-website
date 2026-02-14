"use client";

import { useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Users,
  Car,
  Bed,
  Share2,
  Heart,
  UtensilsCrossed,
  Wind,
  Palette,
  Music,
  Camera,
  Check,
  ChevronLeft,
  CalendarDays,
  Clock,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { mandapams, packages, reviews, timeSlots } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import { MandapamCard } from "@/components/shared/mandapam-card";

export default function MandapamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const mandapam = mandapams.find((m) => m.id === id) || mandapams[0];
  const mandapamPackages = packages.filter((p) => p.mandapamId === mandapam.id);
  const mandapamReviews = reviews.filter((r) => r.mandapamId === mandapam.id);
  const similarMandapams = mandapams.filter((m) => m.id !== mandapam.id).slice(0, 3);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const amenityIcons: Record<string, React.ElementType> = {
    "Central AC": Wind,
    AC: Wind,
    "In-house Catering": UtensilsCrossed,
    Catering: UtensilsCrossed,
    "Stage Decoration": Palette,
    Decoration: Palette,
    "Traditional Decor": Palette,
    "DJ & Sound": Music,
    "DJ & Lighting": Music,
    Photography: Camera,
    "Photo + Video": Camera,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Back Button */}
      <Link href="/mandapams">
        <Button variant="ghost" size="sm" className="mb-4 gap-1 text-muted-foreground">
          <ChevronLeft className="h-4 w-4" /> Back to Venues
        </Button>
      </Link>

      {/* Image Gallery */}
      <div className="grid gap-2 overflow-hidden rounded-2xl md:grid-cols-4 md:grid-rows-2" style={{ maxHeight: 420 }}>
        <div
          className="relative cursor-pointer md:col-span-2 md:row-span-2"
          onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}
        >
          <Image
            src={mandapam.images[0]}
            alt={mandapam.name}
            width={800}
            height={420}
            className="h-full w-full object-cover"
          />
        </div>
        {mandapam.images.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className="relative hidden cursor-pointer md:block"
            onClick={() => { setGalleryIndex(i + 1); setGalleryOpen(true); }}
          >
            <Image
              src={img}
              alt={`${mandapam.name} ${i + 2}`}
              width={400}
              height={210}
              className="h-full w-full object-cover"
            />
            {i === mandapam.images.length - 2 && mandapam.images.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 text-sm font-medium text-primary-foreground">
                +{mandapam.images.length - 4} more
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90"
            onClick={() => setGalleryOpen(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setGalleryOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close gallery</span>
            </Button>
            <Image
              src={mandapam.images[galleryIndex]}
              alt={mandapam.name}
              width={1200}
              height={800}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          {/* Title + Meta */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                {mandapam.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {mandapam.area}, {mandapam.city}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {mandapam.rating} ({mandapam.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
                <Heart className="h-4 w-4" /> Save
              </Button>
            </div>
          </div>

          {/* Highlights Strip */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Users, label: "Capacity", value: `${mandapam.capacity} guests` },
              { icon: Car, label: "Parking", value: `${mandapam.parkingSlots} slots` },
              { icon: Bed, label: "Rooms", value: `${mandapam.rooms} rooms` },
              { icon: UtensilsCrossed, label: "Catering", value: mandapam.hasCatering ? "Available" : "External" },
            ].map((h) => (
              <Card key={h.label} className="border bg-card">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <h.icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{h.label}</p>
                    <p className="text-sm font-semibold text-card-foreground">{h.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {mandapam.description}
              </p>
              <h3 className="mt-6 text-lg font-semibold text-foreground">Amenities</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {mandapam.amenities.map((a) => {
                  const Icon = amenityIcons[a] || Check;
                  return (
                    <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      {a}
                    </div>
                  );
                })}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-foreground">Vendor</h3>
              <Link href={`/vendors/${mandapam.vendorId}`}>
                <Card className="mt-3 border bg-card transition-colors hover:bg-accent/30">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {mandapam.vendorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-card-foreground">{mandapam.vendorName}</p>
                      <p className="text-sm text-muted-foreground">
                        Verified Vendor in {mandapam.city}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </TabsContent>

            <TabsContent value="packages" className="mt-6">
              <div className="grid gap-4 md:grid-cols-3">
                {(mandapamPackages.length > 0 ? mandapamPackages : packages).map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`relative cursor-pointer border transition-all ${
                      selectedPackage === pkg.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "bg-card hover:shadow-md"
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.isPopular && (
                      <Badge className="absolute -top-2.5 left-4 border-0 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{pkg.name}</CardTitle>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(pkg.price)}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-muted-foreground">{pkg.description}</p>
                      <ul className="flex flex-col gap-2">
                        {pkg.inclusions.map((inc) => (
                          <li key={inc} className="flex items-center gap-2 text-sm text-foreground">
                            <Check className="h-4 w-4 text-success" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-xl border bg-card"
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Select Time Slot</h3>
                  <div className="flex flex-col gap-3">
                    {timeSlots.map((slot) => (
                      <Card
                        key={slot.id}
                        className={`cursor-pointer border transition-all ${
                          selectedSlot === slot.id
                            ? "border-primary ring-2 ring-primary/20"
                            : slot.available
                            ? "bg-card hover:shadow-sm"
                            : "opacity-50"
                        }`}
                        onClick={() => slot.available && setSelectedSlot(slot.id)}
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                              <Clock className="h-5 w-5 text-accent-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-card-foreground">{slot.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {slot.startTime} - {slot.endTime}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{formatCurrency(slot.price)}</p>
                            <Badge variant={slot.available ? "secondary" : "outline"} className="mt-1 text-xs">
                              {slot.available ? "Available" : "Booked"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="flex flex-col gap-4">
                {(mandapamReviews.length > 0 ? mandapamReviews : reviews).map((r) => (
                  <Card key={r.id} className="border bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {r.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-card-foreground">{r.userName}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {r.comment}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="policies" className="mt-6">
              <div className="flex flex-col gap-4">
                {[
                  { title: "Cancellation Policy", text: mandapam.policies.cancellation },
                  { title: "Refund Policy", text: mandapam.policies.refund },
                  { title: "Timing", text: mandapam.policies.timing },
                ].map((p) => (
                  <Card key={p.title} className="border bg-card">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-card-foreground">{p.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Sidebar */}
        <aside className="hidden w-80 flex-shrink-0 lg:block">
          <Card className="sticky top-20 border bg-card shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(mandapam.pricePerSlot)}
                </span>
                <span className="text-sm text-muted-foreground">/ slot</span>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-card-foreground">
                    {selectedDate ? formatDate(selectedDate.toISOString()) : "Select date"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Slot</span>
                  <span className="font-medium text-card-foreground">
                    {selectedSlot
                      ? timeSlots.find((s) => s.id === selectedSlot)?.label
                      : "Select slot"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-medium text-card-foreground">
                    {selectedPackage
                      ? packages.find((p) => p.id === selectedPackage)?.name
                      : "Select package"}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Venue charges</span>
                  <span className="text-card-foreground">{formatCurrency(mandapam.pricePerSlot)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="text-card-foreground">{formatCurrency(mandapam.pricePerSlot * 0.18)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span className="text-card-foreground">Total</span>
                  <span className="text-primary">{formatCurrency(mandapam.pricePerSlot * 1.18)}</span>
                </div>
              </div>
              <Button size="lg" className="mt-5 w-full rounded-xl">
                Book Now
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                You won&apos;t be charged yet
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t bg-card p-3 md:bottom-0 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(mandapam.pricePerSlot)}
            </span>
            <span className="text-sm text-muted-foreground"> / slot</span>
          </div>
          <Button className="rounded-xl">Book Now</Button>
        </div>
      </div>

      {/* Similar Mandapams */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">Similar Venues</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similarMandapams.map((m, i) => (
            <MandapamCard key={m.id} mandapam={m} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
