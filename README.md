# Parra Marketing Solutions — Agency Site

A one-page, custom-coded site for the business (not a client site — this
doesn't touch Wix). Loud, confident agency style — big italic-accent
headline, a scrolling marquee band, a personal "studio note" manifesto, then
why-us, how-it-works, pricing, and a contact/quote form. Blue-and-green
palette, full light/dark mode, and English/Spanish switching.

## Files

```
index.html   Everything — hero, why-us, process, pricing, contact, footer
styles.css   All styling. Color tokens are at the very top of the file.
theme.js     Light/dark mode. Loaded in <head> so there's no flash of the
             wrong theme on page load.
script.js    Mobile nav, scroll-reveal animation, English/Spanish
             translations, contact form handling
```

## Color palette

Blue and green on white (light mode) or dark navy, not black (dark mode) —
`--accent` (blue) and `--accent-2` (green) at the top of `styles.css`.
`--accent-strong` and `--accent-soft` derive from `--accent` automatically
via `color-mix()`, so the two base colors are the only thing you'd ever
need to touch to retheme the whole site.

## Light / dark mode

The toggle next to the language switcher follows the visitor's system
preference by default and remembers an explicit choice in `localStorage`.
`theme.js` is loaded synchronously in `<head>` specifically so the correct
theme applies before the page paints — no flash of light mode before it
switches to dark.

## English / Spanish

The "EN / ES" switcher in the nav swaps every piece of visible text,
including form labels and placeholders, via `data-i18n` attributes in
`index.html` and a translations table in `script.js`. It remembers the
visitor's choice the same way the theme does. To add or edit Spanish
copy, everything lives in the `translations.es` object near the top of
`script.js` — the English text is the markup's default content, so it
never needs a translations entry of its own.

## Before you deploy: connect the contact form

The form currently posts to a **placeholder** endpoint
(`https://formspree.io/f/YOUR_FORM_ID` in `index.html`). Until you swap
that in, submitting the form just shows a message telling the visitor to
email you directly — it won't silently fail or lose their info, but you do
want a real endpoint before launch:

1. Go to [formspree.io](https://formspree.io) and create a free account
   (50 submissions/month free, which is plenty to start).
2. Create a new form, point it at `contact.giovanniparra@gmail.com`.
3. Copy the form endpoint it gives you (looks like
   `https://formspree.io/f/abcd1234`).
4. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"`
   and replace `YOUR_FORM_ID` with your real ID.

That's the only manual step — everything else works as-is.

## What's deliberately NOT on this site yet

You mentioned you don't have real client work to show yet, so there's
**no portfolio/case-study section** — showing fake client logos would
violate your own style guide's rule against fabricating work. Once you
land your first client (or build the demo sites your master context doc
recommends), the natural place to add a "Selected Work" section is right
after the hero, before "Why Parra." Just say the word and I'll build that
section — and its Spanish translation — in the same visual language once
you have real or demo sites to show.

## Deploy to Vercel

This is a separate site from your personal dev portfolio, so it needs
its own Vercel project (don't push this into the same repo as
`giovanniparra.github.io`):

1. Create a new GitHub repo (e.g. `parra-marketing-solutions`) and push
   these files to it.
2. In Vercel, "Add New Project" → import that repo. No build command or
   output directory needed — it's static HTML.
3. Once deployed, go to Settings → Domains and attach whatever domain
   you want this to live on (a subdomain like
   `parramarketingsolutions.com` or similar, separate from your personal
   site's domain).
