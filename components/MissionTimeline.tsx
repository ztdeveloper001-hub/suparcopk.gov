
import React from 'react';
import { Rocket, Satellite, Globe, Flag } from 'lucide-react';

const events = [
  { year: '1961', title: 'Agency Foundation', icon: Flag, desc: 'SUPARCO established by Nobel Laureate Dr. Abdus Salam.' },
  { year: '1962', event: 'Rehbar-I', icon: Rocket, desc: 'First sounding rocket launch in South Asia.' },
  { year: '1990', title: 'Badr-1', icon: Satellite, desc: "Pakistan's first indigenous satellite successfully launched." },
  { year: '2011', title: 'PakSat-1R', icon: Globe, desc: 'Communication satellite launched to enhance national broadcast reach.' },
  { year: '2018', title: 'PRSS-1', icon: Satellite, desc: 'Remote Sensing Satellite launched for Earth observation.' },
  { year: '2024', title: 'Lunar Horizon', icon: Rocket, desc: 'Future robotic lunar mission planning phase initiated.' }
];

const MissionTimeline: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-[#002147] mb-12 text-center italic">The Cosmic Journey</h2>
        <div className="relative">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[#002147]/10 -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {events.map((ev, i) => (
              <div key={i} className="relative group flex flex-col items-center text-center">
                <div className="mb-4 z-10 w-12 h-12 rounded-full bg-white border-4 border-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <ev.icon className="w-6 h-6" />
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                  <div className="text-emerald-600 font-black text-xl mb-1">{ev.year}</div>
                  <h3 className="font-bold text-[#002147] mb-2">{ev.title || ev.event}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionTimeline;
