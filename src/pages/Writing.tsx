import { Link } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { usePageMeta } from "../hooks/usePageMeta";

export function Writing() {
  usePageMeta(
    "Writing · LOPAM",
    "Published notes are not on this site. Earlier drafts were taken down because they repeated unchecked project figures."
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
          Earlier drafts on this site repeated order totals and performance
          figures I have not rechecked. I took them down. The case studies are
          the record for now.
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
