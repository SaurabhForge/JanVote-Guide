import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Shield, Globe, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About JanVote Guide",
  description: "JanVote Guide is an independent civic education platform helping Indian citizens participate in democracy. Learn about our mission and values.",
};

const values = [
  { icon: Heart, title: "People First", desc: "Built for every Indian citizen — urban or rural, young or old. Democracy belongs to everyone." },
  { icon: Shield, title: "Non-Partisan", desc: "We do not support, endorse, or campaign for any political party or candidate. Our only agenda is civic participation." },
  { icon: Globe, title: "Based on Official Sources", desc: "All information is sourced from the Election Commission of India, NVSP, and other official government bodies." },
];

const links = [
  { label: "Register to Vote", href: "/register" },
  { label: "How to Vote", href: "/how-to-vote" },
  { label: "Find Your Booth", href: "/find-booth" },
  { label: "Election Schedule", href: "/elections" },
  { label: "Know Your Candidates", href: "/candidates" },
  { label: "FAQ", href: "/faq" },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Our Mission</span>
          <h1>About <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>JanVote Guide</span></h1>
          <p style={{ maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem" }}>
            JanVote Guide is an independent, free civic education platform dedicated to helping every Indian citizen understand and exercise their right to vote.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.missionBox}>
            <div className={styles.missionFlag}>🇮🇳</div>
            <h2>Why We Built This</h2>
            <p>India is the world&apos;s largest democracy — yet millions of eligible voters don&apos;t vote simply because they don&apos;t know how. Voter registration processes can seem complicated, EVMs intimidating, and candidate information hard to find.</p>
            <p style={{ marginTop: 16 }}>JanVote Guide exists to remove those barriers. We believe that an informed voter is a powerful voter — and a powerful voter strengthens democracy for everyone.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Our Principles</p>
          <h2 className="section-title">What We <span>Stand For</span></h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div className={`glass-card ${styles.valueCard}`} key={v.title}>
                  <div className="icon-box icon-box-saffron" style={{ marginBottom: 20 }}><Icon size={22} /></div>
                  <h3>{v.title}</h3>
                  <p style={{ marginTop: 10 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`section ${styles.disclaimerSection}`}>
        <div className="container">
          <div className={`glass-card ${styles.disclaimerBox}`}>
            <Shield size={28} color="var(--saffron)" style={{ marginBottom: 16 }} />
            <h3>Disclaimer</h3>
            <p>JanVote Guide is an <strong>independent civic education initiative</strong>. We are not affiliated with, funded by, or associated with the Election Commission of India, any political party, or any government body.</p>
            <p style={{ marginTop: 12 }}>All information provided is for educational purposes only. For official and legally binding information, always refer to <a href="https://www.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--saffron)" }}>eci.gov.in</a> and <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--saffron)" }}>voters.eci.gov.in</a>.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Explore</p>
          <h2 className="section-title">Start Your <span>Voting Journey</span></h2>
          <div className={styles.linksGrid}>
            {links.map((l) => (
              <Link href={l.href} className={`glass-card ${styles.linkCard}`} key={l.href} id={`about-link-${l.href.replace("/", "")}`}>
                {l.label} <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
