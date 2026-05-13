import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectDetail } from '../data/projects';

interface ProjectCardProps {
  project: ProjectDetail;
  isDimmed: boolean;
  isHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
}

export const ProjectCard = ({
  project,
  isDimmed,
  isHovered,
  onHover,
  onLeave,
}: ProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`group relative flex flex-col transition-all duration-300 ${isHovered ? 'z-30' : 'z-10'}`}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onLeave}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* Mobile Version (Unchanged) */}
      <div className="flex items-center gap-4 rounded-[2rem] border border-zinc-100 bg-zinc-50 p-6 transition-all hover:bg-white min-[990px]:hidden">
        <div className="flex flex-col justify-center">
          <h3 className="font-display text-base font-extrabold tracking-tight text-black">
            {project.title}
          </h3>
          <p className="line-clamp-1 font-mono text-[10px] text-zinc-400">
            {project.subtitle}
          </p>
        </div>
        <div className="ml-auto">
          <ArrowUpRight size={16} className="text-zinc-300" />
        </div>
      </div>

      {/* Desktop Version */}
      <motion.div
        animate={{
          // When dimmed, drop opacity. When hovered or when no hover exists, opacity 1.
          opacity: isDimmed ? 0.1 : 1,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-20 hidden aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-zinc-100 bg-cover shadow-sm hover:shadow-md lg:flex"
        style={{
          backgroundImage: `url('/image/image.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-8"></div>
        <div className="absolute bottom-8 left-8 flex h-10 w-10 -translate-x-2 items-center justify-center rounded-full border border-zinc-50 bg-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight size={18} className="text-black" />
        </div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-none absolute top-full left-8 z-10 hidden w-[calc(100%-64px)] pt-2 lg:block"
          >
            <h3 className="font-display mb-1 text-xl font-bold tracking-tight text-black">
              {project.title}
            </h3>
            <p className="font-mono text-[13px] leading-relaxed font-medium text-zinc-500">
              {project.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
