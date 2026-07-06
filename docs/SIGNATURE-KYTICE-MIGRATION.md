# Migrace sekce „Signature kytice F[LÓVE]RS" (living-accordion galerie)

Kompletní, samostatná dokumentace pro přenos této jedné sekce do jiného projektu.
Cílem je **naprosto identický** vzhled i chování: layout, hover „expand" accordion,
scroll reveal, depth vrstvy a plynulý easing.

---

## 0. Stack a klíčové principy (přečti první)

- **Framework:** Next.js (App Router), React 19, **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme`).
- **anime.js NENÍ potřeba.** Dřívější verze reveal řešila přes anime.js, ale finální verze ho
  **záměrně nepoužívá** — reveal je čistě CSS `@keyframes` + IntersectionObserver, který jen
  přepíná CSS třídu. Do cílového projektu **žádnou animační knihovnu neinstaluj**.
- **Interakční model:**
  1. **Fotky jsou vždy viditelné** (server-rendered, žádné základní `opacity:0`). Fungují bez JS,
     před hydratací i když animace selže.
  2. **Scroll reveal** = jednorázový CSS keyframe, který se spustí přidáním třídy `.is-revealing`
     přes IntersectionObserver. Nikdy nemůže nechat kartu schovanou (viz safety-net níže).
  3. **Hover „expand"** = pure CSS, pouze desktop (`lg:`). Aktivní karta se rozšíří přes
     `flex-grow`, ostatní se plynule stáhnou, všechny zůstávají viditelné (žádné ztmívání).
- **Bez layout shiftu:** obrázek má na desktopu **pevnou výšku** (`lg:h-[430px]`), takže expand
  mění jen šířku; caption má **rezervovanou výšku** (`lg:min-h-[132px]`), aby přetečení textu
  neposouvalo řádek.

---

## 1. Přesný seznam souborů

| Soubor | Akce | Role v sekci |
|---|---|---|
| `src/components/CollectionCards.tsx` | **NOVÝ** | Client komponenta — grid 4 karet, scroll reveal (IO + CSS), hover accordion |
| `src/components/Collection.tsx` | **NOVÝ / uprav** | Server komponenta — obal sekce: nadpis + `<CollectionCards />` |
| `src/components/Wordmark.tsx` | **NOVÝ** | `F[LÓVE]RS` wordmark v nadpisu (jen kvůli identickému headeru) |
| `src/lib/content.ts` | **UPRAV** | Přidat exportovaný objekt `collection` s daty 4 karet |
| `src/app/globals.css` | **UPRAV** | Barevné tokeny, typografické třídy, `--ease-hover`, `.gallery-card`, `@keyframes galleryReveal`, reduced-motion |
| `src/app/layout.tsx` | **UPRAV** | Načíst fonty (Bodoni Moda → `--font-display`, Archivo → `--font-body`) |
| `public/images/*.jpg` | **ZKOPÍRUJ** | 4 fotky kytic (viz §3) |

> Alias `@/` musí ukazovat na `src/` (standardní Next). Pokud cílový projekt používá jiný alias,
> uprav importy odpovídajícím způsobem.

---

## 2. Změny po jednotlivých souborech (co / proč / jaká logika)

### 2.1 `src/components/CollectionCards.tsx` — NOVÝ (jádro sekce)

**Co:** `"use client"` komponenta. Renderuje `<div>` (řádek/grid) a v něm `<article>` pro každou
kartu z `collection.cards`. Obsahuje veškerou interaktivní logiku.

**Proč client:** kvůli `useEffect` + `useRef` + `IntersectionObserver` (scroll reveal). Samotný
markup je ale plně SSR-ovaný a viditelný i bez JS — client vrstva jen *přidává* reveal.

**Přidaná logika:**
- `rowRef` (ref na kontejner řádku) → z něj se čtou karty přes `querySelectorAll("[data-reveal]")`.
- **Guard:** pokud `prefers-reduced-motion: reduce` **nebo** `IntersectionObserver` neexistuje →
  `return` a nic se neděje (karty zůstanou viditelné). Reveal je čistě aditivní.
- `reveal()` — přidá každé kartě inline `animationDelay = i*110ms` a třídu `.is-revealing`
  (spustí CSS keyframe). Zaregistruje `animationend` (once) → `settle()` uklidí kartu hned po
  dojezdu. **Safety-net `setTimeout`** (`820 + počet*110 + 600` ms) třídu strhne i kdyby animace
  nikdy nedoběhla (zmrzlý clock, vypnuté animace) → karta vždy skončí viditelná.
- `settle(card)` — odebere `.is-revealing` a vynuluje `animationDelay` → karta se vrátí do
  defaultního (viditelného) CSS stavu.
- **IntersectionObserver** `{ threshold: 0.15 }` sleduje `row`; při protnutí `io.disconnect()` +
  `reveal()` (spustí se jen jednou; navíc `revealed` flag).
- **Cleanup** (return z useEffect): `io.disconnect()` + `clearTimeout(safety)`.

**Kompletní obsah souboru (zkopíruj 1:1):**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { collection } from "@/lib/content";

/**
 * Signature-kytice gallery — an editorial "living accordion".
 *
 * VISIBILITY IS THE ABSOLUTE PRIORITY. The photos are the product and are always visible:
 * server-rendered with no opacity/transform, so they show without JavaScript, before hydration,
 * and if anything below fails. The scroll reveal is a pure-CSS keyframe (see `.gallery-card` in
 * globals.css) that only ever *starts* hidden and *ends* visible — it can never strand a card.
 * JS here does one thing: add the `.is-revealing` class when the row scrolls into view, with a
 * hard safety-net timeout that removes it no matter what. Hover is pure CSS, gated behind `lg:`.
 */
export default function CollectionCards() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const cards = Array.from(row.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (cards.length === 0) return;

    // No motion or no observer support → do nothing. Cards are already visible (CSS default);
    // the reveal is purely additive, never required for the photos to show.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    let revealed = false;
    let safety: number | undefined;

    const settle = (card: HTMLElement) => {
      card.classList.remove("is-revealing");
      card.style.animationDelay = "";
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      cards.forEach((card, i) => {
        card.style.animationDelay = `${i * 110}ms`;
        // Clean up the instant each card's reveal finishes (precise on real browsers).
        card.addEventListener("animationend", () => settle(card), { once: true });
        card.classList.add("is-revealing");
      });
      // Hard safety net: if the animation never runs or never finishes (frozen clock,
      // animations disabled, interrupted), still force the visible resting state.
      safety = window.setTimeout(
        () => cards.forEach(settle),
        820 + cards.length * 110 + 600,
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          reveal();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(row);

    return () => {
      io.disconnect();
      if (safety !== undefined) window.clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:gap-4"
    >
      {collection.cards.map((card) => (
        <article
          key={card.name}
          data-reveal
          className="gallery-card group/card relative will-change-transform lg:min-w-0 lg:flex-1 lg:hover:-translate-y-3 lg:hover:grow-[1.4]"
        >
          <div className="relative overflow-hidden rounded-[4px] bg-terracotta/5 shadow-[0_24px_50px_-30px_rgba(36,24,18,0.5)] transition-shadow duration-[820ms] ease-[var(--ease-hover)] lg:group-hover/card:shadow-[0_44px_74px_-34px_rgba(36,24,18,0.6)]">
            <div className="aspect-[3/4] lg:aspect-auto lg:h-[430px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                className="h-full w-full object-cover object-center transition-[transform,filter] duration-[900ms] ease-[var(--ease-hover)] lg:group-hover/card:scale-[1.05] lg:group-hover/card:contrast-[1.06] lg:group-hover/card:saturate-[1.05] lg:group-hover/card:brightness-[1.02]"
              />
            </div>
            {/* Depth gradient — reacts a touch quicker than the photo. Never hides it. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-35 transition-opacity duration-[640ms] ease-[var(--ease-hover)] lg:group-hover/card:opacity-60" />
            {/* Soft light from above — appears only when the card takes focus. */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_0%,rgba(255,244,235,0.16),transparent_58%)] opacity-0 transition-opacity duration-[780ms] ease-[var(--ease-hover)] lg:group-hover/card:opacity-100" />
          </div>
          {/* Caption — reserved height on desktop so its rewrap never shifts the row. */}
          <div className="transition-transform duration-[780ms] ease-[var(--ease-hover)] lg:min-h-[132px] lg:group-hover/card:-translate-y-1">
            <h3 className="mt-4 font-display text-[22px] text-ink transition-colors duration-[780ms] ease-[var(--ease-hover)] lg:group-hover/card:text-terracotta">
              {card.name}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-70">{card.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
```

### 2.2 `src/components/Collection.tsx` — obal sekce (server komponenta)

**Co:** sekce s `id="kolekce"`, tmavší podklad `bg-paper-2`, centrovaný nadpis (eyebrow +
`font-display` H2 s `<Wordmark>` + body), pod ním `<CollectionCards />`.

**Proč:** oddělení „statický header (server)" vs. „interaktivní grid (client)" — server komponenta
nesmí obsahovat hooky.

```tsx
import { collection } from "@/lib/content";
import Wordmark from "./Wordmark";
import CollectionCards from "./CollectionCards";

export default function Collection() {
  return (
    <section id="kolekce" className="relative bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-terracotta">{collection.eyebrow}</p>
          <h2 className="mt-5 font-display text-[36px] leading-[1.06] text-ink sm:text-[48px]">
            {collection.headlinePrefix}
            <Wordmark className="text-[0.7em] text-terracotta" />
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-70">{collection.body}</p>
        </div>

        <CollectionCards />
      </div>
    </section>
  );
}
```

> Pokud cílový projekt už má vlastní nadpis/branding, můžeš `<Wordmark>` nahradit prostým textem.
> Pro **identický** vzhled ho ale ponech.

### 2.3 `src/components/Wordmark.tsx` — NOVÝ

```tsx
/* F[LÓVE]RS wordmark — brackets tinted via the .wordmark .brk CSS rule. */
export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ""}`}>
      F<span className="brk">[</span>LÓVE<span className="brk">]</span>RS
    </span>
  );
}
```

### 2.4 `src/lib/content.ts` — přidat objekt `collection`

```ts
export const collection = {
  eyebrow: "Autorská kolekce",
  headlinePrefix: "Signature kytice ",
  body:
    "Naše nejoblíbenější kompozice, které se objevují na Instagramu. Každou vytvoříme čerstvou přesně pro vás, jako inspiraci nebo na míru.",
  cards: [
    {
      name: "Pure Elegance",
      desc: "Celobílá kompozice v boxu, růže, chryzantémy a eukalyptus. Nadčasová, slavnostní.",
      image: { src: "/images/instagram1.jpg", alt: "Kytice Pure Elegance od F[LÓVE]RS" },
    },
    {
      name: "June Embrace",
      desc: "Něžné odstíny pudrové a smetanové, pivoňky a kaly. Letní, romantická kytice.",
      image: { src: "/images/instagram3.jpg", alt: "Kytice June Embrace od F[LÓVE]RS" },
    },
    {
      name: "Berry Sorbet",
      desc: "Sytá paleta růžové a fialové v sametovém boxu. Odvážná a plná energie.",
      image: { src: "/images/instagram6.jpg", alt: "Kytice Berry Sorbet od F[LÓVE]RS" },
    },
    {
      name: "Neon Jungle",
      desc: "Architektonická kompozice s gerberami a celosií. Pro toho, kdo má rád výraznost.",
      image: { src: "/images/instagram4.jpg", alt: "Kytice Neon Jungle od F[LÓVE]RS" },
    },
  ],
};
```

> Datová struktura karty: `{ name: string; desc: string; image: { src: string; alt: string } }`.
> Počet karet je libovolný, ale **4** dávají na desktopu ideální accordion. Layout se s počtem
> přizpůsobí (grid 1/2 sloupce, na `lg` flex-row).

### 2.5 `src/app/globals.css` — tokeny, typografie, gallery styly

Přidej (nebo slúč do existujícího) tyto bloky. Klíčové jsou: **barevné tokeny v `@theme`**
(aby Tailwind vygeneroval `bg-paper-2`, `text-ink`, `text-ink-70`, `text-terracotta`,
`bg-terracotta/5`, `from-ink/30`), **`--ease-hover`** v `:root`, typografické třídy a
**celý `.gallery-card` blok + keyframe**.

```css
@import "tailwindcss";

:root {
  --ink: #241812;
  --terracotta: #7e3117;
  --terracotta-bright: #a8431f; /* barva hranatých závorek ve wordmarku */
  /* Hover easing pro galerii: měkký start i konec → plynulé přejíždění mezi kartami. */
  --ease-hover: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Barevné tokeny pro Tailwind v4 (nutné, aby fungovaly utility bg-*/text-*/from-*) */
@theme {
  --color-paper-2: #fbf6ef;
  --color-ink: #241812;
  --color-ink-70: rgba(36, 24, 18, 0.72);
  --color-terracotta: #7e3117;
}

/* Typografie použitá v nadpisu sekce */
.font-display {
  font-family: var(--font-display), Georgia, serif;
}
.eyebrow {
  font-family: var(--font-body), system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.32em;
  font-size: 0.7rem;
  font-weight: 600;
}
.wordmark {
  font-family: var(--font-body), system-ui, sans-serif;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  font-weight: 600;
}
.wordmark .brk {
  color: var(--terracotta-bright);
  font-weight: 400;
}

/* ── Signature gallery cards (living accordion) ─────────────────────────
   KARTY JSOU VIDITELNÉ BY DEFAULT. Nikde žádné trvalé opacity:0 — kartu lze
   schovat jen UVNITŘ self-completing keyframe níže, který vždy končí viditelně.
   Hover přechody žijí tady (vždy aktivní), aby šla viditelná karta zvýraznit. */
.gallery-card {
  transition: transform 820ms var(--ease-hover);
}

/* Desktop: hover „expand" animuje flex-grow → řádek plynule přerozdělí šířku a
   všechny karty zůstanou vedle sebe (žádný slider, žádné prázdné místo). Delší,
   rovnoměrné durationy umožní rychlému přejetí ease k novému cíli místo
   úplného sbalení a znovu-rozšíření (to je ten „jump"). */
@media (min-width: 1024px) {
  .gallery-card {
    transition:
      flex-grow 820ms var(--ease-hover),
      transform 820ms var(--ease-hover);
  }
}

/* Scroll reveal = jednorázový enhancement. `backwards` drží skrytý frame jen
   během stagger delaye (před startem); po dojezdu se vrátí do normálního
   viditelného stavu. Nikdy nenechá kartu zaseknutou schovanou. */
@keyframes galleryReveal {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.gallery-card.is-revealing {
  animation: galleryReveal 820ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@media (prefers-reduced-motion: reduce) {
  .gallery-card,
  .gallery-card * {
    transition: none !important;
  }
  .gallery-card.is-revealing {
    animation: none !important;
  }
}
```

### 2.6 `src/app/layout.tsx` — fonty

Nadpis používá **Bodoni Moda** (display) a body/eyebrow/wordmark **Archivo**. Fonty se načtou přes
`next/font/google` a exponují jako CSS proměnné `--font-display` a `--font-body`, které se pověsí
na `<html>`.

```tsx
import { Archivo, Bodoni_Moda } from "next/font/google";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"], // latin-ext je nutné pro české ř/ž/ě
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// … v RootLayout:
<html lang="cs" className={`${archivo.variable} ${bodoni.variable}`}>
```

---

## 3. Assety (fotky)

Zkopíruj 4 obrázky do `public/images/`:

```
public/images/instagram1.jpg   → Pure Elegance
public/images/instagram3.jpg   → June Embrace
public/images/instagram6.jpg   → Berry Sorbet
public/images/instagram4.jpg   → Neon Jungle
```

Poměr stran fotek je na desktopu ignorován (fixní výška `430px` + `object-cover`), na mobilu se
zobrazí v poměru `3/4`. Ideální jsou **portrétní** fotky (kompozice vysoká). Pozn.: fotky použité
v originále mají **název kolekce vypálený přímo v obrázku** — proto název NEpřekrýváme přes fotku,
ale dáváme ho jako popisek POD fotku (jinak by vznikl duplicitní text).

---

## 4. Nové komponenty — účel, props, komunikace

| Komponenta | Typ | Props | Účel |
|---|---|---|---|
| `Collection` | server | žádné | Obal sekce: nadpis + vloží `CollectionCards`. Čte `collection` (eyebrow/headline/body). |
| `CollectionCards` | client (`"use client"`) | žádné | Grid karet + reveal + hover. Čte `collection.cards` přímo z importu. |
| `Wordmark` | server | `className?: string` | Vykreslí `F[LÓVE]RS` se závorkami obarvenými přes `.wordmark .brk`. |

**Komunikace:** čistě přes import dat (`collection` z `content.ts`) — **žádné props se nepředávají**
mezi `Collection` a `CollectionCards`. `Wordmark` dostává jen `className` (velikost + barva).

---

## 5. Utility / helper funkce

**Žádné externí utility.** Uvnitř `CollectionCards` jsou dvě lokální funkce v `useEffect`:
- `settle(card)` — vrátí kartu do viditelného stavu (odebere třídu + delay).
- `reveal()` — spustí reveal (delay + třída + animationend + safety timeout).

Nejsou exportované, neexistuje sdílený helper soubor.

---

## 6. Anime.js

**Sekce anime.js NEPOUŽÍVÁ.** (Historie: první iterace reveal řešila přes `animate()` + `stagger()`
z anime.js a přes `utils.set(cards,{opacity:0})`. To ale nastavovalo trvalé `opacity:0` a když
observer/animace nedoběhla, karty zůstaly neviditelné. Proto byl anime.js z této sekce **odstraněn**
a nahrazen bezpečným CSS keyframe.) → Do cílového projektu **nic neinstaluj**.

Ekvivalent původních anime.js parametrů (nyní realizováno CSS/JS):
- **stagger:** `animationDelay = i * 110ms` (inline, nastavuje JS).
- **duration:** `820ms` (keyframe reveal).
- **easing reveal:** `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint — sebevědomý dojezd).
- **co animuje:** `opacity 0→1`, `translateY 28px→0`, `scale 0.98→1`.
- **cleanup:** `animationend` (once) + safety `setTimeout` → odebrání třídy `.is-revealing`.

---

## 7. IntersectionObserver / scroll reveal — konfigurace

- **Cíl pozorování:** kontejner řádku (`rowRef`), NE jednotlivé karty.
- **Options:** `{ threshold: 0.15 }` (spustí se, když je ~15 % řádku ve viewportu). Žádný
  `rootMargin`, žádný custom `root`.
- **Chování:** při prvním protnutí → `io.disconnect()` (jednorázově) → `reveal()`.
- **Reveal mechanika:** NEanimuje přes JS. Jen přidá třídu `.is-revealing` (+ per-card
  `animationDelay`), zbytek dělá CSS keyframe `galleryReveal`.
- **Bezpečnost:** guard na `prefers-reduced-motion` a chybějící `IntersectionObserver` → reveal se
  přeskočí, karty zůstanou viditelné. Safety `setTimeout` vždy vrátí viditelný stav.

---

## 8. React hooky / refs — proč

- `useRef<HTMLDivElement>(null)` (`rowRef`) — potřebujeme přímý DOM přístup k řádku, abychom v něm
  našli karty (`querySelectorAll("[data-reveal]")`) a napojili IntersectionObserver. React state by
  tu byl zbytečný (reveal je imperativní DOM efekt, ne render).
- `useEffect(…, [])` — spustí se jednou po mountu (client-only): nastaví observer, vrací cleanup.
  Prázdný dependency array = běží jen při mountu/unmountu.
- **Žádný `useState`** — komponenta se kvůli revealu nikdy nere-renderuje; vše se řeší třídami na DOM
  uzlech. To je záměr (výkon + jednoduchost + žádný re-render fotek).

---

## 9. Závislosti mezi komponentami / na prostředí

- `Collection` → importuje `CollectionCards` a `Wordmark` a data `collection`.
- `CollectionCards` → importuje data `collection`.
- **CSS závislosti (kritické):**
  - `.gallery-card` blok v `globals.css` definuje hover **přechody** (vč. `flex-grow` na `lg`).
    Bez něj by expand/lift byl **skokový** (žádná animace).
  - `@keyframes galleryReveal` + `.gallery-card.is-revealing` — bez nich se reveal neprovede.
  - `--ease-hover` v `:root` — používá se v `ease-[var(--ease-hover)]`. Bez proměnné → timing
    function `initial` (lineární/žádná plynulost).
  - `@theme` barvy — bez nich Tailwind nevygeneruje `bg-paper-2`, `text-ink`, `text-ink-70`,
    `text-terracotta`, `bg-terracotta/5`, `from-ink/30`.
  - Fonty `--font-display` / `--font-body` (layout.tsx) — jinak fallback serif/sans (jiný vzhled).

---

## IMPLEMENTATION GUIDE (krok za krokem)

1. **Ověř stack:** projekt je Next.js App Router + React 19 + **Tailwind v4**. (U Tailwind v3 by se
   `@theme` musel převést do `tailwind.config` a arbitrary hodnoty ověřit.) **anime.js neinstaluj.**
2. **Fonty** — do `src/app/layout.tsx` přidej Bodoni Moda (`--font-display`) a Archivo
   (`--font-body`) dle §2.6 a pověs `className` na `<html>`.
3. **globals.css** — vlož bloky z §2.5: `:root` proměnné (`--ink`, `--terracotta`,
   `--terracotta-bright`, `--ease-hover`), `@theme` barvy, typografické třídy (`.font-display`,
   `.eyebrow`, `.wordmark`, `.wordmark .brk`) a **celý `.gallery-card` + keyframe + reduced-motion
   blok**. (Pokud už některé tokeny máš, jen doplň chybějící.)
4. **content.ts** — přidej export `collection` (§2.4). Uprav texty/alt dle potřeby, zachovej tvar dat.
5. **Assety** — zkopíruj 4 fotky do `public/images/` (§3), názvy sedí s `content.ts`.
6. **Wordmark.tsx** — vytvoř (§2.3). (Volitelné, ale nutné pro identický nadpis.)
7. **CollectionCards.tsx** — vytvoř a vlož **1:1** obsah z §2.1.
8. **Collection.tsx** — vytvoř (§2.2). Pak ho **vlož do stránky** tam, kam sekce patří, např.:
   ```tsx
   import Collection from "@/components/Collection";
   // …
   <Collection />
   ```
9. **Spusť `next build`** (ne jen `next dev`) — ověří TypeScript i to, že Tailwind vygeneroval
   všechny arbitrary utility. Pak vizuálně zkontroluj: fotky viditelné hned, hover accordion na
   desktopu, reveal při scrollu, na mobilu jen reveal (žádný hover).

---

## COMMON MISTAKES (co se snadno přehlédne)

1. **`data-reveal` atribut** — JS hledá karty přes `querySelectorAll("[data-reveal]")`. Když ho na
   `<article>` zapomeneš, reveal neproběhne (a karty zůstanou viditelné — což je OK, ale reveal chybí).
2. **`"use client"`** na `CollectionCards.tsx` — bez něj spadne build (hooky v server komponentě).
   `Collection.tsx` naopak `"use client"` **nemá** (je server) — nepřidávej.
3. **Named groups `group/card` + `group-hover/card:`** — Tailwind v4 pojmenované groupy. Když
   přejmenuješ group nebo použiješ obyčejný `group-hover:`, hover efekty přestanou fungovat.
   Řádek nese `group/cards`? **Ne** — v této verzi se pojmenovaná group `cards` nepoužívá (ztmívání
   sourozenců bylo záměrně odstraněno). Používá se jen `group/card` na každé kartě.
4. **`.gallery-card` transition v CSS je nutná** — hover používá utility `lg:hover:grow-[1.4]` a
   `lg:hover:-translate-y-3`, ale **plynulost** (vč. `flex-grow`) definuje CSS `.gallery-card`
   v globals. Bez toho bloku je expand skokový. Nezapomeň i `@media (min-width:1024px)` variantu
   s `flex-grow`.
5. **`--ease-hover` musí existovat v `:root`** — jinak `ease-[var(--ease-hover)]` nemá hodnotu a
   animace ztratí plynulost (vrátí se „snappy"/lineární pocit).
6. **`@theme` barvy (Tailwind v4)** — `bg-paper-2`, `text-ink`, `text-ink-70`, `text-terracotta`,
   `bg-terracotta/5`, `from-ink/30` vyžadují `--color-*` tokeny. Bez nich Tailwind utility
   „potichu" nevygeneruje a barvy zmizí. `text-ink-70` je vlastní alpha token, ne opacity modifier.
7. **Pevná výška vs. aspect ratio** — na desktopu je `lg:aspect-auto lg:h-[430px]` (fixní výška),
   na mobilu `aspect-[3/4]`. Když necháš aspect-ratio i na desktopu, expand poroste i do výšky →
   **layout shift** obsahu pod sekcí. Tohle je klíčové.
8. **Rezervovaná výška captionu** `lg:min-h-[132px]` — bez ní přetečení popisku (1↔3 řádky) při
   expandu posune řádek. Nevynechávej.
9. **Přepínání display grid → flex** — kontejner je `grid` (mobil/tablet) a `lg:flex lg:flex-row`
   (desktop accordion). Chybějící `lg:flex` = zůstane grid a expand nefunguje. `lg:items-start`
   je potřeba, aby se karty zarovnaly nahoře (řádek fotek srovnaný, captiony visí dolů).
   `lg:min-w-0` na kartě brání přetečení flex položky.
10. **Žádné `opacity-0` v základním stavu** — nikdy nedávej kartám/fotkám výchozí `opacity:0`
    (ani přes JS `.set()`/`style.opacity`). Skrytý stav smí existovat JEN uvnitř keyframe
    `galleryReveal`. Jinak riskuješ „fotky probliknou a zmizí".
11. **Reveal easing ≠ hover easing** — reveal má `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint,
    přímo v `@keyframes`/`animation`), hover má `--ease-hover = cubic-bezier(0.4, 0, 0.2, 1)`.
    Nezaměňuj je — hover s outQuint působí „snappy".
12. **`backwards` fill mode u reveal animace** — drží skrytý frame během stagger delaye. Bez něj
    karty během delaye probliknou viditelné a pak skočí na 0.
13. **Safety-net `setTimeout` + `animationend`** — nevynechávej. `animationend` uklidí přesně,
    `setTimeout` (`820 + n*110 + 600` ms) je pojistka, když animace vůbec neběží. Bez pojistky by
    ve výjimečném prostředí (zmrzlý animation clock) karty mohly zůstat schované.
14. **`latin-ext` subset u fontů** — bez něj se české znaky (ř, ž, ě, ů) vykreslí fallback fontem.
15. **Alias `@/`** — importy počítají s `@/ → src/`. V jiném aliasu uprav cesty.
16. **`next/image` vs `<img>`** — sekce záměrně používá čisté `<img>` (+ eslint-disable komentář).
    Když přepneš na `next/image`, musíš doladit `fill`/`sizes`/`style` tak, aby `object-cover` a
    fixní výška fungovaly stejně; jinak se chování expandu změní.
```
