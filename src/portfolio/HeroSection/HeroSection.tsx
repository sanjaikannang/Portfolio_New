import Button from "../../components/ui/Button";

const HeroSection = () => {
 return (
  <>
   <div className="p-3">
    <div className="relative w-full h-[calc(100vh-2rem)] overflow-hidden rounded-3xl">
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

     {/* Centered text */}
     <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-black font-roboto-mono tracking-widest text-[11px] uppercase">
       AI Agent Developer &nbsp;·&nbsp; Software Developer
      </p>
      <h1 className="text-black font-aspekta tracking-wide drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
       Building AI<br className="hidden sm:block" /> That Works.
      </h1>
      <p className="text-black font-dm-sans text-sm sm:text-base max-w-lg leading-relaxed">
       I design and build intelligent agent systems, full-stack applications, and
       seamless user experiences — from idea to production.
      </p>

      <Button label="View My Work" />
     </div>
    </div>
   </div>
  </>
 );
};

export default HeroSection;
