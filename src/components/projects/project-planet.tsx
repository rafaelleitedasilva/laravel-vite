/**
 * Um planeta gerado deterministicamente a partir do slug do projeto — cada
 * card recebe um corpo celeste diferente (ângulo de luz, anel, crateras),
 * sem precisar manter uma lista fixa de variantes nem repetir com N alto.
 * Mesma paleta prata/preto do resto do site; nada de cor.
 */

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Arredonda pra 2 casas. `Math.sin`/`Math.cos` podem divergir no último bit
 * entre o V8 do Node (servidor) e o do navegador (cliente) — sem isso, o
 * gradiente nasce com um cx/cy infinitesimalmente diferente em cada lado e
 * o React acusa mismatch de hidratação (inofensivo, mas ruidoso).
 */
function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export function ProjectPlanet({
  seed,
  size = 30,
  className,
}: {
  /** Normalmente o slug do projeto — estável, então o visual não muda entre builds. */
  seed: string;
  size?: number;
  className?: string;
}) {
  const random = mulberry32(hashSeed(seed));

  const lightAngle = random() * Math.PI * 2;
  const lightX = round(50 + Math.cos(lightAngle) * 22);
  const lightY = round(50 + Math.sin(lightAngle) * 22);

  const hasRing = random() < 0.45;
  const ringRotate = Math.round(random() * 160 - 80);

  const craterCount = Math.floor(random() * 3);
  const craters = Array.from({ length: craterCount }, () => ({
    cx: round(28 + random() * 44),
    cy: round(28 + random() * 44),
    r: round(3.5 + random() * 6),
    o: round(0.14 + random() * 0.18),
  }));

  const gradientId = `planet-grad-${seed}`;
  const glowId = `planet-glow-${seed}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <radialGradient id={gradientId} cx={`${lightX}%`} cy={`${lightY}%`} r="68%">
          <stop offset="0%" stopColor="#f4f5f6" />
          <stop offset="45%" stopColor="#c2c5cc" />
          <stop offset="80%" stopColor="#797d85" />
          <stop offset="100%" stopColor="#2e3035" />
        </radialGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.2" floodColor="#e9ecf0" floodOpacity="0.3" />
        </filter>
      </defs>

      {hasRing ? (
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="13"
          fill="none"
          stroke="#c9ccd3"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          transform={`rotate(${ringRotate} 50 50)`}
        />
      ) : null}

      <circle cx="50" cy="50" r="38" fill={`url(#${gradientId})`} filter={`url(#${glowId})`} />

      {craters.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#000" opacity={c.o} />
      ))}
    </svg>
  );
}
