// ===== Core Types =====

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED"
  | "IN_PROGRESS";

export type VendorStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export type ListingStatus = "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "ARCHIVED";

export type UserRole = "USER" | "VENDOR" | "ADMIN";

export type SlotType = "MORNING" | "EVENING" | "FULL_DAY";

// ===== Models =====

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  logo?: string;
  coverImage?: string;
  description: string;
  city: string;
  state: string;
  status: VendorStatus;
  rating: number;
  reviewCount: number;
  totalBookings: number;
  joinedAt: string;
}

export interface Mandapam {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  city: string;
  area: string;
  state: string;
  address: string;
  capacity: number;
  parkingSlots: number;
  rooms: number;
  hasCatering: boolean;
  hasAC: boolean;
  hasDecoration: boolean;
  hasDJ: boolean;
  hasPhotography: boolean;
  rating: number;
  reviewCount: number;
  pricePerDay: number;
  pricePerSlot: number;
  status: ListingStatus;
  amenities: string[];
  policies: {
    cancellation: string;
    refund: string;
    timing: string;
  };
  createdAt: string;
}

export interface MandapamPackage {
  id: string;
  mandapamId: string;
  name: string;
  description: string;
  price: number;
  inclusions: string[];
  isPopular: boolean;
}

export interface TimeSlot {
  id: string;
  type: SlotType;
  label: string;
  startTime: string;
  endTime: string;
  available: boolean;
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  mandapamId: string;
  mandapamName: string;
  mandapamImage: string;
  vendorId: string;
  vendorName: string;
  packageId?: string;
  packageName?: string;
  date: string;
  slot: SlotType;
  slotLabel: string;
  guests: number;
  status: BookingStatus;
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  tax: number;
  createdAt: string;
  updatedAt: string;
  timeline: BookingTimelineEntry[];
}

export interface BookingTimelineEntry {
  id: string;
  status: string;
  message: string;
  timestamp: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  mandapamId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface StaffMember {
  id: string;
  vendorId: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  avatar?: string;
  addedAt: string;
}

export interface Dispute {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  subject: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
}

export interface KPICard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  sparklineData: number[];
}

export interface FAQ {
  question: string;
  answer: string;
}
