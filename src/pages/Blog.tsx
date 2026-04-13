import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    slug: 'compress-images-without-losing-quality',
    title: 'How to Compress Images Without Losing Quality',
    excerpt: 'Learn the best practices for image compression and how our browser-based tool can help you save space while maintaining clarity.',
    category: 'Tutorials',
    date: 'April 10, 2024',
    author: 'OmniTeam',
    image: 'https://picsum.photos/seed/compress/800/400'
  },
  {
    id: 2,
    slug: 'importance-of-strong-passwords-2024',
    title: 'The Importance of Strong Passwords in 2024',
    excerpt: 'Cybersecurity is more important than ever. Discover why you should use a password generator and how to manage your digital security.',
    category: 'Security',
    date: 'April 8, 2024',
    author: 'OmniTeam',
    image: 'https://picsum.photos/seed/security/800/400'
  },
  {
    id: 3,
    slug: 'top-10-developer-tools',
    title: 'Top 10 Developer Tools for Maximum Productivity',
    excerpt: 'From JSON formatting to URL encoding, these tools are essential for every developer workflow. Boost your efficiency today.',
    category: 'Productivity',
    date: 'April 5, 2024',
    author: 'OmniTeam',
    image: 'https://picsum.photos/seed/dev/800/400'
  }
];

export default function Blog() {
  return (
    <div className="space-y-12 pb-20">
      <Helmet>
        <title>Blog & Tutorials - Lumina</title>
        <meta name="description" content="Read the latest articles, tutorials, and tips on how to use our free online tools effectively." />
      </Helmet>

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog & Tutorials</h1>
        <p className="text-lg text-zinc-500">Insights, tips, and guides to help you work smarter.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-md transition-all block">
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {post.category}</span>
              </div>
              <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center font-bold text-primary text-sm">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
