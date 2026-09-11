"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/components/layout/nav-items";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";
import { stagger, transition as motionTransition } from "@/lib/motion";

export function Header() {
  const [open, setOpen] = useState(false);
  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);
  const active = useActiveSection(sectionIds);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            rafael<span className="text-accent">.</span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-2.5 py-2 text-sm text-text-dim transition-colors hover:text-text",
                      active === item.id && "text-text",
                    )}
                  >
                    {item.label}
                    {/* indicador da seção atual — CSS puro, sem tracking de layout */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-2 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ease-out",
                        active === item.id ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/#contato"
            className={cn(buttonClass("secondary", "sm"), "hidden lg:inline-flex")}
          >
            Fale comigo
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-text-dim hover:text-text lg:hidden"
            aria-expanded={open}
            aria-controls={open ? "mobile-menu" : undefined}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-bg lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={motionTransition.micro}
          >
            <motion.nav
              ref={panelRef}
              aria-label="Navegação móvel"
              className="container-page py-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: stagger.tight } } }}
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={motionTransition.entrance}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-md px-3 py-3 text-lg text-text-dim hover:bg-bg-elev hover:text-text"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
