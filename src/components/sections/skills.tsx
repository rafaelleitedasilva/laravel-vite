import { Section } from "@/components/ui/section";
import { getSkills } from "@/lib/content";
import { BadgeList } from "@/components/ui/badge";

export function Skills() {
  const groups = getSkills();

  return (
    <Section
      id="habilidades"
      label="habilidades"
      title="Tecnologias"
      intro="Stack que uso no dia a dia, por área."
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-medium text-text-dim">{group.title}</h3>
            <BadgeList items={group.items} label={group.title} />
          </div>
        ))}
      </div>
    </Section>
  );
}
