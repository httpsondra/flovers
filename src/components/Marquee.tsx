import { marqueeItems } from "@/lib/content";

function Group() {
  return (
    <div className="flex items-center">
      {marqueeItems.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-[19px] italic">{item}</span>
          <span className="text-blush">✽</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink-15 bg-terracotta py-3.5 text-cream">
      <div className="marquee-track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
