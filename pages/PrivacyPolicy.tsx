
import React from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pb-24">
      <div className="bg-[#002147] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black mb-6 italic tracking-tighter">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed font-medium">
            Your privacy is paramount to SUPARCO. We are committed to protecting your personal data and transparency in how we handle information.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <Eye className="w-8 h-8 text-emerald-500" />
              <h2 className="text-3xl font-black text-[#002147] dark:text-white tracking-tight">Information Collection</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-6">
              SUPARCO collects information strictly necessary to provide our digital services, mission updates, and research portals. This includes technical data like IP addresses for security and analytics, and personal data provided via contact forms or newsletter sign-ups.
            </p>
            <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 space-y-3 ml-4">
              <li>Name and contact details for career applications</li>
              <li>Usage data for website optimization</li>
              <li>Feedback and support ticket information</li>
            </ul>
          </section>

          <section className="bg-emerald-50 dark:bg-emerald-950/20 p-10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-500/10">
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <Lock className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl font-black text-[#002147] dark:text-white tracking-tight">Data Security</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We implement robust agency-grade security protocols to protect your data from unauthorized access, alteration, or disclosure. All data transmissions are encrypted using standard SSL/TLS technology.
            </p>
          </section>

          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                <h3 className="text-xl font-bold text-[#002147] dark:text-white mb-4">Cookies</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  We use essential cookies to maintain site functionality and preference settings. Third-party analytics cookies help us understand user behavior to improve our educational content.
                </p>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                <h3 className="text-xl font-bold text-[#002147] dark:text-white mb-4">Third-Party Disclosure</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  SUPARCO does not sell or trade your personal information. Data may only be shared with authorized government partners in compliance with national security laws.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center py-10">
            <p className="text-sm text-gray-400 italic">
              Last updated: October 2024. SUPARCO reserves the right to update this policy as digital standards evolve.
            </p>
            <button className="mt-8 px-10 py-4 bg-[#002147] dark:bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:opacity-90 transition-all">
              Download PDF Version
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
