import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cases, experience, person, skillGroups } from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const order = ["noctix", "jexpay", "cope", "buffer", "nomba", "noc"];
const selected = order.map((slug) => cases.find((item) => item.slug === slug)!);
const more = cases.filter((item) => item.placement === "more");

export function Home() {
  const { hash } = useLocation();
  const page = useRef<HTMLElement>(null);
  usePageMeta("Pariola Ololade (LOPAM), Software Engineer", "Frontend-focused software engineer in Lagos. React and TypeScript applications, payment integrations, and operational tools.");
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const desktop = Boolean(context.conditions?.desktop);
      gsap.from(".reveal", { opacity: 0, y: 16, duration: .55, stagger: .07, ease: "power2.out" });
      gsap.utils.toArray<HTMLElement>(".rise").forEach((node) => {
        gsap.from(node, { opacity: 0, y: 18, duration: .5, ease: "power2.out", scrollTrigger: { trigger: node, start: "top 94%", once: true } });
      });

      const removeListeners: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const image = card.querySelector(".project-image");
        const copy = card.querySelector(".project-copy");
        if (!image || !copy) return;
        // Trigger on the stationary card; animate its children without changing layout.
        const reveal = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: card, start: "clamp(top 92%)", once: true },
        });
        reveal.from(image, {
          opacity: .35, y: desktop ? 32 : 18, scale: .985,
          duration: desktop ? .7 : .5, clearProps: "transform,opacity",
        }).from(Array.from(copy.children), {
          opacity: 0, y: desktop ? 16 : 10, duration: .45,
          stagger: .055, clearProps: "transform,opacity",
        }, desktop ? .14 : .08);
        // Keyboard navigation should never land on a link waiting to be revealed.
        const showOnFocus = () => { reveal.progress(1); };
        card.addEventListener("focusin", showOnFocus);
        removeListeners.push(() => card.removeEventListener("focusin", showOnFocus));
      });
      return () => removeListeners.forEach(remove => remove());
    });
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, { scope: page });
  return (
    <main ref={page}>
      <section className="portfolio-hero shell" aria-labelledby="intro-title">
        <picture className="portfolio-portrait reveal">
          <source type="image/avif" srcSet="/meet/ololade-360.avif 360w, /meet/ololade-720.avif 720w" sizes="(min-width: 768px) 380px, 144px" />
          <img src="/meet/ololade-360.webp" srcSet="/meet/ololade-360.webp 360w, /meet/ololade-720.webp 720w" sizes="(min-width: 768px) 380px, 144px" width="720" height="720" alt="Illustrated portrait of Pariola Ololade" fetchPriority="high" />
        </picture>
        <div className="portfolio-intro">
          <p className="kicker reveal">Pariola Ololade · Lagos, Nigeria</p>
          <h1 id="intro-title" className="reveal">Software<br />Engineer.</h1>
          <p className="portfolio-lede reveal">I build React and TypeScript applications for payments, ticketing, and the teams running them.</p>
          <p className="portfolio-note reveal">Frontend-focused. Comfortable following a feature through its APIs, data, and deployment.</p>
          <div className="hero-actions reveal">
            <a className="button-solid" href="#work">Selected work <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="#contact">Get in touch</a>
            <a className="text-link" href={person.resume}>Resume ↗</a>
          </div>
        </div>
      </section>
      <section id="work" className="section shell">
        <div className="section-heading rise"><div><p className="kicker">01 / Selected work</p><h2>Built for real use.</h2></div><p>Product context, implementation decisions, and the work behind each interface.</p></div>
        <div className="project-grid">
          {selected.map((item, index) => <article key={item.slug} className={`project-card ${index === 0 ? "project-flagship" : ""}`}>
            {item.cover && <Link className="project-image" to={`/work/${item.slug}`} aria-label={`Read the ${item.title} case study`}><img src={item.cover.src} alt={item.cover.alt} loading="lazy" decoding="async" width="1440" height="871" /><span>{item.slug === "noc" ? "Earlier public site" : "Public site preview"}</span></Link>}
            <div className="project-copy"><p className="kicker">{item.role} · {item.dates}</p><h3><Link to={`/work/${item.slug}`}>{item.title}<span aria-hidden="true">↗</span></Link></h3><p className="project-domain">{item.domain}</p><p>{item.summary}</p><ul className="tags">{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" to={`/work/${item.slug}`}>Explore the engineering <span aria-hidden="true">→</span></Link></div>
          </article>)}
        </div>
        <div className="other-work"><h3>Earlier work</h3>{more.map(item => <Link key={item.slug} to={`/work/${item.slug}`}><span>{item.title}<small>{item.domain}</small></span><span aria-hidden="true">↗</span></Link>)}</div>
      </section>
      <section id="experience" className="section shell">
        <div className="section-heading"><div><p className="kicker">02 / Experience</p><h2>Teams & products.</h2></div><a className="text-link" href={person.resume}>Download resume ↗</a></div>
        {experience.map(item => <article key={item.org} className="experience-item"><div><p className="kicker">{item.dates}</p><h3>{item.org}</h3><p className="meta">{item.role}</p></div><div><ul className="point-list">{item.points.map(point => <li key={point}>{point}</li>)}</ul><p className="meta experience-tools">{item.tools}</p></div></article>)}
      </section>
      <section id="about" className="section shell">
        <div className="about-layout"><div><p className="kicker">03 / About</p><h2>The person<br />behind LOPAM.</h2></div><div className="about-copy">
          <p>I’m Ololade, a software engineer based in Lagos. My work is mostly frontend: turning product requirements and designs into applications people can use, including when a payment fails or a connection drops.</p>
          <p>I work with designers and backend engineers to agree on what a flow needs, then follow it through the UI, API responses, and recovery states. I use AI tools for research and implementation, and review the code and test the behavior before shipping.</p>
          <p>I also founded NOC (Nocturnal). Its first venture is Noctix, where building an event-ticketing product gives me a direct view of the operational problems behind the screens.</p>
          <p className="meta">BSc Computer Science · Kwara State University · 2021–2025</p>
        </div></div>
        <div className="skill-grid">{skillGroups.map(group => <article className="skill-group" key={group.label}><h3>{group.label}</h3><p>{group.items}</p></article>)}</div>
      </section>
      <section id="contact" className="section shell contact-section"><p className="kicker">04 / Contact</p><h2>Let’s build something<br />people can use.</h2><p className="contact-copy">For software engineering roles, product work, or a conversation about what you’re building.</p><div className="contact-actions"><a className="button-solid" href={`mailto:${person.email}`}>Email Ololade ↗</a><a className="text-link" href={`tel:${person.phone}`}>{person.phoneDisplay}</a></div><ul className="contact-list"><li><a href={person.github}>GitHub ↗</a></li><li><a href={person.linkedin}>LinkedIn ↗</a></li><li><a href={person.x}>X / @Lopam_ ↗</a></li><li><a href="/Ololade-Pariola.vcf" download>Save contact ↓</a></li><li><Link to="/meet">Networking card ↗</Link></li></ul></section>
    </main>
  );
}
