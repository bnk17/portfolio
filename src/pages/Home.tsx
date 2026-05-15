import { Mail, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import { useGetProjects } from '../data/projects';
import { useTranslation } from 'react-i18next';

export function Home() {
  const projects = useGetProjects();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const email = 'hello@flo.design';
  const { t } = useTranslation();

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen text-zinc-900 antialiased selection:bg-zinc-100">
      <div className="mx-auto grid min-h-screen max-w-screen-2xl grid-cols-1 min-[990px]:grid-cols-[450px_1fr]">
        <aside className="z-50 flex h-fit flex-col border-b border-zinc-100 bg-white px-8 pt-8 pb-8 min-[990px]:sticky min-[990px]:top-0 min-[990px]:h-screen min-[990px]:border-r min-[990px]:border-b-0 min-[990px]:px-16 min-[990px]:pt-16">
          <div className="flex h-full flex-col justify-start min-[990px]:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-10"
            >
              <h1 className="font-display text-[32px] leading-tight font-extrabold tracking-tight">
                Boris <br /> N'Kuako
              </h1>

              <div className="space-y-3 leading-[1.8] text-zinc-700">
                {/* Intro Section */}
                <p>{t('home.intro')}</p>

                {/* Current Focus Section */}
                <p>{t('home.current')} </p>
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
            </motion.div>

            <div className="mt-16 hidden min-[990px]:block">
              <p className="font-mono text-[11px] font-medium tracking-widest text-zinc-300 uppercase">
                © 2026 Boris N'Kuako — Product & AI Engineering
              </p>
            </div>
          </div>
        </aside>

        {/* Right Section */}
        <main className="min-h-screen bg-white p-8 min-[990px]:p-12 min-[990px]:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-4xl"
          >
            <div className="grid grid-cols-1 gap-8 min-[990px]:gap-x-8 min-[990px]:gap-y-16 sm:grid-cols-2 xl:grid-cols-2">
              {projects.map((project) => (
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
          </motion.div>
        </main>
      </div>
    </div>
  );
}
