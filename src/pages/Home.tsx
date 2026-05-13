import { Mail, Share2, Terminal, AppWindow, BrainCircuit } from 'lucide-react';

import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS_DETAIL } from '../data/projects';

export function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const email = 'hello@flo.design';

  return (
    <div className="min-h-screen font-sans text-zinc-900 antialiased selection:bg-zinc-100">
      <div className="mx-auto grid min-h-screen max-w-screen-2xl grid-cols-1 min-[990px]:grid-cols-[450px_1fr]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap');
      body { font-family: 'Inter', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      .font-display { font-family: 'Outfit', sans-serif; }
    `,
          }}
        />
        {/* Left Sidebar */}
        {/* Changed: Adjusted p-8/p-16 to pt-8/pt-16 and ensured flex alignment starts at top */}
        <aside className="z-50 flex h-fit flex-col border-b border-zinc-100 bg-white px-8 pt-8 pb-8 min-[990px]:sticky min-[990px]:top-0 min-[990px]:h-screen min-[990px]:border-r min-[990px]:border-b-0 min-[990px]:px-16 min-[990px]:pt-16">
          <div className="flex h-full flex-col justify-start min-[990px]:justify-between">
            <div className="flex flex-col gap-10">
              <h1 className="font-display text-[32px] leading-tight font-extrabold tracking-tight">
                Boris <br /> N'Kuako
              </h1>

              <div className="space-y-3 font-mono leading-[1.8] text-zinc-500">
                <p>
                  I’m a{' '}
                  <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 italic underline decoration-zinc-200 underline-offset-[6px]">
                    <Terminal className="size-4.5 translate-y-[4px] text-blue-500" />
                    <span className="translate-y-[4px]">Software Engineer</span>
                  </span>{' '}
                  focused on building AI-native applications and
                  high-performance SaaS.
                </p>
                <p>
                  Specialized in React & Next.js. I combine technical rigor with
                  a
                  <span className="ml-1 inline-flex items-center gap-1.5 font-medium text-zinc-900">
                    <AppWindow className="size-4.5 translate-y-[4px] text-indigo-500" />
                    <span className="translate-y-[4px]">product mindset</span>
                  </span>{' '}
                  to transform complex workflows into radical simplicity.
                </p>
                <p>
                  Currently architecting
                  <span className="mx-1 inline-flex items-center gap-1.5 font-medium text-zinc-900">
                    <BrainCircuit className="size-4.5 translate-y-[4px] text-amber-500" />
                    <span className="translate-y-[4px]">
                      Agentic AI systems
                    </span>
                  </span>{' '}
                  (RAG, autonomous workflows) to enhance user productivity.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-2.5 rounded-full border border-zinc-100 px-4 py-2 transition-all hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <Mail className="h-4 w-4 text-zinc-400 group-hover:text-blue-500" />
                  <span className="font-mono text-[13px] font-medium text-zinc-600 group-hover:text-black">
                    Email
                  </span>
                </a>
                <a
                  href="https://linkedin.com/in/boris-nkuako"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-full border border-zinc-100 px-4 py-2 transition-all hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <Share2 className="h-4 w-4 text-zinc-400 group-hover:text-indigo-600" />
                  <span className="font-mono text-[13px] font-medium text-zinc-600 group-hover:text-black">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-16 hidden min-[990px]:block">
              <p className="font-mono text-[11px] font-medium tracking-widest text-zinc-300 uppercase">
                © 2026 Boris N'Kuako — Product & AI Engineering
              </p>
            </div>
          </div>
        </aside>

        {/* Right Section */}
        {/* Changed: Removed pt-10 and pt-20 from the inner container */}
        <main className="min-h-screen bg-white p-8 min-[990px]:p-12 min-[990px]:px-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 min-[990px]:gap-x-8 min-[990px]:gap-y-16 sm:grid-cols-1 xl:grid-cols-2">
              {PROJECTS_DETAIL.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isDimmed={hoveredId !== null && hoveredId !== project.id}
                  isHovered={hoveredId === project.id}
                  onHover={setHoveredId}
                  onLeave={() => setHoveredId(null)}
                />
              ))}
            </div>
            <div className="h-48" />
          </div>
        </main>
      </div>
    </div>
  );
}
