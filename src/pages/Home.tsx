import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES, TOOLS } from '@/src/data/tools';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const trendingTools = TOOLS.filter(t => t.trending).slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      <Helmet>
        <title>Lumina - 100+ Free Online Tools | Fast, Secure & Private</title>
        <meta name="description" content="Access 100+ free online tools for PDF, Images, Text, Calculators and more. Fast, secure, and private. No signup required." />
        <meta name="keywords" content="online tools, free tools, pdf tools, image converter, word counter, calculator, password generator, lumina tools" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Lumina",
            "url": "https://lumina.tools",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://lumina.tools/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-primary font-bold bg-primary/10 border-none">
            <Sparkles className="w-4 h-4 mr-2" /> 100+ Free Online Tools
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Simple tools for <br />
            <span className="text-primary">everyday tasks.</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Fast, secure, and private online tools. No registration required. 
            All processing happens directly in your browser.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/category/calculator">
              <Button size="lg" className="h-14 px-8 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Explore Calculators
              </Button>
            </Link>
            <Link to="/category/pdf">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg font-bold border-zinc-200 dark:border-zinc-800">
                PDF Tools
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
            <p className="text-zinc-500">Find the right tool for your needs</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/category/${cat.id}`}>
                <div className="group p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5">
                  <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{cat.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Tools */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Trending Tools</h2>
            <p className="text-zinc-500">Most used tools by our community</p>
          </div>
          <Link to="/category/pdf">
            <Button variant="ghost" className="font-bold text-primary">View All <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={tool.path}>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:bg-white dark:hover:bg-zinc-900 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center shadow-sm">
                      <tool.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">Popular</Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{tool.name}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-2">{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        {[
          { icon: Zap, title: "Lightning Fast", desc: "Tools process data instantly in your browser." },
          { icon: Shield, title: "100% Private", desc: "Your files never leave your device. Secure by design." },
          { icon: Globe, title: "Global Accessibility", desc: "A comprehensive collection of utilities for every task." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* SEO Content Section */}
      <section className="pt-20">
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-12 md:p-16 border border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">Free Online Tools for Everyone</h2>
            <div className="space-y-6 text-lg text-zinc-500 leading-relaxed">
              <p>
                Lumina provides over 100 free online tools designed to simplify your digital workflow. 
                From PDF conversion to image compression and text analysis, we offer high-quality 
                utilities that are fast, secure, and completely free.
              </p>
              <p>
                We prioritize your privacy. Unlike other platforms, Lumina processes all data 
                locally in your browser. Your sensitive files and information never reach our servers, 
                ensuring total security and peace of mind.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="space-y-1">
                <div className="text-4xl font-bold text-primary">100+</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Tools</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-primary">100%</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Private</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-primary">0</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Cost</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
