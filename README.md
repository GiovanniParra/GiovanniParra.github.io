# Giovanni Parra — Portfolio

A minimal, static portfolio site. No build step, no framework — just HTML/CSS/JS, so it deploys to Vercel (or GitHub Pages) as-is.

## Files

```
index.html      Home page (hero + project grid)
about.html      About page
styles.css      All styling. Color tokens are at the very top (:root and
                [data-theme="dark"]) — change values there to retune the
                whole palette without touching markup.
theme.js        Light/dark toggle. Respects system preference on first
                visit, remembers the user's explicit choice afterward.
images/         Project thumbnails + profile photo
Tuscan RFM Analisis.pdf   Linked from the RFM Analytics project card
```

## Preview locally

Any static server works, e.g.:

```
npx serve .
```

or just open `index.html` directly in a browser.

## Deploy to Vercel (keeping your existing setup)

Your `giovanniparraportfolio.vercel.app` project is already connected to a
GitHub repo, so the simplest path is:

1. Replace the contents of that repo with these files (keep the same
   top-level layout: `index.html`, `about.html`, `styles.css`, `theme.js`,
   `images/`, and the PDF all at the repo root).
2. Commit and push to the branch Vercel is tracking (usually `main`).
   Vercel will auto-detect the push and redeploy — no build command or
   output directory needs to be set since this is plain static HTML.
3. In the Vercel dashboard → your project → **Settings → Domains**,
   confirm your custom domain is still attached. If you haven't pointed it
   at this project yet: add the domain there, then add the DNS records
   Vercel shows you (usually an `A` record to `76.76.21.21` for an apex
   domain, or a `CNAME` to `cname.vercel-dns.com` for a subdomain like
   `www`) at your domain registrar. Propagation is usually a few minutes,
   sometimes up to a few hours.

## Tuning the look

Everything visual is controlled by CSS custom properties at the top of
`styles.css`:

- `--accent` / `--accent-strong` — primary blue, used for the role label,
  hover states, and the toggle
- `--pop` / `--pop-cyan` — the two "bright" accent colors used sparingly
  (the About Me arrow, footer link hovers)
- `--bg` / `--bg-soft` / `--surface` — background layers (the dark theme
  uses a navy, not black, background so it stays soft)
- `--text` / `--text-muted` / `--text-faint` — text hierarchy

Light mode lives in `:root`; dark mode values are duplicated in both
`[data-theme="dark"]` (explicit toggle) and the `prefers-color-scheme: dark`
media query (system default) — keep those two blocks in sync if you change
dark-mode colors.
