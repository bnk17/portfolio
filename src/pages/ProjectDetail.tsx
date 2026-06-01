import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useGetProjects } from '../data/projects';
import { ArrowLeft, X, ExternalLink, GitPullRequestIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ContextualStack } from '@/components/StackIcon';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

const TabbedCodeViewer = lazy(() => import('@/components/CodeEditor'));

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
          decoding="async"
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
    <div className="min-h-screen text-zinc-900 selection:bg-zinc-200">
      <Helmet>
        <title>{t('seo.project.title', { title: project?.title })}</title>
        <meta
          name="description"
          content={t('seo.project.description', {
            subtitle: project?.subtitle,
          })}
        />
        <meta
          property="og:title"
          content={t('seo.project.title', { title: project?.title })}
        />
        <meta
          property="og:description"
          content={t('seo.project.description', {
            subtitle: project?.subtitle,
          })}
        />
        {project?.cover_img && (
          <meta property="og:image" content={project.cover_img} />
        )}
      </Helmet>

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
                  className={`group flex w-fit cursor-pointer items-center rounded-md py-1.5 text-left text-[13px] transition-colors duration-300 ${
                    activeSection === section.id
                      ? 'bg-white p-1 font-semibold text-black shadow-sm shadow-zinc-100'
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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-0">
        {/* Back Button Container */}
        <div className="pt-6 md:pt-8">
          <button
            className="group flex cursor-pointer items-center gap-2 text-zinc-400 transition-all hover:text-zinc-900"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 md:size-5" />
            <span className="text-xs font-medium md:text-sm">
              {t('projects.back')}
            </span>
          </button>
        </div>

        {/* Header */}
        <header className="pb-12 text-center md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              ease: 'backOut',
            }}
            className="mx-auto mt-12 mb-20 size-48 overflow-hidden rounded-[1.75rem] border border-zinc-100 md:mt-20 md:size-68 md:rounded-[2.5rem]"
          >
            <OptimizedImage
              src={project.cover_img ?? '/image/image.jpg'}
              alt={project.title}
              containerClassName="w-full"
              className="h-auto w-full"
              priority={true}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col items-center space-y-4 md:space-y-6"
          >
            {/* Responsive Heading: text-3xl on mobile -> text-5xl on desktop */}
            <h1 className="text-3xl leading-[1.15] font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              {project.title}
            </h1>

            {/* Responsive Subtitle: text-base on mobile -> text-xl on desktop */}
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg md:text-xl">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center text-xs font-medium text-zinc-400 md:text-sm">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="italic">{project.role}</span>
              <div className="ml-1 flex gap-2">
                {project.liveUrl && (
                  <a
                    className="text-xs hover:text-blue-600"
                    href={project.liveUrl}
                  >
                    <ExternalLink size={15} />
                  </a>
                )}{' '}
                {project.githubUrl && (
                  <a
                    className="text-xs hover:text-blue-600"
                    href={project.githubUrl}
                  >
                    <GitPullRequestIcon size={15} />
                  </a>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex w-full justify-center text-lg font-semibold tracking-tight md:text-xl"
            >
              <ContextualStack
                stackList={project.techStack}
                showIconName={false}
                isProjectPage={true}
              />
            </motion.div>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="space-y-24 pb-24 md:space-y-40 md:pb-40">
          {project.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 md:scroll-mt-40"
            >
              {/* Responsive Section Headings */}
              <h2 className="mb-4 text-xl font-bold tracking-tight md:mb-10 md:text-2xl">
                {section.title}
              </h2>
              <div className="mb-6 h-px w-full bg-zinc-100 md:mb-10" />

              {/* Modified prose text sizing to handle small viewport dynamics cleanly */}
              <div className="prose prose-zinc md:prose-lg mb-8 max-w-none md:mb-12">
                <p className="text-base leading-[1.7] whitespace-pre-wrap text-zinc-600 md:text-lg md:leading-[1.8]">
                  {section.content}
                </p>

                {/* Structural List Container */}
                {section.list && section.list.length > 0 && (
                  <div className="mt-8 space-y-3 md:mt-10 md:space-y-4">
                    {section.listTitle && (
                      <h3 className="text-sm font-bold tracking-tight text-zinc-900 md:text-base">
                        {section.listTitle}
                      </h3>
                    )}

                    <ul className="list-none space-y-3 text-sm leading-[1.7] text-zinc-600 md:text-base md:leading-[1.8]">
                      {section.list.map((item, index) => (
                        <li
                          key={`${section.id}-list-item-${index}`}
                          className="flex items-start gap-3"
                        >
                          <span className="text-zinc-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Showcase Section Design Images */}
              {section.images && section.images.length > 0 && (
                <>
                  <h3 className="text-sm font-bold tracking-tight text-zinc-900 md:text-base">
                    Screenshots
                  </h3>
                  <div className="mt-4 grid w-full grid-cols-1 gap-6 md:mt-6 md:grid-cols-2 md:gap-8">
                    {section.images.map((imageItem, i) => (
                      <div key={imageItem.src + i} className="group space-y-3">
                        <div
                          className="cursor-zoom-in overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 transition-all duration-300 md:rounded-2xl"
                          onClick={() =>
                            setSelectedImage({
                              src: imageItem.src,
                              title: imageItem.title,
                            })
                          }
                        >
                          <OptimizedImage
                            src={imageItem.src}
                            alt={imageItem.title}
                            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          {/* Design Card Context Metadata */}
                          <div className="p-3 md:p-4">
                            <h4 className="text-sm font-semibold tracking-tight text-zinc-900 md:text-base">
                              {imageItem.title}
                            </h4>
                            <p className="mt-1 text-xs leading-relaxed text-zinc-500 md:text-sm">
                              {imageItem.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Stats Overview Grid */}
              {section.id === 'overview' && (
                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-zinc-100 pt-8 sm:grid-cols-3 md:mt-12 md:gap-8 md:pt-12">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      {/* Scaled stat values down slightly on tiny viewports */}
                      <p className="text-2xl font-bold text-zinc-900 md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[10px] font-bold tracking-widest text-zinc-400 uppercase md:text-[11px]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Render TabbedCodeViewer if a code snippet array exists */}
              {section.codeSnippet && section.codeSnippet.length > 0 && (
                <div className="mt-8 w-full md:mt-12">
                  <Suspense
                    fallback={
                      <div className="h-64 w-full animate-pulse rounded-2xl bg-zinc-100" />
                    }
                  >
                    <TabbedCodeViewer t={t} files={section.codeSnippet} />
                  </Suspense>
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
