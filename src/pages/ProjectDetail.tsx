import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, lazy, Suspense } from 'react';
import { ProjectSectionId, useGetProjects } from '../data/projects';
import { useNavigate } from 'react-router-dom';
import { ContextualStack } from '@/components/StackIcon';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import {
  ArrowLeft,
  ExternalLink,
  GitPullRequestIcon,
  Target,
  AlertTriangle,
  Cpu,
  BarChart3,
  Lightbulb,
  X,
  Scale,
} from 'lucide-react';

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

// Helper function to dynamically map top-level sections to specific semantic icons (Max 5)
const getSectionIcon = (sectionId: ProjectSectionId) => {
  switch (sectionId) {
    case 'context-goal':
      return <Target className="size-5 text-emerald-500" />;
    case 'user-friction':
      return <AlertTriangle className="size-5 text-amber-500" />;
    case 'discovery-tradeoffs':
      return <Scale className="size-5 text-orange-500" />;
    case 'architecture':
      return <Cpu className="size-5 text-indigo-500" />;
    case 'outcome-metrics':
      return <BarChart3 className="size-5 text-blue-500" />;
    case 'retrospective':
      return <Lightbulb className="size-5 text-purple-500" />;
    default:
      return null;
  }
};

// Helper component to find inline markdown backticks or slash commands and convert them to slick badges automatically
// Helper component to find inline markdown backticks or slash commands and convert them to slick badges automatically
const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;

  // Regex to look for text wrapped in `backticks` or slash commands like /win, /block
  const parts = text.split(/(`[^`]+`|\/[a-zA-Z0-9_-]+)/g);

  return (
    <>
      {parts.map((part, index) => {
        // Match explicit slash commands
        if (part.startsWith('/')) {
          return (
            <code
              key={index}
              className="mx-1 inline-flex items-center rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] font-semibold text-zinc-900"
            >
              {part}
            </code>
          );
        }
        // Match classic inline code backticks
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={index}
              className="mx-1 inline-flex items-center rounded border border-zinc-200/60 bg-zinc-50 px-1.5 py-0.5 font-mono text-[13px] font-medium text-zinc-800"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
};
// Helper component to render generic, tech-term project state configurations
const StatusBadge = ({
  status,
}: {
  status?: 'production-ready' | 'beta-testing' | 'active-development' | string;
}) => {
  if (!status) return null;

  const configs: Record<
    string,
    { label: string; classes: string; dot: string }
  > = {
    'production-ready': {
      label: 'GA / Production-Ready',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      dot: 'bg-emerald-500',
    },
    'beta-testing': {
      label: 'Beta / Active Validation',
      classes: 'bg-amber-50 text-amber-700 border-amber-200/60',
      dot: 'bg-amber-500',
    },
    'active-development': {
      label: 'In Active R&D',
      classes: 'bg-blue-50 text-blue-700 border-blue-200/60',
      dot: 'bg-blue-500',
    },
  };

  const config = configs[status] || {
    label: status.toUpperCase(),
    classes: 'bg-zinc-50 text-zinc-700 border-zinc-200',
    dot: 'bg-zinc-400',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${config.classes}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot} animate-pulse`}
      />
      {config.label}
    </div>
  );
};

export default function ProjectDetail({ slug }: { slug?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projects = useGetProjects();

  const project = projects.find((p) => p.id === slug);
  const firstSectionId = project?.sections[0]?.id;

  const [activeSection, setActiveSection] = useState(firstSectionId || '');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  // 2. Setup dynamic sections for the scroll observer
  const SECTIONS =
    project?.sections.map((s) => ({ id: s.id, label: s.title })) || [];

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
          // Logic for menu visibility (first section specific)
          if (firstSectionId && entry.target.id === firstSectionId) {
            // Check if we have scrolled past the first section top
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
    if (firstSectionId) {
      setActiveSection(firstSectionId);
    }
    setShowMenu(false);
    window.scrollTo(0, 0);
  }, [slug, firstSectionId]);

  // Handle case where project doesn't exist
  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFDFD]">
        <p className="text-zinc-500">Project not found.</p>
      </div>
    );
  }

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
        {project?.images?.cover_img && (
          <meta property="og:image" content={project.images.cover_img} />
        )}
      </Helmet>

      {/* 1. Fixed Menu (Far Left) */}
      <aside className="fixed bottom-0 left-0 z-40 hidden h-full w-[250px] items-center px-12 lg:flex">
        <AnimatePresence>
          {showMenu && project?.sections && (
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-2"
            >
              {project.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative flex w-fit cursor-pointer items-center rounded-md px-3 py-1.5 text-left text-[13px] font-medium transition-colors duration-300 ${
                    activeSection === section.id
                      ? 'text-zinc-900'
                      : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeSectionIndicator"
                      className="absolute inset-0 -z-10 rounded-md bg-white shadow-sm shadow-zinc-100"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{section.title}</span>
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
        <header className="pb-20 text-center md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
            className="mx-auto mt-12 mb-8 size-48 overflow-hidden rounded-[1.75rem] md:mt-10 md:size-68 md:rounded-[2.5rem]"
          >
            <OptimizedImage
              src={project.images?.cover_img}
              alt={project.title}
              containerClassName="w-full"
              className="h-auto w-full"
              priority={true}
            />
          </motion.div>

          {/* Dynamic Project Status Badge Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <StatusBadge status={project.status} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col items-center space-y-4 md:space-y-6"
          >
            <h1 className="text-3xl leading-[1.15] font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              {project.title}
            </h1>

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
              {/* Top-Level Section Heading with Integrated Colorful Icon */}
              <div className="mb-4 flex items-center gap-3 md:mb-6">
                {getSectionIcon(section.id)}
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="mb-8 h-px w-full bg-zinc-100 md:mb-12" />

              {/* Child Sub-Sections Content */}
              <div className="space-y-12 md:space-y-16">
                {section.subSections.map((subSection) => (
                  <div key={subSection.id} className="space-y-4">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 md:text-lg">
                      {subSection.title}
                    </h3>

                    {/* Content Container parsed with custom inline syntax matching */}
                    <div className="prose prose-zinc md:prose-lg max-w-none">
                      <p className="text-base leading-[1.7] whitespace-pre-wrap text-zinc-600 md:text-lg md:leading-[1.8]">
                        <FormattedText text={subSection.content} />
                      </p>

                      {/* Structural Nested Custom Lists */}
                      {subSection.list &&
                        Array.isArray(subSection.list) &&
                        subSection.list.length > 0 && (
                          <div className="mt-6 space-y-2 md:mt-8">
                            {subSection.listTitle && (
                              <h4 className="text-sm font-bold tracking-tight text-zinc-900 md:text-base">
                                {subSection.listTitle}
                              </h4>
                            )}

                            <ul className="list-none space-y-2.5 leading-[1.7] text-zinc-600 md:text-base">
                              {subSection.list.map((item, index) => (
                                <li
                                  key={`${subSection.id}-list-item-${index}`}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                                  <span className="text-zinc-600">
                                    <FormattedText text={item} />
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    {/* Technical Code Implementation Views */}
                    {subSection.codeSnippet &&
                      subSection.codeSnippet.length > 0 && (
                        <div className="mt-6 w-full md:mt-8">
                          <Suspense
                            fallback={
                              <div className="h-64 w-full animate-pulse rounded-2xl bg-zinc-100" />
                            }
                          >
                            <TabbedCodeViewer
                              t={t}
                              files={subSection.codeSnippet}
                            />
                          </Suspense>
                        </div>
                      )}

                    {/* System Architecture Diagram (Full Width) */}
                    {subSection.id === 'topology-flow' && project.images?.architecture_img && (
                      <div className="mt-6 w-full md:mt-8">
                        <div
                          className="group cursor-zoom-in overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 transition-all duration-300 md:rounded-2xl"
                          onClick={() =>
                            setSelectedImage({
                              src: project.images!.architecture_img!,
                              title: subSection.title,
                            })
                          }
                        >
                          <OptimizedImage
                            src={project.images.architecture_img}
                            alt={subSection.title}
                            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                          />
                        </div>
                      </div>
                    )}

                    {/* High-Fidelity Diagrams & Screenshot Grids */}
                    {subSection.images && subSection.images.length > 0 && (
                      <div className="mt-6 grid w-full grid-cols-1 gap-6 md:mt-8 md:grid-cols-2 md:gap-8">
                        {subSection.images.map((imageItem, i) => (
                          <div
                            key={imageItem.src + i}
                            className="group space-y-3"
                          >
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
                    )}
                  </div>
                ))}
              </div>

              {/* Product Metric Highlights Grid */}
              {section.id === 'context-goal' &&
                project.stats &&
                project.stats.length > 0 && (
                  <div className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-100 pt-8 sm:grid-cols-3 md:mt-16 md:gap-8 md:pt-12">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
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
