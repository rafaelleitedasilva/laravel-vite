"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Project, ProjectType } from "@/types";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { cn } from "@/lib/utils";

type Filter = "todos" | ProjectType;

const OPTIONS: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "corp", label: "Corporativo" },
  { value: "personal", label: "Pessoal" },
];

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (filter === "todos" ? projects : projects.filter((p) => p.type === filter)),
    [projects, filter],
  );

  function open(project: Project, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setSelected(project);
  }

  function close() {
    setSelected(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar projetos por tipo"
        className="mb-8 inline-flex rounded-md border border-border-strong p-1"
      >
        {OPTIONS.map((opt) => {
          const active = filter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(opt.value)}
              className={cn(
                "rounded px-3 py-1.5 text-sm transition-colors duration-200 active:scale-95",
                active ? "bg-accent text-accent-ink" : "text-text-dim hover:text-text",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* key={filter}: force a fresh mount (fresh IntersectionObserver) per
          filter — without it, StaggerGroup's whileInView only fires once,
          ever, and cards for a filter selected after the first one never
          get their own trigger and stay stuck invisible. */}
      <ProjectGrid key={filter} projects={filtered} onSelect={open} />

      <AnimatePresence>
        {selected ? (
          <ProjectDialog key={selected.slug} project={selected} onClose={close} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
