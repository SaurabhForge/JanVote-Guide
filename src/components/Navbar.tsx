"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Vote } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/register", label: "Register" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/find-booth", label: "Find Booth" },
  { href: "/elections", label: "Elections" },
  { href: "/candidates", label: "Candidates" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link
          href="/"
          className={styles.logo}
          id="nav-logo"
          aria-label="JanVote Guide — go to homepage"
        >
          <div className={styles.logoIcon} aria-hidden="true">
            <Vote size={20} />
          </div>
          <span>
            Jan<strong>Vote</strong>
          </span>
        </Link>

        {/* Main navigation */}
        <nav
          className={`${styles.nav} ${menuOpen ? styles.open : ""}`}
          id="main-nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                aria-label={`Navigate to ${link.label} page`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/register"
            className={`btn btn-primary ${styles.cta}`}
            id="nav-cta"
            aria-label="Register to vote — go to voter registration page"
          >
            Register to Vote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          id="menu-toggle"
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
