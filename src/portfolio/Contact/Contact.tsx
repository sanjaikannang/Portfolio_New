import { type ElementType } from "react";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";

const Field = ({
 label,
 icon: Icon,
 type,
 placeholder,
}: {
 label: string;
 icon: ElementType;
 type: string;
 placeholder: string;
}) => (
 <div className="flex flex-col gap-2">
  <label className="font-roboto-mono text-[9px] tracking-widest uppercase text-snow/40">
   {label}
  </label>
  <div className="relative">
   <Icon
    size={13}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-snow/30 pointer-events-none"
   />
   <input
    type={type}
    placeholder={placeholder}
    className="w-full bg-snow/5 border border-snow/15 rounded-2xl px-5 py-3.5 pl-11 text-snow placeholder:text-snow/25 font-dm-sans text-sm focus:outline-none focus:border-lime/50 transition-colors duration-200"
   />
  </div>
 </div>
);

const Contact = () => {
 return (
  <>
   <div className="relative z-20 w-full bg-forest rounded-b-[350px] flex flex-col pt-20 pb-20">
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">
     {/* ── Header */}
     <div className="flex flex-col gap-8">
      <span className="inline-flex items-center gap-2 bg-snow/5 border border-snow/10 px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-snow/60 w-fit">
       <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0" />
       Get In Touch
      </span>

      <h2
       className="font-aspekta font-bold text-snow leading-[0.9]"
       style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
      >
       Let's Work
       <br />
       Together.
      </h2>

      <p className="font-dm-sans text-snow/50 text-base leading-relaxed max-w-lg mt-2">
       Have a project in mind or want to collaborate? Drop your details below
       and I'll get back to you as soon as possible.
      </p>
     </div>

     {/* ── Form */}
     <form className="w-full flex flex-col gap-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
       <Field
        label="Name"
        icon={User}
        type="text"
        placeholder="Your full name"
       />
       <Field
        label="Email"
        icon={Mail}
        type="email"
        placeholder="your@email.com"
       />
      </div>

      {/* Phone */}
      <Field
       label="Phone Number"
       icon={Phone}
       type="tel"
       placeholder="+91 98765 43210"
      />

      {/* Details / message */}
      <div className="flex flex-col gap-2">
       <label className="font-roboto-mono text-[9px] tracking-widest uppercase text-snow/40">
        Details
       </label>
       <div className="relative">
        <MessageSquare
         size={13}
         className="absolute left-4 top-4 text-snow/30 pointer-events-none"
        />
        <textarea
         rows={5}
         placeholder="Tell me about your project, idea, or just say hello…"
         className="w-full bg-snow/5 border border-snow/15 rounded-2xl px-5 py-3.5 pl-11 text-snow placeholder:text-snow/25 font-dm-sans text-sm focus:outline-none focus:border-lime/50 transition-colors duration-200 resize-none"
        />
       </div>
      </div>

      {/* Submit */}
      <button
       type="submit"
       className="inline-flex items-center gap-2.5 bg-lime text-forest font-dm-sans font-semibold text-sm px-8 py-4 rounded-2xl hover:bg-lime/80 transition-colors duration-200 w-fit mt-2"
      >
       <Send size={15} />
       Send Message
      </button>
     </form>
    </div>

    {/* ── Footer strip ─────────────────────────────────────────────────── */}
    <div className="max-w-5xl mx-auto w-full mt-20 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-snow/10 pt-6">
     <p className="font-roboto-mono text-[9px] tracking-widest uppercase text-snow/30">
      Designed &amp; Developed by Sanjai Kannan G
     </p>
     <p className="font-roboto-mono text-[9px] tracking-widest uppercase text-snow/20">
      © 2026 · All rights reserved
     </p>
    </div>
   </div>
  </>
 );
};

export default Contact;
