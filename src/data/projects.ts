import { useTranslation } from 'react-i18next';
type ProjectSectionId =
  | 'overview'
  | 'architecture'
  | 'engineering'
  | 'ai-workflow'
  | 'tradeoffs'
  | 'impact';

export interface TechPill {
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

export const useGetProjects = () => {
  const { t } = useTranslation();

  const PROJECTS_DETAIL: ProjectDetail[] = [
    {
      id: 'petitpals',
      title: t('projects.petitpals.title'),
      subtitle: t('projects.petitpals.subtitle'),
      year: '2026',
      role: t('projects.petitpals.role'),
      liveUrl: 'https://petitpals.app',
      techStack: [
        { name: 'React 19', category: 'frontend' },
        { name: 'TypeScript', category: 'frontend' },
        { name: 'Supabase', category: 'backend' },
        { name: 'Tailwind CSS', category: 'frontend' },
        { name: 'Zustand', category: 'tooling' },
      ],
      stats: [
        {
          label: t('projects.petitpals.stats.reach_label'),
          value: '100%',
          description: t('projects.petitpals.stats.reach_desc'),
        },
        {
          label: t('projects.petitpals.stats.onboarding_label'),
          value: '< 2min',
          description: t('projects.petitpals.stats.onboarding_desc'),
        },
        {
          label: t('projects.petitpals.stats.conversion_label'),
          value: '45%',
          description: t('projects.petitpals.stats.conversion_desc'),
        },
      ],
      sections: [
        {
          id: 'overview',
          title: t('projects.petitpals.sections.overview_title'),
          content: t('projects.petitpals.sections.overview_content'),
        },
        {
          id: 'architecture',
          title: t('projects.petitpals.sections.architecture_title'),
          content: t('projects.petitpals.sections.architecture_content'),
        },
        {
          id: 'engineering',
          title: t('projects.petitpals.sections.engineering_title'),
          content: t('projects.petitpals.sections.engineering_content'),
          codeSnippet: {
            language: 'typescript',
            code: `// Dashboard Realtime Sync Hook
export const useSyncWishlist = (wishlistId: string) => {
  const { addItem, updateItem } = useWishlistStore();

  useEffect(() => {
    const channel = supabase
      .channel('wishlist-realtime')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'items', 
          filter: \`wishlist_id=eq.\${wishlistId}\` 
        },
        (payload) => {
          if (payload.eventType === 'INSERT') addItem(payload.new);
          if (payload.eventType === 'UPDATE') updateItem(payload.new);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [wishlistId]);
};`,
            explanation: t(
              'projects.petitpals.sections.engineering_explanation'
            ),
          },
        },
        {
          id: 'ai-workflow',
          title: t('projects.petitpals.sections.ai_title'),
          content: t('projects.petitpals.sections.ai_content'),
        },
        {
          id: 'tradeoffs',
          title: t('projects.petitpals.sections.tradeoffs_title'),
          content: t('projects.petitpals.sections.tradeoffs_content'),
        },
        {
          id: 'impact',
          title: t('projects.petitpals.sections.impact_title'),
          content: t('projects.petitpals.sections.impact_content'),
        },
      ],
    },
  ];

  return PROJECTS_DETAIL;
};
