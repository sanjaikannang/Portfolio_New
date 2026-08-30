import { motion } from "framer-motion";

const NAME = "SANJAI KANNAN G";

const Loader = ({ progress }: { progress: number }) => (
    <>
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-100 bg-forest flex flex-col items-center justify-center gap-8 px-6"
        >
            <span className="inline-flex items-center gap-2 font-roboto-mono text-[10px] tracking-widest uppercase text-lime">
                <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0 animate-blink" />
                Loading
            </span>

            <h1 className="font-aspekta font-bold text-snow tracking-wide text-center flex flex-wrap justify-center text-2xl sm:text-4xl md:text-5xl">
                {NAME.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                    >
                        {char === " " ? " " : char}
                    </motion.span>
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
        </motion.div>
    </>
);

export default Loader;
