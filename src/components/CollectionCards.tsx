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
