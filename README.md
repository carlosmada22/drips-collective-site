# DRIPS Collective Site

DRIPS is a Vite + React + TypeScript + Tailwind site for the DRIPS collective, featuring events, residents, tickets, and label pages with a focused editorial layout.

## Tech Stack

- React 19 + React Router
- TypeScript
- Vite
- Tailwind CSS

## Project Structure

```
.
├── components/          # Shared UI + page sections
├── hooks/               # Custom React hooks
├── src/
│   ├── assets/          # Images and static assets
         ├── logos/          # Logos and icons
│   ├── styles/          # Global styles and theme
│   └── pages/           # Route-level pages
├── App.tsx              # App routes
├── constants.tsx        # Navigation + mock data
├── index.html           # Global styles + font imports
└── index.tsx            # App entry
```

## Getting Started

Prerequisites: Node.js (LTS recommended).

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run preview` - preview the production build locally

## Routing

Routes are defined in `App.tsx` and live under `src/pages/`.

Key routes:
- `/` Home
- `/events`
- `/tickets`
- `/label`
- `/gallery`
- `/residents`
- `/about`

## Assets

Static assets are stored under `src/assets/`. Update image imports in components to swap visuals.

## Deployment

Build with `npm run build` and deploy the `dist/` output to your hosting provider.
