/**
 * Five-petal blossom used in place of the 🌸 emoji in the dedication line (DESIGN.md §3):
 * it renders the same on every OS and stays inside the one-accent rule.
 */
export function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="12" cy="6.6" rx="3.6" ry="5.2" transform={`rotate(${angle} 12 12)`} opacity="0.9" />
      ))}
      <circle cx="12" cy="12" r="2.4" fill="var(--bg)" />
    </svg>
  );
}
