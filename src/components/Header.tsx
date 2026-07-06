"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { MenuIcon, CloseIcon, PhoneIcon } from "./icons";
import Wordmark from "./Wordmark";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showCallBar, setShowCallBar] = useState(false);

  // Fixed mobile call bar fades in past the hero (~800px), matching the live site.
  useEffect(() => {
    const onScroll = () => setShowCallBar(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="hidden bg-terracotta text-cream md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-[12px] tracking-wide">
            <span className="text-cream-80">{site.topStrip}</span>
            <div className="flex items-center gap-5">
              <span className="text-cream-80">{site.hoursShort}</span>
              <a href={site.phoneHref} className="font-semibold hover:text-blush">
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        <nav className="border-b border-ink-15 bg-paper/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
            <a href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Wordmark className="text-[17px] text-ink" />
              <span className="hidden text-[11px] uppercase tracking-[0.28em] text-terracotta sm:inline">
                Prague
              </span>
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-70 transition-colors hover:text-terracotta"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#kontakt"
                className="rounded-full bg-terracotta px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-terracotta-bright"
              >
                Objednat kytici
              </a>
            </div>

            <button
              className="lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile dropdown — functional fix over the live site's dead hamburger. */}
          {open && (
            <div className="border-t border-ink-15 bg-paper/98 px-6 py-4 lg:hidden">
              <div className="flex flex-col gap-1">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="py-2 text-[14px] font-medium uppercase tracking-[0.14em] text-ink-70 transition-colors hover:text-terracotta"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-terracotta px-5 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-terracotta-bright"
                >
                  Objednat kytici
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Fixed mobile call bar */}
      <a
        href={site.phoneHref}
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-2 bg-terracotta text-center text-sm font-semibold uppercase tracking-[0.12em] text-cream transition-opacity duration-300 lg:hidden"
        style={{
          opacity: showCallBar ? 1 : 0,
          pointerEvents: showCallBar ? "auto" : "none",
          paddingTop: "0.9rem",
          paddingBottom: "calc(0.9rem + env(safe-area-inset-bottom))",
        }}
      >
        <PhoneIcon />
        Objednat kytici · {site.phone}
      </a>
    </>
  );
}
