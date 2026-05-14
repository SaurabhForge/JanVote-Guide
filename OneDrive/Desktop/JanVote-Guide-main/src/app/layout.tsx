import type { Metadata } from "next";
import { Outfit, Inter, Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import "@/lib/firebase"; // Initialize Firebase + Analytics

// Dynamically import heavy client components for better code-splitting
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
  loading: () => (
    <div
      style={{
        height: "64px",
        background: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid #e2e8f0",
      }}
      aria-hidden="true"
    />
  ),
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JanVote Guide — Your Complete Voting Companion",
  description:
    "Empower yourself with India's most comprehensive voting guide. Learn how to register, find your polling booth, understand candidates, and make your vote count.",
  keywords:
    "vote, India elections, voter registration, polling booth, ECI, democracy, JanVote",
  openGraph: {
    title: "JanVote Guide — Your Complete Voting Companion",
    description:
      "India's most comprehensive civic voting guide. Know your rights. Cast your vote.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
        {/* Skip-to-content link for keyboard/screen-reader users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="skip-link"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
