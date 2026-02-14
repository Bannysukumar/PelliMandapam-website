"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Eye,
  Ban,
  Star,
  CheckCircle2,
  XCircle,
  MapPin,
} from "lucide-react";
import { mandapams } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function AdminMandapamsPage() {
  const [search, setSearch] = useState("");

  const filtered = mandapams.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mandapam Listings</h1>
        <p className="text-muted-foreground">
          Review and manage all venue listings on the platform
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mandapam</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price / Day</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m, i) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{m.vendorName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {m.city}
                      </div>
                    </TableCell>
                    <TableCell>{m.capacity}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(m.pricePerDay)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        {m.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={i < 6 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {i < 6 ? "Active" : "Under Review"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/mandapams/${m.id}`}>
                              <Eye className="mr-2 h-4 w-4" /> View Public Page
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-primary">
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="mr-2 h-4 w-4" /> Suspend Listing
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
