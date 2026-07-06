# BEHAVIORS — flovers-prague.vercel.app

Interaction model overall: **static + scroll**. No smooth-scroll library (native
`scroll-behavior: smooth` + `scroll-padding-top: 96px` on `html`). No framer-motion, no
IntersectionObserver reveal animations. Motion = one CSS marquee + CSS hover transitions +
two small JS scroll/state behaviors.

## Global
- `html { scroll-behavior: smooth; scroll-padding-top: 96px }` — anchor nav offset for sticky header.
  `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }`.
- `html, body { overflow-x: clip }`.
- Body bg `--paper`, text `--ink`, `-webkit-font-smoothing: antialiased`.

## Header (static)
- `fixed inset-x-0 top-0 z-50`, always `bg-paper/95 backdrop-blur` with `border-b border-ink-15`.
- **Does NOT change on scroll** (no shadow/bg swap) — classes are constant.
- Top utility strip (`hidden md:block`, `bg-terracotta text-cream`): address + hours + phone.
- Desktop nav links `hidden lg:flex`. Mobile hamburger `lg:hidden`.
- **Mobile hamburger is a DEAD button on the live site** — clicking does nothing, icon does not
  toggle, no panel appears. Treated as an unintended defect. CLONE DECISION: reproduce the button
  markup but wire a working dropdown menu (desktop pixels unchanged). Flag as the one deliberate fix.

## Marquee band (below hero)
- `.marquee-track { animation: marquee 24s linear infinite; display: inline-flex }`.
- `@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`.
- Two identical `<div class="flex">` groups (6 items each) so the -50% loop is seamless.
- Each item: `<span class="px-6 font-display text-[19px] italic">…</span><span class="text-blush">✽</span>`.
- Items: Autorské kytice · Květinové boxy · Svatby & eventy · Rozvoz po Praze · Sezónní květiny · Made with love.

## Hover states (CSS transitions)
- Nav links: `text-ink-70 → hover:text-terracotta` (`transition-colors`).
- Nav CTA / hero CTA / submit: `bg-terracotta → hover:bg-terracotta-bright` (`transition-colors`).
- Hero "Zavolat" outline: `border-ink-15 text-ink → hover:border-terracotta hover:text-terracotta`.
- Collection card image: `group-hover:scale-[1.04]`, `transition-transform duration-700`.
- Gallery image: `hover:scale-[1.05]`, `transition-transform duration-700` (per-image, not group).
- Contact info cards / form inputs: `border-ink-15 → hover:border-terracotta` / `focus:border-terracotta`.
- Footer links: `text-cream-80 → hover:text-cream`. Gallery IG link + top-strip phone have hover too.

## Mobile call bar (JS scroll toggle)
- `<a href="tel:…" class="fixed bottom-0 inset-x-0 z-40 … transition-opacity duration-300 lg:hidden">`.
- Inline base style: `opacity:0; pointer-events:none; padding-top:0.9rem;
  padding-bottom:calc(0.9rem + env(safe-area-inset-bottom))`.
- Fades in (opacity 0→1, pointer-events none→auto) once **scrollY passes ~800px** (past the hero).
  Measured: y=800 → opacity 0; y=1500 → opacity ~1. Use threshold `scrollY > 800`.
- Content: phone SVG + "Objednat kytici · +420 774 594 470". `bg-terracotta text-cream`, centered.

## Responsive (breakpoints are Tailwind defaults: sm 640, md 768, lg 1024)
- **1440 desktop:** hero 2-col (`lg:grid-cols-[1.05fr_1fr]`), story 2-col, collection 4-col,
  gallery 3-col, services 3-up flex-wrap, reviews 3-up, contact 2-col. Top utility strip visible (md+).
- **768 tablet:** collection `sm:grid-cols-2`, gallery `md:grid-cols-3`, services/reviews
  `md:w-[calc(50%-12px)]` (2-up), contact stacks at lg so still 2-col? contact is `lg:grid-cols-2`
  → single col below 1024. Story stacks below lg.
- **390 mobile:** everything single column. Desktop nav hidden, hamburger shown. Top utility strip
  hidden (`hidden md:block`). Fixed bottom call bar active. Collection/gallery/services/reviews 1-col.
  Story image order-2 (below text order-1) via `order-1/order-2` + `lg:order-1/2`.
