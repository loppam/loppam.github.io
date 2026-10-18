import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { person } from "../content/site";

const links = [
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const location = useLocation();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const onHome = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const content = document.getElementById("content");
    const footer = document.querySelector("footer");
    if (!open) {
      content?.removeAttribute("aria-hidden");
      footer?.removeAttribute("aria-hidden");
      return;
    }
    content?.setAttribute("aria-hidden", "true");
    footer?.setAttribute("aria-hidden", "true");
    firstLinkRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      content?.removeAttribute("aria-hidden");
      footer?.removeAttribute("aria-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!onHome) {
      setSection(null);
      return;
    }

    const ids = links.map((link) => link.id);
    let frame = 0;
    let later = 0;

    const update = () => {
      frame = 0;
      const marker = Math.max(81, window.innerHeight * 0.65);
      let next: string | null = null;
      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= marker) next = id;
      }
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8;
      if (atBottom) next = ids[ids.length - 1];
      setSection((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
      window.clearTimeout(later);
      later = window.setTimeout(update, 80);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(later);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome, location.hash]);

  const current = (id: string) => (onHome && section === id ? "true" : undefined);

  return (
    <header className="site-header">
      <div className="shell header-row">
        <Link to="/" className="wordmark">
          LOPAM
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.id} to={link.href} aria-current={current(link.id)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a className="header-resume text-link" href={person.resume}>
          Resume
        </a>
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id={menuId} className="menu-panel" aria-label="Mobile">
          {links.map((link, index) => (
            <Link
              key={link.id}
              to={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              aria-current={current(link.id)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={person.resume}>Resume</a>
        </nav>
      ) : null}
    </header>
  );
}
