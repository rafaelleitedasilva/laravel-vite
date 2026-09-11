"use client";

import { Section } from "@/components/ui/section";
import { getSkills } from "@/lib/content";
import { BadgeList } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { stagger } from "@/lib/motion";

export function Skills() {
  const groups = getSkills();

  return (
    <Section
      id="habilidades"
      label="habilidades"
      title="Tecnologias"
      intro="Stack que uso no dia a dia, por área."
    >
      <StaggerGroup
        as="div"
        gap={stagger.loose}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {groups.map((group) => (
          <StaggerItem key={group.title} as="div">
            <h3 className="mb-3 text-sm font-medium text-text-dim">{group.title}</h3>
            <BadgeList items={group.items} label={group.title} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
