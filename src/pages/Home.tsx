import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetProjects } from '../data/projects';

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
    /* Outer container controls the staging pipeline directly via staggerChildren */
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
      }}
      className="flex min-h-[100vh] w-full flex-col items-center justify-start py-12 md:py-24"
    >
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta name="twitter:title" content={t('seo.home.title')} />
        <meta name="twitter:description" content={t('seo.home.description')} />
      </Helmet>

      {/* [STAGE 1]: Elegant Bio Header Section */}
      <motion.header
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          },
        }}
        className="mx-auto mb-12 flex w-full max-w-6xl flex-col space-y-4 px-4 pt-12 sm:px-6 md:mb-20"
      >
        <h1 className="font-display w-full text-xl font-extrabold tracking-tight text-zinc-900 md:text-3xl md:leading-[1.1]">
          Boris <br className="sm:hidden" /> N'Kuako
        </h1>
        <p className="max-w-2xl text-base leading-[1.7] text-zinc-600 md:text-lg md:leading-relaxed">
          {t('home.intro')}
        </p>
      </motion.header>

      {/* Main Project Showcase Container */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-12 md:gap-12 lg:gap-16">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="flex w-full justify-start md:order-1 md:col-span-5 md:justify-center md:self-center"
        >
          <div className="relative flex aspect-square w-full max-w-[320px] items-center justify-center rounded-[2rem] border border-zinc-200/40 bg-zinc-50/20 p-6 shadow-xs sm:max-w-[400px] sm:rounded-[2.5rem] sm:p-8">
            <div
              className="absolute inset-0 rounded-[2rem] opacity-20 sm:rounded-[2.5rem]"
              style={{
                backgroundImage:
                  'radial-gradient(#71717a 1.5px, transparent 1.5px)',
                backgroundSize: '50px 20px',
              }}
            />

            {/* Pre-rendered Project Cover Images with native hardware acceleration */}
            {projects.map((project) => {
              const isActive = project.id === activeId;
              return (
                <div
                  key={project.id}
                  className={`absolute inset-0 flex items-center justify-center p-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 ${
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
        </motion.div>
        {/* [STAGE 2]: Right Side - Tab Selector and Project Info */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="flex flex-col items-start justify-center space-y-6 md:order-2 md:col-span-7 md:self-center"
        >
          {/* Project List / Selector Tabs */}
          <div className="scrollbar-none -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:w-full md:max-w-md md:flex-col md:overflow-visible md:px-0 md:pb-0">
            {projects.map((project) => {
              const isActive = project.id === activeId;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  className={`flex shrink-0 cursor-pointer items-center rounded-xl border text-left transition-[colors,transform] duration-300 md:w-fit md:rounded-2xl ${
                    isActive
                      ? 'scale-[1.01] border-zinc-100/50 bg-white px-4 py-2.5 shadow md:translate-x-1'
                      : 'border-transparent px-4 py-2.5 text-zinc-400/80 hover:text-zinc-600 md:hover:translate-x-0.5'
                  }`}
                >
                  <span
                    className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl md:text-2xl lg:text-3xl ${
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

          {/* Selected Project Description */}
          <div className="md:min-h Nav-0 min-h-[140px] w-full">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 pt-1"
            >
              <h3 className="w-full max-w-[30ch] leading-snug font-medium text-zinc-700 sm:text-lg md:max-w-[40ch] md:text-xl">
                {activeProject.subtitle}
              </h3>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={() => navigate(`/project/${activeProject.id}`)}
                  variant="primary"
                  className="px-4 py-2 text-xs sm:px-5 sm:text-sm"
                >
                  <span>{t('projects.view_details')}</span>
                  <ArrowUpRight className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4" />
                </Button>
                {activeProject.liveUrl && (
                  <Button
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="px-4 py-2 text-xs sm:px-5 sm:text-sm"
                  >
                    <span>{t('projects.live_demo')}</span>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* [STAGE 3]: Left Side - Image Preview container */}
      </div>
    </motion.div>
  );
}
