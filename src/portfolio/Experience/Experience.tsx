import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Role {
    title: string;
    period: string;
    duration: string;
    bullets?: string[];
}

interface CompanyEntry {
    number: string;
    company: string;
    type: string;
    location?: string;
    duration: string;
    roles: Role[];
}

// Most recent company first
const EXPERIENCES: CompanyEntry[] = [
    {
        number: "01",
        company: "Grids and Guides",
        type: "Full-time",
        location: "Chennai, Tamil Nadu, India · On-site",
        duration: "Aug 2024 – Present · 2 yrs 2 mo",
        roles: [
            {
                title: "AI Agent Developer",
                period: "Sep 2025 – Present",
                duration: "1 yr",
                bullets: [
                    "Designing and developing multi-agent systems using LangChain and LangGraph, enabling complex task orchestration and intelligent decision-making across interconnected AI agents",
                    "Building conversational AI and task automation agents powered by AWS Bedrock Agent Core, integrating large language models to deliver production-ready AI solutions",
                    "Implementing RAG pipelines with vector databases to enhance agent memory, context retrieval, and response accuracy across diverse use cases",
                    "Architecting serverless applications with AWS Lambda and managing cloud infrastructure including S3, Cognito, and Secrets Manager to support scalable AI deployments",
                ],
            },
            {
                title: "Software Developer",
                period: "Nov 2024 – Aug 2025",
                duration: "10 mos",
                bullets: [
                    "Built and deployed RESTful APIs using Node.js and NestJS, integrating third-party services to support scalable, production-ready backend systems",
                    "Managed cloud infrastructure on AWS including Lambda, S3, Cognito, and Secrets Manager, while optimizing CI/CD deployment pipelines for reliability and speed",
                    "Contributed to early-stage AI agent development using LangChain, LangGraph, and AWS Bedrock Agent Core, laying the groundwork for intelligent automation solutions",
                ],
            },
            {
                title: "Junior Software Developer",
                period: "Aug 2024 – Oct 2024",
                duration: "3 mos",
                bullets: [
                    "Developed full-stack web applications using React, Vite, TypeScript, and Tailwind CSS, delivering responsive and component-based user interfaces",
                    "Built secure backend services with Node.js, Express.js, and NestJS, implementing JWT authentication and AWS Cognito integration for robust authorization flows",
                    "Designed and optimized MongoDB and MySQL database schemas, improving query performance and overall data integrity across production systems",
                ],
            },
        ],
    },
    {
        number: "02",
        company: "Trippr.",
        type: "Full-time",
        duration: "May 2024 – Jul 2024 · 3 mos",
        roles: [
            {
                title: "Front End Developer – Level 1",
                period: "May 2024 – Jul 2024",
                duration: "3 mos",
            },
        ],
    },
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
                            <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0 animate-blink" />
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
                            {EXPERIENCES.map((entry, i) => (
                                <div
                                    key={entry.number}
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

                                    {/* Card — 1st entry on the right, 2nd on the left (desktop); stacked on mobile */}
                                    <div className={i % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}>
                                        <div className="bg-snow rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
                                            {/* Company header */}
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="font-aspekta font-bold text-forest leading-tight text-xl sm:text-2xl">
                                                        {entry.company}
                                                    </h3>
                                                    <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/50">
                                                        {entry.type}
                                                        {entry.location ? ` · ${entry.location}` : ""}
                                                    </p>
                                                </div>
                                                <span
                                                    className="font-aspekta font-bold text-forest/10 select-none leading-none shrink-0"
                                                    style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                                                >
                                                    {entry.number}
                                                </span>
                                            </div>

                                            <span className="font-roboto-mono text-[9px] tracking-widest uppercase text-forest/40 -mt-2">
                                                {entry.duration}
                                            </span>

                                            {/* Roles within the company */}
                                            <div className="flex flex-col gap-5">
                                                {entry.roles.map((role, ri) => (
                                                    <div
                                                        key={role.title}
                                                        className={ri > 0 ? "pt-5 border-t border-forest/10" : ""}
                                                    >
                                                        <div className="flex items-baseline justify-between gap-3 flex-wrap">
                                                            <h4 className="font-aspekta font-bold text-forest text-base sm:text-lg">
                                                                {role.title}
                                                            </h4>
                                                            <span className="font-roboto-mono text-[9px] tracking-widest uppercase text-forest/40 whitespace-nowrap">
                                                                {role.period} · {role.duration}
                                                            </span>
                                                        </div>

                                                        {role.bullets && (
                                                            <ul className="mt-2.5 flex flex-col gap-1.5">
                                                                {role.bullets.map((bullet, bi) => (
                                                                    <li
                                                                        key={bi}
                                                                        className="relative pl-4 font-dm-sans text-sm text-forest/60 leading-relaxed before:content-['•'] before:absolute before:left-0 before:text-lime"
                                                                    >
                                                                        {bullet}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
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
