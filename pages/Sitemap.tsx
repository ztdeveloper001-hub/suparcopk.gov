
import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ChevronRight } from 'lucide-react';

const Sitemap: React.FC = () => {
  const sections = [
    {
      title: 'Main Exploration',
      links: [
        { name: 'Home Portal', path: '/' },
        { name: 'Mission Log', path: '/missions' },
        { name: 'Science & Research', path: '/science' },
        { name: 'Press Center', path: '/news' },
        { name: 'Multimedia Hub', path: '/multimedia' },
      ]
    },
    {
      title: 'Streaming & Features',
      links: [
        { name: 'SUPARCO+', path: '/plus' },
        { name: 'Satellite Tracker', path: '/' },
        { name: 'Orbital Dashboard', path: '/missions' },
      ]
    },
    {
      title: 'Agency Information',
      links: [
        { name: 'About SUPARCO', path: '/about' },
        { name: 'Careers & Internships', path: '/careers' },
        { name: 'Contact Command', path: '/contact' },
        { name: 'Privacy & Security', path: '/privacy' },
        { name: 'Terms of Use', path: '/terms' },
      ]
    }
  ];

  return (
    <div className="pb-24">
      <div className="bg-[#002147] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <Map className="w-8 h-8 text-emerald-400" />
            <h1 className="text-5xl font-black italic tracking-tighter">Sitemap</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl font-medium">
            Complete architectural overview of the SUPARCO digital network.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-xl">
              <h2 className="text-2xl font-black text-[#002147] dark:text-emerald-400 mb-8 border-b border-gray-100 dark:border-white/5 pb-4 tracking-tight">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
