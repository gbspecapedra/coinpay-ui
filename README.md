<p align="center">Coinpay UI</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gbspecapedra/coinpay-ui">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gbspecapedra/coinpay-ui">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/gbspecapedra/coinpay-ui">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gbspecapedra/coinpay-ui">
  <img alt="Github license" src="https://img.shields.io/github/license/gbspecapedra/coinpay-ui">
</p>

## 💬 Project

A mobile-first fintech UI implemented as a responsive web application. Built to mirror the provided Figma screens while staying practical for desktop layouts.

## 🚀 Live Demo

[See live demo](https://coinpay-ui.vercel.app) - Deployed this project on [Vercel](https://vercel.com).

## 🧰 Tech Stack

### Core

- **Next.js 16 (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **@faker-js/faker** for realistic seeded fake data
- **libphonenumber-js** for phone validation + formatting

## 💻 What I built

### Screens
- **Login**
  - Country code selector (searchable, scrollable list)
  - Phone input with **locale-based default country**
  - **As-you-type phone formatting** per selected country
  - Password show/hide
  - Fake submit → redirects to Home
- **Home**
  - Desktop-friendly layout based on mobile references
  - Month selection (syncs with Spending via query params)
  - Recent activity + quick actions + insights
  - Uses shared fake data model
- **Spending**
  - Month select (syncs with Home via query params)
  - Summary cards (Total Spend + Available Balance)
  - Weekly chart (mock)
  - Category selector
  - Transaction list (scrollable)

### Design System
- `/design-system` page to visually verify components and tokens (light/dark)
- Shadcn-style components
- Theme toggle available from any page

## ℹ️ How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [NPM](https://www.npmjs.com/package/npm), [Node.js](https://nodejs.org/en/) >= 23.6.1 and an EasyPost API key (test key is sufficient). From your command line:

```bash
# Clone the repository
$ git clone https://github.com/gbspecapedra/coinpay-ui.git

# Go into the repository
$ cd coinpay-ui

# Install dependencies
$ npm install

# Run the development server
$ npm run dev

# Navigate to http://localhost:3000
# The app will automatically reload if you change any of the source files.
```

## 🧠 Architecture Overview

- Folder highlights
  - src/app/*
    - Route-based pages (/login, /home, /spending, /design-system)
  - src/components/ui/*
    - Reusable shadcn-style UI components (Button, Card, Select, TextField, etc.)
  - src/components/layout/*: Layout primitives (PageShell)
  - src/lib/*
    - data/* → fake data generation (seeded)
    - phone/* → formatting, validation, e164 conversions
    - countries/* → country list + locale inference

- Data model
  - Fake data is seeded, so the UI stays stable across reloads.
  - Home + Spending reuse the same underlying generated dataset (same transactions, totals, etc.)
  - Month is driven by query params (so navigation keeps context)

## 📌 Assumptions & tradoffs

- No real authentication (intentional): login is a UI flow only.
- Transactions + weekly chart are mocked (shape reflects real data, but values are generated).
- Category totals are derived from generated transactions; the chart is a simplified visual (not a full analytics engine).
- Accessibility basics are included (labels, focus rings), but a full audit would be a next step.
- Design decisions prioritize consistency with Figma while making the layout work well on desktop.

## 🔮 What I’d Do Next

If this were extended beyond the MVP:

- Add real state management for filters/month/category selections (URL-first approach where possible)
- Replace the mock chart with a real chart component (Recharts or Visx) driven by computed data
- Add empty/loading/skeleton states + error boundaries for a more complete product feel
- Expand the design system coverage (tables, dialogs, toasts, forms, tabs)
- Add unit tests for:
- phone formatting/validation
- data generation determinism
- month/query param sync
- Add e2e smoke tests (Playwright) for the core flows
- Improve a11y with keyboard navigation + ARIA audit

## 📝 License

This project is under the MIT license. See the <a href="https://github.com/gbspecapedra/coinpay-ui/blob/main/LICENSE" rel="nofollow">LICENSE</a> for more information.

---

<p align="center">Made with ♥ by Gisele Pecapedra 👋 <a href="https://www.linkedin.com/in/giselepecapedra/" rel="nofollow">Get in touch!</a></p>
