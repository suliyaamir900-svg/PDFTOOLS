import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CATEGORIES, TOOLS } from '@/src/data/tools';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'motion/react';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = CATEGORIES.find(c => c.id === categoryId);
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!category) {
    return (
      <div className="text-center py-32 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Category Not Found</h1>
        <p className="text-zinc-500">The category you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const categoryTools = TOOLS.filter(t => t.category === categoryId);
  const filteredTools = categoryTools.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <Helmet>
        <title>{category.name} - Free Online Tools | Lumina</title>
        <meta name="description" content={category.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": category.name,
            "description": category.description,
            "url": `https://lumina.tools/category/${category.id}`,
            "hasPart": categoryTools.map(t => ({
              "@type": "SoftwareApplication",
              "name": t.name,
              "url": `https://lumina.tools${t.path}`
            }))
          })}
        </script>
      </Helmet>

      {/* Category Header */}
      <div className="text-center max-w-4xl mx-auto space-y-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto"
        >
          <category.icon className="w-8 h-8" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">{category.description}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <Input 
          placeholder={`Search ${category.name} tools...`} 
          className="h-12 pl-12 pr-4 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={tool.path}>
                <div className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-primary transition-all hover:shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    {tool.trending && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest">Trending</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{tool.name}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{tool.description}</p>
                  </div>

                  <div className="flex items-center text-xs font-bold gap-2 text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">No tools found matching "{searchQuery}"</p>
            <Button variant="link" onClick={() => setSearchQuery('')} className="text-primary font-bold">Clear Search</Button>
          </div>
        )}
      </div>
    </div>
  );
}
