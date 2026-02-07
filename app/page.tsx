"use client";

import Background from "./components/Background";
import Scene from "./components/Scene";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />

      <div className="relative z-10 flex h-full items-center">
        {/* Hero text — left */}
        <div className="flex flex-1 flex-col justify-center pl-12 pr-4 md:pl-20 lg:pl-28">
          <span className="mb-6 inline-block text-[0.7rem] font-sans tracking-[0.35em] uppercase text-gold/80">
            Haloweave
          </span>

          <h1
            className="mb-6 font-serif font-medium text-white leading-[1.15]"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              textWrap: "balance",
              textShadow:
                "0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(212,175,55,0.06)",
            }}
          >
            Built for the next era
            <br />
            of software.
          </h1>

          <p className="mb-4 max-w-lg font-serif italic text-gold/70 leading-relaxed"
            style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)" }}
          >
            The future of the web is intelligent.
          </p>

          <p className="mb-10 max-w-md font-sans text-[0.95rem] leading-7 text-white/55">
            Products no longer just respond&nbsp;&mdash; they understand,
            assist, and evolve. We work with founders and teams to design
            and build AI products that feel inevitable.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full px-7 py-3 text-[0.8rem] font-sans tracking-[0.12em] uppercase text-[#0a0a0a] no-underline transition-[opacity,transform] duration-300 hover:opacity-90 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold/60"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f0d060, #d4af37)",
                boxShadow:
                  "0 0 20px rgba(212,175,55,0.25), 0 0 60px rgba(212,175,55,0.08)",
              }}
            >
              Begin your mission
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3 text-[0.8rem] font-sans tracking-[0.12em] uppercase text-white/70 no-underline transition-[border-color,color,transform] duration-300 hover:border-gold/40 hover:text-white hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold/60"
            >
              View our work
            </a>
          </div>
        </div>

        {/* 3D model — right */}
        <div className="relative h-full flex-1">
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            }}
          />
          <Scene />
        </div>
      </div>
    </div>
  );
}
