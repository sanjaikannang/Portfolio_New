import { ArrowUpRight } from 'lucide-react';

interface CardLink {
  label: string;
  href: string;
}

interface CardProps {
  badge?: string;
  date?: string;
  title: string;
  description?: string;
  links?: CardLink[];
  className?: string;
  image?: string;
}

const Card = ({
  badge,
  date,
  title,
  description,
  links = [],
  className = '',
  image,
}: CardProps) => {
  const [primary, ...secondary] = links;

  return (
    <>
      <div
        className={`group relative bg-white rounded-3xl p-6 flex flex-col gap-4 overflow-hidden min-h-64 ${className}`}
      >
        {/* Top row — badge + date. pr-14 permanently reserves room for the corner
          button (always visible below lg) so the two never overlap at any size. */}
        {(badge || date) && (
          <div className="flex items-center justify-between pr-14">
            {badge && (
              <span className="inline-flex items-center gap-2 bg-mist px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest">
                <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0 animate-blink" />
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

        {/* Top-right corner button — same lime/forest arrow language as the site's Button component.
          Always visible below lg (no hover on touch devices); reveals on hover at lg+ only.
          Only rendered when there's an actual link to send it to. */}
        {primary && (
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title}`}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-lime text-forest flex items-center justify-center transition-all duration-300 hover:bg-lime/80 lg:opacity-0 lg:scale-75 lg:group-hover:opacity-100 lg:group-hover:scale-100"
          >
            <ArrowUpRight size={18} />
          </a>
        )}

        {/* Project screenshot/thumbnail — fixed height so it doesn't blow out on wide (full-row) cards */}
        {image && (
          <div className="w-full h-40 sm:h-48 md:h-56 rounded-2xl overflow-hidden bg-mist shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="font-aspekta text-forest text-lg leading-snug flex-1">{title}</h3>

        {/* Optional description */}
        {description && (
          <p className="font-dm-sans text-forest/60 text-sm leading-relaxed">{description}</p>
        )}

        {/* Links — primary highlighted in lime, any others as secondary gray pills */}
        {primary && (
          <div className="mt-auto flex flex-wrap items-center gap-2 pr-16">
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-lime px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest hover:bg-lime/80 transition-colors duration-200"
            >
              {primary.label}
            </a>
            {secondary.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gray px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest hover:bg-gray/70 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
