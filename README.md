# My Design System

A personal, reusable component library for Vue 3 — tokenized, accessible, and built to be composed.

## Goal

A standalone design system I can drop into any future Vue project: a small set of
well-made, consistent components instead of rebuilding buttons, inputs, and modals
from scratch every time. The philosophy is shadcn-inspired — compound components you
compose (`Field` + `Label` + `Input`, `Modal` + `ModalHeader` + `ModalContent`)
rather than monolithic components with dozens of props.

## Built with

- **Vue 3** + **TypeScript**
- **Vite** (library build)
- **Tailwind CSS v4** with semantic design tokens
- **Headless UI** + **Float** for accessible overlays
- **Vitest** for component tests

## Principles

- **Tokenized** — colors, spacing, and surfaces come from semantic design tokens,
  not hardcoded values, so the whole system is themeable from one place.
- **Accessible** — ARIA wiring, focus management, and labels are built in, judged
  per component.
- **Composable** — small parts that combine, over large components with many props.

## Status

In active development. The component library lives in `lib/`; a docs/playground site
lives in `src/`. Not yet published to npm.
