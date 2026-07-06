import { footer } from "@/lib/content";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="bg-terracotta-deep text-cream">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Wordmark className="text-[24px] text-cream" />
            <p className="mt-4 text-[15px] leading-relaxed text-cream-80">{footer.blurb}</p>
            <p className="mt-5 font-display text-[18px] italic text-blush">{footer.madeWithLove}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <div className="eyebrow text-blush">Kontakt</div>
              <div className="mt-4 space-y-2 text-[14px] text-cream-80">
                {footer.contactLinks.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block hover:text-cream"
                    >
                      {l.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="eyebrow text-blush">Adresa</div>
              <div className="mt-4 space-y-1 text-[14px] text-cream-80">
                {footer.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow text-blush">Otevřeno</div>
              <div className="mt-4 space-y-1 text-[14px] text-cream-80">
                {footer.hours.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 hair-light" />

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-[12px] text-cream-65 sm:flex-row sm:items-center">
          <p>{footer.copyright}</p>
          <p>
            {footer.credit} <span className="text-blush">{footer.creditName}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
