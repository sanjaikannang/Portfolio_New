import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const Projects = () => {
 return (
  <>
   <div className="sticky top-0 z-10 bg-snow">
    {/* Main Container */}
    <div className="w-full max-w-7xl mx-auto ">
     {/* Header */}
     <div className="flex items-center justify-between mt-10">
      <div className="text-forest font-aspekta text-6xl font-bold tracking-tight uppercase">
       Projects
      </div>

      <Button
       label="View All"
      />
     </div>

     {/* Projects Grid */}
     <div className="w-full mt-28 mb-28">
      <div className="grid grid-cols-3 gap-6">
       {/* First Row - Full Width Card */}
       <div className="col-span-3">
        <Card
         title="AgentGPT"
         badge="AI Agent"
         className="w-full"
         date="2024"
         description="An AI agent that autonomously generates and executes tasks to achieve user-defined goals, leveraging advanced language models for dynamic problem-solving."
         href=""
         key={"agentgpt-main"}
         linkLabel="View on GitHub"
        />
       </div>

       {/* Second Row - 3 Cards */}
       <Card
        title="DocuRAG"
        badge="RAG · AI"
        className="w-full"
        date="2025"
        description="A retrieval-augmented generation system that ingests PDFs, builds a vector index with Pinecone, and answers natural-language queries with cited sources."
        href=""
        key={"docurag"}
        linkLabel="View on GitHub"
       />

       <Card
        title="AI Chat Interface"
        badge="React · AI"
        className="w-full"
        date="2024"
        description="A multi-model conversational UI supporting OpenAI and Claude with streaming responses, chat history persistence, and full markdown rendering."
        href=""
        key={"ai-chat"}
        linkLabel="View on GitHub"
       />

       <Card
        title="This Portfolio"
        badge="Full Stack"
        className="w-full"
        date="2025"
        description="Built with React, TypeScript, and Tailwind CSS — featuring GSAP scroll animations, 3D flip cards, a scroll-velocity marquee, and a video hero."
        href=""
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
