/**
 * Campo de estrelas fixo atrás de todo o conteúdo — puro CSS (ver globals.css).
 * Uma camada estática de profundidade + uma camada de deriva lenta que usa só
 * `transform` (composta na GPU, sem repaint durante o scroll), e algumas
 * estrelas cadentes raras e curtas para dar vida sem virar um efeito contínuo.
 */
const SHOOTING_STARS = [
  { top: "14%", left: "20%", duration: "7s", delay: "0.2s" },
  { top: "22%", left: "70%", duration: "8s", delay: "2s" },
  { top: "55%", left: "12%", duration: "9s", delay: "4s" },
  { top: "68%", left: "80%", duration: "7.5s", delay: "6s" },
];

export function SpaceBackdrop() {
  return (
    <div className="space-backdrop" aria-hidden="true">
      <div className="stars stars--depth" />
      <div className="stars stars--drift" />
      {SHOOTING_STARS.map((s, i) => (
        <span
          key={i}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
