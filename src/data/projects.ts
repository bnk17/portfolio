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

export const PROJECTS_DETAIL: ProjectDetail[] = [
  {
    id: 'petitpals',
    title: 'PetitPals Web & Extension',
    subtitle:
      'A full-stack universal baby registry ecosystem and sharing platform.',
    year: '2026',
    role: 'Solo Founder & Lead Engineer',
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
        label: 'Platform Reach',
        value: '100%',
        description: 'Compatibility with any online retailer',
      },
      {
        label: 'User Onboarding',
        value: '< 2min',
        description: 'From landing to first item saved',
      },
      {
        label: 'Guest Conversion',
        value: '45%',
        description: 'Gift reservation rate on public lists',
      },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content:
          'PetitPals was born from the frustration of modern parents who find their ideal nursery items scattered across niche boutiques, Etsy, and major retailers. The product challenge was to create a "central source of truth" that feels native to the user’s browsing experience regardless of the store they are visiting. By unifying these fragmented data points into a high-end, cohesive registry, we eliminate the need for parents to manage multiple spreadsheets or disjointed links.',
      },
      {
        id: 'architecture',
        title: 'Architecture',
        content:
          'The platform architecture is split between a robust Chrome Extension built with the Manifest V3 standard and a centralized React 19 dashboard. I utilized a Feature-Sliced Design (FSD) to isolate the complex guest-facing reservation logic from the administrative parent controls. This separation ensures that high-traffic public registry pages remain lightweight and performant, while the management dashboard can handle complex state transitions and bulk editing.',
      },
      {
        id: 'engineering',
        title: 'Engineering',
        content:
          'A major engineering hurdle was ensuring data consistency between the browser extension and the web app without forcing manual refreshes. I architected a reactive bridge using Supabase Realtime (CDC) so that an item saved in a browser tab instantly triggers a state update in the opened dashboard. This required careful management of race conditions to ensure that metadata scraped by the extension didn’t overwrite manual user edits occurring simultaneously in the web application.',
        codeSnippet: {
          language: 'typescript',
          code: `
// Dashboard Realtime Sync Hook
export const useSyncWishlist = (wishlistId: string) => {
  const { addItem, updateItem } = useWishlistStore();

  useEffect(() => {
    // Establishing a Postgres Change Stream for real-time UI consistency
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
          // Optimized state reconciliation to prevent unnecessary re-renders
          if (payload.eventType === 'INSERT') addItem(payload.new);
          if (payload.eventType === 'UPDATE') updateItem(payload.new);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [wishlistId]);
};`,
          explanation:
            'Implementing Change Data Capture (CDC) to synchronize state across the Chrome Extension and Web App contexts in under 100ms.',
        },
      },
      {
        id: 'ai-workflow',
        title: 'AI Workflow',
        content:
          'I leveraged AI to accelerate the creation of the extension’s DOM-scraping engine, which requires high adaptability to various ecommerce structures. By using LLMs to draft initial parser templates for different CSS schemas, I significantly reduced the time spent writing boilerplate selectors for hundreds of domains. This workflow allowed me to focus on the core logic of data normalization and robust error handling.',
      },
      {
        id: 'tradeoffs',
        title: 'Trade-offs',
        content:
          'I chose to implement a custom Shadow DOM wrapper for the extension’s UI components to prevent the host website’s CSS from bleeding into our interface. While this increased initial development complexity, it was a necessary trade-off to guarantee a premium and consistent brand experience on every site from Amazon to local Shopify stores. Additionally, I opted for Client-Side Rendering (CSR) for the reservation flow to prioritize the "app-like" feel of selecting and confirming gifts over traditional SSR SEO benefits.',
      },
      {
        id: 'impact',
        title: 'Impact',
        content:
          'From a product perspective, the guest experience is the most critical conversion point for a successful registry. We identified that guest sign-ups are a major drop-off factor, so I engineered a "zero-friction" reservation system using unique signed tokens. This allows friends and family to claim gifts instantly via a single click, while the backend maintains a strict "lock" on the item to prevent duplicate gift scenarios.',
      },
    ],
  },
];
