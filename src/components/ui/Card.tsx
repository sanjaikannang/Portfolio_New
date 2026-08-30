import { ArrowUpRight } from 'lucide-react';

interface CardProps {
  badge?: string;
  date?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  href?: string;
  className?: string;
  image?: string;
}

const Card = ({
  badge,
  date,
  title,
  description,
  linkLabel = 'READ MORE',
  href = '#',
  className = '',
  image,
}: CardProps) => {
  return (
    <div
      className={`group relative bg-white rounded-3xl p-6 flex flex-col gap-4 overflow-hidden min-h-64 ${className}`}
    >
      {/* Top row — badge + date */}
      {(badge || date) && (
        <div className="flex items-center justify-between pr-2">
          {badge && (
            <span className="inline-flex items-center gap-2 bg-mist px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest">
              <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0" />
              {badge}
            </span>
          )}
          {date && (
            <span className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50 transition-opacity duration-300 group-hover:opacity-0">
              {date}
            </span>
          )}
        </div>
      )}

      {/* Hover affordance — top-right corner, same lime/forest arrow language as the site's Button component */}
      <a
        href={href}
        aria-label={`Open ${title}`}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-lime text-forest flex items-center justify-center opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 hover:bg-lime/80"
      >
        <ArrowUpRight size={18} />
      </a>

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

      {/* Link label — highlighted as a pill so it reads as a clear action */}
      <div className="mt-auto pr-16">
        <a
          href={href}
          className="inline-flex items-center gap-1.5 bg-gray px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest hover:bg-gray/70 transition-colors duration-200"
        >
          {linkLabel}
        </a>
      </div>
    </div>
  );
};

export default Card;
