import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { FlowDiagram } from "../components/FlowDiagram";
import { FrameSlider } from "../components/FrameSlider";
import { getCase, nextCase } from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { NotFound } from "./NotFound";

export function CaseStudy() {
  const { slug } = useParams();
  const item = getCase(slug);

  usePageMeta(
    item
      ? `${item.title} case study · LOPAM`
      : "Case study not found · LOPAM",
    item
      ? item.lede
      : "That case study is not on this site.",
    { url: `https://lopam.pario.la/work/${slug}`, noindex: !item }
  );

  if (!item) return <NotFound />;

  const next = nextCase(item.slug);

  return (
    <main className="case-page">
      <article className="shell">
        <Breadcrumb />
        <header className="case-header">
          <div>
            <p className="kicker">{item.status}</p>
            <h1>{item.title}</h1>
            <p className="domain">{item.domain}</p>
            <p className="lede">{item.lede}</p>
            {item.links.length > 0 ? (
              <div className="inline-links">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    className="text-link"
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <dl className="facts">
            <div>
              <dt>Role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd>{item.dates}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{item.kind}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{item.tags.join(", ")}</dd>
            </div>
          </dl>
        </header>

        {item.cover ? (
          <figure className="shot">
            <img src={item.cover.src} alt={item.cover.alt} width="1440" height="871" decoding="async" />
            <figcaption>{item.cover.caption}</figcaption>
          </figure>
        ) : null}

        <FlowDiagram diagram={item.diagram} />

        <div className="case-body">
        <nav className="case-contents" aria-label="Case study sections"><p className="kicker">In this case study</p>{item.sections.map((section, index) => <a href={`#section-${index}`} key={section.heading}>{section.heading}</a>)}</nav>
        <div>
        {item.sections.map((section, index) => (
          <section key={section.heading} id={`section-${index}`} className="case-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="section-list">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        </div></div>
        {item.frames ? <><h2>Design reference gallery</h2><FrameSlider frames={item.frames} /></> : null}

        <p className="next-case">
          <Link to={`/work/${next.slug}`}>Next: {next.title}</Link>
        </p>
      </article>
    </main>
  );
}
