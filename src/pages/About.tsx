import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, FileText, ArrowUpRight, Link } from 'lucide-react';

interface BioSegment {
  text: string;
  highlight?: 'ai' | 'link';
  url?: string;
  image?: string;
  video?: string;
}

export default function About() {
  const { t } = useTranslation();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const tools = t('about.currentStack.tools', {
    returnObjects: true,
  }) as string[];
  const segments = t('about.bio_segments', {
    returnObjects: true,
  }) as BioSegment[];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 selection:bg-zinc-200">
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-40">
        {/* Bio Section */}
        <section className="space-y-12" onMouseMove={handleMouseMove}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-xl font-semibold tracking-tight"
          >
            {t('nav.about')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <p className="leading-[1.8] text-zinc-700">
              {segments.map((segment, index) => {
                if (segment.highlight === 'ai') {
                  return (
                    <span
                      key={index}
                      className="relative inline-block cursor-help font-semibold text-zinc-600 underline decoration-blue-200 underline-offset-4 transition-all hover:text-blue-700 hover:decoration-blue-500"
                      onMouseEnter={() => {
                        segment.image && setHoveredImage(segment.image);
                        segment.video && setHoveredVideo(segment.video);
                      }}
                      onMouseLeave={() => {
                        setHoveredImage(null);
                        setHoveredVideo(null);
                      }}
                    >
                      {segment.text}
                    </span>
                  );
                }
                if (segment.highlight === 'link') {
                  return (
                    <span
                      key={index}
                      className="relative inline-block cursor-pointer font-semibold text-zinc-600 underline decoration-amber-200 underline-offset-4 transition-all hover:text-amber-700 hover:decoration-amber-500"
                    >
                      <a href={segment.url}>{segment.text}</a>
                    </span>
                  );
                }
                return (
                  <span className="whitespace-pre-wrap" key={index}>
                    {segment.text}
                  </span>
                );
              })}
            </p>

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
              >
                <FileText className="size-4" />
                {t('about.resume')}
                <ArrowUpRight className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

            {/* Hover Image Preview Overlay */}
            <AnimatePresence>
              {(hoveredImage || hoveredVideo) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  style={{
                    position: 'fixed',
                    left: mousePos.x + 20,
                    top: mousePos.y - 180,
                    pointerEvents: 'none',
                    zIndex: 100,
                  }}
                  className="hidden h-44 w-64 overflow-hidden rounded-2xl border border-white bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:block"
                >
                  {hoveredImage && (
                    <img
                      src={hoveredImage}
                      alt="Work preview"
                      className="h-full w-full object-cover"
                    />
                  )}
                  {hoveredVideo && (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source src={hoveredVideo} type="video/mp4" />
                    </video>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Tools Grid Section */}
        <section className="mt-32">
          <div className="mb-10 h-px w-full bg-zinc-100" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display mb-12 text-xl font-semibold tracking-tight"
          >
            {t('about.currentStack.title')}
          </motion.h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-white p-6 transition-colors hover:border-zinc-300"
              >
                <span className="font-medium text-zinc-900">{tool}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-200" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Simplified Contact Section */}
        <section className="mt-32">
          <div className="mb-10 h-px w-full bg-zinc-100" />
          <h2 className="font-display mb-12 text-xl font-semibold tracking-tight">
            {t('about.contact.title')}
          </h2>

          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${t('about.contact.email')}`}
              className="group flex w-fit items-center gap-4 font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <Mail className="size-5 transition-colors group-hover:text-blue-600" />
              {t('about.contact.email')}
              <ArrowUpRight className="size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </a>

            <a
              href={t('about.contact.linkedin')}
              target="_blank"
              rel="noreferrer"
              className="group flex w-fit items-center gap-4 font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <Link
                className={'size-5 transition-colors group-hover:text-blue-600'}
              />
              LinkedIn
              <ArrowUpRight className="size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
