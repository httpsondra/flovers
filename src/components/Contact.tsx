"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

const inputClass =
  "w-full rounded-[6px] border border-ink-15 bg-paper px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-55 focus:border-terracotta";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" className="relative bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-terracotta">{contact.eyebrow}</p>
          <h2 className="mt-5 font-display text-[36px] leading-[1.06] text-ink sm:text-[48px]">
            {contact.headline}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-70">{contact.body}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {contact.cards.map((c) => {
                const external = c.href.startsWith("http");
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="rounded-[6px] border border-ink-15 bg-paper p-5 transition-colors hover:border-terracotta"
                  >
                    <div className="text-[11px] uppercase tracking-[0.16em] text-ink-55">{c.label}</div>
                    <div className="mt-1.5 font-display text-[17px] text-ink">{c.value}</div>
                  </a>
                );
              })}
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input required type="text" placeholder={contact.form.name} className={inputClass} />
                <input type="tel" placeholder={contact.form.phone} className={inputClass} />
              </div>
              <input type="email" placeholder={contact.form.email} className={inputClass} />
              <textarea
                required
                rows={4}
                placeholder={contact.form.message}
                className={`resize-none ${inputClass}`}
              />
              <button
                type="submit"
                className="w-full rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-terracotta-bright"
              >
                {contact.form.submit}
              </button>
              {sent && (
                <p className="text-center text-[14px] leading-relaxed text-ink-70">
                  Děkujeme! Toto je ukázkový web bez odesílání formuláře — napište nám prosím přímo na{" "}
                  <a href="tel:+420774594470" className="font-semibold text-terracotta hover:text-terracotta-bright">
                    +420 774 594 470
                  </a>{" "}
                  nebo na{" "}
                  <a
                    href="https://www.instagram.com/flowers_prague/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-terracotta hover:text-terracotta-bright"
                  >
                    @flowers_prague
                  </a>
                  .
                </p>
              )}
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-[6px] border border-ink-15">
              <iframe
                src="https://www.google.com/maps?cid=14531505238062618007&output=embed"
                title="Mapa: Květinářství fLOVErs, Žižkov"
                className="h-[300px] w-full lg:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-[6px] border border-ink-15 bg-gradient-to-br from-paper to-paper-2 p-6 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(36,24,18,0.1)]">
              <div className="mb-4 flex items-center justify-between pb-4 border-b-2 border-sage/20">
                <h3 className="font-display text-[20px] text-ink">{contact.hoursTitle}</h3>
                <span className="rounded-full bg-sage/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
                  {contact.hoursBadge}
                </span>
              </div>
              <div className="space-y-3">
                {contact.hours.map((h, i) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between gap-4 py-1.5"
                  >
                    <span className="text-[14px] font-medium text-ink-70">{h.day}</span>
                    <span className="whitespace-nowrap rounded-[4px] bg-sage/10 px-3 py-1 text-[14px] font-semibold text-sage">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
