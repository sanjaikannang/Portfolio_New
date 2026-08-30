import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAME = "SANJAI KANNAN G";

interface LoaderProps {
    progress: number;
    loading: boolean;
}

const Loader = ({ progress, loading }: LoaderProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<HTMLHeadingElement>(null);

    // One-time entrance: the name cascades in letter by letter.
    useEffect(() => {
        const ctx = gsap.context(() => {
            const letters = lettersRef.current?.children;
            if (!letters) return;
            gsap.fromTo(
                letters,
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.035,
                    delay: 0.3,
                }
            );
        }, rootRef);

        return () => ctx.revert();
    }, []);

    // Fade out once loading finishes — pointer-events are dropped immediately
    // (via the className below) so the fade is purely visual, not blocking.
    useEffect(() => {
        if (loading) return;
        const el = rootRef.current;
        if (!el) return;
        const tween = gsap.to(el, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
        return () => {
            tween.kill();
        };
    }, [loading]);

    return (
        <div
            ref={rootRef}
            className={`fixed inset-0 z-100 bg-forest flex flex-col items-center justify-center gap-8 px-6 ${loading ? "" : "pointer-events-none"
                }`}
        >
            <span className="inline-flex items-center gap-2 font-roboto-mono text-[10px] tracking-widest uppercase text-lime">
                <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0 animate-blink" />
                Loading
            </span>

            <h1
                ref={lettersRef}
                className="font-aspekta font-bold text-snow tracking-wide text-center flex flex-wrap justify-center text-2xl sm:text-4xl md:text-5xl"
            >
                {NAME.split("").map((char, i) => (
                    <span key={i} className="inline-block">
                        {char === " " ? " " : char}
                    </span>
                ))}
            </h1>

            <div className="flex flex-col items-center gap-2">
                <div className="w-40 sm:w-48 h-0.75 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-lime rounded-full"
                        style={{ width: `${progress}%`, transition: "width 200ms ease-out" }}
                    />
                </div>
                <span className="font-roboto-mono text-[10px] tracking-widest text-snow/40 tabular-nums">
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
    );
};

export default Loader;
