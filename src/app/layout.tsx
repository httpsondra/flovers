import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flovers-prague.vercel.app"),
  title: "Květinářství fLOVErs | Autorské kytice a květinové boxy, Žižkov Praha",
  description:
    "F[LÓVE]RS je květinářství v srdci Žižkova. Autorské kytice, květinové boxy a svatební floristika vázané s láskou. Rozvoz po celé Praze každý den. Hodnocení 4,9 z 5 na Googlu.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Květinářství fLOVErs | Žižkov, Praha 3",
    description:
      "Autorské kytice a květinové boxy vázané s láskou v srdci Žižkova. Rozvoz po celé Praze každý den.",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Květinářství fLOVErs | Žižkov, Praha 3",
    description:
      "Autorské kytice a květinové boxy vázané s láskou v srdci Žižkova. Rozvoz po celé Praze každý den.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${archivo.variable} ${bodoni.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
