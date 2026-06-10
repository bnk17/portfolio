import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// 1. Explicitly typed string union for your high-level product navigation
export type ProjectSectionId =
  | 'context-goal'
  | 'user-friction'
  | 'discovery-tradeoffs'
  | 'architecture'
  | 'outcome-metrics'
  | 'retrospective';

export type ProjectSubSectionId =
  | 'project-origin'
  | 'learning-objectives'
  | 'workplace-frustration'
  | 'anonymity-challenge'
  | 'scoping-mvp'
  | 'tech-debt'
  | 'topology-flow'
  | 'code-implementation'
  | 'performance-bottlenecks'
  | 'beta-testing'
  | 'technical-benchmarks'
  | 'key-takeaways'
  | 'future-roadmap';

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

interface ProjectStat {
  label: string;
  value: string;
  description?: string;
}
// Explicitly typed string union for generic project life-cycle states
export type ProjectStatus =
  | 'production-ready' // GA / Production-Ready (Fully stable, actively maintained)
  | 'beta-testing' // Beta / Active Validation (Fully functional, hunting for user feedback/pilots)
  | 'active-development'; // In Active R&D (Prototyping, core full-stack features being coded)

// 1. Child Interface: All deep-dive technical/product features live strictly here
interface ProjectSubSection {
  id: ProjectSubSectionId;
  title: string;
  content: string;
  codeSnippet?: CodeFile[];
  images?: ProjectImage[];
  list?: string[];
  listTitle?: string;
}

// 2. Parent Interface: Clean, uncluttered layout wrapper grouping child nodes
interface ProjectSection {
  id: ProjectSectionId;
  title: string;
  subSections: ProjectSubSection[]; // ✅ Cleaned up all old structural properties from here
}

export interface ProjectImages {
  cover_img?: string;
  logo_img?: string;
  architecture_img?: string;
}

// 3. Master Collection Interface
export interface ProjectDetail {
  id: string;
  homeTitle: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  year: string;
  role: string;
  images?: ProjectImages;
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
        id: 'ouileep',
        homeTitle: t('projects.ouileep.home_title'),
        status: 'beta-testing',
        title: t('projects.ouileep.title'),
        subtitle: t('projects.ouileep.subtitle'),
        year: '2026',
        role: t('projects.ouileep.role'),
        images: {
          cover_img: '/assets/image/ouileep/ouileep-cover.png',
          logo_img: '/assets/image/ouileep-logo.png',
          architecture_img: '/assets/image/ouileep/ouileep-architecture.webp',
        },
        techStack: t('projects.ouileep.tools', {
          returnObjects: true,
        }) as any[],
        stats: [
          {
            label: t('projects.ouileep.stats.time_to_market.label'),
            value: t('projects.ouileep.stats.time_to_market.value'), // 🚀 Updated to match your realistic build timeline
            description: t('projects.ouileep.stats.time_to_market.desc'),
          },
          {
            label: t('projects.ouileep.stats.test_coverage.label'),
            value: '85%', // 🚀 Swapped out review_reduction for your test coverage metric
            description: t('projects.ouileep.stats.test_coverage.desc'),
          },
          {
            label: t('projects.ouileep.stats.cicd_velocity.label'),
            value: '< 2 Min', // 🚀 Swapped out adoption for automated CI/CD velocity
            description: t('projects.ouileep.stats.cicd_velocity.desc'),
          },
        ],

        sections: [
          {
            id: 'context-goal',
            title: t('projects.ouileep.sections.context_goal_title'),
            subSections: [
              {
                id: 'project-origin', // 🚀 Changed from 'corporate-vector'
                title: t('projects.ouileep.sections.project_origin_title'),
                content: t('projects.ouileep.sections.project_origin_content'),
              },
              {
                id: 'learning-objectives', // 🚀 Changed from 'north-star'
                title: t('projects.ouileep.sections.learning_objectives_title'),
                content: t(
                  'projects.ouileep.sections.learning_objectives_content'
                ),
              },
            ],
          },
          {
            id: 'user-friction',
            title: t('projects.ouileep.sections.user_friction_title'),
            subSections: [
              {
                id: 'workplace-frustration', // 🚀 Changed from 'behavioral-insights'
                title: t(
                  'projects.ouileep.sections.workplace_frustration_title'
                ),
                content: t(
                  'projects.ouileep.sections.workplace_frustration_content'
                ),
                listTitle: t(
                  'projects.ouileep.sections.behavioral_insights_list_title'
                ),
                list: t('projects.ouileep.sections.behavioral_insights_list', {
                  returnObjects: true,
                }) as string[],
              },
              {
                id: 'anonymity-challenge', // 🚀 Changed from 'systemic-bottlenecks'
                title: t('projects.ouileep.sections.anonymity_challenge_title'),
                content: t(
                  'projects.ouileep.sections.anonymity_challenge_content'
                ),
              },
            ],
          },
          {
            id: 'discovery-tradeoffs',
            title: t('projects.ouileep.sections.discovery_tradeoffs_title'),
            subSections: [
              {
                id: 'scoping-mvp',
                title: t('projects.ouileep.sections.scoping_mvp_title'),
                content: t('projects.ouileep.sections.scoping_mvp_content'),
                images: t('projects.ouileep.sections.screenshots.items', {
                  returnObjects: true,
                }) as ProjectImage[],
              },
              {
                id: 'tech-debt',
                title: t('projects.ouileep.sections.tech_debt_title'),
                content: t('projects.ouileep.sections.tech_debt_content'),
              },
            ],
          },
          {
            id: 'architecture',
            title: t('projects.ouileep.sections.architecture_title'),
            subSections: [
              {
                id: 'topology-flow',
                title: t('projects.ouileep.sections.topology_flow_title'),
                content: t('projects.ouileep.sections.topology_flow_content'),
              },
              {
                id: 'code-implementation',
                title: t('projects.ouileep.sections.code_implementation_title'),
                content: t(
                  'projects.ouileep.sections.code_implementation_content'
                ),
                codeSnippet: [
                  {
                    tabName: 'Serverless - route.ts',
                    language: 'typescript',
                    code: `import { OpenAI } from 'openai';\nimport { NextResponse } from 'next/server';\n\nconst openai = new OpenAI();\n\nexport async function POST(req: Request) {\n  const { rawText, memberId, logType } = await req.json();\n\n  // Conditional privacy handling: strip identifiers if it is a win or suggestion\n  const isAnonymous = logType === 'Win' || logType === 'Suggestion';\n  const telemetryUser = isAnonymous ? 'anonymous' : memberId;\n\n  const completion = await openai.chat.completions.create({\n    model: 'gpt-4o-mini',\n    messages: [\n      { role: 'system', content: 'Parse unstructured team text into a structured log object.' },\n      { role: 'user', content: rawText }\n    ],\n    response_format: {\n      type: "json_schema",\n      json_schema: {\n        name: "feedback_schema",\n        strict: true,\n        schema: {\n          type: "object",\n          properties: {\n            summary: { type: "string" },\n            type: { type: "string", enum: ["Suggestion", "Roadblock", "Win"] },\n            priority: { type: "string", enum: ["LOW", "MEDIUM", "HIGH"] },\n            tags: { type: "array", items: { type: "string" } }\n          },\n          required: ["summary", "type", "priority", "tags"],\n          additionalProperties: false\n        }\n      }\n    }\n  });\n\n  const parsedData = JSON.parse(completion.choices[0].message.content || '{}');\n  \n  // Persisting data with conditional metadata fallback to Prisma\n  const log = await db.feedback.create({\n    data: {\n      ...parsedData,\n      memberId: telemetryUser\n    }\n  });\n\n  return NextResponse.json(log);\n}`,
                    explanation: t(
                      'projects.ouileep.sections.engineering_explanation'
                    ),
                  },
                  {
                    tabName: 'Web - useFeedbackStore.ts',
                    language: 'typescript',
                    code: `import { create } from 'zustand';\n\ninterface FeedbackItem {\n  id: string;\n  summary: string;\n  type: 'Suggestion' | 'Roadblock' | 'Win';\n  priority: 'LOW' | 'MEDIUM' | 'HIGH';\n  tags: string[];\n  memberId: string;\n}\n\ninterface FeedbackState {\n  items: FeedbackItem[];\n  filterType: 'all' | 'Win' | 'Roadblock' | 'Suggestion';\n  setFilterType: (type: 'all' | 'Win' | 'Roadblock' | 'Suggestion') => void;\n  updateItemStatus: (id: string, updates: Partial<FeedbackItem>) => void;\n}\n\nexport const useFeedbackStore = create<FeedbackState>((set) => ({\n  items: [],\n  filterType: 'all',\n  setFilterType: (filterType) => set({ filterType }),\n  updateItemStatus: (id, updates) => set((state) => ({\n    items: state.items.map((item) => \n      item.id === id ? { ...item, ...updates } : item\n    )\n  })),\n}));\n\nexport const selectFilteredItems = (state: FeedbackState) => {\n  if (state.filterType === 'all') return state.items;\n  return state.items.filter((item) => item.type === state.filterType);\n};`,
                    explanation: t(
                      'projects.ouileep.sections.resilient_ui_explanation'
                    ),
                  },
                ],
              },
              {
                id: 'performance-bottlenecks',
                title: t(
                  'projects.ouileep.sections.performance_bottlenecks_title'
                ),
                content: t(
                  'projects.ouileep.sections.performance_bottlenecks_content'
                ),
              },
            ],
          },
          {
            id: 'outcome-metrics',
            title: t('projects.ouileep.sections.outcome_metrics_title'),
            subSections: [
              {
                id: 'beta-testing', // 🚀 Changed from 'business-impact'
                title: t('projects.ouileep.sections.beta_testing_title'),
                content: t('projects.ouileep.sections.beta_testing_content'),
              },
              {
                id: 'technical-benchmarks', // 🚀 Changed from 'engineering-kpis'
                title: t(
                  'projects.ouileep.sections.technical_benchmarks_title'
                ),
                content: t(
                  'projects.ouileep.sections.technical_benchmarks_content'
                ),
              },
            ],
          },
          {
            id: 'retrospective',
            title: t('projects.ouileep.sections.retrospective_title'),
            subSections: [
              {
                id: 'key-takeaways',
                title: t('projects.ouileep.sections.key_takeaways_title'),
                content: t('projects.ouileep.sections.key_takeaways_content'),
              },
              {
                id: 'future-roadmap',
                title: t('projects.ouileep.sections.future_roadmap_title'),
                content: t('projects.ouileep.sections.future_roadmap_content'),
              },
            ],
          },
        ],
      },
      {
        id: 'petitpals',
        homeTitle: t('projects.petitpals.homeTitle'),
        title: t('projects.petitpals.title'),
        subtitle: t('projects.petitpals.subtitle'),
        status: 'production-ready',
        year: '2026',
        role: t('projects.petitpals.role'),
        images: {
          cover_img: '/assets/image/petitpals/petitpals-cover.webp',
        },
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
            label: t('projects.petitpals.stats.onboarding.label'),
            value: '< 2min',
            description: t('projects.petitpals.stats.onboarding.desc'),
          },
        ],
        sections: [
          {
            id: 'context-goal',
            title: t('projects.petitpals.sections.context_goal_title'),
            subSections: [
              {
                id: 'project-origin',
                title: t('projects.petitpals.sections.project_origin_title'),
                content: t(
                  'projects.petitpals.sections.project_origin_content'
                ),
              },
              {
                id: 'learning-objectives',
                title: t(
                  'projects.petitpals.sections.learning_objectives_title'
                ),
                content: t(
                  'projects.petitpals.sections.learning_objectives_content'
                ),
              },
            ],
          },
          {
            id: 'user-friction',
            title: t('projects.petitpals.sections.user_friction_title'),
            subSections: [
              {
                id: 'workplace-frustration',
                title: t(
                  'projects.petitpals.sections.workplace_frustration_title'
                ),
                content: t(
                  'projects.petitpals.sections.workplace_frustration_content'
                ),
                listTitle: t(
                  'projects.petitpals.sections.behavioral_insights_list_title'
                ),
                list: t(
                  'projects.petitpals.sections.behavioral_insights_list',
                  {
                    returnObjects: true,
                  }
                ) as string[],
              },
              {
                id: 'anonymity-challenge',
                title: t(
                  'projects.petitpals.sections.anonymity_challenge_title'
                ),
                content: t(
                  'projects.petitpals.sections.anonymity_challenge_content'
                ),
              },
            ],
          },
          {
            id: 'discovery-tradeoffs',
            title: t('projects.petitpals.sections.discovery_tradeoffs_title'),
            subSections: [
              {
                id: 'scoping-mvp',
                title: t('projects.petitpals.sections.scoping_mvp_title'),
                content: t('projects.petitpals.sections.scoping_mvp_content'),
                images: t('projects.petitpals.sections.screenshots.items', {
                  returnObjects: true,
                }) as ProjectImage[],
              },
              {
                id: 'tech-debt',
                title: t('projects.petitpals.sections.tech_debt_title'),
                content: t('projects.petitpals.sections.tech_debt_content'),
              },
            ],
          },
          {
            id: 'architecture',
            title: t('projects.petitpals.sections.architecture_title'),
            subSections: [
              {
                id: 'topology-flow',
                title: t('projects.petitpals.sections.topology_flow_title'),
                content: t('projects.petitpals.sections.topology_flow_content'),
              },
              {
                id: 'code-implementation',
                title: t(
                  'projects.petitpals.sections.code_implementation_title'
                ),
                content: t(
                  'projects.petitpals.sections.code_implementation_content'
                ),
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
                    tabName: 'Extension - dom-engine.ts',
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
                id: 'performance-bottlenecks',
                title: t(
                  'projects.petitpals.sections.performance_bottlenecks_title'
                ),
                content: t(
                  'projects.petitpals.sections.performance_bottlenecks_content'
                ),
              },
            ],
          },
          {
            id: 'outcome-metrics',
            title: t('projects.petitpals.sections.outcome_metrics_title'),
            subSections: [
              {
                id: 'beta-testing',
                title: t('projects.petitpals.sections.beta_testing_title'),
                content: t('projects.petitpals.sections.beta_testing_content'),
              },
              {
                id: 'technical-benchmarks',
                title: t(
                  'projects.petitpals.sections.technical_benchmarks_title'
                ),
                content: t(
                  'projects.petitpals.sections.technical_benchmarks_content'
                ),
              },
            ],
          },
          {
            id: 'retrospective',
            title: t('projects.petitpals.sections.retrospective_title'),
            subSections: [
              {
                id: 'key-takeaways',
                title: t('projects.petitpals.sections.key_takeaways_title'),
                content: t('projects.petitpals.sections.key_takeaways_content'),
              },
              {
                id: 'future-roadmap',
                title: t('projects.petitpals.sections.future_roadmap_title'),
                content: t(
                  'projects.petitpals.sections.future_roadmap_content'
                ),
              },
            ],
          },
        ],
      },
      {
        id: 'zod_schema_visualizer',
        homeTitle: t('projects.zod_schema_visualizer.homeTitle'),
        title: t('projects.zod_schema_visualizer.title'),
        subtitle: t('projects.zod_schema_visualizer.subtitle'),
        status: 'production-ready',
        year: '2024',
        role: t('projects.zod_schema_visualizer.role'),
        images: {
          cover_img: '/assets/image/zod/zod-cover.jpeg',
          logo_img: '/assets/image/zod/zod-cover.jpeg',
        },
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
            id: 'context-goal',
            title: t(
              'projects.zod_schema_visualizer.sections.context_goal_title'
            ),
            subSections: [
              {
                id: 'project-origin',
                title: t(
                  'projects.zod_schema_visualizer.sections.project_origin_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.project_origin_content'
                ),
              },
              {
                id: 'learning-objectives',
                title: t(
                  'projects.zod_schema_visualizer.sections.learning_objectives_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.learning_objectives_content'
                ),
              },
            ],
          },
          {
            id: 'user-friction',
            title: t(
              'projects.zod_schema_visualizer.sections.user_friction_title'
            ),
            subSections: [
              {
                id: 'workplace-frustration',
                title: t(
                  'projects.zod_schema_visualizer.sections.workplace_frustration_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.workplace_frustration_content'
                ),
                listTitle: t(
                  'projects.zod_schema_visualizer.sections.behavioral_insights_list_title'
                ),
                list: t(
                  'projects.zod_schema_visualizer.sections.behavioral_insights_list',
                  {
                    returnObjects: true,
                  }
                ) as string[],
              },
              {
                id: 'anonymity-challenge',
                title: t(
                  'projects.zod_schema_visualizer.sections.anonymity_challenge_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.anonymity_challenge_content'
                ),
              },
            ],
          },
          {
            id: 'discovery-tradeoffs',
            title: t(
              'projects.zod_schema_visualizer.sections.discovery_tradeoffs_title'
            ),
            subSections: [
              {
                id: 'scoping-mvp',
                title: t(
                  'projects.zod_schema_visualizer.sections.scoping_mvp_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.scoping_mvp_content'
                ),
                images: t(
                  'projects.zod_schema_visualizer.sections.screenshots.items',
                  {
                    returnObjects: true,
                  }
                ) as ProjectImage[],
              },
              {
                id: 'tech-debt',
                title: t(
                  'projects.zod_schema_visualizer.sections.tech_debt_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.tech_debt_content'
                ),
              },
            ],
          },
          {
            id: 'architecture',
            title: t(
              'projects.zod_schema_visualizer.sections.architecture_title'
            ),
            subSections: [
              {
                id: 'topology-flow',
                title: t(
                  'projects.zod_schema_visualizer.sections.topology_flow_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.topology_flow_content'
                ),
              },
              {
                id: 'code-implementation',
                title: t(
                  'projects.zod_schema_visualizer.sections.code_implementation_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.code_implementation_content'
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
                id: 'performance-bottlenecks',
                title: t(
                  'projects.zod_schema_visualizer.sections.performance_bottlenecks_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.performance_bottlenecks_content'
                ),
              },
            ],
          },
          {
            id: 'outcome-metrics',
            title: t(
              'projects.zod_schema_visualizer.sections.outcome_metrics_title'
            ),
            subSections: [
              {
                id: 'beta-testing',
                title: t(
                  'projects.zod_schema_visualizer.sections.beta_testing_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.beta_testing_content'
                ),
              },
              {
                id: 'technical-benchmarks',
                title: t(
                  'projects.zod_schema_visualizer.sections.technical_benchmarks_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.technical_benchmarks_content'
                ),
              },
            ],
          },
          {
            id: 'retrospective',
            title: t(
              'projects.zod_schema_visualizer.sections.retrospective_title'
            ),
            subSections: [
              {
                id: 'key-takeaways',
                title: t(
                  'projects.zod_schema_visualizer.sections.key_takeaways_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.key_takeaways_content'
                ),
              },
              {
                id: 'future-roadmap',
                title: t(
                  'projects.zod_schema_visualizer.sections.future_roadmap_title'
                ),
                content: t(
                  'projects.zod_schema_visualizer.sections.future_roadmap_content'
                ),
              },
            ],
          },
        ],
      },
    ];
  }, [t]);

  return PROJECTS_DETAIL;
};
