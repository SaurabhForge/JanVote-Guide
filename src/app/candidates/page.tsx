import type { Metadata } from "next";
import Link from "next/link";
import { Users, FileText, AlertTriangle, ExternalLink, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Know Your Candidates — JanVote Guide",
  description: "Learn how to research your election candidates in India. Check criminal records, assets, education, and party affiliation from official ECI affidavits.",
};

const sources = [
  { icon: FileText, title: "MyNeta.info", desc: "Detailed candidate affidavits — criminal cases, assets, liabilities, and education for every candidate.", link: "https://myneta.info", color: "saffron" },
  { icon: Users, title: "ECI Candidate Affidavits", desc: "Official affidavits filed by every candidate with the Election Commission, available publicly.", link: "https://affidavit.eci.gov.in", color: "green" },
  { icon: FileText, title: "ADR India", desc: "Association for Democratic Reforms publishes candidate analysis reports for all elections.", link: "https://adrindia.org", color: "blue" },
  { icon: ExternalLink, title: "PRS Legislative Research", desc: "Track your MP's attendance, questions asked, debates participated in, and bills voted on.", link: "https://prsindia.org", color: "saffron" },
];

const redFlags = [
  "Multiple pending criminal cases (especially serious charges like IPC 302, 376)",
  "Declared assets that don't match known income sources",
  "Frequent party switching (more than 2–3 times)",
  "Zero attendance or participation in legislative sessions",
  "No stated educational qualification on affidavit",
];

const goodSigns = [
  "Clean criminal record or minor/dismissed cases only",
  "Consistent party loyalty and ideology",
  "High parliamentary attendance (80%+)",
  "Active in constituency — local infrastructure, welfare works",
  "Transparent and fully-filled affidavit disclosures",
];

const questions = [
  "What criminal cases (if any) are pending?",
  "What is the candidate's declared net worth and assets?",
  "What is their educational qualification?",
  "What is their party's stance on issues important to you?",
  "What have they done for the constituency in previous terms?",
  "Do they have a local office or accessibility for constituents?",
];

export default function CandidatesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Informed Voting</span>
          <h1>Know Your <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Candidates</span></h1>
          <p style={{ maxWidth: 600, margin: "16px auto 32px", fontSize: "1.1rem" }}>
            Every candidate must file a sworn affidavit with the ECI disclosing criminal cases, assets, and education. This information is public — use it.
          </p>
          <a href="https://myneta.info" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="candidates-myneta-btn">
            Search on MyNeta <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Research Sources */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Where to Research</p>
          <h2 className="section-title">Official <span>Research Sources</span></h2>
          <div className="grid-2" style={{ marginTop: 40 }}>
            {sources.map((s) => {
              const Icon = s.icon;
              return (
                <a href={s.link} target="_blank" rel="noopener noreferrer" className={`glass-card ${styles.sourceCard}`} key={s.title} id={`source-${s.title.toLowerCase().replace(/[\s.]/g, '-')}`}>
                  <div className={`icon-box icon-box-${s.color}`} style={{ marginBottom: 16 }}><Icon size={22} /></div>
                  <h3>{s.title}</h3>
                  <p style={{ marginTop: 10 }}>{s.desc}</p>
                  <div className={styles.sourceLink}>Visit <ExternalLink size={14} /></div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Red Flags / Green Signs */}
      <section className={`section ${styles.flagsSection}`}>
        <div className="container">
          <p className="section-eyebrow">What to Look For</p>
          <h2 className="section-title">Red Flags & <span>Good Signs</span></h2>
          <div className="grid-2" style={{ marginTop: 40 }}>
            <div className={`glass-card ${styles.flagCard}`}>
              <div className={styles.flagHeader} style={{ color: "#FF5555" }}>
                <XCircle size={22} /> Red Flags to Watch
              </div>
              <ul className={styles.flagList}>
                {redFlags.map((f) => (
                  <li key={f}><XCircle size={16} color="#FF5555" /><span>{f}</span></li>
                ))}
              </ul>
            </div>
            <div className={`glass-card ${styles.flagCard}`}>
              <div className={styles.flagHeader} style={{ color: "var(--green-light)" }}>
                <CheckCircle size={22} /> Green Signals
              </div>
              <ul className={styles.flagList}>
                {goodSigns.map((g) => (
                  <li key={g}><CheckCircle size={16} color="var(--green-light)" /><span>{g}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Questions to Ask */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Your Checklist</p>
          <h2 className="section-title">6 Questions to <span>Ask Every Candidate</span></h2>
          <div className="grid-2" style={{ marginTop: 40 }}>
            {questions.map((q, i) => (
              <div className={`glass-card ${styles.questionCard}`} key={i} id={`question-${i}`}>
                <div className="step-number">{i + 1}</div>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, textAlign: "center" }}>
        <div className="container">
          <Link href="/faq" className="btn btn-outline" id="candidates-faq-btn">Common Voting Questions</Link>
        </div>
      </section>
    </>
  );
}
