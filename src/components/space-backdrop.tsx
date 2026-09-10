/**
 * Campo de estrelas fixo atrás de todo o conteúdo — puro CSS (ver globals.css).
 * Uma camada estática de profundidade + uma camada de deriva lenta que usa só
 * `transform` (composta na GPU, sem repaint durante o scroll).
 */
export function SpaceBackdrop() {
  return (
    <div className="space-backdrop" aria-hidden="true">
      <div className="stars stars--depth" />
      <div className="stars stars--drift" />
    </div>
  );
}
