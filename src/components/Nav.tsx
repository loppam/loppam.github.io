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
  const menuRef = useRef<HTMLElement>(null);
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
      if (content) content.inert = false;
      if (footer instanceof HTMLElement) footer.inert = false;
      return;
    }
    content?.setAttribute("aria-hidden", "true");
    footer?.setAttribute("aria-hidden", "true");
    if (content) content.inert = true;
    if (footer instanceof HTMLElement) footer.inert = true;
    firstLinkRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      } else if (event.key === "Tab") {
        const items = [
          toggleRef.current,
          ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
        ].filter((item): item is HTMLElement => item !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      content?.removeAttribute("aria-hidden");
      footer?.removeAttribute("aria-hidden");
      if (content) content.inert = false;
      if (footer instanceof HTMLElement) footer.inert = false;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

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
        <a className="header-resume" href={person.resume}>
          Resume
        </a>
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
      {open ? (
        <nav ref={menuRef} id={menuId} className="menu-panel" aria-label="Mobile">
          <div className="shell menu-inner">
            <p className="menu-heading">Explore</p>
            <div className="menu-links">
              {links.map((link, index) => (
                <Link
                  key={link.id}
                  to={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  aria-current={current(link.id)}
                  onClick={() => setOpen(false)}
                >
                  <span className="menu-number">0{index + 1}</span>
                  <span className="menu-label">{link.label}</span>
                  <span className="menu-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <a className="menu-resume" href={person.resume} onClick={() => setOpen(false)}>
              Download resume <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
