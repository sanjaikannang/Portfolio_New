import { useState, type ElementType, type FormEvent } from "react";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";
import Button from "../../components/ui/Button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqaaapda";

const Field = ({
    label,
    icon: Icon,
    name,
    type,
    placeholder,
}: {
    label: string;
    icon: ElementType;
    name: string;
    type: string;
    placeholder: string;
}) => (
    <>
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
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    className="w-full bg-snow/5 border border-snow/15 rounded-2xl px-5 py-3.5 pl-11 text-snow placeholder:text-snow/25 font-dm-sans text-sm focus:outline-none focus:border-lime/50 transition-colors duration-200"
                />
            </div>
        </div>
    </>
);

type Status = "idle" | "sending" | "success" | "error";

const Contact = () => {
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("sending");

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
            });

            if (res.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <>
            <div
                id="contact"
                className="relative z-20 w-full bg-forest rounded-b-[48px] sm:rounded-b-[120px] lg:rounded-b-[220px] xl:rounded-b-[350px] flex flex-col pt-16 pb-16 sm:pt-20 sm:pb-20"
            >
                <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 px-4 sm:px-6 lg:px-8">
                    {/* ── Header */}
                    <div className="flex flex-col gap-8">
                        <span className="inline-flex items-center gap-2 bg-snow/5 border border-snow/10 px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-snow/60 w-fit">
                            <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0 animate-blink" />
                            Get In Touch
                        </span>

                        <h2
                            className="font-aspekta font-bold text-snow leading-[0.95]"
                            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
                        >
                            Let's Work
                            <br />
                            Together.
                        </h2>

                        <p className="font-dm-sans text-snow/50 text-base leading-relaxed max-w-lg mt-2">
                            Have a project in mind or want to collaborate? Drop your details below
                            and I'll get back to you as soon as possible.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                            <a
                                href="tel:+919345725595"
                                className="inline-flex items-center gap-2 font-dm-sans text-sm text-snow/70 hover:text-lime transition-colors duration-200"
                            >
                                <Phone size={15} className="shrink-0" />
                                +91 93457 25595
                            </a>
                            <a
                                href="mailto:sanjaikannang@gmail.com"
                                className="inline-flex items-center gap-2 font-dm-sans text-sm text-snow/70 hover:text-lime transition-colors duration-200"
                            >
                                <Mail size={15} className="shrink-0" />
                                sanjaikannang@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* ── Form */}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Field
                                label="Name"
                                icon={User}
                                name="name"
                                type="text"
                                placeholder="Your full name"
                            />
                            <Field
                                label="Email"
                                icon={Mail}
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Phone */}
                        <Field
                            label="Phone Number"
                            icon={Phone}
                            name="phone"
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
                                    name="message"
                                    rows={5}
                                    required
                                    placeholder="Tell me about your project, idea, or just say hello…"
                                    className="w-full bg-snow/5 border border-snow/15 rounded-2xl px-5 py-3.5 pl-11 text-snow placeholder:text-snow/25 font-dm-sans text-sm focus:outline-none focus:border-lime/50 transition-colors duration-200 resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col items-center gap-3 mt-2">
                            <Button
                                type="submit"
                                label={status === "sending" ? "Sending…" : "Send Message"}
                                icon={Send}
                                variant="light"
                                disabled={status === "sending"}
                            />
                            {status === "success" && (
                                <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-lime">
                                    Message sent — I'll get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-red-400">
                                    Something went wrong. Please try again or email me directly.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* ── Footer strip — sits below the curved panel, on the page background ── */}
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-4 sm:pt-6 sm:pb-6">
                <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-center">
                    <p className="font-roboto-mono text-[9px] tracking-widest uppercase text-forest/40">
                        Designed &amp; Developed by Sanjai Kannan G
                    </p>
                </div>
            </div>
        </>
    );
};

export default Contact;
