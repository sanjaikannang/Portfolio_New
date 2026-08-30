import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
// Don't hold the loader hostage to a slow connection forever — reveal the
// site after this even if the hero video hasn't finished buffering yet.
const MAX_WAIT_MS = 6000;

const HERO_VIDEO_SRC = "/25887-353764070.mp4";

function App() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        let pageLoaded = document.readyState === "complete";
        let minTimeElapsed = false;
        let heroVideoReady = false;
        let finished = false;

        const finish = () => {
            if (finished || !pageLoaded || !minTimeElapsed || !heroVideoReady) return;
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

        // Preload the hero video in the background so it has a decoded frame
        // ready by the time the loader hands off — this is what was showing
        // up blank on first visits over a real network connection.
        const preloadVideo = document.createElement("video");
        preloadVideo.src = HERO_VIDEO_SRC;
        preloadVideo.muted = true;
        preloadVideo.preload = "auto";
        const onVideoReady = () => {
            heroVideoReady = true;
            finish();
        };
        preloadVideo.addEventListener("loadeddata", onVideoReady, { once: true });
        preloadVideo.load();

        const maxTimer = setTimeout(() => {
            heroVideoReady = true;
            pageLoaded = true;
            minTimeElapsed = true;
            finish();
        }, MAX_WAIT_MS);

        progressTimer.current = setInterval(() => {
            setProgress((p) => (p >= 90 ? p : p + Math.random() * 12));
        }, 180);

        return () => {
            window.removeEventListener("load", onLoad);
            clearTimeout(minTimer);
            clearTimeout(maxTimer);
            preloadVideo.removeEventListener("loadeddata", onVideoReady);
            if (progressTimer.current) clearInterval(progressTimer.current);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = loading ? "hidden" : "";
        if (!loading) {
            // The whole page rendered while body scroll was locked and the
            // site was visibility:hidden under the loader — GSAP's
            // ScrollTrigger (Education's pinned timeline especially) needs a
            // recalculation now that real scrolling is possible, or its pin
            // distances end up stale and leave a large dead-scroll gap.
            const id = requestAnimationFrame(() => ScrollTrigger.refresh());
            return () => cancelAnimationFrame(id);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [loading]);

    return (
        <>
            <Loader progress={progress} loading={loading} />

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
