import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const tools = [
  { name: "React", src: "/logos/react.svg", x: "72%", y: "34%", size: "7.5rem", blur: "10px", opacity: 0.72 },
  { name: "TypeScript", src: "/logos/typescript.svg", x: "24%", y: "30%", size: "4.6rem", blur: "8px", opacity: 0.8 },
  { name: "Vite", src: "/logos/vite.svg", x: "58%", y: "18%", size: "4.2rem", blur: "9px", opacity: 0.6 },
  { name: "Tailwind CSS", src: "/logos/tailwindcss.svg", x: "80%", y: "62%", size: "5rem", blur: "12px", opacity: 0.5 },
  { name: "Node.js", src: "/logos/nodedotjs.svg", x: "18%", y: "68%", size: "5.4rem", blur: "11px", opacity: 0.55 },
  { name: "PostgreSQL", src: "/logos/postgresql.svg", x: "42%", y: "76%", size: "4.4rem", blur: "14px", opacity: 0.42 },
  { name: "Redis", src: "/logos/redis.svg", x: "66%", y: "70%", size: "4rem", blur: "8px", opacity: 0.68 },
  { name: "Docker", src: "/logos/docker.svg", x: "46%", y: "44%", size: "3.6rem", blur: "12px", opacity: 0.4 },
  { name: "Firebase", src: "/logos/firebase.svg", x: "30%", y: "50%", size: "4.8rem", blur: "13px", opacity: 0.42 },
  { name: "GitHub", src: "/logos/github.svg", x: "54%", y: "58%", size: "6.5rem", blur: "16px", opacity: 0.34 },
  { name: "Figma", src: "/logos/figma.svg", x: "36%", y: "22%", size: "3.2rem", blur: "7px", opacity: 0.7 },
  { name: "Solana", src: "/logos/solana.svg", x: "84%", y: "42%", size: "4.4rem", blur: "9px", opacity: 0.64 },
  { name: "Git", src: "/logos/git.svg", x: "16%", y: "46%", size: "3.4rem", blur: "12px", opacity: 0.4 },
];

const washes = [
  { color: "#7C5CFF", x: "72%", y: "26%", size: "18rem" },
  { color: "#14F195", x: "16%", y: "68%", size: "14rem" },
  { color: "#2496ED", x: "88%", y: "76%", size: "12rem" },
];

export function ToolField() {
  const field = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".tool-float").forEach((node, index) => {
          gsap.to(node, {
            x: index % 2 === 0 ? 150 : -170,
            y: index % 3 === 0 ? -130 : 110,
            duration: 22 + (index % 5) * 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
        gsap.to(".tool-drift", {
          y: -160,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
      return () => motion.revert();
    },
    { scope: field }
  );

  useEffect(() => {
    const root = field.current;
    if (!root) return;
    let hot: HTMLElement | null = null;
    let pressed: HTMLElement | null = null;

    const orbAt = (x: number, y: number) => {
      const top = document.elementFromPoint(x, y);
      if (top?.closest("a, button, input, textarea, select, label")) return null;
      for (const node of document.elementsFromPoint(x, y)) {
        if (!(node instanceof Element)) continue;
        const orb = node.closest(".tool-orb");
        if (orb instanceof HTMLElement && root.contains(orb)) return orb;
      }
      return null;
    };

    const mark = (current: HTMLElement | null, next: HTMLElement | null, name: string) => {
      if (current === next) return next;
      current?.classList.remove(name);
      next?.classList.add(name);
      return next;
    };

    const onMove = (event: PointerEvent) => {
      hot = mark(hot, orbAt(event.clientX, event.clientY), "is-hot");
    };
    const onDown = (event: PointerEvent) => {
      pressed = mark(pressed, orbAt(event.clientX, event.clientY), "is-pressed");
    };
    const clearPress = () => {
      pressed = mark(pressed, null, "is-pressed");
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", clearPress);
    window.addEventListener("pointercancel", clearPress);
    return () => {
      hot?.classList.remove("is-hot");
      pressed?.classList.remove("is-pressed");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", clearPress);
      window.removeEventListener("pointercancel", clearPress);
    };
  }, []);

  return (
    <div ref={field} className="tool-field" aria-hidden="true">
      <div className="tool-drift">
        {washes.map((wash) => (
          <span
            key={wash.color}
            className="tool-wash"
            style={{
              left: wash.x,
              top: wash.y,
              width: wash.size,
              height: wash.size,
            }}
          >
            <span className="tool-float" style={{ background: wash.color }} />
          </span>
        ))}
        {tools.map((tool) => (
          <span
            key={tool.name}
            className="tool-orb"
            style={{
              left: tool.x,
              top: tool.y,
              width: tool.size,
              height: tool.size,
              ["--orb" as string]: tool.opacity,
              ["--blur" as string]: tool.blur,
            }}
          >
            <span className="tool-float">
              <img src={tool.src} alt="" />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
