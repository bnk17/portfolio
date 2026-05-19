import { useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from './components/ui/Layout';
import { routes } from './routes';

export default function App() {
  const element = useRoutes(routes);
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <Layout>
          {element}
        </Layout>
      </LazyMotion>
    </HelmetProvider>
  );
}
