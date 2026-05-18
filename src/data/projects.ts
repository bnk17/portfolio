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
            images: [
              {
                src: '/image/image.jpg',
                title: 'Extension Portal view',
                content:
                  'The localized overlay injecting native product actions directly over foreign e-commerce DOM components.',
              },
              {
                src: '/image/image.jpg',
                title: 'Decoupled Parent Dashboard',
                content:
                  'A centralized space configured with modern UI patterns for editing wishlists and monitoring reservations.',
              },
              {
                src: '/image/image.jpg',
                title: 'Zero-Login Checkout Flow',
                content:
                  'A secure web path optimizing checkout speed for external gift-givers down to minimal click interactions.',
              },
            ],
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
        liveUrl: 'https://zod-visualizer.vercel.app',
        githubUrl: 'https://github.com/yourusername/zod-visualizer',
        techStack: t('projects.zod_schema_visualizer.tools', {
          returnObjects: true,
        }) as any[],
        stats: [
          {
            label: t('projects.zod_schema_visualizer.stats.reach_label'),
            value: 'Recursive',
            description: t('projects.zod_schema_visualizer.stats.reach_desc'),
          },
          {
            label: t('projects.zod_schema_visualizer.stats.onboarding_label'),
            value: '<10ms',
            description: t(
              'projects.zod_schema_visualizer.stats.onboarding_desc'
            ),
          },
          {
            label: t('projects.zod_schema_visualizer.stats.conversion_label'),
            value: '100%',
            description: t(
              'projects.zod_schema_visualizer.stats.conversion_desc'
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
          },
          {
            id: 'solution',
            title: t('projects.zod_schema_visualizer.sections.solution_title'),
            content: t(
              'projects.zod_schema_visualizer.sections.solution_content'
            ),
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
                  'projects.zod_schema_visualizer.sections.engineering_explanation'
                ),
              },
              {
                tabName: 'sse-stream.ts',
                language: 'typescript',
                code: `// Server-Sent Events Token Broker
export const useSchemaSynthesis = (prompt: string) => {
  const eventSource = new EventSource(\\\`/api/synthesize?prompt=\\\${encodeURIComponent(prompt)}\\\`);
  
  eventSource.onmessage = (event) => {
    const chunk = JSON.parse(event.data);
    updateSchemaEditor(chunk.token);
  };
};`,
                explanation: t(
                  'projects.zod_schema_visualizer.sections.ai_content'
                ), // Nested your Zod AI generation text here
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
