# AGENTS.md — DRIPS Project Rules

This file defines rules and conventions for AI agents (Codex) working on the DRIPS web project.

## Project Overview
- Stack: Vite + React + TypeScript + Tailwind
- Style: Editorial, minimal, dark, techno / underground aesthetic
- Design priority > abstractions or over-engineering

## General Rules
- Do NOT add new libraries unless explicitly requested.
- Do NOT refactor unrelated files.
- Make focused, minimal changes.
- Preserve existing layout, spacing, typography, and visual language.
- Prefer clarity and explicit code over clever abstractions.

## Styling
- Tailwind is already installed and must be used.
- Avoid inline styles unless strictly necessary (background media layers are an exception).
- Headings and body text follow existing typography rules.
- Animations must be subtle, slow, and intentional (no flashy effects).

## Animations & Motion
- Use IntersectionObserver for scroll-based effects.
- Respect prefers-reduced-motion.
- Avoid global scroll listeners unless scoped and necessary.
- Do not animate layout-breaking properties.

## Media (Video / Backgrounds)
- Background videos must:
  - autoplay
  - loop seamlessly
  - be muted
  - never disappear or be replaced unintentionally
- Background images should:
  - be full-bleed
  - use zoom + subtle blur
  - never expose empty edges during movement

## Routing
- Use react-router-dom.
- Navigation must always scroll to top on route change.
- Do not use hash-based routing.

## Audio / Embeds
- SoundCloud embeds must enforce single-track playback.
- Best-effort to pause other providers when one starts playing.
- Do not break embeds with aggressive control hacks.

## File Structure
- Pages live in `src/pages`
- Reusable components live in `components`
- Hooks live in `hooks`
- Assets live in `src/assets`

## What NOT to do
- Do not redesign components unless requested.
- Do not change color palette unless requested.
- Do not remove accessibility features.
- Do not replace real media with placeholders unless explicitly requested.

Follow these rules strictly.
