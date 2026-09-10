/** Tiny classnames helper (no clsx dependency). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const MONTHS_PT = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

/** "2024-03-21" -> "mar 2024" */
export function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-");
  const idx = Number(month) - 1;
  const label = MONTHS_PT[idx] ?? month;
  return `${label} ${year}`;
}

/** Human range for an experience item. */
export function formatDateRange(start: string, end: string | null): string {
  return `${formatMonthYear(start)} — ${end ? formatMonthYear(end) : "atual"}`;
}

/** Escape a string for safe interpolation into an HTML document. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
