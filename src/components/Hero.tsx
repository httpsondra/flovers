import { hero } from "@/lib/content";
import { StarRating } from "./icons";
import Wordmark from "./Wordmark";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[120px] md:pt-[150px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div className="relative z-10">
          <p className="eyebrow text-terracotta">{hero.eyebrow}</p>
          <div className="mt-6">
            <Wordmark className="text-[34px] text-terracotta sm:text-[44px]" />
          </div>
          <h1 className="mt-5 font-display text-[44px] leading-[1.02] text-ink sm:text-[62px] lg:text-[68px]">
            {hero.headlineTop}
            <br />
            <span className="italic text-terracotta">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ink-70">{hero.body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#kontakt"
              className="rounded-full bg-terracotta px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-terracotta-bright"
            >
              Objednat kytici
            </a>
            <a
              href="tel:+420774594470"
              className="rounded-full border border-ink-15 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-terracotta hover:text-terracotta"
            >
              Zavolat
            </a>
          </div>
          <div className="mt-9 flex items-center gap-4">
            <StarRating className="inline-flex gap-[3px] text-terracotta" />
            <span className="text-sm text-ink-70">
              <strong className="text-ink">{hero.ratingStrong}</strong> · {hero.ratingRest}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative ml-auto w-[82%] overflow-hidden rounded-[4px] shadow-[0_30px_60px_-30px_rgba(36,24,18,0.5)]">
            <div className="aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute -bottom-8 left-0 w-[46%] overflow-hidden rounded-[4px] border-4 border-paper shadow-[0_24px_40px_-24px_rgba(36,24,18,0.55)]">
            <div className="aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.imageSmall.src}
                alt={hero.imageSmall.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-4 top-6 hidden rotate-90 text-[11px] uppercase tracking-[0.4em] text-terracotta/70 lg:block">
            Made with love
          </div>
        </div>
      </div>
    </section>
  );
}
