
import React from 'react';

const NewsTicker: React.FC = () => {
  const headlines = [
    "PRSS-1 completes 5 years of successful operations in orbit.",
    "SUPARCO announces upcoming launch window for PakSat-MM1.",
    "New Earth Observation data portal for agriculture now live.",
    "National Space Week 2024 registrations are now open for students.",
    "Research paper on atmospheric monitoring in Indus Basin published."
  ];

  return (
    <div className="bg-emerald-900/10 border-b border-emerald-500/20 py-1.5 overflow-hidden whitespace-nowrap">
      <div className="container mx-auto px-4 flex items-center">
        <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded mr-4 z-10 shrink-0">Latest Update</span>
        <div className="animate-marquee inline-block">
          {headlines.map((text, i) => (
            <span key={i} className="text-xs font-bold text-[#002147] mx-8 inline-block">
              {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {headlines.map((text, i) => (
            <span key={`dup-${i}`} className="text-xs font-bold text-[#002147] mx-8 inline-block">
              {text}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
