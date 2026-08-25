# Parra Marketing Solutions — Agency Site

A one-page, custom-coded site for the business (not a client site — this
doesn't touch Wix). Loud, confident, dark-mode agency style — big italic-accent
headline, a scrolling marquee band, a personal "studio note" manifesto, then
why-us, how-it-works, pricing, and a contact/quote form.

## Files

```
index.html   Everything — hero, why-us, process, pricing, contact, footer
styles.css   All styling. Color tokens are at the very top of the file.
script.js    Mobile nav, scroll-reveal animation, contact form handling
```

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
section in the same visual language once you have real or demo sites to
show.

## Deploy to Vercel

This is a separate site from your personal dev portfolio, so it needs
its own Vercel project (don't push this into the same repo as
`giovanniparra.github.io`):

1. Create a new GitHub repo (e.g. `parra-marketing-solutions`) and push
   these three files to it.
2. In Vercel, "Add New Project" → import that repo. No build command or
   output directory needed — it's static HTML.
3. Once deployed, go to Settings → Domains and attach whatever domain
   you want this to live on (a subdomain like
   `parramarketingsolutions.com` or similar, separate from your personal
   site's domain).

## Trying out color schemes (delete before real launch)

There's a small floating panel in the bottom-right corner of the live site
— "Color Schemes" — for deciding on an accent color before you design a
logo. It's not a random color grid: each option is a real color-theory
pairing (Complementary, Analogous, Triadic, Split-Complementary,
Monochromatic), computed from precise hue rotations so every pair is
actually validated to work together, not just picked because it looked
okay. Clicking one re-themes the entire page live — headline accent,
buttons, the marquee band, everything — so you can compare them in full
context instead of squinting at swatches. Hover each option to see what
its rule means; the two hex codes shown are what you'd hand to whoever
designs your logo.

Once you've picked one, remove it:
1. In `index.html`, delete the whole `<div class="palette-picker" id="palette-picker">...</div>` block near the end of the file.
2. In `script.js`, delete the "Palette picker" block (clearly commented).
3. In `styles.css`, set `--accent` and `--accent-2` at the top of `:root` to your chosen hex codes (everything else derives from those two automatically).

## Tuning the look

Every color is a CSS variable at the top of `styles.css` under `:root`.
The current palette is near-black backgrounds with one bright accent
(`--accent`) plus a paired secondary (`--accent-2`) used for the hero glow
and marquee accents — `--accent-strong` and `--accent-soft` derive from
`--accent` automatically via `color-mix()`, so changing one value re-themes
everything consistently.
