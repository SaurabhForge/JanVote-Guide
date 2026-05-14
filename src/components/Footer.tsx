import Link from "next/link";
import { Vote, ExternalLink } from "lucide-react";
import styles from "./Footer.module.css";

const footerLinks = {
  guide: [
    { href: "/register", label: "Voter Registration" },
    { href: "/how-to-vote", label: "How to Vote" },
    { href: "/find-booth", label: "Find Polling Booth" },
    { href: "/elections", label: "Election Schedule" },
  ],
  resources: [
    { href: "/candidates", label: "Know Your Candidates" },
    { href: "/faq", label: "FAQs" },
    { href: "/about", label: "About JanVote" },
  ],
  external: [
    { href: "https://www.eci.gov.in", label: "Election Commission of India", icon: true },
    { href: "https://www.nvsp.in", label: "NVSP Voter Portal", icon: true },
    { href: "https://myneta.info", label: "MyNeta — Candidate Info", icon: true },
    { href: "https://voters.eci.gov.in", label: "Voter Services Portal", icon: true },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}><Vote size={20} /></div>
              <span>Jan<strong>Vote</strong> Guide</span>
            </Link>
            <p className={styles.tagline}>
              Empowering every Indian citizen to exercise their fundamental right to vote. Democracy thrives when people participate.
            </p>
            <div className={styles.tricolor}>
              <span className={styles.saffronBar} />
              <span className={styles.whiteBar} />
              <span className={styles.greenBar} />
            </div>
          </div>

          <div className={styles.links}>
            <div>
              <h4>Voting Guide</h4>
              <ul>
                {footerLinks.guide.map(l => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                {footerLinks.resources.map(l => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Official Portals</h4>
              <ul>
                {footerLinks.external.map(l => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} JanVote Guide. Made with 🇮🇳 for Indian Democracy.</p>
          <p className={styles.disclaimer}>
            This is an independent civic education platform. Not affiliated with the Election Commission of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
