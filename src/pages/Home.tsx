import { Baby, Code2, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useGetProjects } from '../data/projects';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const projects = useGetProjects();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeId, setActiveId] = useState<string>(
    projects[0]?.id || 'petitpals'
  );

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  return (
    <div className="space-y-16 py-10">
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta name="twitter:title" content={t('seo.home.title')} />
        <meta name="twitter:description" content={t('seo.home.description')} />
      </Helmet>

      {/* Main Project Showcase Section (Reworked to copy the screenshot UI) */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-8 lg:grid-cols-12 lg:gap-16">
        <div className="flex w-full justify-center lg:col-span-5">
          <div className="relative flex aspect-square w-full max-w-[400px] items-center justify-center rounded-[2.5rem] border border-zinc-200/40 bg-zinc-50/20 p-8 shadow-xs">
            {/* Dotted pattern background inside */}
            <div
              className="absolute inset-0 rounded-[2.5rem] opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(#71717a 1.5px, transparent 1.5px)',
                backgroundSize: '50px 20px',
              }}
            />

            {/* Pre-rendered Project Cover Images with CSS opacity toggles to avoid decoding lag */}
            {projects.map((project) => {
              const isActive = project.id === activeId;
              return (
                <div
                  key={project.id}
                  className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 ease-out ${
                    isActive
                      ? 'pointer-events-auto z-10 scale-100 opacity-100'
                      : 'pointer-events-none z-0 scale-95 opacity-0'
                  }`}
                >
                  <img
                    src={project.cover_img ?? '/image/image.jpg'}
                    alt={project.title}
                    className="max-h-[85%] max-w-[85%] rounded-2xl object-contain p-2"
                    loading="eager"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tab Selector and Project Info */}
        <div className="flex flex-col justify-center space-y-6 lg:col-span-7">
          {/* Project List / Selector Tabs */}
          <div className="flex max-w-md flex-col gap-2">
            {projects.map((project) => {
              const isActive = project.id === activeId;
              const Icon = project.id === 'petitpals' ? Baby : Code2;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  className={`flex w-fit items-center rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? 'translate-x-1 scale-[1.01] border-zinc-100/50 bg-white px-5 py-3 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.04)]'
                      : 'border-transparent px-5 py-3 text-zinc-400/80 hover:translate-x-0.5 hover:text-zinc-600'
                  }`}
                >
                  <span
                    className={`font-display text-xl font-extrabold tracking-tight transition-colors duration-300 sm:text-2xl md:text-3xl ${
                      isActive ? 'text-zinc-950' : 'text-zinc-400'
                    }`}
                  >
                    {project.id === 'petitpals'
                      ? 'PetitPals'
                      : 'Zod Visualizer'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Project Description (Below list, like screenshot) */}
          <div className="min-h-[220px]">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="space-y-4 pt-2"
            >
              <h3 className="text-lg leading-snug font-bold text-zinc-900 md:text-xl">
                {activeProject.subtitle}
              </h3>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => navigate(`/project/${activeProject.id}`)}
                  variant="primary"
                  className="px-5 py-2 text-xs"
                >
                  <span>View Project Details</span>
                  <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                {activeProject.liveUrl && (
                  <Button
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="px-5 py-2 text-xs"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
