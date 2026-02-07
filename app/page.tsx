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
          <img
            src="/logo-horizontal.svg"
            alt="Haloweave"
            className="mb-5 h-5 w-auto self-start opacity-80"
          />

          <h1
            className="mb-3 font-display text-white leading-[1.05] tracking-[-0.03em]"
            style={{
              fontSize: "clamp(1.7rem, 3.2vw, 2.8rem)",
              textWrap: "balance",
              textShadow:
                "0 0 40px rgba(240,180,41,0.15), 0 0 80px rgba(240,180,41,0.06)",
            }}
          >
            Built for the next era
            <br />
            of software.
          </h1>

          <p className="mb-4 max-w-lg font-sans text-gold leading-snug"
            style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)" }}
          >
            The future of the web is <span className="font-display uppercase text-white animate-glow">intelligent.</span>
          </p>

          <p className="mb-8 max-w-xl font-sans text-[0.85rem] leading-relaxed text-white/55">
            Products no longer just respond&nbsp;&mdash; they understand,
            assist, and evolve. We work with founders and teams to design
            and build AI products that feel inevitable.
          </p>

          <div className="flex items-center gap-4">
            <a href="#contact" className="btn-gold">
              Begin your mission
            </a>
            <a href="#work" className="btn-glass">
              <span>View our work</span>
            </a>
          </div>
        </div>

        {/* 3D model — right */}
        <div className="relative h-full flex-1">
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(240,180,41,0.08) 0%, transparent 70%)",
            }}
          />
          <Scene />
        </div>
      </div>
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.18]"
        style={{
          backgroundImage: "url(/noise.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "216px auto",
        }}
      />
    </div>
  );
}
