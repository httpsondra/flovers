import { story } from "@/lib/content";

export default function Story() {
  return (
    <section id="pribeh" className="relative py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[4px] shadow-[0_30px_60px_-32px_rgba(36,24,18,0.5)]">
            <div className="aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image.src}
                alt={story.image.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute -right-4 -top-6 hidden rounded-full bg-paper px-6 py-6 text-center shadow-[0_16px_30px_-18px_rgba(36,24,18,0.6)] sm:block">
            <div className="font-display text-[30px] leading-none text-terracotta">{story.badge.value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-55">{story.badge.label}</div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow text-terracotta">{story.eyebrow}</p>
          <h2 className="mt-5 font-display text-[36px] leading-[1.06] text-ink sm:text-[46px]">
            {story.headline[0]}
            <br />
            {story.headline[1]}
          </h2>
          <div className="mt-7 space-y-5 text-[16px] leading-relaxed text-ink-70">
            <p>{story.paragraphs[0]}</p>
            <p>{story.paragraphs[1]}</p>
            <p className="font-display text-[20px] italic text-terracotta">{story.quote}</p>
          </div>
          <div className="mt-9 grid grid-cols-3 gap-4 border-t border-ink-15 pt-7">
            {story.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[28px] leading-none text-ink">{s.value}</div>
                <div className="mt-1.5 text-[12px] uppercase tracking-[0.14em] text-ink-55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
