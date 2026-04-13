import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-10">
      <Helmet>
        <title>Terms of Service - Lumina</title>
        <meta name="description" content="Read the terms of service for using Lumina's free online tools." />
      </Helmet>

      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-zinc-500">Last updated: April 2024</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
        <p>
          By accessing and using Lumina (the "Website"), you accept and agree to be bound by the terms and 
          provision of this agreement.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Use of the Website</h2>
        <p>
          Lumina provides a collection of free online tools. You agree to use these tools only for lawful 
          purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use 
          and enjoyment of the Website.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Disclaimer of Warranties</h2>
        <p>
          The tools and information on this Website are provided "as is" without any representations or 
          warranties, express or implied. Lumina makes no representations or warranties in relation to this 
          Website or the information and materials provided on this Website.
        </p>
        <p>
          While we strive to ensure our tools (such as calculators and converters) are accurate, we cannot 
          guarantee 100% accuracy. You should not rely solely on the results provided by this Website for 
          critical, financial, or medical decisions.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Limitation of Liability</h2>
        <p>
          Lumina will not be liable to you (whether under the law of contact, the law of torts or otherwise) 
          in relation to the contents of, or use of, or otherwise in connection with, this Website for any 
          indirect, special or consequential loss; or for any business losses, loss of revenue, income, 
          profits or anticipated savings, loss of contracts or business relationships, loss of reputation 
          or goodwill, or loss or corruption of information or data.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h2>
        <p>
          Unless otherwise stated, Lumina and/or its licensors own the intellectual property rights in the 
          website and material on the website. All these intellectual property rights are reserved.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">5. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{' '}
          <a href="mailto:usamasuliya1@gmail.com" className="text-primary font-bold hover:underline">
            usamasuliya1@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}
