import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="mono-label">/404</p>
      <h1 className="mt-3 text-3xl font-semibold">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-text-dim">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={buttonClass("primary", "md")}>
          Início
        </Link>
        <Link href="/#trabalhos" className={buttonClass("secondary", "md")}>
          Ver trabalhos
        </Link>
      </div>
    </Container>
  );
}
