import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = ["ABOUT", "SKILLS", "EDUCATION", "EXPERIENCE", "PROJECTS"];

const Navbar = () => {
 const [open, setOpen] = useState(false);

 // Lock page scroll while the full-screen menu is open, and let Escape close it.
 useEffect(() => {
  if (!open) return;

  document.body.style.overflow = "hidden";
  const onKeyDown = (e: KeyboardEvent) => {
   if (e.key === "Escape") setOpen(false);
  };
  window.addEventListener("keydown", onKeyDown);

  return () => {
   document.body.style.overflow = "";
   window.removeEventListener("keydown", onKeyDown);
  };
 }, [open]);

 return (
  <>
   <nav className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
     {/* Left — Name */}
     <div className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/30 backdrop-blur-lg shadow-lg shadow-black/10">
      <div className="text-forest font-roboto-mono text-sm sm:text-base md:text-lg tracking-wide whitespace-nowrap select-none">
       SANJAI KANNAN G
      </div>
     </div>

     {/* Right — Links + CTA (desktop) */}
     <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-2xl bg-white/30 backdrop-blur-lg shadow-lg shadow-black/10">
      {NAV_LINKS.map((link) => (
       <a
        key={link}
        href={`#${link.toLowerCase()}`}
        className="
                text-forest text-sm font-roboto-mono tracking-wide
                hover:text-forest transition-colors duration-200
              "
       >
        {link}
       </a>
      ))}

      {/* Hire Me button */}
      <a
       href="#contact"
       className="px-10 py-2 rounded-lg text-sm font-roboto-mono tracking-wide bg-lime text-forest transition-all duration-200 backdrop-blur-sm"
      >
       HIRE ME
      </a>
     </div>

     {/* Right — Modern animated hamburger (mobile / tablet) */}
     <button
      type="button"
      onClick={() => setOpen(true)}
      aria-expanded={open}
      aria-label="Open menu"
      className="group md:hidden shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-white/30 backdrop-blur-lg shadow-lg shadow-black/10"
     >
      <span className="flex flex-col items-end gap-[5px]">
       <span className="h-[2px] w-5 bg-forest rounded-full transition-all duration-300 group-hover:w-5" />
       <span className="h-[2px] w-3 bg-forest rounded-full transition-all duration-300 group-hover:w-5" />
      </span>
     </button>
    </div>
   </nav>

   {/* Full-screen mobile menu overlay */}
   <AnimatePresence>
    {open && (
     <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[60] md:hidden bg-white/30 backdrop-blur-2xl flex flex-col"
     >
      {/* Top bar — branding + close */}
      <div className="flex items-center justify-between px-6 py-4">
       <span className="text-forest font-roboto-mono text-sm sm:text-base tracking-wide select-none">
        SANJAI KANNAN G
       </span>
       <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close menu"
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/40 shadow-lg shadow-black/10 text-forest hover:bg-white/60 transition-colors duration-200"
       >
        <X size={22} />
       </button>
      </div>

      {/* Links */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
       {NAV_LINKS.map((link, i) => (
        <motion.a
         key={link}
         href={`#${link.toLowerCase()}`}
         onClick={() => setOpen(false)}
         initial={{ opacity: 0, y: 16 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.15 + i * 0.06 }}
         className="text-forest font-aspekta text-3xl tracking-wide hover:text-forest/60 transition-colors duration-200"
        >
         {link}
        </motion.a>
       ))}

       <motion.a
        href="#contact"
        onClick={() => setOpen(false)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 + NAV_LINKS.length * 0.06 }}
        className="mt-4 px-10 py-3 rounded-lg text-sm font-roboto-mono tracking-wide bg-lime text-forest"
       >
        HIRE ME
       </motion.a>
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </>
 );
};

export default Navbar;
