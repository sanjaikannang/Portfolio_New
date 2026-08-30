import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import About from "./portfolio/About/About";
import Contact from "./portfolio/Contact/Contact";
import Education from "./portfolio/Education/Education";
import Experience from "./portfolio/Experience/Experience";
import HeroSection from "./portfolio/HeroSection/HeroSection";
import Navbar from "./portfolio/Navbar/Navbar";
import Projects from "./portfolio/Projects/Projects";
import Skills from "./portfolio/Skills/Skills";
import Loader from "./components/Loader/Loader";

// Floor on how long the loader stays up, so it reads as an intentional
// entrance rather than a flash — even when the page itself loads instantly.
const MIN_LOAD_MS = 1800;

function App() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        let pageLoaded = document.readyState === "complete";
        let minTimeElapsed = false;
        let finished = false;

        const finish = () => {
            if (finished || !pageLoaded || !minTimeElapsed) return;
            finished = true;
            if (progressTimer.current) clearInterval(progressTimer.current);
            setProgress(100);
            setTimeout(() => setLoading(false), 400);
        };

        const onLoad = () => {
            pageLoaded = true;
            finish();
        };
        if (!pageLoaded) window.addEventListener("load", onLoad);

        const minTimer = setTimeout(() => {
            minTimeElapsed = true;
            finish();
        }, MIN_LOAD_MS);

        progressTimer.current = setInterval(() => {
            setProgress((p) => (p >= 90 ? p : p + Math.random() * 12));
        }, 180);

        return () => {
            window.removeEventListener("load", onLoad);
            clearTimeout(minTimer);
            if (progressTimer.current) clearInterval(progressTimer.current);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = loading ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [loading]);

    return (
        <>
            <AnimatePresence>
                {loading && <Loader progress={progress} />}
            </AnimatePresence>

            <div className={loading ? "invisible" : ""}>
                <Navbar />
                <div className="flex flex-col">
                    <HeroSection />
                    <About />
                    <Skills />
                    <Education />
                    <Experience />
                    <Projects />
                    <Contact />
                </div>
            </div>
        </>
    );
}

export default App;
