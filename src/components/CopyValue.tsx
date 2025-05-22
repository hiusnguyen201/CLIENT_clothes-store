"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CopyValueProps {
  value: string;
  displayValue?: string;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
  successDuration?: number;
  hiddenValue?: boolean;
}

export function CopyValue({
  value,
  displayValue,
  hiddenValue = false,
  className,
  buttonClassName,
  iconClassName,
  successDuration = 2000,
}: CopyValueProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator?.clipboard) {
      console.error("Clipboard not supported");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, successDuration);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      {!hiddenValue && <div className="flex-1 truncate font-mono text-sm">{displayValue || value}</div>}
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        className={cn("h-8 w-8", buttonClassName)}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? (
          <Check className={cn("h-4 w-4 text-green-500", iconClassName)} />
        ) : (
          <Copy className={cn("h-4 w-4", iconClassName)} />
        )}
        <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
      </Button>
    </div>
  );
}
