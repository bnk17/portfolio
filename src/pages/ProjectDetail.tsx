import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGetProjects } from '../data/projects';
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  GitPullRequestIcon,
  Link,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ContextualStack } from '@/components/StackIcon';
import { useTranslation } from 'react-i18next';
import TabbedCodeViewer from '@/components/CodeEditor';
import { Button } from '@/components/ui/Button';

function ImageModal({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
        aria-label="Close modal"
      >
        <X size={24} />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-h-full max-w-full overflow-hidden rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={title}
          onClick={() => setIsZoomed(!isZoomed)}
          className={`block h-auto max-h-[90vh] w-auto max-w-full object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectDetail({ slug }: { slug?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projects = useGetProjects();

  const project = projects.find((p) => p.id === slug);

  const [activeSection, setActiveSection] = useState('overview');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  // 2. Setup dynamic sections for the scroll observer
  const SECTIONS =
    project?.sections.map((s) => ({ id: s.id, label: s.title })) || [];

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

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

        {/* Header */}
        <header className="pt-16 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col items-center space-y-6"
          >
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-zinc-900">
              {project.title}
            </h1>

            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-500">
              {project.subtitle}
            </p>

            <div className="flex w-full items-center justify-center gap-4 text-center text-sm font-medium text-zinc-400">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="italic">{project.role}</span>
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a
                    className="text-xs hover:text-blue-600"
                    href={project.liveUrl}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}{' '}
                {project.githubUrl && (
                  <a
                    className="text-xs hover:text-blue-600"
                    href={project.githubUrl}
                  >
                    <GitPullRequestIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex w-full justify-center text-xl font-semibold tracking-tight"
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
            className="sho mt-20 overflow-hidden rounded-[2.5rem] border border-zinc-100"
          >
            <img
              src={project.cover_img ?? project.cover_img ?? '/image/image.jpg'}
              alt={project.title}
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="space-y-40 pb-40">
          {project.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-40">
              <h2 className="mb-10 text-2xl font-bold tracking-tight">
                {section.title}
              </h2>
              <div className="mb-10 h-px w-full bg-zinc-100" />
              <div className="prose prose-zinc prose-lg mb-12 max-w-none">
                <p className="text-lg leading-[1.8] whitespace-pre-wrap text-zinc-600">
                  {section.content}
                </p>

                {/* Structural List Container */}
                {section.list && section.list.length > 0 && (
                  <div className="mt-10 space-y-4">
                    {/* List Subheading Title - Upgraded typography to fit naturally into the text flow */}
                    {section.listTitle && (
                      <h3 className="text-base font-bold tracking-tight text-zinc-900">
                        {section.listTitle}
                      </h3>
                    )}

                    {/* Bullet Items Array Map */}
                    <ul className="list-none space-y-3.5 text-base leading-[1.8] text-zinc-600">
                      {section.list.map((item, index) => (
                        <li
                          key={`${section.id}-list-item-${index}`}
                          className="flex items-start gap-3"
                        >
                          {/* Subtle minimal dot layout that preserves the clean font alignment */}

                          <span className="text-zinc-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Showcase Section Design Images Structured Layout */}
              {section.images && section.images.length > 0 && (
                <>
                  <h3 className="text-base font-bold tracking-tight text-zinc-900">
                    Screenshots
                  </h3>
                  <div
                    className={`mt-6 grid w-full grid-cols-1 gap-8 md:grid-cols-2`}
                  >
                    {section.images.map((imageItem, i) => (
                      <div key={imageItem.src + i} className="group space-y-3">
                        <div
                          className="cursor-zoom-in overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 transition-all duration-300"
                          onClick={() =>
                            setSelectedImage({
                              src: imageItem.src,
                              title: imageItem.title,
                            })
                          }
                        >
                          <img
                            src={imageItem.src}
                            alt={imageItem.title}
                            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                          {/* Design Card Context Metadata */}
                          <div className="p-2">
                            <h4 className="text-md font-semibold tracking-tight text-zinc-900">
                              {imageItem.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-zinc-500">
                              {imageItem.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Stats View Hook Context inside Overview Block */}
              {section.id === 'overview' && (
                <div className="mt-12 grid grid-cols-1 gap-8 border-t border-zinc-100 pt-12 md:grid-cols-3">
                  {' '}
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-zinc-900">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Render TabbedCodeViewer if a code snippet array exists */}
              {section.codeSnippet && section.codeSnippet.length > 0 && (
                <div className="mt-12 w-full">
                  <TabbedCodeViewer t={t} files={section.codeSnippet} />
                </div>
              )}
            </section>
          ))}
        </main>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            title={selectedImage.title}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
