import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
 {
  number: "01",
  year: "2020",
  grade: "12th Grade",
  school: "St. Joseph's Higher Secondary School",
  field: "Computer Science",
  period: "2018 – 2020",
  description:
   "Completed higher secondary education specialising in Computer Science, Mathematics, and Physics — building a strong analytical and logical foundation for engineering.",
 },
 {
  number: "02",
  year: "2023",
  grade: "B.Sc Information Technology",
  school: "PSG College of Arts and Science",
  field: "Information Technology",
  period: "2020 – 2023",
  description:
   "Three-year undergraduate programme covering data structures, algorithms, database systems, networking, and full-stack web development. Graduated with distinction.",
 },
 {
  number: "03",
  year: "2025",
  grade: "Master of Computer Applications",
  school: "PSG College of Arts and Science",
  field: "Computer Applications",
  period: "2023 – 2025",
  description:
   "Post-graduate degree focused on AI systems, machine learning, enterprise software architecture, and advanced full-stack engineering. Built multiple AI-driven products during tenure.",
 },
];

const N = EDUCATION.length;

// Shared font size for the year — used on both the element and its clip container
const YEAR_FONT = "clamp(5rem, 9vw, 9rem)";

const Education = () => {
 const sectionRef = useRef<HTMLDivElement>(null);
 const cardsWrapRef = useRef<HTMLDivElement>(null); // right-side cards stack
 const yearWrapRef = useRef<HTMLDivElement>(null); // left-side year stack
 const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
 const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
 const lastIdx = useRef(0);

 useEffect(() => {
  const ctx = gsap.context(() => {
   // One timeline drives BOTH wrappers — year and cards stay in perfect sync.
   // yPercent is relative to each element's own height, so the same value
   // produces the correct pixel offset for stacks of different absolute heights.
   const tl = gsap.timeline({
    scrollTrigger: {
     trigger: sectionRef.current,
     start: "top top",
     end: `+=${(N - 1) * window.innerHeight}`,
     scrub: 1,
     markers: true,
     onUpdate(self) {
      const idx = Math.min(Math.floor(self.progress * N), N - 1);
      if (idx === lastIdx.current) return;
      lastIdx.current = idx;

      dotRefs.current.forEach((dot, i) => {
       if (!dot) return;
       dot.style.backgroundColor =
        i === idx ? "#cef79e" : "rgba(34,46,48,0.15)";
       dot.style.transform = i === idx ? "scale(1.5)" : "scale(1)";
      });

      labelRefs.current.forEach((label, i) => {
       if (!label) return;
       label.style.opacity = i === idx ? "1" : "0.4";
      });
     },
    },
   });

   tl.to(
    [cardsWrapRef.current, yearWrapRef.current],
    { yPercent: -((N - 1) / N) * 100, ease: "none" },
    0
   );
  }, sectionRef);

  return () => ctx.revert();
 }, []);

 return (
  <section ref={sectionRef} style={{ height: `${N * 100}vh` }}>
   <div className="sticky top-0 w-full h-screen bg-snow overflow-hidden">
    <div className="max-w-7xl mx-auto h-full flex gap-10">
     {/* ── Left col: top-aligned ─────────────────────────────────────── */}
     <div className="w-2/6 shrink-0 flex flex-col gap-6 mt-40">
      {/* Section title */}
      <h2 className="text-5xl font-aspekta text-forest">Education</h2>

      {/*
        Year ticker — overflow-hidden clip is the same height as one year span.
        The inner wrapper is N × that height; GSAP scrolls it upward in sync
        with the right-side cards, so year changes feel physically tied to cards.
      */}
      <div className="overflow-hidden" style={{ height: YEAR_FONT }}>
       <div ref={yearWrapRef} className="flex flex-col">
        {EDUCATION.map((edu, i) => (
         <span
          key={i}
          className="font-aspekta font-bold text-forest leading-none select-none shrink-0 block"
          style={{ fontSize: YEAR_FONT, height: YEAR_FONT }}
         >
          {edu.year}
         </span>
        ))}
       </div>
      </div>
     </div>

     {/* ── Right col: overflow window for the scrolling card stack ────── */}
     <div className="flex-1 overflow-hidden">
      {/*
        Wrapper is N × 100vh tall. Each flex-1 child gets exactly 100vh.
        GSAP shifts this upward by (N-1)/N × 100% = 66.67% of its own height,
        moving (N-1) × 100vh = 200vh, which reveals card 2 then card 3.
      */}
      <div ref={cardsWrapRef} className="flex flex-col">
       {EDUCATION.map((edu, i) => (
        <div key={i} className="flex-1 flex items-center mt-96">
         <div className="w-full flex-shrink-0 h-full bg-lime rounded-3xl p-10 flex flex-col justify-between overflow-hidden">
          {/* Ghost number + period */}
          <div className="flex items-start justify-between">
           <span
            className="font-aspekta font-bold text-forest/10 select-none leading-none"
            style={{ fontSize: "clamp(4rem, 7vw, 7rem)" }}
           >
            {edu.number}
           </span>
           <span className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/40 mt-2">
            {edu.period}
           </span>
          </div>

          {/* Degree info */}
          <div className="flex flex-col gap-3">
           <h3
            className="font-aspekta font-bold text-forest leading-tight"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
           >
            {edu.grade}
           </h3>
           <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50">
            {edu.school}
           </p>
           <p className="font-dm-sans text-sm text-forest/60 leading-relaxed mt-2 max-w-xl">
            {edu.description}
           </p>
          </div>
         </div>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Education;
