import type { SVGProps } from "react";

/* Solid star used in ratings (fill=currentColor). */
export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.9 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5z" />
    </svg>
  );
}

/* Row of 5 solid stars — matches the live `inline-flex gap-[3px]` cluster. */
export function StarRating({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="5 z 5 hvězdiček">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </span>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

/* ── Service icons (stroke, 24×24, round caps) ─────────────────────── */
function ServiceSvg({ d, className }: { d: string; className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const SERVICE_PATHS = {
  flower:
    "M12 3c1.7 0 3 1.3 3 3 0 .5-.1 1-.4 1.4C16.3 7.9 18 9.7 18 12c0 3.3-2.7 6-6 6s-6-2.7-6-6c0-2.3 1.7-4.1 3.4-4.6C9.1 7 9 6.5 9 6c0-1.7 1.3-3 3-3Zm0 15v3",
  box: "M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Zm0 0 2-4h12l2 4M12 4v16",
  heart: "M12 21s-7-4.3-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 3.5C19 16.7 12 21 12 21Z",
  truck: "M3 13h11V6H3v7Zm11-4h4l3 3v3h-7V9ZM7 18a2 2 0 1 0 0-.01M17 18a2 2 0 1 0 0-.01",
  chat: "M4 4h16v12H5.2L4 17.2V4Zm4 4h8M8 11h5",
  leaf: "M12 22V12m0 0c-3 0-5-2-5-5 3 0 5 2 5 5Zm0 0c0-3 2-5 5-5 0 3-2 5-5 5ZM12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
} as const;

export type ServiceIconName = keyof typeof SERVICE_PATHS;

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  return <ServiceSvg d={SERVICE_PATHS[name]} className={className} />;
}
