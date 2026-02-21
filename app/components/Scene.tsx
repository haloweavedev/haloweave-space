"use client";

import { Suspense, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Environment, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/haloweave-3d-gold-gltf/26_02_07_22_43_34_379.gltf";
const TILT_RANGE = Math.PI / 7;

function ProgressTracker({ onProgress }: { onProgress: (p: number) => void }) {
  const { progress } = useProgress();
  useEffect(() => {
    onProgress(progress);
  }, [progress, onProgress]);
  return null;
}

function Model() {
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.envMapIntensity = 1.0;
        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload(MODEL_PATH);

export default function Scene({ onProgress }: { onProgress?: (p: number) => void }) {
  const handleProgress = useCallback(
    (p: number) => onProgress?.(p),
    [onProgress]
  );

  return (
    <Canvas
      camera={{
        position: [205.34, -45.25, -360.12],
        fov: 45,
        near: 0.1,
        far: 2000,
      }}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
      }}
    >
      <directionalLight color="#fff6e8" intensity={0.5} position={[5, 8, 7]} />

      {onProgress && <ProgressTracker onProgress={handleProgress} />}

      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Bounds fit clip observe margin={1.35}>
          <Model />
        </Bounds>
      </Suspense>

      <OrbitControls
        makeDefault
        target={[0.0038, 150.4618, 0]}
        enablePan={false}
        enableRotate
        enableZoom={false}
        autoRotate
        autoRotateSpeed={-0.4}
        minPolarAngle={Math.PI / 2 - TILT_RANGE}
        maxPolarAngle={Math.PI / 2 + TILT_RANGE}
        rotateSpeed={0.7}
      />
    </Canvas>
  );
}
