import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SkipLink } from "@/components/ui/skip-link";
import { SpaceBackdrop } from "@/components/space-backdrop";
import { ScrollProgress } from "@/components/scroll-progress";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { baseMetadata, personJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <SpaceBackdrop />
        <SkipLink />
        {/* reducedMotion="user" mutes transform/layout animation for prefers-reduced-motion
            users automatically, across every motion.* component in the tree. */}
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionConfig>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
