import { delivery } from "@/lib/content";

export default function DeliveryBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={delivery.bgImage.src}
          alt={delivery.bgImage.alt}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(84,32,13,0.82)" }} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 text-cream md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow text-blush">{delivery.eyebrow}</p>
          <h2 className="mt-5 font-display text-[38px] leading-[1.05] text-cream sm:text-[52px]">
            {delivery.headline[0]}
            <br />
            {delivery.headline[1]}
          </h2>
          <p className="mt-7 max-w-lg text-[16.5px] leading-relaxed text-cream-80">{delivery.body}</p>
          <div className="mt-9 flex flex-wrap gap-8">
            {delivery.stats.map((s) => (
              <div key={s.value}>
                <div className="font-display text-[24px] text-cream">{s.value}</div>
                <div className="mt-1 text-[13px] uppercase tracking-[0.14em] text-cream-65">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[4px] border-4 border-cream/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
            <div className="aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={delivery.image.src}
                alt={delivery.image.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
