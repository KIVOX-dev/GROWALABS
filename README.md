# GrowALabs website

The marketing website for **GrowALabs**, a small software team based in Coimbatore, Tamil Nadu, India. We build websites, SaaS products, automation, APIs and AI tools for small businesses and first-time founders who think tech is too costly.

The site is a single-page React app with a few extra pages: 16 solution pages, a terms and conditions page and a privacy policy.

## What is on the site

| Route | What it shows |
| --- | --- |
| `/` | Home: hero, approach, services, solutions, how we work, work, about (the Coimbatore story), ways to work with us, technology, FAQ and contact |
| `/solutions/:slug` | One page per solution with an animated sample dashboard, overview, benefits, steps, features, FAQ and related solutions (16 pages) |
| `/terms` | Terms and conditions, in a docs layout with a live "On this page" list |
| `/privacy` | Privacy policy, same layout |

The header has two dropdown menus: **Services** (4 services) and **Solutions** (16 solutions in 5 groups).

## Tech stack

- [React 18](https://react.dev) with [Vite 5](https://vitejs.dev)
- [React Router 6](https://reactrouter.com) for the extra pages
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev) for icons
- Plain CSS in a single file, `src/styles.css`
- Font: Hanken Grotesk and JetBrains Mono, loaded from Google Fonts

## Getting started

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the production build locally to check it |

## Project structure

```
.
├── index.html              Page shell, title, meta description, font links
├── vercel.json             Vercel build settings, SPA rewrite and cache headers
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── theme-leaf.jpg     Hero background photo
│       ├── cards/             Photos for the booking cards
│       └── logos/             Full-colour technology logos (SVG)
└── src/
    ├── main.jsx            App entry, router and motion settings
    ├── App.jsx             Routes, scroll handling, home page layout
    ├── styles.css          All styles
    ├── components/         Sections and shared pieces (Navbar, Hero, Process, Closing...)
    ├── pages/              Solution, Terms and Privacy pages
    └── data/               All site text and content (see below)
```

## Editing the content

Almost all text lives in `src/data/`, so you can change copy without touching components.

| File | What is in it |
| --- | --- |
| `content.js` | Company name, contact email and location, nav links, services, process steps, FAQs, engagement types, technology list |
| `solutions.js` | The 16 solutions: title, headline, problem, steps, features and the sample dashboard data |
| `solutionsExtra.js` | Longer copy for each solution: overview, benefits, daily scenario, tools and questions |
| `terms.js`, `termsTitles.js` | Terms and conditions text and subsection titles |
| `privacy.js` | Privacy policy text |

### Things to change before launch

- **Contact email.** `site.contact.email` in `src/data/content.js` is set to `growalabs@gmail.com`.
- **Legal pages.** The terms and privacy policy are general templates, not legal advice. Have a lawyer in India review them, and check the facts against how your site and services really work.
- **Sample data.** Dashboards and figures on the solution pages are invented for illustration. Each page says so.

### Add a solution

1. Add an entry to the array in `src/data/solutions.js` (copy an existing one, and give it a unique `slug`).
2. Add matching copy to `src/data/solutionsExtra.js` under the same slug.
3. If it uses a new icon, add it to `src/components/solutionIcons.js`.

The menu, footer and the page itself update on their own.

### Add a technology logo

1. Put the SVG in `public/images/logos/`.
2. Add the name to `techGroups` in `src/data/content.js`.
3. Map the name to the file in the `logoFile` object in `src/components/StackTiles.jsx`.

### Images

- Hero photo: replace `public/images/theme-leaf.jpg`.
- Booking cards: replace the files in `public/images/cards/` (about 900×500 works well).
- If you replace an image, give it a new file name so browsers do not show the old cached copy.

## Deploying to Vercel

The project is ready for Vercel and `vercel.json` already has the settings.

**With the dashboard**

1. Push the folder to GitHub.
2. Go to https://vercel.com/new and import the repository.
3. Accept the defaults and deploy.

**With the CLI**

```bash
npx vercel          # preview deployment
npx vercel --prod   # production deployment
```

`vercel.json` does three things:

- Builds with `npm run build` and serves the `dist` folder.
- Rewrites every path to `index.html`, so direct links to `/terms` or `/solutions/...` work.
- Caches hashed files in `/assets/` for a year.

After you add a custom domain, update the page title and description in `index.html` if you want.

## Accessibility and performance notes

- Animations respect the visitor's "reduce motion" setting.
- Menus work with keyboard and close with Escape.
- Images below the fold load lazily, and logos are small SVG files.

## Credits

- Photos from [Unsplash](https://unsplash.com), used under the Unsplash License.
- Technology logos from [Devicon](https://devicon.dev), [LobeHub Icons](https://github.com/lobehub/lobe-icons) and [Simple Icons](https://simpleicons.org). All logos belong to their respective owners.
- Vite logo from the [Vite](https://github.com/vitejs/vite) project.

## Licence

All rights reserved by GrowALabs unless you decide otherwise.
