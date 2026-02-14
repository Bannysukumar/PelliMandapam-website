"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MandapamCard } from "@/components/shared/mandapam-card";
import { mandapams, cities } from "@/lib/mock-data";

const amenityFilters = ["AC", "Catering", "Decoration", "DJ", "Photography", "Parking", "Garden"];

function FilterSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">City</h3>
        <div className="flex flex-col gap-2">
          {cities.slice(0, 6).map((city) => (
            <label key={city} className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox />
              {city}
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Capacity</h3>
        <div className="flex flex-col gap-2">
          {["Up to 200", "200-500", "500-1000", "1000+"].map((cap) => (
            <label key={cap} className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox />
              {cap} guests
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Budget (per slot)</h3>
        <div className="flex flex-col gap-2">
          {["Under ₹1L", "₹1L - 2L", "₹2L - 5L", "₹5L+"].map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox />
              {b}
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Amenities</h3>
        <div className="flex flex-col gap-2">
          {amenityFilters.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox />
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MandapamsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Hyderabad", "AC"]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Top Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name, area, city..." className="h-10 pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="recommended">
            <SelectTrigger className="h-10 w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden items-center rounded-lg border bg-card p-1 md:flex">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
          {/* Mobile filter trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto pb-20">
                <FilterSidebar />
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t bg-card p-4">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((f) => (
            <Badge
              key={f}
              variant="secondary"
              className="gap-1 rounded-full bg-accent text-accent-foreground"
            >
              {f}
              <button
                onClick={() => setActiveFilters((prev) => prev.filter((x) => x !== f))}
                className="ml-0.5"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {f} filter</span>
              </button>
            </Badge>
          ))}
          <button
            onClick={() => setActiveFilters([])}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="mt-6 flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <Card className="sticky top-20 border bg-card">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Filters</h2>
                <button className="text-xs text-primary hover:underline">Reset</button>
              </div>
              <FilterSidebar />
            </CardContent>
          </Card>
        </aside>

        {/* Listings */}
        <div className="flex-1">
          <p className="mb-4 text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{mandapams.length}</span> mandapams
          </p>
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {mandapams.map((m, i) => (
              <MandapamCard key={m.id} mandapam={m} index={i} />
            ))}
          </div>
          {/* Load more */}
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="gap-2 rounded-full">
              Load More Venues <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
