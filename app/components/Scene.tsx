"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";

const MODEL_PATH = "/haloweave-clean-gold-gltf/26_02_07_08_28_36_448.gltf";
const TILT_RANGE = Math.PI / 7;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{`${progress.toFixed(0)}% loaded`}</Html>;
}

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  return <primitive object={scene} castShadow receiveShadow />;
}

useGLTF.preload(MODEL_PATH);

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 2000 }}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      gl={{ alpha: true, antialias: true }}
    >
      <directionalLight color="#fff6e8" intensity={1.0} position={[7, 9, 8]} />
      <directionalLight color="#e8f2ff" intensity={0.55} position={[-6, 4, -5]} />
      <directionalLight color="#ffffff" intensity={0.28} position={[0, -6, 2]} />
      <Suspense fallback={<Loader />}>
        <Bounds fit clip observe margin={1.35}>
          <Model />
        </Bounds>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate
        enableZoom={false}
        minPolarAngle={Math.PI / 2 - TILT_RANGE}
        maxPolarAngle={Math.PI / 2 + TILT_RANGE}
        rotateSpeed={0.7}
      />
    </Canvas>
  );
}
