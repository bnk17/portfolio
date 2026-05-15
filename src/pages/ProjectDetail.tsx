import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGetProjects } from '../data/projects';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ContextualStack } from '@/components/StackIcon';
import { useTranslation } from 'react-i18next';

export default function ProjectDetail({ slug }: { slug?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projects = useGetProjects();

  const project = projects.find((p) => p.id === slug);

  const [activeSection, setActiveSection] = useState('overview');
  const [showMenu, setShowMenu] = useState(false);

  // 2. Setup dynamic sections for the scroll observer
  const SECTIONS =
    project?.sections.map((s) => ({ id: s.id, label: s.title })) || [];

  useEffect(() => {
    if (!project) return;

    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Logic for menu visibility (Overview specific)
          if (entry.target.id === 'overview') {
            // Check if we have scrolled past the overview top
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              setShowMenu(true);
            } else {
              setShowMenu(false);
            }
          }

          // IMPROVED: Active section tracking
          // We use a lower threshold and check isIntersecting
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // This threshold means: "trigger as soon as 10% is visible"
        threshold: [0.1, 0.2],
        // This margin creates a horizontal strip across the middle-top of the screen
        // where the "active" detection happens.
        rootMargin: '-15% 0px -50% 0px',
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observers.observe(el);
    });

    return () => observers.disconnect();
  }, [project, SECTIONS]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle case where project doesn't exist
  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFDFD]">
        <p className="text-zinc-500">Project not found.</p>
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 selection:bg-zinc-200">
      {/* 1. Fixed Menu (Far Left) */}
      <aside className="fixed bottom-0 left-0 z-40 hidden h-full w-[250px] items-center px-12 lg:flex">
        <AnimatePresence>
          {showMenu && (
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex w-full items-center rounded-full py-1.5 text-left text-[13px] font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? 'font-semibold text-zinc-900'
                      : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {/* Visual indicator for active section */}

                  {section.label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </aside>

      {/* 2. Main Scrollable Container */}
      <div className="mx-auto max-w-4xl px-6 md:px-0">
        {/* Back Button Container */}
        <div className="pt-8">
          <button
            className="group flex cursor-pointer items-center gap-2 text-zinc-400 transition-all hover:text-zinc-900"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">{t('projects.back')}</span>
          </button>
        </div>

        {/* Header - Perfect 4xl width */}
        <header className="pt-16 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6" /* Added flex-col and items-center */
          >
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-zinc-900">
              {project.title}
            </h1>

            {/* Added mx-auto to center the paragraph within the header */}
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-500">
              {project.subtitle}
            </p>

            {/* Added justify-center to the metadata flex container */}
            <div className="flex items-center justify-center gap-4 text-sm font-medium text-zinc-400">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="italic">{project.role}</span>
            </div>

            {/* Added justify-center to the tech stack flex container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold tracking-tight"
            >
              <ContextualStack
                stackList={project.techStack}
                showIconName={false}
                isProjectPage={true}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 overflow-hidden rounded-[2.5rem] border border-zinc-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
          >
            <img
              src="/image/image.jpg"
              alt={project.title}
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </header>

        {/* Main Content - Perfect 4xl width, identical to Header */}
        <main className="space-y-40 pb-40">
          {project.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-40">
              <h2 className="mb-10 text-2xl font-bold tracking-tight">
                {section.title}
              </h2>
              <div className="mb-10 h-px w-full bg-zinc-100" />
              <div className="prose prose-zinc prose-lg max-w-none">
                <p className="text-lg leading-[1.8] text-zinc-600">
                  {section.content}
                </p>
              </div>

              {/* Stats / Code Snippets will now be perfectly aligned within the 4xl container */}
              {section.id === 'overview' && (
                <div className="mt-12 grid grid-cols-3 gap-8 border-t border-zinc-100 pt-12">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-zinc-900">
                        {stat.value}
                      </p>
                      <p className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
