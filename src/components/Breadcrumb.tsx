import { Link, useLocation } from "react-router-dom";
import { getCase } from "../content/site";

type Crumb = {
  label: string;
  href?: string;
};

function crumbsFor(pathname: string): Crumb[] {
  const home = { label: "Home", href: "/" };

  if (pathname.startsWith("/work/")) {
    const slug = decodeURIComponent(pathname.split("/")[2] ?? "");
    const item = getCase(slug);
    if (!item) return [home, { label: "Not found" }];
    return [home, { label: "Work", href: "/#work" }, { label: item.title }];
  }

  if (pathname.startsWith("/writings")) {
    return [home, { label: "Writing" }];
  }

  return [home, { label: "Not found" }];
}

export function Breadcrumb() {
  const { pathname } = useLocation();
  const crumbs = crumbsFor(pathname);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map((crumb, index) => {
          const current = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`}>
              {index > 0 ? (
                <span className="breadcrumb-sep" aria-hidden="true">
                  /
                </span>
              ) : null}
              {current || !crumb.href ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link to={crumb.href}>{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
