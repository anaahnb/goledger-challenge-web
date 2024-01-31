import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scrobble",
  description: "Scrobble é uma plataforma musical e digital para registrar os hábitos de consumo de música",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/lastfm_icon_512",
    apple: "/img/lastfm_icon_512"
  },

  manifest: "/manifest.json"
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
