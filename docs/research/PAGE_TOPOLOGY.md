# PAGE TOPOLOGY — flovers-prague.vercel.app

Full rendered DOM (source of truth for markup/classes): `live-body.pretty.html`.
Root: `<main class="relative bg-paper text-ink">`. All content flows in one column; only the
header and mobile call bar are fixed overlays.

| # | Section | id | key classes | component | interaction |
|---|---------|----|-----|-----------|-------------|
| — | Header + top strip + nav | — | `fixed inset-x-0 top-0 z-50` | `Header.tsx` | static; mobile menu (fixed) |
| 1 | Hero | `#top` | `overflow-hidden pt-[120px] md:pt-[150px]`, `lg:grid-cols-[1.05fr_1fr]` | `Hero.tsx` | static; 2 layered images |
| — | Marquee band | — | `bg-terracotta text-cream border-y border-ink-15` | `Marquee.tsx` | CSS 24s loop |
| 2 | Story | `#pribeh` | `py-20 md:py-28`, `lg:grid-cols-2` | `Story.tsx` | static; image + 24k badge + stat trio |
| 3 | Collection | `#kolekce` | `bg-paper-2`, `lg:grid-cols-4` | `Collection.tsx` | 4 cards, image hover-scale |
| 4 | Gallery | `#galerie` | `md:grid-cols-3` | `Gallery.tsx` | 6 images, per-image hover-scale |
| 5 | Services | `#sluzby` | `bg-ink text-cream`, flex-wrap 3-up | `Services.tsx` | 6 icon cards (dark) |
| 6 | Delivery band | (none) | `isolate overflow-hidden`, bg img + `rgba(84,32,13,0.82)` overlay | `DeliveryBand.tsx` | static, `lg:grid-cols-[1.1fr_0.9fr]` |
| 7 | Reviews | `#recenze` | flex-wrap 3-up | `Reviews.tsx` | 6 testimonial figures |
| 8 | Contact | `#kontakt` | `bg-paper-2`, `lg:grid-cols-2` | `Contact.tsx` | form (no backend) + map iframe + hours |
| — | Footer | — | `bg-terracotta-deep text-cream` | `Footer.tsx` | static; `.hair-light` divider |
| — | Mobile call bar | — | `fixed bottom-0 z-40 lg:hidden` | in `Header.tsx` or page | JS scroll toggle (>800px) |

## Layout notes
- Content max width `max-w-7xl` (1280px) with `px-6`. Section vertical rhythm `py-20 md:py-28`.
- Section bg alternation: paper (hero, story, gallery, reviews) / paper-2 (collection, contact) /
  ink dark (services) / terracotta-image (delivery) / terracotta-deep (footer).
- Two fixed overlays only: header (z-50) and mobile call bar (z-40). No other stacking complexity.
- Contact map: Google Maps embed `https://www.google.com/maps?cid=14531505238062618007&output=embed`.
- Reviews: **6** figures total (David Pham, Christopher Russos, Rufina Tsybyktarova [Google · recenze];
  Shawn Sexton, Tamara Radunovic, Dana Samelyuk [Google · international guest]).

## Head / metadata (layout.tsx)
- `<html lang="cs">`. Title: `Květinářství fLOVErs | Autorské kytice a květinové boxy, Žižkov Praha`.
- description, og:title `Květinářství fLOVErs | Žižkov, Praha 3`, og:description, og:locale `cs_CZ`,
  og:type website, twitter:card summary (+ title/description). Favicon `/icon.svg` (verbatim in public/).
- Footer credit: "© 2026 Květinářství fLOVErs · Žižkov, Praha 3" / "Ukázkový web navrhl Klaudius".
