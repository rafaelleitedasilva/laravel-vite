import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-bg-elev-2 px-2.5 py-1 font-mono text-xs text-text-dim transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BadgeList({
  items,
  label,
}: {
  items: string[];
  label?: string;
}) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Badge>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}
