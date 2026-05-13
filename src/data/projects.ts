type ProjectSectionId =
  | 'overview'
  | 'architecture'
  | 'engineering'
  | 'ai-workflow'
  | 'tradeoffs'
  | 'impact';

interface TechPill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'ai' | 'tooling';
}

interface ProjectStat {
  label: string;
  value: string;
  description?: string;
}

interface ProjectSection {
  id: ProjectSectionId;
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    explanation: string;
  };
  image?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: TechPill[];
  stats: ProjectStat[];
  sections: ProjectSection[];
}

export const PROJECTS_DETAIL: ProjectDetail[] = [
  {
    id: 'lumina-analytics',
    title: 'Lumina Analytics',
    subtitle: 'Real-time observability platform for headless ecommerce.',
    year: '2026',
    role: 'Lead Software Engineer',
    liveUrl: 'https://lumina.example.com',
    techStack: [
      { name: 'Next.js 15', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'SSE', category: 'backend' },
      { name: 'TanStack Query', category: 'tooling' },
      { name: 'Tailwind CSS', category: 'frontend' },
    ],
    stats: [
      {
        label: 'Latency Reduction',
        value: '60%',
        description: 'Time-to-insight improvement',
      },
      {
        label: 'Type Coverage',
        value: '98%',
        description: 'Across the entire codebase',
      },
      {
        label: 'TBT Reduction',
        value: '85%',
        description: 'Total Blocking Time improvement',
      },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Summary',
        content:
          'Lumina unifies disparate data streams into a single, high-performance dashboard for headless ecommerce merchants. It solves the fragmentation problem by providing real-time visibility into distributed user sessions.',
      },
      {
        id: 'architecture',
        title: 'Architecture',
        content:
          'To handle high-frequency updates, I implemented a Server-Sent Events (SSE) architecture. This reduced server overhead compared to standard WebSockets while maintaining a lightweight real-time stream. I utilized a Compound Component pattern for the dashboard to maximize modularity.',
      },
      {
        id: 'engineering',
        title: 'Engineering',
        content:
          'The primary challenge was dashboard jank caused by frequent re-renders. I optimized the visualization layer using memoization and strictly managed resource disposal to prevent memory leaks in long-running user sessions.',
        codeSnippet: {
          language: 'typescript',
          code: `
useEffect(() => {
  const controller = new AbortController();
  
  const initStream = async () => {
    try {
      await streamData({ signal: controller.signal });
    } catch (err) {
      if (err.name !== 'AbortError') handleStreamError(err);
    }
  };

  initStream();
  // Preventing memory leaks by aborting active fetch signals on unmount
  return () => controller.abort(); 
}, [streamId]);`,
          explanation:
            'Standard senior practice: Ensuring high-performance by cleaning up asynchronous resources and fetch signals.',
        },
      },
      {
        id: 'ai-workflow',
        title: 'AI Workflow',
        content:
          'AI was used as a force multiplier for unit test generation and complex TypeScript interface drafting. This allowed me to maintain 100% type safety for complex third-party API responses with minimal manual boilerplate.',
      },
      {
        id: 'tradeoffs',
        title: 'Trade-offs',
        content:
          'I chose Client Components over RSC for the main data table. While RSC offers SEO benefits, the high-frequency filtering and multi-select logic required an immediate, app-like feedback loop that only client-side state could provide effectively.I chose Client Components over RSC for the main data table. While RSC offers SEO benefits, the high-frequency filtering and multi-select logic required an immediate, app-like feedback loop that only client-side state could provide effectively.',
      },
    ],
  },
];
