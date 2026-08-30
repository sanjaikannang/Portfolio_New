import Button from "../../components/ui/Button";

const HeroSection = () => {
 return (
  <>
   <div className="p-2 sm:p-3">
    <div className="relative w-full min-h-140 h-[calc(100svh-1rem)] sm:h-[calc(100svh-1.5rem)] overflow-hidden rounded-2xl sm:rounded-3xl">
     {/* Background video */}
     <video
      src="/25887-353764070.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
     />

     {/* Dark overlay for text readability */}
     <div className="absolute inset-0 bg-black/7" />

     {/* Centered text — pt clears the fixed navbar (tallest on mobile, where the
         name wraps to 3 lines) so content never sits underneath it on short viewports */}
     <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 pt-36 sm:pt-28 text-center">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-black font-roboto-mono tracking-widest text-[10px] sm:text-[11px] uppercase">
       <span>AI Agent Developer</span>
       <span aria-hidden="true">·</span>
       <span>Software Developer</span>
      </p>
      <h1 className="text-black font-aspekta tracking-wide drop-shadow-lg text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
       Building AI Agents<br className="hidden sm:block" /> That Get Things Done.
      </h1>
      <p className="text-black font-dm-sans text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg leading-relaxed">
       I'm Sanjai — I design and build autonomous AI agents, full-stack
       applications, and interfaces that feel effortless, turning complex
       problems into software people actually enjoy using.
      </p>

      <Button label="View My Work" />
     </div>
    </div>
   </div>
  </>
 );
};

export default HeroSection;
