import { Plus } from "lucide-react";
import Card from "../../components/ui/Card";

const Projects = () => {
    return (
        <>
            <div id="projects" className="bg-snow">
                {/* Main Container */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-24">
                        <div className="flex flex-col gap-4">
                            <span className="inline-flex items-center gap-2 bg-mist px-3 py-1.5 rounded-lg font-roboto-mono text-[10px] tracking-widest uppercase text-forest w-fit">
                                <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0 animate-blink" />
                                Selected Work
                            </span>
                            <div className="text-forest font-aspekta text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase">
                                Projects
                            </div>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="w-full mt-12 mb-16 sm:mt-16 sm:mb-20 lg:mt-20 lg:mb-28">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* First Row - Full Width Card */}
                            <div className="col-span-full">
                                <Card
                                    title="XaminityIQ"
                                    badge="NestJS · React"
                                    className="w-full cursor-pointer"
                                    description="An online examination platform for universities and colleges with dedicated Admin, Faculty, and Student roles — supporting auto-proctored exams with mandatory recording, live-monitored sessions, and faculty evaluation and result-publishing workflows."
                                    links={[
                                        { label: "Live Demo", href: "https://xaminity-iq-client.vercel.app/" },
                                        { label: "Client Repo", href: "https://github.com/sanjaikannang/XaminityIQ-Client" },
                                        { label: "Server Repo", href: "https://github.com/sanjaikannang/XaminityIQ-Server" },
                                    ]}
                                    key={"xaminityiq"}
                                />
                            </div>

                            {/* Second Row - 3 Cards */}
                            <Card
                                title="AI-Powered IT Helpdesk Automation Platform"
                                badge="LangGraph · AI"
                                className="w-full cursor-pointer"
                                description="A full-stack agentic AI system automating L1 IT support — a multi-agent LangGraph workflow classifies tickets, retrieves grounded context via RAG, and resolves low-risk requests autonomously, while a policy-driven risk engine routes higher-risk cases through a tiered human-in-the-loop approval flow."
                                key={"ai-helpdesk"}
                            />

                            <Card
                                title="This Portfolio"
                                badge="Full Stack"
                                className="w-full cursor-pointer"
                                date="2026"
                                description="Built with React, TypeScript, and Tailwind CSS — featuring GSAP scroll animations, 3D flip cards, a scroll-velocity marquee, and a video hero."
                                links={[
                                    { label: "Live Demo", href: "https://sanjaikannang-delta.vercel.app/" },
                                    { label: "GitHub", href: "https://github.com/sanjaikannang/Portfolio_New" },
                                ]}
                                key={"portfolio"}
                            />

                            {/* Placeholder — reserved for the next project */}
                            <div
                                key="coming-soon"
                                className="w-full min-h-64 rounded-3xl border-2 border-dashed border-forest/15 bg-mist/40 flex flex-col items-center justify-center gap-3 p-6 text-center"
                            >
                                <span className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
                                    <Plus size={18} className="text-forest/40" />
                                </span>
                                <p className="font-roboto-mono text-[10px] tracking-widest uppercase text-forest/40">
                                    More Projects Coming Soon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projects;
