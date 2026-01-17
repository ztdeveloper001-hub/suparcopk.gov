
import React from 'react';
import { FileText, Scale, Info, AlertTriangle } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="pb-24">
      <div className="bg-[#002147] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black mb-6 italic tracking-tighter">Terms of Use</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed font-medium">
            Governing guidelines for accessing SUPARCO digital infrastructure and intellectual property.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <Scale className="w-8 h-8 text-emerald-500" />
              <h2 className="text-3xl font-black text-[#002147] dark:text-white tracking-tight">Governing Law</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Access to and use of this website are subject to the laws of the Islamic Republic of Pakistan. Any legal disputes arising from website usage shall be adjudicated within the jurisdiction of Pakistani courts.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Info className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-bold text-[#002147] dark:text-white">Intellectual Property</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                All mission data, imagery, satellite telemetry, and research papers published here are the property of SUPARCO. Use for educational purposes is permitted with attribution, while commercial use requires explicit written consent.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <AlertTriangle className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-bold text-[#002147] dark:text-white">Prohibited Use</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Users are prohibited from attempting to compromise agency security, reverse-engineering satellite tracking data for unauthorized purposes, or using the SUPARCO logo to misrepresent official communications.
              </p>
            </div>
          </section>

          <section className="bg-emerald-50 dark:bg-emerald-950/20 p-10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-500/10">
            <h2 className="text-2xl font-black text-[#002147] dark:text-white mb-6">Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              While SUPARCO strives for the highest accuracy in real-time satellite tracking and research data, we do not warrant that all digital services will be error-free or uninterrupted. Orbital data is subject to atmospheric variations and technical maintenance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
