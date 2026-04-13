import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 pt-10">
      <Helmet>
        <title>About Us - Lumina Free Online Tools</title>
        <meta name="description" content="Learn more about Lumina, our mission, and why we provide 100+ free, secure, and private online tools." />
      </Helmet>

      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Lumina</h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
          Empowering your digital workflow with fast, secure, and free online tools.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
        <p>
          Welcome to <strong>Lumina</strong>, your ultimate destination for over 100+ free online tools. 
          Whether you are a developer, student, designer, or professional, our goal is to provide you with 
          the utilities you need to get your everyday tasks done quickly and efficiently.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Our Mission</h2>
        <p>
          We believe that essential digital tools should be accessible to everyone, everywhere, without 
          hidden costs, intrusive ads, or privacy concerns. That's why we built Lumina—a platform where 
          you can convert, calculate, format, and generate data with zero friction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 not-prose">
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white">Privacy First</h3>
            <p className="text-sm text-zinc-500">All processing happens locally in your browser. We never upload your files to our servers.</p>
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Zap className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white">Lightning Fast</h3>
            <p className="text-sm text-zinc-500">No waiting for uploads or downloads. Get instant results powered by modern web technologies.</p>
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Globe className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white">100% Free</h3>
            <p className="text-sm text-zinc-500">No subscriptions, no paywalls, and no registration required. Just free tools for everyone.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Contact Us</h2>
        <p>
          Have a suggestion for a new tool? Found a bug? Or just want to say hi? 
          We would love to hear from you. You can reach out to us directly via email at{' '}
          <a href="mailto:usamasuliya1@gmail.com" className="text-primary font-bold hover:underline">
            usamasuliya1@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}
