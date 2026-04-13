import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    slug: 'compress-images-without-losing-quality',
    title: 'How to Compress Images Without Losing Quality',
    content: `
      <p>Images are the largest assets on most websites. Compressing them is crucial for fast load times and good SEO.</p>
      <h2>Why Compress Images?</h2>
      <p>Large images slow down your website, which frustrates users and hurts your search engine rankings. By compressing images, you can reduce file sizes by up to 80% without a noticeable drop in quality.</p>
      <h2>How Our Tool Works</h2>
      <p>Our browser-based image compressor uses advanced algorithms to remove unnecessary data from your images. Because it runs locally in your browser, your files are never uploaded to a server, ensuring complete privacy and lightning-fast speeds.</p>
      <h2>Best Practices</h2>
      <ul>
        <li>Use WebP for web graphics.</li>
        <li>Keep JPEGs for photographs.</li>
        <li>Always compress before uploading to your CMS.</li>
      </ul>
    `,
    category: 'Tutorials',
    date: 'April 10, 2024',
    author: 'OmniTeam',
    image: 'https://picsum.photos/seed/compress/1200/600'
  },
  {
    id: 2,
    slug: 'importance-of-strong-passwords-2024',
    title: 'The Importance of Strong Passwords in 2024',
    content: `
      <p>With cyber threats evolving daily, a strong password is your first line of defense.</p>
      <h2>What Makes a Password Strong?</h2>
      <p>A strong password should be at least 12 characters long, include a mix of uppercase and lowercase letters, numbers, and special characters. Avoid using easily guessable information like birthdays or pet names.</p>
      <h2>Use a Password Generator</h2>
      <p>Instead of trying to come up with complex passwords yourself, use a secure password generator. Our tool creates cryptographically secure passwords instantly, right in your browser.</p>
    `,
    category: 'Security',
    date: 'April 8, 2024',
    author: 'OmniTeam',
    image: 'https://picsum.photos/seed/security/1200/600'
  },
  {
    id: 3,
    slug: 'top-10-developer-tools',
    title: 'Top 10 Developer Tools for Maximum Productivity',
    content: `
      <p>Every developer needs a solid toolkit. Here are the top tools you should be using to speed up your workflow.</p>
      <h2>1. JSON Formatter</h2>
      <p>Reading minified JSON is a nightmare. A good formatter makes it human-readable instantly.</p>
      <h2>2. Base64 Encoder/Decoder</h2>
      <p>Essential for working with data URIs and basic authentication headers.</p>
      <h2>3. URL Encoder</h2>
      <p>Never guess which characters need encoding again. Use a tool to ensure your URLs are perfectly formatted.</p>
      <p>Explore our Developer Tools category to find all these and more, completely free and running locally in your browser.</p>
    `,
    category: 'Productivity',
    date: 'April 5, 2024',
    author: 'OmniTeam',
    image: 'https://picsum.photos/seed/dev/1200/600'
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-32 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Post Not Found</h1>
        <p className="text-zinc-500">The article you're looking for doesn't exist.</p>
        <Link to="/blog" className="inline-block">
          <Button variant="outline">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 pb-20">
      <Helmet>
        <title>{post.title} - Lumina Blog</title>
        <meta name="description" content={post.title} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.image,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
            "datePublished": new Date(post.date).toISOString()
          })}
        </script>
      </Helmet>

      <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
          <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {post.category}</span>
          <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
      </div>

      <div className="aspect-video overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
