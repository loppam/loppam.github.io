import { Link } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { usePageMeta } from "../hooks/usePageMeta";

export function Writing() {
  usePageMeta(
    "Writing · LOPAM",
    "Notes on frontend engineering and product implementation by Pariola Ololade.",
    { url: "https://lopam.pario.la/writings" }
  );

  return (
    <main className="writing-page">
      <div className="shell">
        <Breadcrumb />
        <p className="kicker">Writing</p>
        <h1 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: 0 }}>
          No published notes yet.
        </h1>
        <p className="writing-copy">
          For now, the case studies cover my implementation work and the
          decisions behind it. There are no published articles here yet.
        </p>
        <p className="inline-links">
          <Link className="text-link" to="/#work">
            Selected work
          </Link>
        </p>
      </div>
    </main>
  );
}
