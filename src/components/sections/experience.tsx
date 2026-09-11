"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Planet } from "@/components/ui/planet";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { getExperience } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";
import { ease, spring, stagger, viewportOnce } from "@/lib/motion";

export function Experience() {
  const items = getExperience();

  return (
    <Section id="experiencia" label="experiencia" title="Trajetória profissional">
      <div className="relative">
        {/* trilho — desenha uma vez, ao entrar na tela (sem listener de scroll contínuo) */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-[13.5px] top-0 w-px origin-top bg-gradient-to-b from-border-strong via-border-strong to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: ease.emphasized }}
        />

        <StaggerGroup as="ol" gap={stagger.loose} className="space-y-10">
          {items.map((item, i) => {
            const isCurrent = i === 0 && item.end === null;
            return (
              <StaggerItem
                key={`${item.company}-${item.start}`}
                as="li"
                shape={i % 2 === 0 ? "left" : "right"}
                slow
                className="relative pl-12"
              >
                <motion.div
                  className="absolute left-0 top-0.5"
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ ...spring.soft, delay: 0.15 + i * 0.05 }}
                >
                  {isCurrent ? (
                    <span
                      aria-hidden="true"
                      className="planet-pulse absolute inset-0 rounded-full border border-accent"
                    />
                  ) : null}
                  <Planet index={i} />
                </motion.div>

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
                  <ul className="mt-3 space-y-1">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="pl-5 text-sm text-text-dim [text-indent:-1.15em]"
                      >
                        <span aria-hidden="true" className="mr-1.5">
                          ·
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}
