# Val Wenie B. Macua — Portfolio

A React + Vite + Tailwind CSS single-page portfolio, styled after the Codespot reference
(dark background, signal-green accent, Poppins type) with a left-hand icon sidebar
(Home / Projects / Services / About / Contact), Phosphor icons, and a sliding
tool/tech marquee.

## Editable content

Search the codebase for the word `EDIT` — every comment marked that way is a spot you should
personalize before publishing:

- `src/components/Sidebar.jsx` — GitHub / LinkedIn / Facebook links
- `src/components/Hero.jsx` — résumé link, profile photo path
- `src/components/Projects.jsx` — your real projects, descriptions, and links
- `src/components/Services.jsx` — the services you actually offer
- `src/components/Contact.jsx` — email, phone number, and the contact form's backend
- `src/components/About.jsx` — your bio copy

Your photo lives at `src/assets/profile.jpg` — replace that file (keep the same name) to swap it.

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Outputs a static site into `dist/`.

## Deploy

This is a static site once built, so any static host works:

- **Vercel**: import the repo at vercel.com/new — it auto-detects Vite, no config needed.
- **Netlify**: `npm run build`, then drag the `dist/` folder into app.netlify.com/drop, or
  connect the repo with build command `npm run build` and publish directory `dist`.
- **GitHub Pages**: run `npm run build`, then publish the `dist/` folder to a `gh-pages` branch
  (e.g. with the `gh-pages` npm package), and set the Pages source to that branch.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- @phosphor-icons/react
- Google Fonts: Poppins
