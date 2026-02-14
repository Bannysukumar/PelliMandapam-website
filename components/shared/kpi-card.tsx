"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { KPICard as KPICardType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface KPICardProps {
  data: KPICardType;
  index?: number;
}

export function KPICard({ data, index = 0 }: KPICardProps) {
  const isPositive = data.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="border bg-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{data.title}</p>
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                isPositive
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(data.change)}%
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-card-foreground">{data.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{data.changeLabel}</p>

          {/* Mini sparkline */}
          <div className="mt-3 flex items-end gap-1" style={{ height: 32 }}>
            {data.sparklineData.map((val, i) => {
              const max = Math.max(...data.sparklineData);
              const min = Math.min(...data.sparklineData);
              const range = max - min || 1;
              const height = ((val - min) / range) * 28 + 4;
              return (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-sm transition-all",
                    i === data.sparklineData.length - 1
                      ? "bg-primary"
                      : "bg-primary/20"
                  )}
                  style={{ height }}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
