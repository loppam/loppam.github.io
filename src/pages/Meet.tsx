import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowDownToLine, ArrowUpRight, Check, Share2 } from "lucide-react";
import { getCase, person } from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";
import "../styles/meet.css";

const profileUrl = "https://lopam.pario.la/meet";
const socials = [
  { label: "GitHub", href: person.github },
  { label: "X", href: person.x },
  { label: "LinkedIn", href: person.linkedin },
];
const projects = [
  {
    slug: "noctix",
    description: "Event discovery, ticketing, and the tools that keep the door moving.",
    contribution: "React and TypeScript checkout, Nomba payments, and offline check-in with IndexedDB.",
    detail: "From checkout to check-in",
  },
  {
    slug: "jexpay",
    description: "A platform for exchanging crypto and gift cards for naira.",
    contribution: "Built marketing and admin interfaces, typed API clients, and permission-aware transaction and KYC workflows.",
    detail: "React · TypeScript · Turborepo",
  },
  {
    slug: "cope",
    description: "Wallet analysis and on-chain research, brought into a usable interface.",
    contribution: "Developed wallet-analysis workflows and frontend views for on-chain signals and research.",
    detail: "React · TypeScript · Solana",
  },
];

function SaveContact() {
  return (
    <a className="meet-save" href="/Ololade-Pariola.vcf" download="Ololade-Pariola.vcf">
      <ArrowDownToLine size={18} aria-hidden="true" /> Save My Contact
    </a>
  );
}

function SocialLinks({ email = false }: { email?: boolean }) {
  return (
    <div className="meet-socials">
      {socials.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer noopener">
          {label}<ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
      {email && <a href={`mailto:${person.email}`}>Email<ArrowUpRight size={14} aria-hidden="true" /></a>}
    </div>
  );
}

export function Meet() {
  const [message, setMessage] = useState("");
  const [showCopy, setShowCopy] = useState(false);
  const [sharing, setSharing] = useState(false);
  const fallbackInput = useRef<HTMLInputElement>(null);
  const shareTrigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!message || showCopy) return;
    const timeout = window.setTimeout(() => setMessage(""), 6000);
    return () => window.clearTimeout(timeout);
  }, [message, showCopy]);
  usePageMeta(
    "Ololade Pariola — Software Engineer & Founder | LOPAM",
    "Meet Ololade Pariola, a software engineer and founder building digital products, including Noctix under NOC (Nocturnal). Explore his work and connect.",
    { url: profileUrl, image: "https://lopam.pario.la/meet/og.jpg", imageAlt: "Ololade Pariola — Software Engineer & Founder, with his illustrated sticker portrait." }
  );

  async function shareProfile(event: MouseEvent<HTMLButtonElement>) {
    if (sharing) return;
    shareTrigger.current = event.currentTarget;
    setSharing(true);
    setMessage("");
    try {
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title: "Meet Ololade · LOPAM", text: "Software engineer & founder. Let's connect.", url: profileUrl });
          setMessage("Profile shared.");
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
        }
      }
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(profileUrl);
          setMessage("Profile link copied.");
          return;
        } catch { /* Provide a selectable link when clipboard permission is denied. */ }
      }
      setShowCopy(true);
      setMessage("Copy the profile link below.");
      requestAnimationFrame(() => {
        fallbackInput.current?.focus();
        fallbackInput.current?.select();
      });
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className="meet-page">
      <a className="skip-link" href="#meet-content">Skip to content</a>
      <header className="meet-header meet-shell">
        <Link to="/" className="meet-wordmark" aria-label="LOPAM — main portfolio">LOPAM<span>.</span></Link>
        <span className="meet-header-note">A little introduction.</span>
        <button className="meet-share-icon" type="button" onClick={shareProfile} disabled={sharing} aria-label="Share Profile">
          <Share2 size={19} aria-hidden="true" />
        </button>
      </header>

      <main id="meet-content" className="meet-shell" tabIndex={-1}>
        <section className="meet-intro" aria-labelledby="meet-title">
          <div className="meet-portrait">
            <picture>
              <source type="image/avif" srcSet="/meet/ololade-360.avif 360w, /meet/ololade-720.avif 720w" sizes="(min-width: 900px) 420px, (min-width: 768px) 300px, 144px" />
              <img src="/meet/ololade-720.webp" srcSet="/meet/ololade-360.webp 360w, /meet/ololade-720.webp 720w" sizes="(min-width: 900px) 420px, (min-width: 768px) 300px, 144px" width="720" height="720" fetchPriority="high" alt="Illustrated sticker portrait of Ololade, with textured hair and a black shirt." />
            </picture>
            <span className="meet-portrait-note" aria-hidden="true">Yep, that's me. ↗</span>
          </div>
          <div className="meet-intro-copy">
            <p className="meet-eyebrow">Software Engineer / Founder</p>
            <h1 id="meet-title">Hey, I'm<br /><span>Ololade.</span></h1>
            <p className="meet-intro-lede">I build digital products, from the interfaces people interact with to the systems that make them work.</p>
            <p className="meet-now">Currently building <a href="#building">NOC (Nocturnal)</a>, starting with Noctix.</p>
            <div className="meet-intro-actions"><SaveContact /><SocialLinks email /></div>
          </div>
        </section>

        <section id="building" className="meet-section meet-building" aria-labelledby="building-title">
          <p className="meet-eyebrow">01 / What I'm building</p>
          <div className="meet-building-copy">
            <h2 id="building-title">Building beyond<br />one product.</h2>
            <p>NOC, short for Nocturnal, is the entertainment and lifestyle brand I'm building around events, commerce, and experiences.</p>
          </div>
          <div className="meet-venture">
            <div className="meet-venture-image">
              <img src="/work/sites/noctix.jpg" width="1440" height="871" loading="lazy" decoding="async" alt="Noctix public website, introducing event discovery and ticketing." />
              <span>THE FIRST VENTURE</span>
            </div>
            <div className="meet-venture-copy">
              <div className="meet-product-heading"><h3>Noctix</h3><span>Discover. Attend. Remember.</span></div>
              <p>Our first venture is Noctix, an event discovery and ticketing platform that connects attendees with experiences while giving organizers tools to manage ticket sales, check-ins, and event operations.</p>
              <div className="meet-venture-links">
                <a href={getCase("noctix")!.links[0].href} target="_blank" rel="noreferrer noopener">Explore Noctix <ArrowUpRight size={16} aria-hidden="true" /></a>
                <Link to="/work/noctix">The engineering behind it <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="meet-section" aria-labelledby="engineering-title">
          <div className="meet-section-heading">
            <div><p className="meet-eyebrow">02 / Things I've built</p><h2 id="engineering-title">Ideas, made real.</h2></div>
            <p className="meet-section-note">A few products.<br />The work behind the screens.</p>
          </div>
          <div className="meet-projects">
            {projects.map((project, index) => {
              const item = getCase(project.slug)!;
              return (
                <article className="meet-project" key={item.slug}>
                  <Link to={`/work/${item.slug}`} className="meet-project-image" aria-label={`Read the ${item.title} case study`}>
                    <img src={item.cover!.src} width={item.slug === "jexpay" ? 1600 : 1440} height={item.slug === "jexpay" ? 967 : 871} loading="lazy" decoding="async" alt={item.cover!.alt} />
                    <span className="meet-project-number" aria-hidden="true">0{index + 1}</span>
                  </Link>
                  <p className="meet-project-role">{item.role}</p>
                  <h3><Link to={`/work/${item.slug}`}>{item.title}<ArrowUpRight size={21} aria-hidden="true" /></Link></h3>
                  <p className="meet-project-description">{project.description}</p>
                  <p className="meet-contribution">{project.contribution}</p>
                  <p className="meet-project-detail">{project.detail}</p>
                </article>
              );
            })}
          </div>
          <Link to="/#work" className="meet-portfolio-link">Explore Full Portfolio <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="meet-section meet-connect" aria-labelledby="connect-title">
          <p className="meet-eyebrow">03 / Let's talk</p>
          <h2 id="connect-title">Good things start<br />with a conversation.</h2>
          <p>Whether you're building something interesting, looking for an engineer, or exploring a partnership, I'd love to connect.</p>
          <div className="meet-connect-actions"><SaveContact /><a className="meet-email" href={`mailto:${person.email}`}>Email Me <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          <div className="meet-connect-secondary"><SocialLinks /><button className="meet-share-text" type="button" onClick={shareProfile} disabled={sharing}><Share2 size={16} aria-hidden="true" />Share Profile</button></div>
        </section>
      </main>

      <footer className="meet-footer meet-shell"><span>LOPAM © {new Date().getFullYear()}</span><Link to="/">Main portfolio <ArrowUpRight size={14} aria-hidden="true" /></Link></footer>
      <div className={`meet-feedback${message ? " is-visible" : ""}`} role="status" aria-live="polite" aria-atomic="true">{message && <><Check size={16} aria-hidden="true" /><span>{message}</span></>}</div>
      {showCopy && <div className="meet-copy-fallback"><label htmlFor="meet-profile-url">Profile link</label><input id="meet-profile-url" ref={fallbackInput} value={profileUrl} readOnly onFocus={(event) => event.currentTarget.select()} /><button type="button" onClick={() => { setShowCopy(false); setMessage(""); shareTrigger.current?.focus(); }}>Close</button></div>}
    </div>
  );
}
