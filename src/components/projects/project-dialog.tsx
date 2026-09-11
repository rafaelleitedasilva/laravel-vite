"use client";

import { useEffect, useId, useRef } from "react";
import { motion } from "motion/react";
import { X, Github, Sparkle, ExternalLink as ExternalLinkIcon } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button";
import { duration, ease, spring, transition as motionTransition } from "@/lib/motion";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const panel = panelRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/90 p-4 sm:p-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.fast, ease: ease.out }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto w-full max-w-2xl rounded-xl border border-border bg-bg-elev shadow-md"
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={spring.soft}
      >
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-md bg-bg/80 text-text-dim hover:text-text"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {/* motivo espacial reduzido — não a captura de tela, só uma lembrança do conceito */}
        <div
          aria-hidden="true"
          className="relative flex h-20 items-center justify-center overflow-hidden rounded-t-xl border-b border-border bg-bg-elev-2 bg-[radial-gradient(70%_140%_at_50%_0%,rgba(233,236,240,0.14),transparent)]"
        >
          <span className="modal-motif-stars absolute inset-0" />
          <Sparkle className="size-5 text-accent" strokeWidth={1.5} />
        </div>

        <motion.div
          className="p-6 sm:p-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...motionTransition.entrance, delay: 0.08 }}
        >
          <p className="mono-label">{project.corp ?? "Projeto pessoal"}</p>
          <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight">
            {project.name}
          </h2>

          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {project.role ? (
              <div>
                <dt className="text-text-dim">Papel</dt>
                <dd>{project.role}</dd>
              </div>
            ) : null}
            {project.year ? (
              <div>
                <dt className="text-text-dim">Ano</dt>
                <dd>{project.year}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-5 space-y-4 leading-relaxed text-text-dim">
            {project.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium text-text-dim">Tecnologias</h3>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          </div>

          {project.demo || project.repository ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("primary", "sm")}
                >
                  <ExternalLinkIcon className="size-4" aria-hidden="true" /> Ver online
                </a>
              ) : null}
              {project.repository ? (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("secondary", "sm")}
                >
                  <Github className="size-4" aria-hidden="true" /> Código
                </a>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
