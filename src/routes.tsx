import { RouteObject, Outlet, useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/ui/Layout';

// Lazy load page components
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

/**
 * Helper component to bridge the URL parameter to the ProjectDetail prop
 */
function ProjectDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return <ProjectDetail slug={id} />;
}

const Loading = () => (
  <div className="flex h-screen items-center justify-center bg-white">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-800" />
  </div>
);

const Root = () => (
  <Layout>
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </Layout>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'project/:id',
        element: <ProjectDetailWrapper />,
      },
      {
        path: '*',
        element: (
          <div className="flex h-screen items-center justify-center">
            Page Not Found
          </div>
        ),
      },
    ],
  },
];
