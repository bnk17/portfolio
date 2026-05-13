import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PROJECTS_DETAIL } from '../data/projects';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectDetail({ slug }: { slug?: string }) {
  const navigate = useNavigate();

  // 1. Find the specific project data
  const project = PROJECTS_DETAIL.find((p) => p.id === slug);

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
      {/* Dynamic Header */}
      <div className="mx-auto max-w-4xl">
        <button
          className={`w-fit cursor-pointer rounded-sm px-4 py-1 text-zinc-400 transition-all ease-out hover:-translate-x-2 hover:text-lg hover:text-zinc-900`}
          onClick={() => navigate('/')}
        >
          <ArrowLeft />
        </button>
      </div>
      <header className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-zinc-900">
            {project.title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-500">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className="rounded-full border border-zinc-100 bg-white px-3 py-1 font-mono text-[11px] font-medium tracking-tighter text-zinc-500 uppercase"
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 text-sm font-medium text-zinc-400">
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span className="italic">{project.role}</span>
            {project.liveUrl && (
              <>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit site
                </a>
              </>
            )}
          </div>
        </motion.div>

        {/* Dynamic Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mt-20 overflow-hidden rounded-[1.5rem] border border-zinc-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
        >
          <img
            src={`/image/image.jpg`} // Ensure your images follow a naming convention
            alt={project.title}
            className="h-auto w-full object-cover"
          />
        </motion.div>
      </header>

      <div className="max-w-8xl mx-auto grid grid-cols-1 gap-12 pb-40 md:gap-24 md:px-12 lg:grid-cols-[200px_1fr]">
        {/* Left Side Menu */}
        <aside className="relative">
          <AnimatePresence>
            {showMenu && (
              <motion.nav
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="sticky top-40 hidden space-y-2 lg:block"
              >
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group relative flex w-fit items-center rounded-full px-4 py-2 text-left text-sm font-medium transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-zinc-200 text-zinc-900'
                        : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </aside>

        {/* Main Content Area */}
        <main className="max-w-3xl space-y-40">
          {project.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-40">
              <h2 className="mb-10 text-2xl font-bold tracking-tight">
                {section.title}
              </h2>
              <div className="mb-10 h-px w-full bg-zinc-100" />

              <div className="prose prose-zinc prose-lg">
                <p className="text-lg leading-[1.8] whitespace-pre-wrap text-zinc-600">
                  {section.content}
                </p>
              </div>

              {/* Display Code Snippet if it exists in the data */}
              {section.codeSnippet && (
                <div className="group mt-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* Window Controls (Traffic Lights) */}
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-zinc-700/50" />
                        <div className="h-3 w-3 rounded-full bg-zinc-700/50" />
                        <div className="h-3 w-3 rounded-full bg-zinc-700/50" />
                      </div>
                      <span className="ml-4 font-mono text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
                        {section.codeSnippet.language}
                      </span>
                    </div>

                    {/* Optional: Status indicator */}
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      <span className="font-mono text-[10px] text-zinc-500">
                        production_ready.ts
                      </span>
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="relative">
                    <pre className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent overflow-x-auto p-6 font-mono text-sm leading-relaxed text-zinc-300 selection:bg-zinc-700/50">
                      <code className="block min-w-full">
                        {section.codeSnippet.code.split('\n').map((line, i) => (
                          <div key={i} className="table-row">
                            <span className="table-cell pr-6 text-right text-zinc-600 select-none">
                              {i + 1}
                            </span>
                            <span className="table-cell">{line}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>

                  {/* Explanation Footer - Dark Version */}
                  <div className="border-t border-zinc-800 bg-zinc-900/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-800 font-mono text-[10px] font-bold text-zinc-400">
                        i
                      </div>
                      <p className="text-[13px] leading-relaxed text-zinc-400">
                        <strong className="text-zinc-200">
                          Engineer's Note:
                        </strong>{' '}
                        {section.codeSnippet.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Bar for Overview Section */}
              {section.id === 'overview' && (
                <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-100 pt-12 sm:grid-cols-3">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold tracking-tight text-zinc-900">
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
