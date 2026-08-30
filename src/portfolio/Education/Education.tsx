import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Most recent first
const EDUCATION = [
  {
    number: "01",
    year: "2026",
    grade: "Master of Computer Applications",
    school: "SRM Institute of Science and Technology",
    period: "2024 – 2026",
    description:
      "Post-graduate degree focused on AI systems, machine learning, enterprise software architecture, and advanced full-stack engineering. Built multiple AI-driven products during tenure.",
  },
  {
    number: "02",
    year: "2023",
    grade: "B.Sc Information Technology",
    school: "PSG College of Arts and Science",
    period: "2020 – 2023",
    description:
      "Three-year undergraduate programme covering data structures, algorithms, database systems, networking, and full-stack web development. Graduated with distinction.",
  },
];

const N = EDUCATION.length;

// Shared font size for the year — used on both the element and its clip container
const YEAR_FONT = "clamp(5rem, 9vw, 9rem)";

// The pinned/scrubbed timeline only makes sense with room for a two-column
// layout — below this, Education renders as a plain stacked list instead.
const DESKTOP_QUERY = "(min-width: 1024px)";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
};

const Education = () => {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null); // right-side cards stack
  const yearWrapRef = useRef<HTMLDivElement>(null); // left-side year stack
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastIdx = useRef(0);

  useEffect(() => {
    if (!isDesktop) return;

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
  }, [isDesktop]);

  // ── Mobile / tablet: plain stacked timeline, no scroll-jacking ─────────────
  if (!isDesktop) {
    return (
      <section id="education" className="w-full bg-snow px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <h2 className="text-4xl sm:text-5xl font-aspekta text-forest">
            Education
          </h2>

          {EDUCATION.map((edu) => (
            <div
              key={edu.number}
              className="bg-lime rounded-3xl p-6 sm:p-8 flex flex-col gap-4 overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-aspekta font-bold text-forest/10 select-none leading-none"
                  style={{ fontSize: "clamp(3.5rem, 14vw, 5rem)" }}
                >
                  {edu.number}
                </span>
                <span className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/40 mt-2 text-right">
                  {edu.period}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-aspekta font-bold text-forest text-2xl sm:text-3xl">
                  {edu.year}
                </span>
                <h3 className="font-aspekta font-bold text-forest text-xl sm:text-2xl leading-tight">
                  {edu.grade}
                </h3>
                <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50">
                  {edu.school}
                </p>
                <p className="font-dm-sans text-sm text-forest/60 leading-relaxed mt-1">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Desktop: pinned, scroll-scrubbed year ticker + card stack ──────────────
  return (
    <>
      <section
        id="education"
        ref={sectionRef}
        style={{ height: `${N * 100}vh` }}
      >
        <div className="sticky top-0 w-full h-screen bg-snow overflow-hidden">
          <div className="max-w-7xl mx-auto h-full flex gap-10">
            {/* ── Left col: top-aligned ─────────────────────────────────────── */}
            <div className="w-2/6 shrink-0 flex flex-col gap-4 mt-32">
              <span className="inline-flex items-center gap-2 bg-mist px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest w-fit">
                <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0" />
                What I Studied
              </span>
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
                  <div key={i} className="flex-1 flex items-center mt-60">
                    <div className="w-full flex-shrink-0 h-full bg-lime rounded-3xl p-10 flex flex-col justify-between overflow-hidden">
                      {/* Ghost number + period */}
                      <div className="flex items-start justify-between">
                        <span
                          className="font-aspekta font-bold text-forest/10 select-none leading-none"
                          style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
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
    </>
  );
};

export default Education;
