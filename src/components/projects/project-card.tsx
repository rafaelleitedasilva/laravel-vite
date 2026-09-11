"use client";

import { type PointerEvent as ReactPointerEvent, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ProjectPlanet } from "@/components/projects/project-planet";
import { spring } from "@/lib/motion";
import { useFinePointer } from "@/hooks/useMediaQuery";

/**
 * Nem todo projeto tem captura de tela (ou está online pra tirar uma) — em
 * vez de misturar cards com/sem imagem, nenhum projeto mostra screenshot.
 * A capa é sempre um planeta único, gerado a partir do slug (ProjectPlanet).
 */
function CoverFrame({ slug }: { slug: string }) {
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border bg-bg-elev-2">
      <span aria-hidden="true" className="modal-motif-stars absolute inset-0" />
      <ProjectPlanet
        seed={slug}
        size={28}
        className="transition-transform duration-500 group-hover:scale-110"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"
      />
    </div>
  );
}

const TILT_DEGREES = 7;

export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project, trigger: HTMLElement) => void;
}) {
  const canTilt = useFinePointer();
  const cardRef = useRef<HTMLButtonElement>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, spring.cursor);
  const rotateY = useSpring(rawRotateY, spring.cursor);

  function onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * TILT_DEGREES * 2);
    rawRotateX.set(py * -TILT_DEGREES * 2);
  }

  function onPointerLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={(e) => onSelect(project, e.currentTarget)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-haspopup="dialog"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={spring.snappy}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      className="group flex w-full flex-1 flex-col overflow-hidden rounded-lg border border-border bg-bg-elev text-left transition-colors hover:border-border-strong"
    >
      <CoverFrame slug={project.slug} />
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
