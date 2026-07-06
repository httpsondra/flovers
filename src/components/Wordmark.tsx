/* F[LÓVE]RS wordmark — brackets tinted via the .wordmark .brk CSS rule. */
export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ""}`}>
      F<span className="brk">[</span>LÓVE<span className="brk">]</span>RS
    </span>
  );
}
