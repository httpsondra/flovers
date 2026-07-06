import { services } from "@/lib/content";
import { ServiceIcon } from "./icons";

export default function Services() {
  return (
    <section id="sluzby" className="relative bg-ink py-20 text-cream md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-blush">{services.eyebrow}</p>
          <h2 className="mt-5 font-display text-[36px] leading-[1.06] text-cream sm:text-[48px]">
            {services.headline}
          </h2>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {services.cards.map((card) => (
            <div
              key={card.title}
              className="group flex w-full flex-col rounded-[6px] border border-cream-20 bg-cream/[0.04] p-7 transition-all duration-300 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] hover:border-blush hover:bg-cream/[0.12] hover:shadow-[0_20px_40px_rgba(231,201,188,0.2)] hover:-translate-y-2"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta text-cream transition-all duration-300 group-hover:scale-110 group-hover:bg-blush group-hover:shadow-[0_8px_20px_rgba(231,201,188,0.4)]">
                <ServiceIcon name={card.icon} className="transition-transform duration-300 group-hover:rotate-6" />
              </span>
              <h3 className="mt-5 font-display text-[23px] text-cream transition-colors duration-300 group-hover:text-blush">{card.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-cream-80 transition-colors duration-300 group-hover:text-cream">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
