// app/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundFX from "@/components/fx/BackgroundFX";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yunsung Indonesia",
  description: "Turnkey plant construction and advanced MEP/Fire Protection solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[radial-gradient(ellipse_at_top,_rgba(200,245,96,0.35),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(20,40,25,0.6),transparent_60%)]`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundFX />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}