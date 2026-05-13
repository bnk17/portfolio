import { Routes, Route, useParams } from 'react-router-dom';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Layout from './components/ui/Layout';
import { Home } from './pages/Home';

/**
 * Helper component to bridge the URL parameter to the ProjectDetail prop
 */
function ProjectDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return <ProjectDetail slug={id} />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* 
          Fixed: Added the '/' before the colon. 
          The ':id' acts as a dynamic placeholder for your project slugs 
          (e.g., /project/lumina-analytics)
        */}
        <Route path="/project/:id" element={<ProjectDetailWrapper />} />

        {/* Optional: 404 Catch-all */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}
