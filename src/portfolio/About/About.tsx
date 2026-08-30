import { Code2, Network, FileText } from "lucide-react";
import Button from "../../components/ui/Button";

const GITHUB_URL = "https://github.com/sanjai-kannan-g";
const LINKEDIN_URL = "https://linkedin.com/in/sanjai-kannan-g";
const RESUME_URL = "#";

const About = () => {
 return (
  <>
   <div id="about" className="relative w-full h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
    {/* ── About content — max-w-7xl, 2:4 grid ─────────────────────────── */}
    <div className="flex-1 flex items-center justify-center px-6 overflow-hidden">
     <div className="max-w-7xl w-full grid grid-cols-6 gap-10 items-start">
      {/* ── LEFT col: 2/6 — badge pinned to top-left of its column ──── */}
      <div className="col-span-6 md:col-span-2 flex flex-col gap-4 justify-start">
       <span className="inline-flex items-center gap-2 bg-mist px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest w-fit">
        <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0" />A Bit About
        Me
       </span>
      </div>

      {/* ── RIGHT col: 4/6 — main content ────────────────────────────── */}
      <div className="col-span-6 md:col-span-4 flex flex-col gap-6 self-start">
       <h2 className="text-forest font-aspekta font-bold leading-tight text-4xl sm:text-5xl lg:text-6xl">
        Sanjai Kannan G
       </h2>

       <p className="text-forest/60 font-roboto-mono tracking-widest text-xs sm:text-sm uppercase">
        AI Agent Developer &nbsp;·&nbsp; Software Developer
       </p>

       <p className="text-forest/70 font-dm-sans leading-relaxed text-sm sm:text-base max-w-2xl">
        Passionate software developer specialising in AI-driven applications and
        intelligent agents. I build end-to-end solutions — from designing robust
        backend systems to crafting seamless user experiences — with a focus on
        integrating cutting-edge language models into real-world products.
        Always curious, always shipping.
       </p>

       <div className="flex flex-wrap gap-4 mt-1">
        <Button
         label="GitHub Profile"
         href={GITHUB_URL}
         target="_blank"
         rel="noopener noreferrer"
         icon={Code2}
        />
        <Button
         label="LinkedIn"
         href={LINKEDIN_URL}
         target="_blank"
         rel="noopener noreferrer"
         icon={Network}
        />
        <Button
         label="Resume"
         href={RESUME_URL}
         target="_blank"
         rel="noopener noreferrer"
         icon={FileText}
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default About;
