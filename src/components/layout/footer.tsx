import Link from "next/link";
import { getProfile } from "@/lib/content";
import { ExternalLink } from "@/components/ui/external-link";

export function Footer() {
  const profile = getProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-dim">
          © {year} {profile.name}. Todos os direitos reservados.
        </p>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/#trabalhos" className="text-text-dim hover:text-text">
            Trabalhos
          </Link>
          <Link href="/#contato" className="text-text-dim hover:text-text">
            Contato
          </Link>
          {profile.socials.map((s) => (
            <ExternalLink key={s.href} href={s.href} showIcon={false}>
              {s.label}
            </ExternalLink>
          ))}
        </nav>
      </div>
      <div className="container-page mt-6">
        <p className="font-mono text-xs text-text-dim">
          Next.js · hospedado na Vercel
        </p>
      </div>
    </footer>
  );
}
