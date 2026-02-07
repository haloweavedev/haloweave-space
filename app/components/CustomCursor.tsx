"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!cursor.classList.contains("visible")) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        cursor.classList.add("visible");
      }
    };

    const onMouseLeave = () => {
      cursor.classList.remove("visible");
    };

    const onMouseEnter = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      cursor.classList.add("visible");
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.25);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.25);
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <img src="/sparkle-cursor.svg" alt="" className="custom-cursor-img" draggable={false} />
    </div>
  );
}
