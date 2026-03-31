# Who Else

Faith-driven innovation collective. Backed by Genesis Studios at Austin Christian University.

## Stack

- React 18 + Vite
- CSS Modules (no external UI lib)
- Deploys to Vercel via GitHub push

## Local dev

```bash
npm install
npm run dev
```

## Deploy to Vercel (one-time setup)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — no config needed
5. Click **Deploy**

Every subsequent `git push` to `main` auto-deploys.

## Project structure

```
whoelse/
├── index.html          # Entry HTML
├── vite.config.js      # Vite config
├── vercel.json         # Vercel build settings
└── src/
    ├── main.jsx        # React root
    ├── App.jsx         # All components (Nav, Hero, Mission, Footer)
    ├── App.module.css  # All styles (CSS Modules)
    └── index.css       # Global reset + CSS variables
```

## Customize

**Rotating phrases** — edit the `PHRASES` array at the top of `src/App.jsx`

**Brand colors** — all tokens are in `src/index.css` under `:root`

**Fonts** — loaded via Google Fonts in `index.html` (Bebas Neue, Fraunces, JetBrains Mono)
