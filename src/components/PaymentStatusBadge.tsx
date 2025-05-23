import { Check, Clock, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PAYMENT_STATUS } from "@/types/payment";

interface PaymentStatusBadgeProps {
  status: PAYMENT_STATUS;
  className?: string;
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const statusConfig = {
    [PAYMENT_STATUS.PENDING]: {
      label: "Pending",
      icon: Clock,
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    [PAYMENT_STATUS.PAID]: {
      label: "Paid",
      icon: Check,
      className: "bg-green-100 text-green-800 border-green-200",
    },
    [PAYMENT_STATUS.CANCELLED]: {
      label: "Cancelled",
      icon: X,
      className: "bg-red-100 text-red-800 border-red-200",
    },
    [PAYMENT_STATUS.REFUND]: {
      label: "Refunded",
      icon: RotateCcw,
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </div>
  );
}
