import Link from "next/link";
import {
  ArrowRight, BookOpen, MapPin, Users, Calendar, HelpCircle,
  Shield, CheckCircle, ChevronRight, Star, TrendingUp, Globe
} from "lucide-react";
import styles from "./page.module.css";

const stats = [
  { value: "97 Cr+", label: "Registered Voters", icon: Users },
  { value: "543", label: "Lok Sabha Seats", icon: Globe },
  { value: "4000+", label: "Political Parties", icon: Star },
  { value: "10.5 L+", label: "Polling Stations", icon: MapPin },
];

const features = [
  {
    icon: BookOpen,
    title: "Voter Registration",
    desc: "Step-by-step guide to register on electoral rolls online or offline. Eligibility, documents, and the complete NVSP process.",
    href: "/register",
    color: "saffron",
  },
  {
    icon: CheckCircle,
    title: "How to Vote",
    desc: "Everything you need to know about voting day — from carrying your Voter ID to using the EVM and VVPAT.",
    href: "/how-to-vote",
    color: "green",
  },
  {
    icon: MapPin,
    title: "Find Your Booth",
    desc: "Locate your assigned polling booth by name or Voter ID number. Never miss your polling station again.",
    href: "/find-booth",
    color: "blue",
  },
  {
    icon: Calendar,
    title: "Election Schedule",
    desc: "Phase-wise election dates, key milestones, result announcements, and the full ECI election calendar.",
    href: "/elections",
    color: "purple",
  },
  {
    icon: Users,
    title: "Know Your Candidates",
    desc: "How to research your candidates — criminal records, assets, education, and party affiliation from official affidavits.",
    href: "/candidates",
    color: "saffron",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    desc: "Answers to the most common questions about Indian elections, voter rights, NOTA, postal ballots, and more.",
    href: "/faq",
    color: "green",
  },
];

const whyVote = [
  { icon: Shield, title: "Your Constitutional Right", desc: "Article 326 guarantees universal adult suffrage. Every vote is a constitutional act." },
  { icon: TrendingUp, title: "Shape the Nation's Future", desc: "Local, state, and national governments are all elected. Your vote directly impacts policy." },
  { icon: Star, title: "Every Vote Counts", desc: "Multiple Indian elections have been decided by fewer than 100 votes. Your vote can be decisive." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`badge badge-saffron ${styles.heroBadge}`}>
              🇮🇳 &nbsp;India&apos;s Civic Voting Guide
            </div>
            <h1 className={styles.heroTitle}>
              Your Voice.<br />
              <span className={styles.heroGradient}>Your Vote.</span><br />
              Your Future.
            </h1>
            <p className={styles.heroSubtitle}>
              India is the world&apos;s largest democracy. With 97 crore registered voters, your single vote has the power to change history. JanVote Guide gives you everything you need to vote with confidence.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/register" className="btn btn-primary" id="hero-register-btn">
                Register to Vote <ArrowRight size={18} />
              </Link>
              <Link href="/how-to-vote" className="btn btn-outline" id="hero-howto-btn">
                How to Vote
              </Link>
            </div>
            <div className={styles.heroTrust}>
              <span>✓ Free civic resource</span>
              <span>✓ Updated for 2024–25</span>
              <span>✓ Based on ECI guidelines</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div className={styles.statCard} key={stat.label}>
                  <div className={styles.statIcon}><Icon size={22} /></div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Complete Voting Guide</p>
          <h2 className="section-title">Everything You Need to <span>Vote Smart</span></h2>
          <p className="section-subtitle">From registration to casting your ballot — we cover every step of India&apos;s democratic process.</p>

          <div className={styles.featuresGrid}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Link href={f.href} key={f.title} className={`glass-card ${styles.featureCard}`} id={`feature-${f.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className={`icon-box icon-box-${f.color} ${styles.featureIcon}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                  <div className={styles.featureLink}>
                    Learn more <ChevronRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY VOTE */}
      <section className={`section ${styles.whySection}`}>
        <div className={styles.whyBg} />
        <div className="container">
          <p className="section-eyebrow">Why It Matters</p>
          <h2 className="section-title">Why Every Vote <span>Matters</span></h2>
          <div className="grid-3" style={{ marginTop: "40px" }}>
            {whyVote.map((w) => {
              const Icon = w.icon;
              return (
                <div className={`glass-card ${styles.whyCard}`} key={w.title}>
                  <div className={`icon-box icon-box-saffron`} style={{ marginBottom: "20px" }}>
                    <Icon size={24} />
                  </div>
                  <h3>{w.title}</h3>
                  <p style={{ marginTop: "10px" }}>{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaInner}>
              <div className={styles.ctaFlag}>🇮🇳</div>
              <h2>Ready to Make Your Vote Count?</h2>
              <p>Start with voter registration — it takes less than 10 minutes online.</p>
              <div className={styles.ctaBtns}>
                <Link href="/register" className="btn btn-primary" id="cta-register-btn">
                  Register Now <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="btn btn-ghost" id="cta-about-btn">
                  About JanVote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
