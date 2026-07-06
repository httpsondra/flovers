import { gallery, site } from "@/lib/content";

export default function Gallery() {
  return (
    <section id="galerie" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-terracotta">{gallery.eyebrow}</p>
            <h2 className="mt-5 font-display text-[36px] leading-[1.06] text-ink sm:text-[48px]">
              {gallery.headline}
            </h2>
          </div>
          <a
            href={site.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta transition-colors hover:text-terracotta-bright"
          >
            {gallery.link}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {gallery.images.map((img) => (
            <div
              key={img.src}
              className="overflow-hidden rounded-[4px] bg-terracotta/5 shadow-[0_18px_36px_-28px_rgba(36,24,18,0.5)]"
            >
              <div className="aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.05]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
