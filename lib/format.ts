export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-warning/15 text-warning-foreground border-warning/30",
    CONFIRMED: "bg-success/15 text-success border-success/30",
    COMPLETED: "bg-primary/15 text-primary border-primary/30",
    CANCELLED: "bg-destructive/15 text-destructive border-destructive/30",
    REFUNDED: "bg-muted text-muted-foreground border-border",
    IN_PROGRESS: "bg-accent text-accent-foreground border-accent-foreground/20",
    APPROVED: "bg-success/15 text-success border-success/30",
    REJECTED: "bg-destructive/15 text-destructive border-destructive/30",
    SUSPENDED: "bg-destructive/15 text-destructive border-destructive/30",
    DRAFT: "bg-muted text-muted-foreground border-border",
    OPEN: "bg-warning/15 text-warning-foreground border-warning/30",
    RESOLVED: "bg-success/15 text-success border-success/30",
    CLOSED: "bg-muted text-muted-foreground border-border",
  };
  return colors[status] || "bg-muted text-muted-foreground border-border";
}
