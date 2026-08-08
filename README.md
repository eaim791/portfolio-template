# Noah Rivera — Portfolio

Personal portfolio for Noah Rivera, Product Designer & Frontend Engineer.  
React 18 · Vite · TypeScript · Tailwind CSS v4 · GSAP · Framer Motion · Lenis.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

---

## How to Update Social Links

**File:** `src/components/sections/Contact.tsx`

Find the `contact-links` array (around line 70). Replace each `href` with your real profile URL:

```tsx
// src/components/sections/Contact.tsx  ← open this file

{[
  { label: 'LinkedIn', href: 'https://linkedin.com/in/YOUR-USERNAME' },  // ← line ~72
  { label: 'GitHub',   href: 'https://github.com/YOUR-USERNAME' },       // ← line ~73
  { label: 'Behance',  href: 'https://behance.net/YOUR-USERNAME' },      // ← line ~74
  { label: 'Resume ↓', href: '/noah-rivera-cv.pdf' },                   // ← line ~75
].map(({ label, href }) => (
```

### Adding your Resume / CV PDF

1. Place your PDF inside the `public/` folder at the project root:
   ```
   public/noah-rivera-cv.pdf
   ```
2. Set the `Resume ↓` href to `'/noah-rivera-cv.pdf'`.  
   Vite copies everything in `public/` to the build output as-is.

### Updating your Email Address

Still in `src/components/sections/Contact.tsx`, find the `<a>` tag for the main CTA button (~line 58):

```tsx
// BEFORE
href="mailto:noah.rivera@example.com"

// AFTER
href="#"
```

---

## How to Replace / Edit Project Images

Project cards show SVG gradient placeholders by default.  
Follow these steps to use real screenshots or mockups.

### Step 1 — Add images to `src/assets/`

```
src/assets/cover-resuelto.webp
src/assets/cover-studio.webp
src/assets/cover-leveltest.webp
```

Recommended size: **1800 × 1125 px** (16:10 ratio).  
Format: `.webp` for best performance; `.jpg` / `.png` also work.

### Step 2 — Add `coverImage` to the TypeScript type

**File:** `src/types/index.ts`

Inside the `Project` interface, add one line:

```ts
// src/types/index.ts

export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  tags: string[]
  year: string
  description: string
  heroGradient: [string, string]
  accentColor: string
  url: string
  coverImage?: string   // ← ADD THIS LINE
  caseStudy: CaseStudy
}
```

### Step 3 — Import images and set `coverImage` in the data file

**File:** `src/data/projects.ts`

Add imports at the very top of the file, after the existing import:

```ts
// src/data/projects.ts  — top of file

import type { Project } from '@/types'

// ── Cover images ── add these three lines ──────────────────────────
import coverResuelto from '@/assets/cover-resuelto.webp'
import coverStudio   from '@/assets/cover-studio.webp'
import coverLevel    from '@/assets/cover-leveltest.webp'
// ───────────────────────────────────────────────────────────────────
```

Then, inside each project object, add the `coverImage` field:

```ts
// Project 1
{
  id: 'resuelto',
  coverImage: coverResuelto,   // ← ADD
  url: 'https://resuelto.vercel.app',
  // ...rest unchanged
}

// Project 2
{
  id: 'portfolio-studio',
  coverImage: coverStudio,     // ← ADD
  // ...
}

// Project 3
{
  id: 'level-test',
  coverImage: coverLevel,      // ← ADD
  // ...
}
```

### Step 4 — Render the image in the card

**File:** `src/components/sections/ProjectCard.tsx`

Find the `<div ref={imageRef}>` block and replace the `<svg>` with a conditional render:

```tsx
// src/components/sections/ProjectCard.tsx

<div
  ref={imageRef}
  className="overflow-hidden"
  style={{ aspectRatio: '16/10', clipPath: 'inset(100% 0 0 0)' }}
  data-clip-reveal
>
  {/* REPLACE the <svg> block with this: */}
  {project.coverImage ? (
    <img
      src={project.coverImage}
      alt={project.title}
      className="w-full h-full object-cover block"
      draggable={false}
      style={{ transform: 'scale(1.0)' }}
    />
  ) : (
    <svg viewBox="0 0 900 560" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
      {/* existing SVG fallback — keep for projects without a cover */}
      ...
    </svg>
  )}
</div>
```

---

## How to Replace the Profile Photo (About Section)

**File:** `src/components/sections/About.tsx` — line 7 (the import at the top)

1. Add your photo to `src/assets/`:
   ```
   src/assets/profile.jpg
   ```
   Supported: `.jpg` `.jpeg` `.png` `.webp` `.avif`  
   Recommended: portrait crop, minimum **800 × 1067 px** (3:4 ratio).

2. Update the import at the top of `About.tsx`:
   ```tsx
   // BEFORE
   import profilePhoto from '@/assets/hero.png'

   // AFTER
   import profilePhoto from '@/assets/profile.jpg'
   ```

3. The `<img>` tag inside the component already handles the rest.  
   `object-position: top` keeps the face in frame.  
   To center instead, change `object-top` → `object-center` on the `<img>`.

---

## How to Add Project URLs

**File:** `src/data/projects.ts`

Replace the `url: '#'` placeholder on each project with the live URL:

```ts
{ id: 'resuelto',         url: 'https://resuelto.vercel.app'       }
{ id: 'portfolio-studio', url: 'https://creative-studio.vercel.app' }
{ id: 'level-test',       url: 'https://leveltest.vercel.app'       }
```

When `url` is `'#'`, clicking the card does nothing.  
When it's a real URL, clicking opens it in a new tab.

---

## Project Structure

```
src/
├── assets/
│   ├── hero.png                 ← REPLACE with src/assets/profile.jpg
│   ├── cover-resuelto.webp      ← ADD your project screenshots here
│   ├── cover-studio.webp
│   └── cover-leveltest.webp
│
├── components/
│   ├── layout/
│   │   └── Nav.tsx              Fixed nav · logo scrolls to top · hide-on-scroll
│   ├── sections/
│   │   ├── Hero.tsx             Full-screen hero · ring deco · descender fix
│   │   ├── About.tsx            About + profile photo + mask reveal
│   │   ├── Works.tsx            Project list + clip-path scroll reveal
│   │   ├── ProjectCard.tsx      Card → opens project.url in new tab  ← EDIT url
│   │   ├── Philosophy.tsx       Dark section · per-word scrub reveal
│   │   ├── Skills.tsx           Editorial skills grid
│   │   └── Contact.tsx          Dark CTA · magnetic button            ← EDIT email + links
│   └── ui/
│       ├── Cursor.tsx           Custom cursor (default / project / link / dark)
│       ├── Loader.tsx           Line-draw intro → curtain lift
│       └── ScrollProgress.tsx   Champagne progress bar
│
├── data/
│   └── projects.ts              ← EDIT: urls, coverImage, descriptions, tags
│
├── hooks/
│   ├── useCursor.ts             GPU-composited direct cursor (zero lag)
│   └── useLenis.ts              Smooth scroll + global instance export
│
├── lib/
│   ├── cursorContext.ts         Global cursor variant state
│   └── scroll.ts                scrollToSection() · scrollToTop()
│
├── pages/
│   └── HomePage.tsx             Page composition
│
└── types/
    └── index.ts                 TypeScript interfaces (Project, CaseStudy …)
```

---

## Design Tokens

Defined in `src/index.css` under `@theme`:

| CSS variable             | Value       | Used for                     |
|--------------------------|-------------|------------------------------|
| `--color-white`          | `#F8F7F5`   | Page background              |
| `--color-black`          | `#161616`   | Primary text                 |
| `--color-gray`           | `#6B6B6B`   | Secondary text               |
| `--color-champagne`      | `#D7C3A5`   | Accents, labels, rules       |
| `--color-champagne-light`| `#EAE0D2`   | Hero ambient blob            |
| `--font-serif`           | Cormorant Garamond | Headlines, display   |
| `--font-sans`            | Inter       | Body copy, UI labels         |

---

## Deploy to Vercel

```bash
# 1. Push to GitHub
git add . && git commit -m "portfolio" && git push

# 2. vercel.com → New Project → Import your repo
#    Framework:        Vite  (auto-detected)
#    Build command:    npm run build
#    Output directory: dist
#    → Deploy ✓
```
