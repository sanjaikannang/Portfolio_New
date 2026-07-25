import { useState } from "react";
import {
 Code2,
 Server,
 Database,
 Brain,
 Layers,
 Globe,
 Wind,
 Zap,
 Terminal,
 Package,
 Cpu,
 HardDrive,
 Archive,
 Bot,
 Sparkles,
 Network,
 FileCode,
 Box,
} from "lucide-react";

// ── Decorative front-face SVG icons ─────────────────────────────────────────

const StarburstSVG = ({ color }: { color: string }) => (
 <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
  {Array.from({ length: 12 }).map((_, i) => {
   const a = (i * 30 * Math.PI) / 180;
   return (
    <line
     key={i}
     x1="36"
     y1="36"
     x2={36 + 30 * Math.cos(a)}
     y2={36 + 30 * Math.sin(a)}
     stroke={color}
     strokeWidth="1.5"
     strokeLinecap="round"
     opacity="0.45"
    />
   );
  })}
  <circle cx="36" cy="36" r="5" fill={color} opacity="0.75" />
  {[0, 60, 120, 180, 240, 300].map((deg, i) => {
   const a = (deg * Math.PI) / 180;
   return (
    <circle
     key={i}
     cx={36 + 18 * Math.cos(a)}
     cy={36 + 18 * Math.sin(a)}
     r="2.5"
     fill={color}
     opacity="0.4"
    />
   );
  })}
 </svg>
);

const HexNestSVG = ({ color }: { color: string }) => (
 <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
  <polygon
   points="36,4 62,19 62,49 36,64 10,49 10,19"
   stroke={color}
   strokeWidth="1.5"
   fill="none"
   opacity="0.7"
  />
  <polygon
   points="36,14 54,24.5 54,45.5 36,56 18,45.5 18,24.5"
   stroke={color}
   strokeWidth="1.5"
   fill="none"
   opacity="0.5"
  />
  <polygon
   points="36,24 46,29.5 46,40.5 36,46 26,40.5 26,29.5"
   stroke={color}
   strokeWidth="1.5"
   fill="none"
   opacity="0.35"
  />
  <circle cx="36" cy="35" r="3.5" fill={color} opacity="0.55" />
 </svg>
);

const RingsSVG = ({ color }: { color: string }) => (
 <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
  <ellipse
   cx="36"
   cy="54"
   rx="28"
   ry="9"
   stroke={color}
   strokeWidth="1.5"
   fill="none"
   opacity="0.7"
  />
  <ellipse
   cx="36"
   cy="42"
   rx="28"
   ry="9"
   stroke={color}
   strokeWidth="1.5"
   fill="none"
   opacity="0.55"
  />
  <ellipse
   cx="36"
   cy="30"
   rx="28"
   ry="9"
   stroke={color}
   strokeWidth="1.5"
   fill="none"
   opacity="0.4"
  />
  <line
   x1="8"
   y1="30"
   x2="8"
   y2="54"
   stroke={color}
   strokeWidth="1.5"
   opacity="0.5"
  />
  <line
   x1="64"
   y1="30"
   x2="64"
   y2="54"
   stroke={color}
   strokeWidth="1.5"
   opacity="0.5"
  />
 </svg>
);

const NeuralSVG = ({ color }: { color: string }) => {
 const nodes = {
  l: [
   [12, 20],
   [12, 40],
   [12, 60],
  ] as [number, number][],
  m: [
   [38, 12],
   [38, 36],
   [38, 60],
  ] as [number, number][],
  r: [
   [62, 26],
   [62, 50],
  ] as [number, number][],
 };
 const edges: [number, number, number, number][] = [];
 nodes.l.forEach(([x1, y1]) =>
  nodes.m.forEach(([x2, y2]) => edges.push([x1, y1, x2, y2]))
 );
 nodes.m.forEach(([x1, y1]) =>
  nodes.r.forEach(([x2, y2]) => edges.push([x1, y1, x2, y2]))
 );
 return (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
   {edges.map(([x1, y1, x2, y2], i) => (
    <line
     key={i}
     x1={x1}
     y1={y1}
     x2={x2}
     y2={y2}
     stroke={color}
     strokeWidth="1"
     opacity="0.3"
    />
   ))}
   {[...nodes.l, ...nodes.m, ...nodes.r].map(([cx, cy], i) => (
    <circle
     key={i}
     cx={cx}
     cy={cy}
     r="4"
     fill={color}
     opacity={i < 3 ? 0.45 : i < 6 ? 0.65 : 0.85}
    />
   ))}
  </svg>
 );
};

// ── Skill card with 3D flip ──────────────────────────────────────────────────

interface SkillCategory {
 id: string;
 number: string;
 title: string;
 description: string;
 bgColor: string;
 textColor: string;
 // Back face
 backBgColor: string;
 backBorderColor: string;
 backIconColor: string;
 skills: { Icon: React.ElementType; label: string }[];
 DecoIcon: React.FC<{ color: string }>;
}

const SkillCard = ({
 number,
 title,
 description,
 bgColor,
 textColor,
 backBgColor,
 backBorderColor,
 backIconColor,
 skills,
 DecoIcon,
}: SkillCategory) => {
 const [flipped, setFlipped] = useState(false);

 return (
  <>
   <div
    className="relative w-full h-full cursor-pointer select-none"
    style={{ perspective: "1200px" }}
    onMouseEnter={() => setFlipped(true)}
    onMouseLeave={() => setFlipped(false)}
   >
    <div
     className="relative w-full h-full"
     style={{
      transformStyle: "preserve-3d",
      transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
     }}
    >
     {/* ── Front face ─────────────────────────────────────────────────── */}
     <div
      className="absolute inset-0 p-8 flex flex-col"
      style={{
       backfaceVisibility: "hidden",
       WebkitBackfaceVisibility: "hidden",
       backgroundColor: bgColor,
      }}
     >
      <div className="flex items-start justify-between">
       <DecoIcon color={textColor} />
       <span
        className="font-aspekta text-xl font-bold tabular-nums"
        style={{ color: textColor, opacity: 0.5 }}
       >
        {number}
       </span>
      </div>

      <div className="mt-auto">
       <h3
        className="font-aspekta font-bold leading-none"
        style={{ color: textColor, fontSize: "clamp(2rem, 3vw, 3rem)" }}
       >
        {title}
       </h3>
       <p
        className="font-dm-sans text-sm leading-relaxed mt-3"
        style={{ color: textColor, opacity: 0.6 }}
       >
        {description}
       </p>
      </div>
     </div>

     {/* ── Back face ──────────────────────────────────────────────────── */}
     <div
      className="absolute inset-0 flex flex-col justify-center gap-6 p-8"
      style={{
       backfaceVisibility: "hidden",
       WebkitBackfaceVisibility: "hidden",
       transform: "rotateY(180deg)",
       backgroundColor: backBgColor,
      }}
     >
      <span
       className="font-roboto-mono text-[10px] tracking-widest uppercase"
       style={{ color: backBorderColor, opacity: 0.7 }}
      >
       {title} Stack
      </span>
      <div className="grid grid-cols-2 gap-y-4 gap-x-3">
       {skills.map(({ Icon, label }) => (
        <div key={label} className="flex items-center gap-2.5">
         <Icon size={14} style={{ color: backIconColor }} />
         <span
          className="font-dm-sans text-sm"
          style={{ color: backIconColor }}
         >
          {label}
         </span>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

// ── Category data ────────────────────────────────────────────────────────────

const CATEGORIES: SkillCategory[] = [
 {
  id: "frontend",
  number: "01.",
  title: "Frontend",
  description:
   "Crafting pixel-perfect, responsive interfaces with modern frameworks and design systems.",
  bgColor: "#cef79e",
  textColor: "#222e30",
  backBgColor: "#222e30",
  backBorderColor: "#cef79e",
  backIconColor: "#cef79e",
  DecoIcon: StarburstSVG,
  skills: [
   { Icon: Code2, label: "React" },
   { Icon: Layers, label: "TypeScript" },
   { Icon: Wind, label: "Tailwind" },
   { Icon: FileCode, label: "HTML/CSS" },
   { Icon: Zap, label: "Framer" },
   { Icon: Globe, label: "Vite" },
   { Icon: Box, label: "Next.js" },
  ],
 },
 {
  id: "backend",
  number: "02.",
  title: "Backend",
  description:
   "Building robust APIs and scalable server architectures for real-world products.",
  bgColor: "#222e30",
  textColor: "#f7f7f5",
  backBgColor: "#cef79e",
  backBorderColor: "#222e30",
  backIconColor: "#222e30",
  DecoIcon: HexNestSVG,
  skills: [
   { Icon: Server, label: "Node.js" },
   { Icon: Terminal, label: "Python" },
   { Icon: Package, label: "FastAPI" },
   { Icon: Cpu, label: "Express" },
   { Icon: Code2, label: "REST" },
   { Icon: Network, label: "GraphQL" },
   { Icon: Box, label: "Docker" },
  ],
 },
 {
  id: "database",
  number: "03.",
  title: "Database",
  description:
   "Designing efficient data models and managing structured and unstructured data at scale.",
  bgColor: "#e7e8e1",
  textColor: "#222e30",
  backBgColor: "#222e30",
  backBorderColor: "#e7e8e1",
  backIconColor: "#e7e8e1",
  DecoIcon: RingsSVG,
  skills: [
   { Icon: Database, label: "PostgreSQL" },
   { Icon: HardDrive, label: "MongoDB" },
   { Icon: Archive, label: "Redis" },
   { Icon: Layers, label: "Supabase" },
   { Icon: Package, label: "SQLite" },
   { Icon: Server, label: "Prisma" },
   { Icon: Box, label: "Pinecone" },
  ],
 },
 {
  id: "ai",
  number: "04.",
  title: "AI",
  description:
   "Integrating cutting-edge language models and building intelligent agent systems.",
  bgColor: "#f7f7f5",
  textColor: "#222e30",
  backBgColor: "#222e30",
  backBorderColor: "#f7f7f5",
  backIconColor: "#f7f7f5",
  DecoIcon: NeuralSVG,
  skills: [
   { Icon: Brain, label: "LangChain" },
   { Icon: Bot, label: "OpenAI" },
   { Icon: Sparkles, label: "Claude" },
   { Icon: Network, label: "Vectors" },
   { Icon: Cpu, label: "Fine-tune" },
   { Icon: Zap, label: "RAG" },
   { Icon: Layers, label: "Agents" },
  ],
 },
];

// ── Section ──────────────────────────────────────────────────────────────────

const Skills = () => (
 <>
  <div className="w-full auto-rows-[500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
   {CATEGORIES.map((cat) => (
    <SkillCard key={cat.id} {...cat} />
   ))}
  </div>
 </>
);

export default Skills;
