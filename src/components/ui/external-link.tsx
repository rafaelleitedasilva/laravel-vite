import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-accent underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      {showIcon ? <ArrowUpRight className="size-4" aria-hidden="true" /> : null}
    </a>
  );
}
