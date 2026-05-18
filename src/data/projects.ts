import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
export type ProjectSectionId =
  | 'overview'
  | 'problem'
  | 'solution'
  | 'engineering'
  | 'impact';

interface ProjectStat {
  label: string;
  value: string;
  description?: string;
}

export interface CodeFile {
  tabName: string; // e.g., "useSyncWishlist.ts" or "schema-parser.ts"
  language: string; // e.g., "typescript" or "json"
  code: string; // The raw code block string
  explanation: string;
}

export interface ProjectImage {
  src: string;
  title: string;
  content: string;
}

interface ProjectSection {
  id: ProjectSectionId;
  title: string;
  content: string;
  codeSnippet?: CodeFile[];
  images?: ProjectImage[];
  list?: string[];
  listTitle?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  cover_img?: string;
  logo_img?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: any[];
  stats: ProjectStat[];
  sections: ProjectSection[];
}

export const useGetProjects = (): ProjectDetail[] => {
  const { t } = useTranslation();

  const PROJECTS_DETAIL: ProjectDetail[] = useMemo(() => {
    return [
      {
        id: 'petitpals',
        title: t('projects.petitpals.title'),
        subtitle: t('projects.petitpals.subtitle'),
        year: '2026',
        role: t('projects.petitpals.role'),
        cover_img: '/image/petipals-cover.png',
        logo_img: '/image/petipals-logo.png',
        liveUrl: 'https://petitpals.app',
        techStack: t('projects.petitpals.tools', {
          returnObjects: true,
        }) as any[],
        stats: [
          {
            label: t('projects.petitpals.stats.time_to_market.label'),
            value: '3 Days',
            description: t('projects.petitpals.stats.time_to_market.desc'),
          },
          {
            label: t('projects.petitpals.stats.reach.label'),
            value: '100%',
            description: t('projects.petitpals.stats.reach.desc'),
          },
          {
            //  Fixed to conversion.label
            label: t('projects.petitpals.stats.onboarding.label'),
            value: '< 2min',
            description: t('projects.petitpals.statsonboarding.desc'),
          },
        ],
        sections: [
          {
            id: 'overview',
            title: t('projects.petitpals.sections.overview_title'),
            content: t('projects.petitpals.sections.overview_content'),
          },
          {
            id: 'problem',
            title: t('projects.petitpals.sections.problem_title'),
            content: t('projects.petitpals.sections.problem_content'),
            listTitle: t('projects.petitpals.sections.problem_list_title'),
            list: t('projects.petitpals.sections.problem_list', {
              returnObjects: true,
            }) as string[],
          },
          {
            id: 'solution',
            title: t('projects.petitpals.sections.solution_title'),
            content: t('projects.petitpals.sections.solution_content'),
            listTitle: t('projects.petitpals.sections.solution_list_title'),
            list: t('projects.petitpals.sections.solution_list', {
              returnObjects: true,
            }) as string[],
            images: t('projects.petitpals.sections.screenshots.items', {
              returnObjects: true,
            }) as ProjectImage[],
          },
          {
            id: 'engineering',
            title: t('projects.petitpals.sections.engineering_title'),
            content: t('projects.petitpals.sections.engineering_content'),
            codeSnippet: [
              {
                tabName: 'Web - useRegistry.ts',
                language: 'typescript',
                code: `export function useRegistry(slug: string | undefined) {
  const [registry, setRegistry] = useState<Registry | null>(null);
  const [items, setItems] = useState<RegistryItem[]>([]);
  const registryIdRef = useRef<string | null>(null);

  // High-value: Synchronizing state when the user returns to the tab
  const refetchItems = useCallback(async () => {
    const id = registryIdRef.current;
    if (!id) return;
    try {
      const data = await registryService.getRegistryItems(id);
      setItems(data);
    } catch (error) {
      console.error('Failed to refetch items:', error);
    }
  }, []);

  useEffect(() => {
    const onVisible = () => {
      // Prevents stale data in multi-user environments (e.g., family members claiming items)
      if (document.visibilityState === 'visible') refetchItems();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [refetchItems]);

  const handleClaim = async (itemId: string, purchasedBy: string) => {
    await registryService.claimItem(itemId, purchasedBy);
    // Optimistic UI update to ensure zero-latency perceived performance
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? { ...it, is_purchased: true, purchased_by: purchasedBy || null }
          : it
      )
    );
  };

  return { registry, items, handleClaim, refetch: load };
}`,
                explanation: t(
                  'projects.petitpals.sections.resilient_ui_explanation'
                ),
              },
              {
                tabName: 'Extension - dom-engine.ts', // Cleaned up filename style
                language: 'tsx',
                code: `function setPushStyle(open: boolean) {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    (document.head ?? document.documentElement).appendChild(style);
  }
  if (open) {
    // padding-right + box-sizing:border-box shrinks the content area without
    // widening the element, preventing horizontal scroll on width:100vw sites.
    style.textContent = \`
      html {
        padding-right: \${PANEL_WIDTH}px !important;
        box-sizing: border-box !important;
        overflow-x: hidden !important;
        transition: padding-right \${TRANSITION} !important;
      }
    \`;
  } else {
    style.textContent = \`
      html {
        padding-right: 0px !important;
        transition: padding-right \${TRANSITION} !important;
      }
    \`;
    setTimeout(() => style?.remove(), 300);
  }
}`,
                explanation: t(
                  'projects.petitpals.sections.ux_dom_engine_explanation'
                ),
              },
            ],
          },
          {
            id: 'impact',
            title: t('projects.petitpals.sections.impact_title'),
            content: t('projects.petitpals.sections.impact_content'),
          },
        ],
      },
      {
        id: 'zod_schema_visualizer',
        title: t('projects.zod_schema_visualizer.title'),
        subtitle: t('projects.zod_schema_visualizer.subtitle'),
        year: '2024',
        role: t('projects.zod_schema_visualizer.role'),
        cover_img: '/image/zod/zod-cover.jpeg',
        logo_img: '/image/zod/zod-cover.jpeg',
        liveUrl: 'https://zod-schema-visualizer.vercel.app/',
        githubUrl: 'https://github.com/bnk17/zod-schema-visualizer',
        techStack: t('projects.zod_schema_visualizer.tools', {
          returnObjects: true,
        }) as any[],
        stats: [
          {
            label: t('projects.zod_schema_visualizer.stats.generation.label'),
            value: '< 1s',
            description: t(
              'projects.zod_schema_visualizer.stats.generation.desc'
            ),
          },
          {
            label: t('projects.zod_schema_visualizer.stats.type_safety.label'),
            value: '100%',
            description: t(
              'projects.zod_schema_visualizer.stats.type_safety.desc'
            ),
          },
          {
            label: t('projects.zod_schema_visualizer.stats.render_perf.label'),
            value: '60fps',
            description: t(
              'projects.zod_schema_visualizer.stats.render_perf.desc'
            ),
          },
        ],
        sections: [
          {
            id: 'overview',
            title: t('projects.zod_schema_visualizer.sections.overview_title'),
            content: t(
              'projects.zod_schema_visualizer.sections.overview_content'
            ),
          },
          {
            id: 'problem',
            title: t('projects.zod_schema_visualizer.sections.problem_title'),
            content: t(
              'projects.zod_schema_visualizer.sections.problem_content'
            ),
            listTitle: t(
              'projects.zod_schema_visualizer.sections.problem_list_title'
            ),
            list: t('projects.zod_schema_visualizer.sections.problem_list', {
              returnObjects: true,
            }) as string[],
          },
          {
            id: 'solution',
            title: t('projects.zod_schema_visualizer.sections.solution_title'),
            content: t(
              'projects.zod_schema_visualizer.sections.solution_content'
            ),
            listTitle: t(
              'projects.zod_schema_visualizer.sections.solution_list_title'
            ),
            list: t('projects.zod_schema_visualizer.sections.solution_list', {
              returnObjects: true,
            }) as string[],
            images: [
              {
                src: '/image/zod/zod-view.png',
                title: t(
                  'projects.zod_schema_visualizer.sections.screenshots.items.0.title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.screenshots.items.0.content'
                ),
              },
              {
                src: '/image/zod/zod-form.png',
                title: t(
                  'projects.zod_schema_visualizer.sections.screenshots.items.1.title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.screenshots.items.1.content'
                ),
              },
              {
                src: '/image/zod/zod-ai.png',
                title: t(
                  'projects.zod_schema_visualizer.sections.screenshots.items.2.title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.screenshots.items.2.content'
                ),
              },
            ],
          },
          {
            id: 'engineering',
            title: t(
              'projects.zod_schema_visualizer.sections.engineering_title'
            ),
            content: t(
              'projects.zod_schema_visualizer.sections.engineering_content'
            ),
            codeSnippet: [
              {
                tabName: 'flush-buffer.ts',
                language: 'typescript',
                code: `// Throttled Token Buffer Hook
export function useFlushBuffer(callback: (tokens: string) => void, delay = 80) {
  const queue = useRef<string[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);

  return useCallback((token: string) => {
    queue.current.push(token);
    if (timer.current) return;

    timer.current = setInterval(() => {
      if (queue.current.length === 0) {
        clearInterval(timer.current!);
        timer.current = null;
        return;
      }
      const chunk = queue.current.splice(0, 5).join('');
      callback(chunk);
    }, delay);
  }, [callback, delay]);
}`,
                explanation: t(
                  'projects.zod_schema_visualizer.sections.ux_dom_engine_explanation'
                ),
              },
              {
                tabName: 'zod-visitor.ts',
                language: 'typescript',
                code: `// Recursive Visitor Pattern for Dynamic Forms
export function parseZodSchema(schema: z.ZodTypeAny): FormComponentRegistry {
  if (schema instanceof z.ZodObject) {
    return Object.entries(schema.shape).map(([key, value]) => ({
      name: key,
      type: mapPrimitivesToUI(value)
    }));
  }
  if (schema instanceof z.ZodEffects) {
    return parseZodSchema(schema._def.schema);
  }
  return [];
};`,
                explanation: t(
                  'projects.zod_schema_visualizer.sections.resilient_ui_explanation'
                ),
              },
            ],
          },
          {
            id: 'impact',
            title: t('projects.zod_schema_visualizer.sections.impact_title'),
            content: t(
              'projects.zod_schema_visualizer.sections.impact_content'
            ),
          },
        ],
      },
    ];
  }, [t]);

  return PROJECTS_DETAIL;
};
