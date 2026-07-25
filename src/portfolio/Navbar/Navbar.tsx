const NAV_LINKS = ["EDUCATION", "EXPERIENCE", "SKILLS"];

const Navbar = () => {
 return (
  <>
   <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
     {/* Left — Name */}
     <div className="px-6 py-3 rounded-xl bg-white/30 backdrop-blur-lg shadow-lg shadow-black/10">
      <div className="text-forest font-roboto-mono text-lg tracking-wide select-none">
       SANJAI KANNAN G
      </div>
     </div>

     {/* Right — Links + CTA */}
     <div className="flex items-center gap-8 px-6 py-2 rounded-2xl bg-white/30 backdrop-blur-lg shadow-lg shadow-black/10">
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
    </div>
   </nav>
  </>
 );
};

export default Navbar;
