import { cn } from "@/lib/utils";

/** Miniaturas de planetas para os marcadores da timeline de experiência. */
const VARIANTS = [
  { cls: "planet--ring", size: 26 },
  { cls: "planet--crater", size: 20 },
  { cls: "", size: 24 },
  { cls: "planet--crater", size: 18 },
  { cls: "planet--ring", size: 22 },
] as const;

export function Planet({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const v = VARIANTS[index % VARIANTS.length]!;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-7 shrink-0 items-center justify-center",
        className,
      )}
    >
      <span
        className={cn("planet", v.cls)}
        style={{ width: v.size, height: v.size }}
      />
    </span>
  );
}
