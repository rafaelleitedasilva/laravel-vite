import { Section } from "@/components/ui/section";
import { Planet } from "@/components/ui/planet";
import { getExperience } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";

export function Experience() {
  const items = getExperience();

  return (
    <Section id="experiencia" label="experiencia" title="Trajetória profissional">
      <ol className="space-y-10">
        {items.map((item, i) => (
          <li key={`${item.company}-${item.start}`} className="relative pl-12">
            {i < items.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-[13.5px] top-8 bottom-[-2.5rem] w-px bg-gradient-to-b from-border-strong to-transparent"
              />
            ) : null}
            <Planet index={i} className="absolute left-0 top-0.5" />

            <p className="font-mono text-xs text-text-dim">
              <time dateTime={item.start}>
                {formatDateRange(item.start, item.end)}
              </time>
              {" · "}
              {item.location}
            </p>
            <h3 className="mt-1 text-lg font-medium">{item.role}</h3>
            <p className="text-text-dim">{item.company}</p>
            {item.highlights.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text-dim">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
