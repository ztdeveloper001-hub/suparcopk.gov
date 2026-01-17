
import React, { useState, useMemo } from 'react';
import { History, Satellite, Rocket, Award, Search, Database, ArrowUpRight, Filter, ChevronRight, CheckCircle2, X, Info, Zap, Globe, ShieldCheck, Cpu } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface MissionLogItem {
  id: string;
  name: string;
  year: number;
  status: 'Success' | 'Partial' | 'Failure';
  cat: string;
  era: 'pioneer' | 'indigenous' | 'modern';
  vehicle: string;
  orbit: string;
  desc: string;
}

const MissionHistory: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMission, setSelectedMission] = useState<MissionLogItem | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');

  const eras = [
    { id: 'pioneer', title: 'The Pioneers', years: '1960 - 1980', description: 'Early atmospheric research and sounding rocket foundation.' },
    { id: 'indigenous', title: 'Badr Generation', years: '1990 - 2005', description: 'The first domestically designed and built satellites.' },
    { id: 'modern', title: 'Modern Fleet', years: '2010 - Present', description: 'High-resolution imaging and communications infrastructure.' }
  ];

  const missionLog: MissionLogItem[] = [
    { id: 'BAD-1', name: 'Badr-1', year: 1990, status: 'Success', cat: 'Scientific', era: 'indigenous', vehicle: 'Long March 2E', orbit: 'LEO', desc: "Pakistan's first indigenous satellite mission, marking a historic milestone in South Asian space exploration." },
    { id: 'REH-1', name: 'Rehbar-I', year: 1962, status: 'Success', cat: 'Rocketry', era: 'pioneer', vehicle: 'Nike-Cajun', orbit: 'Sub-orbital', desc: "The first sounding rocket launch, making Pakistan the 10th country in the world to launch a rocket." },
    { id: 'PAK-1', name: 'PakSat-1', year: 2002, status: 'Success', cat: 'Comms', era: 'indigenous', vehicle: 'HGS-3 (Acquired)', orbit: 'GEO', desc: "A strategic acquisition to provide digital broadcasting and telecommunication services across the region." },
    { id: 'PRS-1', name: 'PRSS-1', year: 2018, status: 'Success', cat: 'Remote Sensing', era: 'modern', vehicle: 'LM-2C', orbit: 'SSO', desc: "Pakistan Remote Sensing Satellite-1 provides high-resolution optical imagery for resource mapping and climate monitoring." },
    { id: 'TES-1', name: 'PakTES-1A', year: 2018, status: 'Success', cat: 'Scientific', era: 'modern', vehicle: 'LM-2C', orbit: 'SSO', desc: "A technology evaluation satellite built indigenously to test sensors and satellite control systems." },
    { id: 'BAD-B', name: 'Badr-B', year: 2001, status: 'Success', cat: 'Scientific', era: 'indigenous', vehicle: 'Zenit-2', orbit: 'LEO', desc: "Advanced Earth observation and scientific payload testing platform." }
  ];

  const filteredMissions = useMemo(() => {
    return missionLog.filter(m => {
      const matchesEra = selectedEra === 'All' || m.era === selectedEra;
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            m.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEra && matchesSearch;
    });
  }, [selectedEra, searchQuery]);

  const fetchAiInsight = async (missionName: string) => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a 1-sentence strategic significance of the SUPARCO mission "${missionName}" for Pakistan's national development.`,
      });
      setAiInsight(response.text || '');
    } catch (e) {
      setAiInsight('Intelligence currently unavailable.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleOpenMission = (mission: MissionLogItem) => {
    setSelectedMission(mission);
    setAiInsight('');
    fetchAiInsight(mission.name);
  };

  return (
    <div className="bg-white dark:bg-slate-950 pb-32">
      {/* Archive Header */}
      <div className="bg-gray-50 dark:bg-slate-900 pt-24 pb-32 border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <History className="w-8 h-8 text-emerald-600" />
                <h1 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-600">The Cosmic Archive</h1>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-[#002147] dark:text-white tracking-tighter italic leading-none mb-8">
                Decades of <br /> Discovery
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                Tracing the trajectory of Pakistan's space program from the first sounding rockets to a modern multi-satellite constellation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full lg:w-auto">
              {[
                { label: 'Successes', val: '42', icon: Award },
                { label: 'Active Fleet', val: '05', icon: Satellite },
                { label: 'Launch Events', val: '150+', icon: Rocket },
                { label: 'Years of Op', val: '63', icon: History },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-3 text-emerald-500" />
                  <p className="text-3xl font-black italic leading-none mb-1 text-[#002147] dark:text-white">{stat.val}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        {/* Era Navigation - Improved with Interactive Filtering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {eras.map((era) => (
            <div 
              key={era.id} 
              onClick={() => setSelectedEra(selectedEra === era.id ? 'All' : era.id)}
              className={`group p-10 rounded-[3rem] border transition-all cursor-pointer relative overflow-hidden ${
                selectedEra === era.id 
                ? 'bg-[#002147] border-emerald-500 shadow-2xl shadow-emerald-500/20 scale-105' 
                : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-white/5 hover:border-emerald-500/50'
              }`}
            >
              <div className={`text-xs font-black uppercase tracking-widest mb-4 ${selectedEra === era.id ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {era.years}
              </div>
              <h3 className={`text-3xl font-black mb-4 italic tracking-tight ${selectedEra === era.id ? 'text-white' : 'text-[#002147] dark:text-white'}`}>
                {era.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-8 ${selectedEra === era.id ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                {era.description}
              </p>
              <div className={`flex items-center text-xs font-black uppercase tracking-widest ${
                selectedEra === era.id ? 'text-emerald-400' : 'text-[#002147] dark:text-white'
              }`}>
                {selectedEra === era.id ? 'Currently Exploring' : 'Explore Era'} 
                <ChevronRight className={`ml-2 w-4 h-4 transition-transform ${selectedEra === era.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Mission Database */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h3 className="text-4xl font-black text-[#002147] dark:text-white italic tracking-tight">Mission Log Database</h3>
              {selectedEra !== 'All' && (
                <button 
                  onClick={() => setSelectedEra('All')}
                  className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Clear Filter ×
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4 space-x-reverse bg-gray-50 dark:bg-white/5 p-2 rounded-2xl border border-gray-100 dark:border-white/10 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name or ID..."
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-sm outline-none font-bold text-[#002147] dark:text-white"
                />
              </div>
              <button className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <th className="px-10 py-6">Mission ID</th>
                  <th className="px-10 py-6">Name</th>
                  <th className="px-10 py-6">Vehicle</th>
                  <th className="px-10 py-6">Orbit</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {filteredMissions.map((log) => (
                  <tr key={log.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-10 py-8 font-black text-emerald-600 text-sm italic">{log.id}</td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="font-black text-[#002147] dark:text-white text-lg">{log.name}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{log.year}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 font-bold text-gray-500 dark:text-gray-400">{log.vehicle}</td>
                    <td className="px-10 py-8">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {log.orbit}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center text-emerald-500 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> {log.status}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => handleOpenMission(log)}
                        className="px-6 py-3 bg-gray-100 dark:bg-white/5 rounded-xl font-black text-[10px] uppercase tracking-widest text-[#002147] dark:text-white group-hover:bg-[#002147] group-hover:text-white transition-all flex items-center justify-center ml-auto"
                      >
                        Full Access <ArrowUpRight className="ml-2 w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mission Full Access intelligence Modal */}
      {selectedMission && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedMission(null)} />
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-300 border border-white/10">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-10 py-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-4 bg-emerald-500/10 rounded-2xl">
                  <Satellite className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-[#002147] dark:text-white tracking-tighter italic leading-none">{selectedMission.name}</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Mission Intelligence Report</p>
                </div>
              </div>
              <button onClick={() => setSelectedMission(null)} className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl hover:bg-gray-200 transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left: Narrative & AI Insight */}
                <div className="lg:col-span-2 space-y-12">
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-6 flex items-center">
                      <Info className="w-4 h-4 mr-2" /> Mission Briefing
                    </h4>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                      {selectedMission.desc}
                    </p>
                  </section>

                  <section className="bg-slate-50 dark:bg-white/5 p-10 rounded-[3rem] border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Cpu className="w-24 h-24" />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-6 flex items-center">
                      <Zap className="w-4 h-4 mr-2" /> Strategic AI Insights
                    </h4>
                    {isAiLoading ? (
                      <div className="flex items-center space-x-3 text-emerald-500 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>Querying Agency Database...</span>
                      </div>
                    ) : (
                      <p className="text-lg font-black italic text-[#002147] dark:text-white leading-relaxed">
                        "{aiInsight || 'No recent strategic updates available.'}"
                      </p>
                    )}
                  </section>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 group relative">
                       <img src="https://picsum.photos/id/10/800/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Tech" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                       <span className="absolute bottom-4 left-6 text-[10px] font-black text-white uppercase tracking-widest">Hardware Integration</span>
                    </div>
                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 group relative">
                       <img src="https://picsum.photos/id/20/800/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Control" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                       <span className="absolute bottom-4 left-6 text-[10px] font-black text-white uppercase tracking-widest">Ground Control Feed</span>
                    </div>
                  </div>
                </div>

                {/* Right: Technical Specs Dashboard */}
                <div className="space-y-6">
                  <div className="bg-[#002147] p-8 rounded-[3rem] text-white shadow-2xl">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-8 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2" /> Technical Payload
                    </h5>
                    <div className="space-y-8">
                      <div>
                        <p className="text-[9px] font-bold text-white/40 uppercase mb-1">Launch Vehicle</p>
                        <p className="text-lg font-black italic">{selectedMission.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-white/40 uppercase mb-1">Target Orbit</p>
                        <p className="text-lg font-black italic">{selectedMission.orbit}</p>
                      </div>
                      <div className="pt-6 border-t border-white/10">
                        <p className="text-[9px] font-bold text-white/40 uppercase mb-4">Signal Status</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold">Telemetry Health</span>
                          <span className="text-emerald-400 text-xs font-black">98.4%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full suparco-gradient w-[98%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[3rem] border border-gray-100 dark:border-white/10">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Mission Meta</h5>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Launch Year</span>
                        <span className="text-[#002147] dark:text-white">{selectedMission.year}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Mission Type</span>
                        <span className="text-[#002147] dark:text-white">{selectedMission.cat}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Current Status</span>
                        <span className="text-emerald-500">{selectedMission.status}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:opacity-90 transition-all flex items-center justify-center">
                    Download Full Archive <Globe className="ml-3 w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionHistory;
