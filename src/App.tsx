import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/src/components/layout/Layout';
import Home from '@/src/pages/Home';
import CategoryPage from '@/src/pages/Category';
import ToolDetail from '@/src/pages/ToolDetail';
import Blog from '@/src/pages/Blog';
import BlogPost from '@/src/pages/BlogPost';
import About from '@/src/pages/About';
import Privacy from '@/src/pages/Privacy';
import Terms from '@/src/pages/Terms';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/tools/:toolId" element={<ToolDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
