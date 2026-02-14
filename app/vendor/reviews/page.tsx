"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { reviews } from "@/lib/mock-data";
import { KPICard } from "@/components/shared/kpi-card";

const reviewStats = [
  {
    title: "Average Rating",
    value: "4.6",
    change: 0.2,
    changeLabel: "vs last month",
    sparklineData: [4.4, 4.5, 4.5, 4.5, 4.6, 4.6, 4.6],
  },
  {
    title: "Total Reviews",
    value: "156",
    change: 12,
    changeLabel: "vs last month",
    sparklineData: [120, 132, 138, 142, 148, 152, 156],
  },
  {
    title: "Response Rate",
    value: "94%",
    change: 3,
    changeLabel: "vs last month",
    sparklineData: [88, 90, 91, 92, 93, 94, 94],
  },
];

export default function VendorReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-muted-foreground">
          Customer feedback and ratings for your mandapams
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {reviewStats.map((stat, index) => (
          <KPICard key={stat.title} data={stat} index={index} />
        ))}
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = rating === 5 ? 78 : rating === 4 ? 45 : rating === 3 ? 20 : rating === 2 ? 8 : 5;
              const pct = Math.round((count / 156) * 100);
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex w-12 items-center gap-1 text-sm">
                    {rating}{" "}
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="font-semibold">Recent Reviews</h2>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold">
                    {review.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {review.mandapamName}
                </Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
              {review.vendorReply ? (
                <div className="mt-3 rounded-lg bg-muted p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Your Reply
                  </p>
                  <p className="mt-1 text-sm">{review.vendorReply}</p>
                </div>
              ) : (
                <div className="mt-3">
                  <Textarea
                    placeholder="Write a reply to this review..."
                    className="min-h-[60px] text-sm"
                  />
                  <Button size="sm" className="mt-2">
                    Reply
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
