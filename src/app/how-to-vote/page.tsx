import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, AlertCircle, ArrowRight, Shield, Clock, Eye, Printer } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "How to Vote in India — JanVote Guide",
  description: "Complete guide on how to vote in Indian elections. Learn about the EVM, VVPAT, what to carry, and your rights as a voter.",
};

const steps = [
  { num: 1, icon: Printer, title: "Know Your Polling Date", desc: "Check the official election schedule for your constituency. Polling is usually held between 7:00 AM and 6:00 PM." },
  { num: 2, icon: CheckCircle, title: "Carry Valid ID", desc: "Bring your Voter ID (EPIC) or any of the 12 approved alternative photo IDs such as Aadhaar, Passport, or Driving Licence." },
  { num: 3, icon: Clock, title: "Go to Your Polling Booth", desc: "Visit the polling station assigned to you (find it at voters.eci.gov.in). Arrive early to avoid long queues." },
  { num: 4, icon: Shield, title: "Join the Queue", desc: "You'll be directed to the correct polling booth. Separate queues exist for general and elderly/disabled voters." },
  { num: 5, icon: Eye, title: "Verify Your Name & Mark Your Finger", desc: "The polling officer will verify your name in the roll, put indelible ink on your left index finger, and issue a ballot slip." },
  { num: 6, icon: CheckCircle, title: "Press the EVM Button", desc: "In the voting compartment, press the button next to the candidate/symbol of your choice. The EVM will beep once to confirm." },
  { num: 7, icon: Eye, title: "Check the VVPAT Slip", desc: "A paper slip showing your voted candidate/symbol will appear in the VVPAT window for 7 seconds — verify it before it drops." },
  { num: 8, icon: Shield, title: "Collect Your Acknowledgment", desc: "You're done! Collect your acknowledgment slip and leave. You've just strengthened Indian democracy." },
];

const ids = [
  "Voter ID Card (EPIC)", "Aadhaar Card", "Indian Passport",
  "Driving Licence", "PAN Card", "MNREGA Job Card",
  "Bank / Post Office Passbook with Photo", "Smart Card issued by Ministry of Labour",
  "Pension Documents with Photo", "NPR Smart Card",
  "Central / State Govt. Service ID Card", "Disability Certificate with Photo",
];

const rights = [
  { title: "Right to Vote Without Pressure", desc: "No one can coerce you into voting for any candidate. Your vote is secret and protected by law." },
  { title: "NOTA Option Available", desc: "If you don't like any candidate, you can press the NOTA (None of the Above) button — the last option on the EVM." },
  { title: "Paid Holiday on Polling Day", desc: "Your employer is legally required to give you a paid holiday on polling day in your constituency." },
  { title: "Challenged Vote", desc: "If someone has already voted in your name, you can cast a 'tendered ballot' — file a complaint with the Presiding Officer." },
];

export default function HowToVotePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Voting Day Guide</span>
          <h1>How to <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Vote</span> in India</h1>
          <p style={{ maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem" }}>
            Voting in India is a simple, secure, and completely private process. Here&apos;s your complete step-by-step guide for polling day.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Polling Day Process</p>
          <h2 className="section-title">8 Steps to <span>Cast Your Vote</span></h2>
          <div className={styles.stepsTimeline}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div className={styles.timelineItem} key={step.num} id={`vote-step-${step.num}`}>
                  <div className={styles.timelineLeft}>
                    <div className="step-number">{step.num}</div>
                    {i < steps.length - 1 && <div className={styles.timelineLine} />}
                  </div>
                  <div className={`glass-card ${styles.timelineCard}`}>
                    <div className={`icon-box icon-box-${i % 2 === 0 ? "saffron" : "green"}`} style={{ marginBottom: 16 }}>
                      <Icon size={20} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Valid IDs */}
      <section className={`section ${styles.idsSection}`}>
        <div className="container">
          <p className="section-eyebrow">Accepted Documents</p>
          <h2 className="section-title">12 <span>Valid Photo IDs</span> for Voting</h2>
          <p className="section-subtitle">You can use any ONE of these 12 documents approved by the Election Commission of India.</p>
          <div className={styles.idsGrid}>
            {ids.map((id, i) => (
              <div className={`glass-card ${styles.idCard}`} key={id} id={`id-doc-${i}`}>
                <CheckCircle size={18} color="var(--saffron)" />
                <span>{id}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voter Rights */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Know Your Rights</p>
          <h2 className="section-title">Your Rights as a <span>Voter</span></h2>
          <div className="grid-2" style={{ marginTop: 40 }}>
            {rights.map((r) => (
              <div className={`glass-card ${styles.rightCard}`} key={r.title}>
                <div className={`icon-box icon-box-green`} style={{ marginBottom: 16 }}>
                  <Shield size={20} />
                </div>
                <h3>{r.title}</h3>
                <p style={{ marginTop: 10 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVM Info */}
      <section className={`section ${styles.evmSection}`}>
        <div className="container">
          <div className={styles.evmBox}>
            <div>
              <span className="section-eyebrow">Technology</span>
              <h2 className="section-title">About the <span>EVM & VVPAT</span></h2>
              <p style={{ marginBottom: 20 }}>The Electronic Voting Machine (EVM) is a standalone, non-networked device. It cannot be hacked remotely. The Voter Verifiable Paper Audit Trail (VVPAT) provides a physical paper verification of your vote.</p>
              <ul className={styles.evmList}>
                <li><CheckCircle size={16} color="var(--green-light)" /><span>EVMs run on a 6-volt alkaline battery — not connected to the internet</span></li>
                <li><CheckCircle size={16} color="var(--green-light)" /><span>VVPAT shows your selected candidate&apos;s name, symbol & serial number</span></li>
                <li><CheckCircle size={16} color="var(--green-light)" /><span>The paper slip is retained in a sealed box for 45 days post-election</span></li>
                <li><CheckCircle size={16} color="var(--green-light)" /><span>One EVM can record up to 2,000 votes; one beep = one vote</span></li>
              </ul>
            </div>
            <div className={styles.evmVisual}>
              <div className={styles.evmCard}>
                <div className={styles.evmScreen}>EVM</div>
                <div className={styles.evmButtons}>
                  {["Party A", "Party B", "Party C", "NOTA"].map((p) => (
                    <div className={styles.evmBtn} key={p}>
                      <div className={styles.evmBtnCircle} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, textAlign: "center" }}>
        <div className="container">
          <Link href="/find-booth" className="btn btn-primary" id="vote-find-booth-btn">
            Find Your Polling Booth <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
