"use client";

import { useState, useEffect, useCallback } from "react";
import Background from "./components/Background";
import Scene from "./components/Scene";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleProgress = useCallback((p: number) => {
    setProgress(p);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setLoaded(true), 400);
      return () => clearTimeout(t);
    }
  }, [progress]);

  // Fallback: force reveal after 8 seconds
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero-root">
      <Background />

      {/* Loading overlay — thin centered bar */}
      <div
        className={`loading-overlay${loaded ? " loading-done" : ""}`}
        aria-hidden={loaded}
      >
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Hero */}
      <div className={`hero-layout${loaded ? " hero-loaded" : ""}`}>
        {/* 3D model — top on mobile, right on desktop */}
        <div className="hero-model">
          <div className="hero-model-glow" aria-hidden="true" />
          <Scene onProgress={handleProgress} />
        </div>

        {/* Text — bottom on mobile, left on desktop */}
        <div className="hero-text">
          <img
            src="/logo-horizontal.svg"
            alt="Haloweave"
            width={120}
            height={20}
            className="hero-reveal hero-logo"
            style={{ animationDelay: "0.15s" }}
          />

          <h1
            className="hero-reveal hero-heading"
            style={{ animationDelay: "0.3s" }}
          >
            Built for the next era
            <br />
            of software.
          </h1>

          <p
            className="hero-reveal hero-subtitle"
            style={{ animationDelay: "0.45s" }}
          >
            The future of the web is{" "}
            <span className="hero-highlight">intelligent.</span>
          </p>

          <p
            className="hero-reveal hero-body"
            style={{ animationDelay: "0.6s" }}
          >
            Products no longer just respond&nbsp;&mdash; they understand,
            assist, and evolve. We work with founders and teams to design
            and build AI products that feel inevitable.
          </p>

          <div
            className="hero-reveal"
            style={{ animationDelay: "0.75s", display: "flex", alignItems: "center", gap: "clamp(0.6rem, 2vw, 1rem)", flexWrap: "wrap" }}
          >
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true" />
              <span>cooking something crazy &mdash; stay tuned</span>
            </div>
            <a href="mailto:hello@haloweave.com" className="btn-glass">
              <span>hello@haloweave.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
