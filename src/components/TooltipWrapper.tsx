import React, { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface TooltipWrapperProps {
  /**
   * The icon to display
   */
  children: ReactNode;
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * Additional classes to apply to the icon
   */
  className?: string;
  /**
   * Side of the tooltip
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Alignment of the tooltip
   */
  align?: "start" | "center" | "end";
  /**
   * Whether the tooltip should be shown
   */
  showTooltip?: boolean;
  /**
   * Additional props to pass to the icon
   */
  iconProps?: React.ComponentProps<LucideIcon>;
}

export function TooltipWrapper({
  children,
  content,
  className = "",
  side = "top",
  align = "center",
  showTooltip = true,
  iconProps = {},
  ...props
}: TooltipWrapperProps) {
  // If tooltip is disabled, just render the icon
  if (!showTooltip) {
    return children;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          <Button variant="ghost" size="icon" className="rounded-full w-auto h-auto [&_svg]:size-5">
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align} {...props} className={className}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
