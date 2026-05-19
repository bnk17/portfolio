import { RouteObject, Outlet } from 'react-router-dom';
import { Home } from './pages/Home';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import { useParams } from 'react-router-dom';
import Layout from './components/ui/Layout';
import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Helper component to bridge the URL parameter to the ProjectDetail prop
 */
function ProjectDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return <ProjectDetail slug={id} />;
}

const Root = () => (
  <LazyMotion features={domAnimation} strict>
    <Layout>
      <Outlet />
    </Layout>
  </LazyMotion>
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
