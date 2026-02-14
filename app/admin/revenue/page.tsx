"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Wallet,
} from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { formatCurrency } from "@/lib/format";

const revenueKpis = [
  {
    title: "Total Platform Revenue",
    value: "₹42,50,000",
    change: 24,
    changeLabel: "vs last month",
    sparklineData: [32, 35, 36, 38, 40, 41, 42.5],
  },
  {
    title: "Commission Earned",
    value: "₹4,25,000",
    change: 18,
    changeLabel: "vs last month",
    sparklineData: [3.2, 3.4, 3.5, 3.7, 3.9, 4.0, 4.25],
  },
  {
    title: "Vendor Payouts",
    value: "₹38,25,000",
    change: 26,
    changeLabel: "vs last month",
    sparklineData: [28, 30, 32, 34, 36, 37, 38.25],
  },
  {
    title: "Avg Transaction",
    value: "₹95,000",
    change: 5,
    changeLabel: "vs last month",
    sparklineData: [88, 90, 91, 92, 93, 94, 95],
  },
];

const monthlyBreakdown = [
  { month: "Jan 2026", bookings: 89, revenue: 845000, commission: 84500, payouts: 760500 },
  { month: "Dec 2025", bookings: 145, revenue: 1377500, commission: 137750, payouts: 1239750 },
  { month: "Nov 2025", bookings: 112, revenue: 1064000, commission: 106400, payouts: 957600 },
  { month: "Oct 2025", bookings: 98, revenue: 931000, commission: 93100, payouts: 837900 },
  { month: "Sep 2025", bookings: 76, revenue: 722000, commission: 72200, payouts: 649800 },
  { month: "Aug 2025", bookings: 54, revenue: 513000, commission: 51300, payouts: 461700 },
];

export default function AdminRevenuePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Revenue & Payouts</h1>
          <p className="text-muted-foreground">
            Financial overview of the platform
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Financial Report
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {revenueKpis.map((kpi, index) => (
          <KPICard key={kpi.title} data={kpi} index={index} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monthly Breakdown</CardTitle>
          <CardDescription>Revenue and payouts by month</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Gross Revenue</TableHead>
                  <TableHead>Commission (10%)</TableHead>
                  <TableHead>Vendor Payouts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyBreakdown.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell>{row.bookings}</TableCell>
                    <TableCell>{formatCurrency(row.revenue)}</TableCell>
                    <TableCell className="text-primary font-medium">
                      {formatCurrency(row.commission)}
                    </TableCell>
                    <TableCell>{formatCurrency(row.payouts)}</TableCell>
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
