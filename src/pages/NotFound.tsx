import { Link } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFound() {
  usePageMeta(
    "Page not found · LOPAM",
    "That page is not on Pariola Ololade's site."
  );

  return (
    <main className="missing-page">
      <div className="shell">
        <Breadcrumb />
        <p className="kicker">404</p>
        <h1 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: 0 }}>
          This page is not here.
        </h1>
        <p className="writing-copy">
          The address does not match a section on this site.
        </p>
        <p className="inline-links">
          <Link className="text-link" to="/">
            Back to the homepage
          </Link>
          <Link className="text-link" to="/#work">
            Selected work
          </Link>
        </p>
      </div>
    </main>
  );
}
