import { motion } from 'framer-motion';
import StackIcon from 'tech-stack-icons';

interface Tool {
  name: string;
  slug: string;
}

interface StackSection {
  label?: string;
  tools: Tool[];
}

interface ContextualStackProps {
  variant?: 'grid' | 'list';
  showIconName?: boolean;
  stackList: StackSection[] | Tool[];
}

export function ContextualStack({
  variant = 'grid',
  showIconName = true,
  stackList,
}: ContextualStackProps) {
  if (!stackList || stackList.length === 0) return null;

  const isFlatList = 'slug' in (stackList[0] || {});
  const sections: StackSection[] = isFlatList
    ? [{ tools: stackList as Tool[] }]
    : (stackList as StackSection[]);

  const stackView =
    variant === 'grid'
      ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'
      : 'flex flex-col gap-3';

  return (
    <section className="space-y-16">
      {sections.map((section, sectionIdx) => (
        <div key={section.label || 'flat-section'}>
          {section.label && (
            <div className="mb-8 flex items-center gap-4">
              <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                {section.label}
              </h3>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>
          )}

          <div className={stackView}>
            {section.tools?.map((tool: Tool, idx: number) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.05 + sectionIdx * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`group flex items-center rounded-2xl border border-zinc-100 bg-white p-3 transition-all hover:border-zinc-200 ${showIconName ? 'w-full gap-3 px-4 sm:w-fit' : 'size-14 justify-center'} `}
              >
                <div className="flex size-8 shrink-0 items-center justify-center transition-all group-hover:scale-110">
                  <StackIcon name={tool.slug} />
                </div>
                {showIconName && (
                  <span className="truncate text-sm font-semibold text-zinc-600 group-hover:text-zinc-900 sm:text-xs">
                    {tool.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
