import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
    {
        number: "01",
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
        period: "Jul 2023 – Dec 2023",
        role: "Software Developer",
        company: "Tech Startup",
        type: "Internship",
        description:
            "Developed RESTful APIs and microservices with Node.js and Express. Built responsive frontends in React and TypeScript, and collaborated across teams in an agile delivery environment.",
        tags: ["Node.js", "React", "TypeScript", "PostgreSQL"],
    }
];

const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Each card fades/slides in once as it scrolls into view — no pinning,
    // so the effect holds up the same way at every viewport size.
    useEffect(() => {
        const ctx = gsap.context(() => {
            itemRefs.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 48 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section
                id="experience"
                ref={sectionRef}
                className="w-full bg-forest px-4 sm:px-6 py-16 sm:py-24"
            >
                <div className="max-w-5xl mx-auto flex flex-col gap-12 sm:gap-16">
                    {/* ── Header ───────────────────────────────────────────────────── */}
                    <div className="flex flex-col gap-4">
                        <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-lime w-fit">
                            <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0" />
                            Where I've Worked
                        </span>
                        <h2 className="text-snow font-aspekta font-bold leading-tight text-4xl sm:text-5xl lg:text-6xl">
                            Experience
                        </h2>
                    </div>

                    {/* ── Timeline ─────────────────────────────────────────────────── */}
                    <div className="relative">
                        {/* Connecting line — left edge on mobile, dead center from md up */}
                        <div className="absolute top-2 bottom-2 left-4 md:left-1/2 w-px bg-white/15 md:-translate-x-1/2" />

                        <div className="flex flex-col gap-10 sm:gap-12 md:gap-4">
                            {EXPERIENCES.map((exp, i) => (
                                <div
                                    key={exp.number}
                                    ref={(el) => {
                                        itemRefs.current[i] = el;
                                    }}
                                    className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-x-16 md:py-8"
                                >
                                    {/* Node dot on the line */}
                                    <span
                                        className={`absolute left-4 md:left-1/2 top-1.5 md:top-10 -translate-x-1/2 w-3.5 h-3.5 rounded-full ring-4 ring-forest z-10 ${i === 0 ? "bg-lime" : "bg-white/30"
                                            }`}
                                    />

                                    {/* Card — alternates side on desktop, always right of the line on mobile */}
                                    <div className={i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}>
                                        <div className="bg-snow rounded-2xl p-6 sm:p-8 flex flex-col gap-3">
                                            {/* Ghost number + type + period */}
                                            <div className="flex items-start justify-between gap-3">
                                                <span
                                                    className="font-aspekta font-bold text-forest/10 select-none leading-none"
                                                    style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                                                >
                                                    {exp.number}
                                                </span>
                                                <div className="flex flex-col items-end gap-2 mt-1">
                                                    <span className="inline-flex items-center gap-1.5 bg-forest/8 px-3 py-1 rounded-lg font-roboto-mono text-[9px] tracking-widest uppercase text-forest/60 whitespace-nowrap">
                                                        {exp.type}
                                                    </span>
                                                    <span className="font-roboto-mono text-[9px] tracking-widest uppercase text-forest/40 whitespace-nowrap">
                                                        {exp.period}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Role, company, description, tags */}
                                            <h3 className="font-aspekta font-bold text-forest leading-tight text-xl sm:text-2xl">
                                                {exp.role}
                                            </h3>

                                            <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50">
                                                {exp.company}
                                            </p>

                                            <p className="font-dm-sans text-sm text-forest/60 leading-relaxed">
                                                {exp.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mt-1">
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
                </div>
            </section>
        </>
    );
};

export default Experience;
