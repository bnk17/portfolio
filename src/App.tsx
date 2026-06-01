import { useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import { routes } from './routes';

export default function App() {
  const element = useRoutes(routes);
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <div className="min-h-screen bg-zinc-50/50">
          {element}
        </div>
      </LazyMotion>
    </HelmetProvider>
  );
}
