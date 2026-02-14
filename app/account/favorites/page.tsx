"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { mandapams } from "@/lib/mock-data";
import { MandapamCard } from "@/components/shared/mandapam-card";

export default function FavoritesPage() {
  const favorites = mandapams.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-muted-foreground">
          Mandapams you have saved for later
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {favorites.map((m) => (
            <MandapamCard key={m.id} mandapam={m} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="font-medium">No favorites yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Save mandapams you like to compare them later
            </p>
            <Button className="mt-4" asChild>
              <Link href="/mandapams">Browse Mandapams</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
