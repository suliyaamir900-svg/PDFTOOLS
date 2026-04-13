import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-10">
      <Helmet>
        <title>Privacy Policy - Lumina</title>
        <meta name="description" content="Read our privacy policy to understand how Lumina protects your data and ensures your privacy." />
      </Helmet>

      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-zinc-500">Last updated: April 2024</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
        <p>
          At Lumina, your privacy is our top priority. This Privacy Policy outlines the types of information 
          we collect, how it is used, and the steps we take to ensure your personal data remains secure.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Local Processing (No Data Uploads)</h2>
        <p>
          The vast majority of the tools provided on Lumina (including image converters, PDF tools, text formatters, 
          and calculators) operate <strong>entirely within your web browser</strong>. 
        </p>
        <p>
          This means that when you process a file or enter text, the data is processed locally on your device. 
          <strong>We do not upload, store, or save your files, images, or text on our servers.</strong> Once you 
          close your browser or refresh the page, the data is gone.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Information We Collect</h2>
        <p>
          Because our tools run locally, we collect very little information about you. However, to maintain and 
          improve our website, we may collect:
        </p>
        <ul>
          <li><strong>Analytics Data:</strong> We may use basic analytics tools to understand website traffic, 
          popular tools, and user demographics. This data is aggregated and anonymized.</li>
          <li><strong>Cookies:</strong> We may use cookies to save your preferences (such as Dark/Light mode) 
          to provide a better user experience.</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Third-Party Services</h2>
        <p>
          We may use third-party services (such as Google Analytics or advertising networks) that may collect 
          information about your visits to this and other websites in order to provide relevant advertisements 
          or analytics. These third parties have their own privacy policies.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
          new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:{' '}
          <a href="mailto:usamasuliya1@gmail.com" className="text-primary font-bold hover:underline">
            usamasuliya1@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}
