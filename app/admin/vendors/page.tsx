"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CheckCircle2,
  XCircle,
  Ban,
  Mail,
  Building2,
} from "lucide-react";
import { vendors } from "@/lib/mock-data";

export default function AdminVendorsPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = vendors.filter((v) => {
    const matchesTab =
      tab === "all" || v.verificationStatus === tab;
    const matchesSearch = v.businessName
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        <p className="text-muted-foreground">
          Verify, manage, and monitor vendor accounts
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({vendors.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Mandapams</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                              {vendor.businessName
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium">
                                {vendor.businessName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {vendor.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{vendor.city}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                            {vendor.mandapamCount}
                          </div>
                        </TableCell>
                        <TableCell>{vendor.totalBookings}</TableCell>
                        <TableCell className="font-medium">
                          Rs. {(vendor.totalRevenue / 100000).toFixed(1)}L
                        </TableCell>
                        <TableCell>{vendor.rating.toFixed(1)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              vendor.verificationStatus === "verified"
                                ? "default"
                                : vendor.verificationStatus === "pending"
                                ? "secondary"
                                : "destructive"
                            }
                            className="text-xs"
                          >
                            {vendor.verificationStatus}
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> View Profile
                              </DropdownMenuItem>
                              {vendor.verificationStatus === "pending" && (
                                <>
                                  <DropdownMenuItem className="text-primary">
                                    <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <XCircle className="mr-2 h-4 w-4" />{" "}
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" /> Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Ban className="mr-2 h-4 w-4" /> Suspend
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No vendors found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
