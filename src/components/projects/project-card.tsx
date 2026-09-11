"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { spring } from "@/lib/motion";

/** Moldura monocromática — trata as prévias de baixa resolução como estética. */
function CoverFrame({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-elev-2">
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover opacity-80 grayscale transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
          priority={priority}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(20rem_12rem_at_50%_0%,rgba(255,255,255,0.12),transparent)] font-mono text-6xl text-text-dim/40"
        >
          {project.name.charAt(0)}
        </span>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"
      />
    </div>
  );
}

export function ProjectCard({
  project,
  priority = false,
  onSelect,
}: {
  project: Project;
  priority?: boolean;
  onSelect: (project: Project, trigger: HTMLElement) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={(e) => onSelect(project, e.currentTarget)}
      aria-haspopup="dialog"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={spring.snappy}
      className="group flex w-full flex-1 flex-col overflow-hidden rounded-lg border border-border bg-bg-elev text-left transition-colors hover:border-border-strong"
    >
      <CoverFrame project={project} priority={priority} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="mono-label text-[0.7rem]">
            {project.corp ?? "Projeto pessoal"}
          </span>
          <ArrowUpRight
            className="size-4 text-text-dim transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-1 text-lg font-medium">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm text-text-dim">{project.shortDescription}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </motion.button>
  );
}
