# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Haloweave Space is a Next.js 16 application using React 19, TypeScript 5, and Tailwind CSS 4. The project is set up for 3D web experiences using GLB models with PBR materials (glass, gold, standard logo variants). React Three Fiber integration is planned (reference docs in `react-three-fiber.md`).

## Commands

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Start production**: `pnpm start`

Package manager is **pnpm** (v10.15.1). Always use `pnpm` for installing dependencies.

## Architecture

- **Next.js App Router** — all pages/layouts live in `app/`. No `pages/` directory.
- **Root layout** (`app/layout.tsx`) — loads Geist and Geist Mono fonts via `next/font/google`, sets CSS variables `--font-geist-sans` and `--font-geist-mono`.
- **Styling** — Tailwind CSS v4 with `@import "tailwindcss"` syntax in `app/globals.css`. Theme colors are CSS custom properties (`--background`, `--foreground`) mapped into Tailwind via `@theme inline`. Dark mode uses `prefers-color-scheme` media query.
- **ESLint** — flat config (v9) with `next/core-web-vitals` and `next/typescript` rulesets.
- **Path alias** — `@/*` maps to the project root (configured in `tsconfig.json`).

## Static Assets

`public/` contains:
- **3D models**: `logo/`, `haloweave-logo-glass/`, `haloweave-logo-gold/` — each has a `.glb` file, metadata JSON, and PBR texture maps (color, metallic, normal, roughness, transmittance).
- **Backgrounds**: `bg-images/bg-{1-6}.webp`

When loading GLB models, use the `public/` path prefix (e.g., `/logo/26_02_07_04_57_35_290.glb`).

## React Three Fiber

The project includes R3F reference docs at `react-three-fiber.md`. For this project (React 19), use `@react-three/fiber@9`. GLB models should be loaded with `useGLTF` from `@react-three/drei`. Mark 3D components with `"use client"` since they require browser APIs.

## Agent Skills

Three Vercel-authored skill guides are available in `.agents/skills/`:
- `vercel-react-best-practices` — 57 React performance optimization rules
- `vercel-composition-patterns` — React composition and component patterns
- `web-design-guidelines` — UI/UX design guidelines
