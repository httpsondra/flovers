import { collection } from "@/lib/content";
import Wordmark from "./Wordmark";
import CollectionCards from "./CollectionCards";

export default function Collection() {
  return (
    <section id="kolekce" className="relative bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-terracotta">{collection.eyebrow}</p>
          <h2 className="mt-5 font-display text-[36px] leading-[1.06] text-ink sm:text-[48px]">
            {collection.headlinePrefix}
            <Wordmark className="text-[0.7em] text-terracotta" />
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-70">{collection.body}</p>
        </div>

        <CollectionCards />
      </div>
    </section>
  );
}
