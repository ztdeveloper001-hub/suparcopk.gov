
import React, { useState, useMemo } from 'react';
import { Mission } from '../types';
import { Info, ExternalLink, Filter, Satellite, Zap, Globe, ShieldCheck, Activity, Target, Radio, Calendar, ArrowUpRight, ChevronRight } from 'lucide-react';
import MissionTimeline from '../components/MissionTimeline';
import ShareButton from '../components/ShareButton';

const Missions: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const missions: Mission[] = [
    {
      id: 'prss-1',
      name: 'PRSS-1',
      status: 'Active',
      launchDate: 'July 9, 2018',
      category: 'Earth Observation',
      description: 'Pakistan Remote Sensing Satellite-1 provides high-resolution imagery for land use, agricultural monitoring, and disaster mitigation.',
      image: 'public\HD-image.jpg'
    },
    {
      id: 'paksat-1r',
      name: 'PakSat-1R',
      status: 'Active',
      launchDate: 'August 11, 2011',
      category: 'Communications',
      description: 'PakSat-1R replaced PakSat-1, offering improved range for satellite communications, TV broadcasting, and internet connectivity.',
      image: 'public\paksat-1R-featured.jpg'
    },
    {
      id: 'paktes-1a',
      name: 'PakTES-1A',
      status: 'Active',
      launchDate: 'July 9, 2018',
      category: 'Scientific',
      description: 'Pakistan Technology Evaluation Satellite-1A is used to test and validate domestic satellite subsystems in orbit.',
      image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=1200'
    },
    {
        id: 'badr-1',
        name: 'Badr-1',
        status: 'Decommissioned',
        launchDate: 'July 16, 1990',
        category: 'Scientific',
        description: "Pakistan's first indigenous satellite, signaling the country's entry into space exploration history.",
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const filteredMissions = useMemo(() => {
    if (activeFilter === 'All') return missions;
    if (activeFilter === 'Archive') return missions.filter(m => m.status === 'Decommissioned');
    return missions.filter(m => m.status === activeFilter);
  }, [activeFilter, missions]);

  const filterOptions = ['All', 'Active', 'Planned', 'Archive'];

  return (
    <div className="bg-white dark:bg-slate-950 pb-20 animate-in fade-in duration-1000">
      {/* Page Header - NASA style immersive */}
      <div className="bg-[#002147] text-white py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
          <div className="w-full h-full suparco-gradient opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 space-x-reverse mb-8">
               <div className="p-4 bg-emerald-500/20 rounded-[1.5rem] border border-emerald-500/30">
                  <Target className="w-10 h-10 text-emerald-400" />
               </div>
               <div>
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 mb-1">Mission Control</h2>
                  <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Orbital Fleet Management</p>
               </div>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-8 leading-none uppercase">Orbital <br /> <span className="text-emerald-500">Missions</span></h1>
            
            <p className="text-xl md:text-3xl text-gray-300 leading-relaxed font-medium max-w-3xl">
              From pioneering the Badr series to the advanced PRSS-1 optical systems, explore the technology serving Pakistan from the final frontier.
            </p>
          </div>
        </div>
      </div>

      {/* Modern sticky filter bar */}
      <div className="sticky top-[104px] z-[60] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10">
            {filterOptions.map((f) => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === f 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20' 
                  : 'text-gray-500 hover:text-[#002147] dark:hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#002147] dark:text-emerald-500 opacity-60">
            Link State: Synchronized • {filteredMissions.length} Assets Found
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {filteredMissions.map((mission) => (
            <div key={mission.id} className="group bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-2xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 animate-in slide-in-from-bottom duration-700">
              <div className="relative h-96 overflow-hidden">
                <img src={mission.image} alt={mission.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent"></div>
                <div className={`absolute top-8 right-8 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md ${
                  mission.status === 'Active' ? 'bg-emerald-600/90 text-white' : 'bg-gray-800/90 text-white'
                }`}>
                  {mission.status}
                </div>
                
                <div className="absolute bottom-8 left-8">
                   <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{mission.category}</span>
                   <h2 className="text-5xl font-black text-white tracking-tighter italic leading-none">{mission.name}</h2>
                </div>
              </div>
              
              <div className="p-12">
                <div className="grid grid-cols-2 gap-10 mb-10 pb-10 border-b border-gray-100 dark:border-white/5">
                   <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 flex items-center">
                       <Calendar className="w-3 h-3 mr-2" /> Deployment Date
                    </p>
                    <p className="text-xl font-black italic text-[#002147] dark:text-white leading-none">{mission.launchDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 flex items-center">
                       <Activity className="w-3 h-3 mr-2" /> Mission Status
                    </p>
                    <p className="text-xl font-black italic text-emerald-600 dark:text-emerald-400 leading-none uppercase">{mission.status}</p>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-12 leading-relaxed font-medium text-lg">
                  {mission.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-5 bg-[#002147] dark:bg-emerald-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
                    <Info className="w-5 h-5 mr-3" /> Detailed Mission Logs
                  </button>
                  <div className="flex space-x-4 space-x-reverse">
                    <ShareButton 
                        title={`Mission: ${mission.name}`} 
                        text={`Check out ${mission.name} on the official SUPARCO portal.`}
                        className="p-5 bg-gray-50 dark:bg-white/5 text-[#002147] dark:text-white rounded-[1.5rem] border border-gray-100 dark:border-white/10 hover:bg-gray-100 transition-colors"
                    />
                    <button className="p-5 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white rounded-[1.5rem] font-bold flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-gray-100 dark:border-white/10">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Timeline Integration */}
        <div className="mt-40">
           <div className="flex flex-col items-center text-center mb-20">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 mb-6">Heritage Stream</h2>
              <h3 className="text-5xl md:text-8xl font-black text-[#002147] dark:text-white tracking-tighter italic">Mission Chronology</h3>
           </div>
           <MissionTimeline />
        </div>

        {/* Future Vision - Advanced styling */}
        <div className="mt-40 bg-[#002147] rounded-[4rem] p-12 md:p-32 text-white relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          
          <div className="relative z-10">
            <div className="max-w-4xl mb-24">
              <div className="flex items-center space-x-3 space-x-reverse mb-8">
                 <Radio className="w-8 h-8 text-emerald-400 animate-pulse" />
                 <h3 className="text-emerald-400 font-black uppercase tracking-[0.5em] text-xs">Strategic Roadmap 2047</h3>
              </div>
              <h4 className="text-6xl md:text-9xl font-black mb-10 italic tracking-tighter leading-none">Pakistan’s <br /> <span className="text-emerald-500">Lunar Horizon</span></h4>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
                Our roadmap focuses on autonomous orbital platforms, deep-space communication nodes, and the feasibility studies for the first national robotic landing on the Moon.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { year: '2025', title: 'PakSat-MM1', icon: Zap, desc: 'Advancing multi-mission communications for global digital inclusion.' },
                { year: '2027', title: 'PRSS-2 Gen', icon: Satellite, desc: 'Next-generation sub-meter resolution imaging constellation.' },
                { year: '2029', title: 'Lunar Probe', icon: Globe, desc: 'Initial robotic descent pre-feasibility for lunar exploration.' }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 hover:border-emerald-500 transition-all duration-500 hover:scale-105">
                  <div className="flex justify-between items-start mb-10">
                    <p className="text-emerald-400 font-black text-4xl italic leading-none">{item.year}</p>
                    <item.icon className="w-8 h-8 text-emerald-400/50 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h5 className="text-2xl font-black italic tracking-tight mb-4 group-hover:text-emerald-400 transition-colors uppercase">{item.title}</h5>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium mb-8">{item.desc}</p>
                  <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-emerald-500 opacity-0 group-hover:opacity-100 transition-all">
                     View Project Scope <ChevronRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute -bottom-20 -right-20 w-1/2 h-1/2 opacity-5 pointer-events-none">
             <Satellite className="w-full h-full text-white rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
