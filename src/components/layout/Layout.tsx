import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Moon, Sun, Mail, Zap, Home as HomeIcon, Grid, BookOpen, ArrowUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { CATEGORIES, TOOLS } from '@/src/data/tools';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDark, setIsDark] = React.useState(false); // Default to light mode
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const filteredTools = searchQuery 
    ? TOOLS.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-300", isDark ? "dark bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900")}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-zinc-900 dark:text-white">Lumina</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            <Link to="/category/calculator" className="hover:text-primary transition-colors">Calculators</Link>
            <Link to="/category/developer" className="hover:text-primary transition-colors">Developer</Link>
            <Link to="/category/image" className="hover:text-primary transition-colors">Images</Link>
            <Link to="/category/pdf" className="hover:text-primary transition-colors">PDF</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col gap-4 text-lg font-medium">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} to={`/category/${cat.id}`} className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                  {cat.name}
                </Link>
              ))}
              <Link to="/blog" className="p-4 border-b border-zinc-100 dark:border-zinc-800">Blog</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-zinc-950/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <Search className="w-5 h-5 text-zinc-400" />
                <Input 
                  autoFocus
                  placeholder="Search 50+ tools..." 
                  className="border-none focus-visible:ring-0 text-lg"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredTools.length > 0 ? (
                  filteredTools.map(tool => (
                    <Link 
                      key={tool.id} 
                      to={tool.path}
                      className="flex items-center gap-4 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-zinc-500">{tool.description}</div>
                      </div>
                    </Link>
                  ))
                ) : searchQuery ? (
                  <div className="p-8 text-center text-zinc-500">No tools found for "{searchQuery}"</div>
                ) : (
                  <div className="p-8 text-center text-zinc-500 italic">Start typing to search tools...</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-around p-2 shadow-lg">
          <Link to="/" className={cn("flex flex-col items-center p-2 rounded-xl transition-colors", location.pathname === '/' ? "text-primary bg-primary/10" : "text-zinc-500")}>
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Home</span>
          </Link>
          <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center p-2 text-zinc-500">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Search</span>
          </button>
          <Link to="/category/calculator" className={cn("flex flex-col items-center p-2 rounded-xl transition-colors", location.pathname.includes('/category') ? "text-primary bg-primary/10" : "text-zinc-500")}>
            <Grid className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Tools</span>
          </Link>
          <Link to="/blog" className={cn("flex flex-col items-center p-2 rounded-xl transition-colors", location.pathname === '/blog' ? "text-primary bg-primary/10" : "text-zinc-500")}>
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Blog</span>
          </Link>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg md:bottom-8"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-zinc-900 dark:text-white">Lumina</span>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Free, fast, and secure online tools for everyday tasks. 
                Privacy focused - all processing happens in your browser.
              </p>
              <div className="flex items-center gap-3">
                <a href="mailto:usamasuliya1@gmail.com">
                  <Button variant="outline" size="icon" className="rounded-lg"><Mail className="w-4 h-4" /></Button>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-sm text-zinc-900 dark:text-white">Tools</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                {CATEGORIES.slice(0, 5).map(cat => (
                  <li key={cat.id}><Link to={`/category/${cat.id}`} className="hover:text-primary transition-colors">{cat.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm text-zinc-900 dark:text-white">Company</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm text-zinc-900 dark:text-white">Newsletter</h4>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Stay updated with our latest tools.</p>
              <div className="flex gap-2">
                <Input placeholder="Email" className="bg-white dark:bg-zinc-900" />
                <Button className="bg-primary hover:bg-primary/90">Join</Button>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Lumina. Simple & Secure Tools.
          </div>
        </div>
      </footer>
    </div>
  );
}
