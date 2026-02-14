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
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Wallet,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { formatCurrency } from "@/lib/format";

const earningsKpis = [
  {
    title: "Total Earnings",
    value: "₹18,75,000",
    change: 22,
    changeLabel: "vs last month",
    sparklineData: [14, 16, 15, 18, 19, 20, 22],
  },
  {
    title: "This Month",
    value: "₹3,25,000",
    change: 8,
    changeLabel: "vs last month",
    sparklineData: [2.8, 3.0, 2.9, 3.1, 3.2, 3.2, 3.25],
  },
  {
    title: "Pending Payout",
    value: "₹1,50,000",
    change: 0,
    changeLabel: "Awaiting transfer",
    sparklineData: [1.2, 1.3, 1.4, 1.4, 1.5, 1.5, 1.5],
  },
  {
    title: "Available Balance",
    value: "₹4,25,000",
    change: 5,
    changeLabel: "vs last week",
    sparklineData: [3.8, 4.0, 4.1, 4.0, 4.2, 4.15, 4.25],
  },
];

const transactions = [
  {
    id: "TXN-001",
    date: "2026-02-10",
    booking: "BK-2026-0001",
    amount: 125000,
    commission: 12500,
    net: 112500,
    status: "paid",
  },
  {
    id: "TXN-002",
    date: "2026-02-08",
    booking: "BK-2026-0002",
    amount: 95000,
    commission: 9500,
    net: 85500,
    status: "paid",
  },
  {
    id: "TXN-003",
    date: "2026-02-05",
    booking: "BK-2026-0003",
    amount: 150000,
    commission: 15000,
    net: 135000,
    status: "pending",
  },
  {
    id: "TXN-004",
    date: "2026-02-01",
    booking: "BK-2026-0004",
    amount: 80000,
    commission: 8000,
    net: 72000,
    status: "paid",
  },
  {
    id: "TXN-005",
    date: "2026-01-28",
    booking: "BK-2026-0005",
    amount: 200000,
    commission: 20000,
    net: 180000,
    status: "paid",
  },
];

export default function VendorEarningsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Earnings</h1>
          <p className="text-muted-foreground">
            Track your revenue and payouts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Statement
          </Button>
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Request Payout
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {earningsKpis.map((kpi, index) => (
          <KPICard key={kpi.title} data={kpi} index={index} />
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Transaction History</CardTitle>
            <CardDescription>Recent payments and payouts</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Gross Amount</TableHead>
                  <TableHead>Commission (10%)</TableHead>
                  <TableHead>Net Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono text-xs">
                      {txn.id}
                    </TableCell>
                    <TableCell>
                      {new Date(txn.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {txn.booking}
                    </TableCell>
                    <TableCell>{formatCurrency(txn.amount)}</TableCell>
                    <TableCell className="text-destructive">
                      -{formatCurrency(txn.commission)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(txn.net)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          txn.status === "paid" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {txn.status === "paid" ? (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {txn.status === "paid" ? "Paid" : "Pending"}
                      </Badge>
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
