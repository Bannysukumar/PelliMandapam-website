"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  PlusCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Users,
  Star,
  IndianRupee,
  ToggleRight,
} from "lucide-react";
import { mandapams } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function VendorMandapamsPage() {
  const vendorMandapams = mandapams.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Mandapams</h1>
          <p className="text-muted-foreground">
            Manage your venue listings
          </p>
        </div>
        <Button asChild>
          <Link href="/vendor/mandapams/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Mandapam
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {vendorMandapams.map((m, i) => (
          <Card key={m.id} className="overflow-hidden">
            <div className="relative h-40 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="h-12 w-12 text-muted-foreground/30" />
              </div>
              <div className="absolute right-2 top-2">
                <Badge
                  variant={i < 3 ? "default" : "secondary"}
                  className="text-xs"
                >
                  {i < 3 ? "Active" : "Draft"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {m.city}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/mandapams/${m.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Public Page
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/vendor/mandapams/${m.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ToggleRight className="mr-2 h-4 w-4" />{" "}
                      {i < 3 ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-muted p-2">
                  <Users className="mx-auto mb-1 h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">{m.capacity}</span>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <Star className="mx-auto mb-1 h-3.5 w-3.5 text-primary" />
                  <span className="font-medium">{m.rating}</span>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <IndianRupee className="mx-auto mb-1 h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">
                    {(m.pricePerDay / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
