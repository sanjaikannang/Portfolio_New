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
}: ButtonProps) => (
 <a
  href={href}
  onClick={onClick}
  target={target}
  rel={rel}
  className={`inline-flex items-center cursor-pointer group ${className}`}
 >
  {/* Dark label — swaps to lime bg on hover */}
  <span
   className={`flex items-center gap-2 h-12 bg-forest text-snow px-8 shrink-0 transition-colors duration-300 group-hover:bg-lime group-hover:text-forest ${
    showArrow ? "rounded-l-xl" : "rounded-xl"
   }`}
  >
   {Icon && <Icon size={15} className="shrink-0" />}
   <span className="font-roboto-mono text-xs tracking-[0.15em] uppercase whitespace-nowrap">
    {label}
   </span>
  </span>

  {showArrow && (
   <>
    {/* Corner bridge — fill uses currentColor so it swaps with the dark section */}
    <span className="relative z-10 flex items-center shrink-0 text-forest transition-colors duration-300 group-hover:text-lime">
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

    {/* Lime icon — swaps to forest bg on hover. overflow-hidden clips the arrow animation. */}
    <span className="relative ml-0.5 flex items-center justify-center shrink-0 overflow-hidden text-lime transition-colors duration-300 group-hover:text-forest">
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
      {/* Exit arrow — visible at rest, slides out left on hover */}
      <ArrowRight
       size={20}
       className="absolute text-forest transition-all duration-300 group-hover:-translate-x-10 group-hover:opacity-0"
      />
      {/* Enter arrow — off-screen right at rest, slides to center on hover */}
      <ArrowRight
       size={20}
       className="absolute translate-x-10 opacity-0 text-lime transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      />
     </span>
    </span>
   </>
  )}
 </a>
);

export default Button;
