import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
 {
  number: "01",
  year: "2024",
  period: "Jan 2024 – Present",
  role: "AI Agent Developer",
  company: "Grids and Guides Technologies",
  type: "Full Time",
  description:
   "Building intelligent AI agent systems and full-stack applications. Architecting multi-agent workflows using LangChain, OpenAI, and Claude API, and leading products from ideation to production deployment.",
  tags: ["LangChain", "React", "FastAPI", "Claude API"],
 },
 {
  number: "02",
  year: "2023",
  period: "Jul 2023 – Dec 2023",
  role: "Software Developer",
  company: "Tech Startup",
  type: "Internship",
  description:
   "Developed RESTful APIs and microservices with Node.js and Express. Built responsive frontends in React and TypeScript, and collaborated across teams in an agile delivery environment.",
  tags: ["Node.js", "React", "TypeScript", "PostgreSQL"],
 },
 {
  number: "03",
  year: "2022",
  period: "Jan 2022 – Jun 2023",
  role: "Frontend Developer",
  company: "Digital Agency",
  type: "Freelance",
  description:
   "Crafted pixel-perfect, responsive web interfaces for clients across industries. Integrated third-party APIs and optimised load performance, delivering 10+ projects with a focus on UX.",
  tags: ["React", "Tailwind CSS", "JavaScript", "Figma"],
 },
];

const N = EXPERIENCES.length;

const Experience = () => {
 const sectionRef = useRef<HTMLDivElement>(null);
 const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
 const yearRef = useRef<HTMLSpanElement>(null);
 const periodRef = useRef<HTMLSpanElement>(null);
 const lastIdx = useRef(0);

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
   // Cards after the first start fully off-screen at bottom-right.
   // xPercent/yPercent are relative to each card's own dimensions,
   // so 100% = exactly one card-width right and one card-height down.
   gsap.set(cardRefs.current.slice(1), { xPercent: 100, yPercent: 100 });

   const tl = gsap.timeline({
    scrollTrigger: {
     trigger: sectionRef.current,
     start: "top top",
     end: `+=${(N - 1) * window.innerHeight}`,
     scrub: 1,
     onUpdate(self) {
      const idx = Math.min(Math.floor(self.progress * N), N - 1);
      if (idx === lastIdx.current) return;
      lastIdx.current = idx;

      if (yearRef.current) yearRef.current.textContent = EXPERIENCES[idx].year;
      if (periodRef.current)
       periodRef.current.textContent = EXPERIENCES[idx].period;
     },
    },
   });

   // Each segment: active card travels to top-left corner,
   // next card travels in from the bottom-right corner simultaneously.
   // overflow-hidden on the STICKY CONTAINER clips at the viewport edge,
   // so cards visually travel across both left and right columns.
   for (let i = 0; i < N - 1; i++) {
    tl.to(
     cardRefs.current[i],
     { xPercent: -100, yPercent: -100, ease: "power2.inOut", duration: 1 },
     i
    );
    tl.to(
     cardRefs.current[i + 1],
     { xPercent: 0, yPercent: 0, ease: "power2.inOut", duration: 1 },
     i
    );
   }
  }, sectionRef);

  return () => ctx.revert();
 }, []);

 return (
  <section ref={sectionRef} style={{ height: `${N * 100}vh` }}>
   <div className="sticky top-0 w-full h-screen bg-snow overflow-hidden flex flex-col">
    <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 min-h-0 px-10">

    {/* ── Section heading — clear of the fixed navbar ──────────────── */}
    <div className="flex justify-start pt-24 pb-6 shrink-0">
     <h2 className="font-aspekta font-bold text-9xl text-forest leading-none">
      Experience
     </h2>
    </div>

    {/* ── Two-column body ─────────────────────────────────────────── */}
    <div className="flex-1 flex gap-10 pb-10 min-h-0">

     {/* Left col — year + period pinned to bottom */}
     <div className="w-2/6 shrink-0 flex flex-col">
      <div className="mt-auto flex flex-col gap-1">
       <span
        ref={yearRef}
        className="font-aspekta font-bold text-forest leading-none select-none"
        style={{ fontSize: "clamp(5rem, 9vw, 9rem)" }}
       >
        {EXPERIENCES[0].year}
       </span>
       <span
        ref={periodRef}
        className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50"
       >
        {EXPERIENCES[0].period}
       </span>
      </div>
     </div>

     {/* Right col — cards stacked; GSAP moves the outer wrapper so
         xPercent/yPercent use the full column dimensions for travel,
         but the inner card (no h-full) sizes to its content only    */}
     <div className="flex-1 relative flex items-center">
      {EXPERIENCES.map((exp, i) => (
       <div
        key={i}
        ref={(el) => { cardRefs.current[i] = el; }}
        className="absolute inset-0 flex items-center"
       >
        {/* Content-sized card — no h-full */}
        <div className="w-full bg-mist rounded-3xl p-10 flex flex-col gap-6">

         {/* Top row — ghost number + type + period */}
         <div className="flex items-start justify-between">
          <span
           className="font-aspekta font-bold text-forest/10 select-none leading-none"
           style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
          >
           {exp.number}
          </span>
          <div className="flex items-center gap-3">
           <span className="font-roboto-mono text-[9px] tracking-widest uppercase text-forest/40">
            {exp.period}
           </span>
           <span className="inline-flex items-center gap-1.5 bg-forest/8 px-3 py-1.5 rounded-lg font-roboto-mono text-[9px] tracking-widest uppercase text-forest/60">
            {exp.type}
           </span>
          </div>
         </div>

         {/* Bottom — role, company, description, tags */}
         <div className="flex flex-col gap-3">
          <h3
           className="font-aspekta font-bold text-forest leading-tight"
           style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
          >
           {exp.role}
          </h3>

          <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50">
           {exp.company}
          </p>

          <p className="font-dm-sans text-sm text-forest/60 leading-relaxed max-w-2xl">
           {exp.description}
          </p>

          <div className="flex flex-wrap gap-2">
           {exp.tags.map((tag) => (
            <span
             key={tag}
             className="inline-flex items-center gap-1.5 bg-forest/6 border border-forest/10 px-3 py-1 rounded-lg font-roboto-mono text-[9px] tracking-widest uppercase text-forest/60"
            >
             {tag}
            </span>
           ))}
          </div>
         </div>

        </div>
       </div>
      ))}
     </div>

    </div>
    </div> {/* max-w-7xl */}
   </div>
  </section>
 );
};

export default Experience;
