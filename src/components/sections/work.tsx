import { Section } from "@/components/ui/section";
import { getProjects } from "@/lib/content";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";

export function Work() {
  const projects = getProjects();

  return (
    <Section
      id="trabalhos"
      label="trabalhos"
      title="Projetos"
      intro="Uma seleção de trabalhos corporativos e pessoais. Clique para abrir os detalhes."
    >
      <ProjectsExplorer projects={projects} />
    </Section>
  );
}
