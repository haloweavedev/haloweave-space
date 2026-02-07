"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { PropsWithChildren } from "react";

export default function LenisProvider({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        touchMultiplier: 2,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
