import About from "./portfolio/About/About";
import Contact from "./portfolio/Contact/Contact";
import Education from "./portfolio/Education/Education";
import Experience from "./portfolio/Experience/Experience";
import HeroSection from "./portfolio/HeroSection/HeroSection";
import Navbar from "./portfolio/Navbar/Navbar";
import Projects from "./portfolio/Projects/Projects";
import Skills from "./portfolio/Skills/Skills";

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
