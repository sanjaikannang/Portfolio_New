import { ArrowRight } from "lucide-react";
import type { ElementType } from "react";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ElementType;
  target?: string;
  rel?: string;
  showArrow?: boolean;
  className?: string;
  /** Renders a native <button> (for form submission etc.) instead of an <a>. */
  type?: "button" | "submit" | "reset";
  /** "dark" (default) is forest label + lime arrow — for light backgrounds.
   *  "light" inverts that — lime label + forest arrow — for dark backgrounds,
   *  where the default dark label would blend into the background. */
  variant?: "dark" | "light";
  disabled?: boolean;
}

const Button = ({
  label,
  href = "#",
  onClick,
  icon: Icon,
  target,
  rel,
  showArrow = true,
  className = "",
  type,
  variant = "dark",
  disabled = false,
}: ButtonProps) => {
  const classes = `inline-flex items-center group ${disabled ? "cursor-not-allowed opacity-60 pointer-events-none" : "cursor-pointer"
    } ${className}`;
  const isLight = variant === "light";

  const content = (
    <>
      {/* Label — swaps to the opposite color pair on hover */}
      <span
        className={`flex items-center gap-2 h-12 px-8 shrink-0 transition-colors duration-300 ${isLight
            ? "bg-lime text-forest group-hover:bg-forest group-hover:text-snow"
            : "bg-forest text-snow group-hover:bg-lime group-hover:text-forest"
          } ${showArrow ? "rounded-l-xl" : "rounded-xl"}`}
      >
        {Icon && <Icon size={15} className="shrink-0" />}
        <span className="font-roboto-mono text-xs tracking-[0.15em] uppercase whitespace-nowrap">
          {label}
        </span>
      </span>

      {showArrow && (
        <>
          {/* Corner bridge — fill uses currentColor so it swaps with the label */}
          <span
            className={`relative z-10 flex items-center shrink-0 transition-colors duration-300 ${isLight
                ? "text-lime group-hover:text-forest"
                : "text-forest group-hover:text-lime"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="48"
              viewBox="0 0 18 48"
              fill="none"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z"
              />
            </svg>
          </span>

          {/* Icon box — swaps to the opposite color pair on hover. overflow-hidden clips the arrow animation. */}
          <span
            className={`relative ml-0.5 flex items-center justify-center shrink-0 overflow-hidden transition-colors duration-300 ${isLight
                ? "text-forest group-hover:text-lime"
                : "text-lime group-hover:text-forest"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="48"
              viewBox="0 0 51 48"
              fill="none"
              className="fill-current"
              aria-hidden="true"
            >
              <path d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
            </svg>

            {/* Arrow animation: default arrow exits left, new arrow enters from right */}
            <span className="absolute inset-0 flex items-center justify-center">
              {/* Exit arrow — visible at rest, slides out left on hover.
           Must contrast the box's REST color (light variant: forest box → lime arrow). */}
              <ArrowRight
                size={20}
                className={`absolute transition-all duration-300 group-hover:-translate-x-10 group-hover:opacity-0 ${isLight ? "text-lime" : "text-forest"
                  }`}
              />
              {/* Enter arrow — off-screen right at rest, slides to center on hover.
           Must contrast the box's HOVER color (light variant: lime box → forest arrow). */}
              <ArrowRight
                size={20}
                className={`absolute translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${isLight ? "text-forest" : "text-lime"
                  }`}
              />
            </span>
          </span>
        </>
      )}
    </>
  );

  if (type) {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} onClick={onClick} target={target} rel={rel} className={classes}>
      {content}
    </a>
  );
};

export default Button;
