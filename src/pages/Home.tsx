import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  cases,
  experience,
  person,
  skillGroups,
} from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const selected = cases.filter((item) => item.placement !== "more");
const more = cases.filter((item) => item.placement === "more");

export function Home() {
  const { hash } = useLocation();
  const page = useRef<HTMLElement>(null);
  usePageMeta(
    "Pariola Ololade (LOPAM), Software Engineer",
    "Pariola Ololade is a software engineer in Lagos focused on React and TypeScript. Selected work includes Noctix, Buffer, JexPay, NOC, COPE, and Nomba."
  );

  useEffect(() => {
    if (!hash) return;
    const node = document.getElementById(hash.slice(1));
    node?.scrollIntoView();
  }, [hash]);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 800px)",
          mobile: "(max-width: 799px)",
        },
        (context) => {
          const reduce = Boolean(context.conditions?.reduce);
          const desktop = Boolean(context.conditions?.desktop);
          const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
          const pieces = gsap.utils.toArray<HTMLElement>(".work-panel-inner");
          if (reduce) {
            gsap.set(".reveal, .rise, .work-panel, .work-panel-inner", {
              autoAlpha: 1,
              y: 0,
              scale: 1,
            });
            return;
          }

          const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
          intro.from(".reveal", {
            autoAlpha: 0,
            y: 18,
            duration: 0.55,
            stagger: 0.07,
          });
          gsap.utils.toArray<HTMLElement>(".rise").forEach((node) => {
            gsap.from(node, {
              autoAlpha: 0,
              y: 22,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 88%",
                once: true,
              },
            });
          });

          const pin = page.current?.querySelector(".work-pin");
          if (panels.length > 1 && pin) {
            pin.classList.add("is-pinned");
            gsap.set(pieces, { scale: 1, autoAlpha: 1 });
            gsap.set(panels, { autoAlpha: (index) => (index === 0 ? 1 : 0) });
            gsap.set(pieces[0], { scale: 1 });
            pieces.slice(1).forEach((piece) =>
              gsap.set(piece, { scale: desktop ? 1.35 : 1.08 })
            );

            const sequence = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: ".work-pin",
                start: "top top",
                end: () => `+=${(panels.length - 1) * window.innerHeight}`,
                pin: true,
                scrub: 0.45,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            panels.forEach((panel, index) => {
              if (index === 0) return;
              sequence
                .to(panels[index - 1], { autoAlpha: 0, duration: 0.45 }, index)
                .to(pieces[index - 1], { scale: 0.96, duration: 0.45 }, index)
                .fromTo(
                  panels[index],
                  { autoAlpha: 0 },
                  { autoAlpha: 1, duration: 0.55 },
                  index + 0.3
                )
                .fromTo(
                  pieces[index],
                  { scale: desktop ? 1.28 : 1.06 },
                  { scale: 1, duration: 0.55 },
                  index + 0.3
                );
            });
            return () => pin.classList.remove("is-pinned");
          }

          pieces.forEach((piece) => {
            gsap.fromTo(
              piece,
              { scale: 1.12, autoAlpha: 0.35 },
              {
                scale: 1,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: piece,
                  start: "top 90%",
                  end: "top 42%",
                  scrub: true,
                },
              }
            );
          });
        },
        page.current
      );
      return () => motion.revert();
    },
    { scope: page }
  );

  return (
    <main ref={page}>
      <section className="hero">
        <div className="shell hero-copy">
          <p className="kicker reveal">Software engineer · Lagos, Nigeria</p>
          <h1 className="reveal">The screen is where the money moves.</h1>
          <p className="lede reveal">
            I'm Pariola Ololade (LOPAM). I build the React and TypeScript
            interfaces people have to finish: a ticket that still scans, a
            naira payout after a crypto sale, a booking that doesn't collide
            with the next location, a verification that says why it failed.
            Most of the public sites you'll see here are the pitch. The work
            sits behind the login.
          </p>
          <div className="hero-actions reveal">
            <a className="button-solid hero-work-link" href="#work">
              View selected work
            </a>
            <a className="text-link" href={person.resume}>
              Resume
            </a>
            <a className="text-link" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="shell">
          <div className="rise">
            <h2>Selected work</h2>
            <p className="section-intro">
              Six products, told as the decision a person is trying to finish.
              Where a public URL exists, it is the marketing site. The desk,
              the ledger, and the customer list stay under NDA, which is why
              the screenshots stop at the front door except where a designer
              published the frames.
            </p>
          </div>
        </div>

        <div className="work-pin">
          {selected.map((item, index) => (
            <article
              key={item.slug}
              className={`work-panel ${index % 2 === 0 ? "align-start" : "align-end"}`}
            >
              <div className="shell">
                <div className="work-panel-inner">
                  <p className="kicker">
                    {String(index + 1).padStart(2, "0")} · {item.status}
                  </p>
                  <h3>{item.title}</h3>
                  <p className="domain">{item.domain}</p>
                  <p className="meta">
                    {item.role}
                    <span className="status"> · {item.dates}</span>
                  </p>
                  <p className="case-copy">{item.summary}</p>
                  <ul className="tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="case-actions">
                    <Link className="text-link" to={`/work/${item.slug}`}>
                      Read the {item.title} case study
                    </Link>
                    {item.links[0] ? (
                      <a
                        className="text-link"
                        href={item.links[0].href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {item.links[0].label}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="shell">
          <div className="more-work">
            <h3>More work</h3>
            <div className="more-list">
              {more.map((item) => (
                <article key={item.slug} className="more-item">
                  <p className="kicker">{item.status}</p>
                  <h3>{item.title}</h3>
                  <p className="domain">{item.domain}</p>
                  <p className="case-copy">{item.summary}</p>
                  <div className="case-actions">
                    <Link className="text-link" to={`/work/${item.slug}`}>
                      Read the {item.title} case study
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="shell">
          <h2>Experience</h2>
          <p className="section-intro">
            Employment and product work, overlaps included. The same roles are
            on the PDF.
          </p>
          <div>
            {experience.map((item) => (
              <article key={item.org} className="experience-item">
                <div>
                  <p className="kicker">{item.kind}</p>
                  <h3>{item.org}</h3>
                  <p className="meta">
                    {item.role}
                    <span className="status"> · {item.dates}</span>
                  </p>
                </div>
                <div>
                  <ul className="point-list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="meta">{item.tools}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="shell">
          <h2>About</h2>
          <div className="about-copy">
            <p>
              I'm Pariola Ololade, a software engineer in Lagos. React and
              TypeScript are the tools I reach for. The interfaces I care about
              are the ones with a consequence: a payment that fails, a
              permission that is missing, a network that drops in the middle of
              a scan.
            </p>
            <p>
              The companies are fintech, scheduling, and event ticketing.
              On some of them I also work in the API, the data stores, and a
              Solana integration. The center of the job is still the frontend,
              because that is where a person either finishes or leaves.
            </p>
            <p>
              Sometimes the work starts from a Figma file, sometimes from a
              designer in the room, sometimes from a feature that arrives as a
              sentence. I use AI to move faster through research and the first
              draft of an implementation. I still read the diff, run the flow,
              and decide what ships.
            </p>
            <p>BSc Computer Science, Kwara State University, 2021–2025.</p>
          </div>

          <h3 className="display" style={{ marginTop: "2.5rem", fontSize: "1.7rem" }}>
            How I work
          </h3>
          <div className="about-copy">
            <p>
              I start from the action and the thing that can go wrong in it.
              A screen needs a loading state, an empty state, a permission,
              and an error that names the problem. When the work leaves the
              browser, I follow the API, the record that has to survive, and
              what happens to that screen after deploy.
            </p>
          </div>

          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article key={group.label} className="skill-group">
                <h3>{group.label}</h3>
                <p>{group.items}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="shell">
          <h2>Let's talk about the work.</h2>
          <p className="contact-copy">
            If you need someone who has already lived in the authenticated
            half of a fintech or ticketing product, email me. Frontend roles
            and implementation-heavy product work are the fit.
          </p>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </li>
            <li>
              <a href={person.github}>GitHub, loppam</a>
            </li>
            <li>
              <a href={person.linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={person.x}>X, @Lopam_</a>
            </li>
            <li>
              <a href={person.resume}>Resume (PDF)</a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
