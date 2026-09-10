export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/** Anchor targets on the home page. `href` works from any route. */
export const navItems: NavItem[] = [
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  { id: "experiencia", label: "Experiência", href: "/#experiencia" },
  { id: "formacao", label: "Formação", href: "/#formacao" },
  { id: "habilidades", label: "Habilidades", href: "/#habilidades" },
  { id: "trabalhos", label: "Trabalhos", href: "/#trabalhos" },
  { id: "contato", label: "Contato", href: "/#contato" },
];
