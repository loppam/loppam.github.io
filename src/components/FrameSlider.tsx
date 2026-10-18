import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";

export type Frame = {
  src: string;
  alt: string;
  caption: string;
};

type AnimationControls = { stop: () => void };

function project(velocity: number, deceleration = 0.992) {
  return (velocity / 1000) * (deceleration / (1 - deceleration));
}

function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  const distance = Math.abs(overshoot);
  const eased =
    (distance * dimension * constant) / (dimension + constant * distance);
  return Math.sign(overshoot) * eased;
}

export function FrameSlider({ frames }: { frames: Frame[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const indexRef = useRef(0);
  const widthRef = useRef(0);
  const animation = useRef<AnimationControls | null>(null);
  const drag = useRef({
    active: false,
    pointerId: -1,
    originX: 0,
    originY: 0,
    base: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    axis: "unset" as "unset" | "x" | "y",
  });

  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const measure = () => {
      const next = node.clientWidth;
      widthRef.current = next;
      setWidth(next);
      x.set(-indexRef.current * next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [x]);

  function settle(nextIndex: number, velocity = 0) {
    const max = frames.length - 1;
    const clamped = Math.max(0, Math.min(max, nextIndex));
    indexRef.current = clamped;
    setIndex(clamped);
    const target = -clamped * widthRef.current;
    animation.current?.stop();
    if (!widthRef.current || reduced) {
      x.set(target);
      return;
    }
    const flick = Math.abs(velocity) > 450;
    animation.current = animate(x, target, {
      type: "spring",
      bounce: flick ? 0.18 : 0,
      duration: flick ? 0.4 : 0.35,
      velocity,
    });
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.button !== 0) return;
    animation.current?.stop();
    const point = drag.current;
    point.active = true;
    point.pointerId = event.pointerId;
    point.originX = event.clientX;
    point.originY = event.clientY;
    point.base = x.get();
    point.lastX = event.clientX;
    point.lastT = performance.now();
    point.velocity = 0;
    point.axis = "unset";
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const point = drag.current;
    if (!point.active || event.pointerId !== point.pointerId) return;
    const dx = event.clientX - point.originX;
    const dy = event.clientY - point.originY;
    if (point.axis === "unset") {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      point.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (point.axis === "y") {
        point.active = false;
        return;
      }
    }
    if (point.axis !== "x") return;
    const now = performance.now();
    const dt = now - point.lastT;
    if (dt > 0) {
      point.velocity = ((event.clientX - point.lastX) / dt) * 1000;
    }
    point.lastX = event.clientX;
    point.lastT = now;
    const min = -(frames.length - 1) * widthRef.current;
    let next = point.base + dx;
    if (next > 0) next = rubberband(next, widthRef.current);
    else if (next < min) next = min + rubberband(next - min, widthRef.current);
    x.set(next);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const point = drag.current;
    if (!point.active || event.pointerId !== point.pointerId) return;
    point.active = false;
    const dx = event.clientX - point.originX;
    if (point.axis !== "x" || Math.abs(dx) < 10 || !widthRef.current) {
      settle(indexRef.current, 0);
      return;
    }
    const projected = x.get() + project(point.velocity);
    const nearest = Math.round(-projected / widthRef.current);
    settle(nearest, point.velocity);
  }

  const frame = frames[index];

  return (
    <figure className="slider">
      <div
        ref={viewport}
        className="slider-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div className="slider-track" style={{ x }}>
          {frames.map((item) => (
            <div key={item.src} className="slider-slide" style={{ width: width || "100%" }}>
              <img src={item.src} alt={item.alt} draggable={false} />
            </div>
          ))}
        </motion.div>
      </div>
      <figcaption>
        <p>{frame.caption}</p>
        <div className="slider-controls">
          <button
            type="button"
            className="slider-nav"
            onClick={() => settle(index - 1)}
            disabled={index === 0}
          >
            Previous
          </button>
          <span aria-live="polite">
            {index + 1} / {frames.length}
          </span>
          <button
            type="button"
            className="slider-nav"
            onClick={() => settle(index + 1)}
            disabled={index === frames.length - 1}
          >
            Next
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
