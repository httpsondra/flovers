import { reviews } from "@/lib/content";
import { StarRating } from "./icons";

export default function Reviews() {
  return (
    <section id="recenze" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-terracotta">{reviews.eyebrow}</p>
          <h2 className="mt-5 font-display text-[36px] leading-[1.06] text-ink sm:text-[48px]">
            {reviews.headline}
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <StarRating className="inline-flex gap-[3px] text-terracotta" />
            <span className="text-sm text-ink-70">
              <strong className="text-ink">{reviews.ratingStrong}</strong> · {reviews.ratingRest}
            </span>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {reviews.items.map((r) => (
            <figure
              key={r.name}
              className="flex w-full flex-col rounded-[6px] border border-ink-15 bg-paper-2 p-7 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <StarRating className="inline-flex gap-[3px] text-terracotta" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-70">
                „{r.quote}“
              </blockquote>
              <figcaption className="mt-5 border-t border-ink-15 pt-4">
                <div className="font-display text-[18px] text-ink">{r.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink-55">{r.source}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
