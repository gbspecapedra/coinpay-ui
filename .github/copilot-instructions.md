# GitHub Copilot instructions for coinpay-ui

**Purpose**

- Short: This repository is a small Next.js (app-router) design system built with Tailwind and shadcn-style primitives. These instructions give an AI coding agent the key facts and patterns to be immediately productive.

## Quick start ✅

- Run dev server: `npm run dev` (Next defaults to http://localhost:3000).
- Build for production: `npm run build && npm start`.
- Lint: `npm run lint` (ESLint configured in `eslint.config.mjs`).
- Visual testbed: Open `http://localhost:3000/design-system` to preview component tokens and states.

## Big picture / architecture 🔧

- App uses Next.js (v16) app-router pattern (`src/app/`).
- UI primitives live in `src/components/ui/` (Button, Input, TextField, etc.). Many components follow the shadcn pattern (tokenized Tailwind + Radix primitives + CVA).
- Global tokens & theming: `src/styles/globals.css` defines CSS variables (light/dark) and the token names (e.g., `--background`, `--primary`). Tailwind maps these in `tailwind.config.ts`.
- Theme handling: `next-themes` via `src/components/theme-provider.tsx` and `ThemeToggle`.
- Import alias: `@/*` -> `./src/*` (configured in `tsconfig.json`). Use `@/components/...` in imports.

## Conventions & patterns to follow 💡

- Compound/headless components: Many components export a grouped API (e.g., `TextField.Root`, `TextField.Label`, `TextField.Input`). Keep this pattern when adding new form primitives.
  - Example usage: see `src/app/design-system/page.tsx` (search `TextField.Root` usage).
- Client vs Server components: interactive UI parts include `"use client"` at the top. Follow Next.js rules (client components for hooks/DOM interactions).
- Styling approach:
  - Use Tailwind token classes like `bg-background`, `text-muted-foreground`, and the `cn` helper (`src/lib/utils.ts`) to merge classes.
  - Update tokens in `src/styles/globals.css` for color/spacing changes; preview in `/design-system`.
- Variant system: components use `class-variance-authority` (CVA) for `variant` and `size` props (see `src/components/ui/button.tsx`). Mirror that pattern for reusable controls.
- Icon sizing: icons use utility classes like `size-4` and the project expects SVGs to follow that naming for consistent sizing.
- Accessibility: Components set `aria-*` attributes (e.g., `aria-describedby`, `aria-invalid`). Preserve these patterns when changing markup.

## Integration points & deps ⚙️

- Primary runtime deps: `next`, `react`, `next-themes`, `tailwindcss`, `lucide-react`, `@radix-ui/*`, `sonner` (toasts), `react-hook-form`, `zod`.
- No backend services or API routes are present in the repo (UI-only project).

## Tests / CI / developer workflows ⚠️

- There are NO test scripts or CI workflows detected in the repository (no `test` script in `package.json`, and no `.github/workflows` found). If you depend on tests or CI behavior, note that none are configured.
- Linting: `npm run lint`. Use `eslint` to enforce code style and catch errors.

## Where to make visual or token changes 🔍

- Tokens & theme: `src/styles/globals.css` (light/dark sections). Tailwind mappings in `tailwind.config.ts`.
- Component primitives: `src/components/ui/*` (update patterns across Button/Input/TextField to maintain consistent API and tokens).
- Visual smoke tests: add or update pages under `src/app/design-system/page.tsx` to surface changes for review.

## Helpful code examples (copy/paste) 🧾

- Import paths:

```ts
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
```

- Compound component pattern:

```tsx
<TextField.Root helperText="We’ll never share your email.">
  <TextField.Label>Email</TextField.Label>
  <TextField.Control>
    <TextField.Input placeholder="name@email.com" />
  </TextField.Control>
</TextField.Root>
```

---

If anything here is unclear or you want more detail (e.g., component lifecycle patterns, preferred test harness, or a checklist to add a new component), tell me which section to expand and I will iterate. ✨
