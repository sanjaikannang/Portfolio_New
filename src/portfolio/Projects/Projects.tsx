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
                                <span className="w-2 h-2 rounded-[3px] bg-lime shrink-0" />
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
                                    title="AgentGPT"
                                    badge="AI Agent"
                                    className="w-full cursor-pointer"
                                    date="2024"
                                    description="An AI agent that autonomously generates and executes tasks to achieve user-defined goals, leveraging advanced language models for dynamic problem-solving."
                                    href=""
                                    image="/projects/agentgpt.png"
                                    key={"agentgpt-main"}
                                    linkLabel="View on GitHub"
                                />
                            </div>

                            {/* Second Row - 3 Cards */}
                            <Card
                                title="DocuRAG"
                                badge="RAG · AI"
                                className="w-full cursor-pointer"
                                date="2025"
                                description="A retrieval-augmented generation system that ingests PDFs, builds a vector index with Pinecone, and answers natural-language queries with cited sources."
                                href=""
                                image="/projects/docurag.png"
                                key={"docurag"}
                                linkLabel="View on GitHub"
                            />

                            <Card
                                title="AI Chat Interface"
                                badge="React · AI"
                                className="w-full cursor-pointer"
                                date="2024"
                                description="A multi-model conversational UI supporting OpenAI and Claude with streaming responses, chat history persistence, and full markdown rendering."
                                href=""
                                image="/projects/ai-chat.png"
                                key={"ai-chat"}
                                linkLabel="View on GitHub"
                            />

                            <Card
                                title="This Portfolio"
                                badge="Full Stack"
                                className="w-full cursor-pointer"
                                date="2025"
                                description="Built with React, TypeScript, and Tailwind CSS — featuring GSAP scroll animations, 3D flip cards, a scroll-velocity marquee, and a video hero."
                                href=""
                                image="/projects/portfolio.png"
                                key={"portfolio"}
                                linkLabel="View on GitHub"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projects;
