"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Mail, Phone, MapPin, FileText } from "lucide-react";

export default function VendorRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/vendor/dashboard");
    }, 1500);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-primary">PelliMandapam</h1>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Register your venue and reach thousands of customers
          </p>
        </div>

        {/* Progress steps */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <div
            className={`h-0.5 w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`}
          />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Tell us about your mandapam business
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleNext}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="business-name"
                      placeholder="Sri Lakshmi Mandapam"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="business-email"
                      type="email"
                      placeholder="business@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="business-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="vijayawada">Vijayawada</SelectItem>
                      <SelectItem value="visakhapatnam">
                        Visakhapatnam
                      </SelectItem>
                      <SelectItem value="tirupati">Tirupati</SelectItem>
                      <SelectItem value="warangal">Warangal</SelectItem>
                      <SelectItem value="guntur">Guntur</SelectItem>
                      <SelectItem value="rajahmundry">Rajahmundry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      placeholder="Full address with landmark"
                      className="min-h-[80px] pl-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
              <CardDescription>
                Upload documents for verification (demo mode)
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="gst"
                      placeholder="22AAAAA0000A1Z5"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input id="pan" placeholder="ABCDE1234F" required />
                </div>
                <div className="space-y-2">
                  <Label>Property Ownership Proof</Label>
                  <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Upload document (demo)
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Fire Safety Certificate</Label>
                  <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Upload document (demo)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="vendor-terms"
                    checked={agreed}
                    onCheckedChange={(c) => setAgreed(c === true)}
                  />
                  <Label
                    htmlFor="vendor-terms"
                    className="text-sm font-normal leading-relaxed"
                  >
                    I certify that all information provided is accurate and I
                    agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Vendor Terms
                    </Link>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading || !agreed}
                >
                  {isLoading ? "Submitting..." : "Submit for Review"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
