import type React from "react";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const auditBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset gap-1",
  {
    variants: {
      variant: {
        success: "bg-green-50 text-green-700 ring-green-600/20",
        fail: "bg-red-50 text-red-700 ring-red-600/20",
        unknown: "bg-gray-50 text-gray-700 ring-gray-600/20",
      },
    },
    defaultVariants: {
      variant: "unknown",
    },
  }
);

export interface AuditBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof auditBadgeVariants> {
  result: "success" | "fail" | "unknown";
}

export function AuditBadge({ className, variant, result = "unknown", ...props }: AuditBadgeProps) {
  // Use the result prop to determine the variant if variant is not explicitly provided
  const badgeVariant = variant || result;

  return (
    <span className={cn(auditBadgeVariants({ variant: badgeVariant }), className)} {...props}>
      {badgeVariant === "success" && <CheckCircle2 className="h-3.5 w-3.5" />}
      {badgeVariant === "fail" && <XCircle className="h-3.5 w-3.5" />}
      {badgeVariant === "unknown" && <HelpCircle className="h-3.5 w-3.5" />}
      {props.children || badgeVariant.charAt(0).toUpperCase() + badgeVariant.slice(1)}
    </span>
  );
}
