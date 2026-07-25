interface CardProps {
  badge?: string;
  date?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  href?: string;
  className?: string;
}

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" strokeWidth={2} stroke="currentColor">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/*
 * Concave scallop technique for the card's bottom-right lime button:
 *
 *   The lime button has NO border-radius of its own.
 *   overflow-hidden on the card clips the lime button's BOTTOM-RIGHT corner
 *   to match the card's rounded-3xl automatically.
 *
 *   Two SNOW-coloured quarter-circle divs sit in the card area adjacent
 *   to the lime button.  Their curved edges are what "carve" the concave
 *   notch into the card→lime transition:
 *
 *     A  →  above the lime button, on the RIGHT card edge
 *            borderBottomLeftRadius  curves toward the lime button's top-left
 *
 *     B  →  left of the lime button, on the BOTTOM card edge
 *            borderBottomRightRadius curves toward the lime button's bottom-left
 *
 *   ┌──────────────────────────────╮
 *   │  card content            [A] │
 *   │                          ╭───┤   ← concave A (right edge → lime top)
 *   │  READ MORE          [B]╭─┤ → │
 *   │                         ╰───┘   ← concave B (bottom edge → lime left)
 *   └──────────────────────────────┘
 */

const LIME_SIZE = 56; // w-14 h-14 = 56 px
const CC = 20;        // concave corner radius in px

const Card = ({
  badge,
  date,
  title,
  description,
  linkLabel = 'READ MORE',
  href = '#',
  className = '',
}: CardProps) => {
  return (
    <div
      className={`relative bg-white rounded-3xl p-6 flex flex-col gap-4 overflow-hidden min-h-64 ${className}`}
    >
      {/* Top row — badge + date */}
      {(badge || date) && (
        <div className="flex items-center justify-between">
          {badge && (
            <span className="inline-flex items-center gap-2 bg-mist px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest">
              <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0" />
              {badge}
            </span>
          )}
          {date && (
            <span className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50">
              {date}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="font-aspekta text-forest text-lg leading-snug flex-1">{title}</h3>

      {/* Optional description */}
      {description && (
        <p className="font-dm-sans text-forest/60 text-sm leading-relaxed">{description}</p>
      )}

      {/* Link label — keep padding-right so it doesn't run under the lime button */}
      <div className="mt-auto pr-16">
        <a
          href={href}
          className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest hover:text-forest/60 transition-colors duration-200"
        >
          {linkLabel}
        </a>
      </div>

      {/* ── Concave A: right-edge → lime-top transition ─────────────────────────
           Snow square directly above the lime button, flush with the card's
           right edge.  borderBottomLeftRadius carves its bottom-left corner,
           revealing lime at the lime button's top-left junction.             */}
      <div
        className="absolute bg-snow pointer-events-none z-10"
        style={{
          right: 0,
          bottom: LIME_SIZE,
          width: CC,
          height: CC,
          borderBottomLeftRadius: CC,
        }}
      />

      {/* ── Concave B: bottom-edge → lime-left transition ──────────────────────
           Snow square on the card's bottom edge, directly left of the lime
           button.  borderBottomRightRadius carves its bottom-right corner,
           revealing lime at the lime button's bottom-left junction.          */}
      <div
        className="absolute bg-snow pointer-events-none z-10"
        style={{
          right: LIME_SIZE,
          bottom: 0,
          width: CC,
          height: CC,
          borderBottomRightRadius: CC,
        }}
      />

      {/* ── Lime corner button ─────────────────────────────────────────────────
           Square corners — outer bottom-right is clipped by card overflow-hidden.
           The two snow concave divs above handle all visible junctions.      */}
      <a
        href={href}
        className="absolute bottom-0 right-0 w-14 h-14 bg-lime flex items-center justify-center text-forest hover:bg-lime/80 transition-colors duration-200 z-0"
        aria-label={linkLabel}
      >
        <ArrowIcon />
      </a>
    </div>
  );
};

export default Card;
