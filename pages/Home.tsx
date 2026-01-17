
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ArrowLeft, Satellite, Database, Users, Globe, Zap, ArrowUpRight, X, Clock, Calendar, Sparkles, Radio, ShieldCheck, Activity } from 'lucide-react';
import { useTranslation } from '../App';
import SatTracker from '../components/SatTracker';
import { GoogleGenAI } from "@google/genai";

interface Story {
  id: number;
  title: string;
  cat: string;
  desc: string;
  longDesc: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const { lang, t } = useTranslation();
  const Icon = lang === 'en' ? ArrowRight : ArrowLeft;
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [systemUptime, setSystemUptime] = useState(99.9982);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemUptime(prev => prev + (Math.random() * 0.0001 - 0.00005));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const stories: Story[] = [
    { 
      id: 101, 
      title: 'Advancing National Climate Analysis via Satellite', 
      cat: 'Science', 
      desc: 'New research using PRSS-1 data identifies critical shifts in Indus Basin water tables.',
      longDesc: 'The Indus Basin relies on delicate melt-water cycles. SUPARCO scientists are using hyperspectral imagery from PRSS-1 to track glacial retreat and aquifer depletion with unprecedented precision, providing vital data for Pakistan\'s agricultural future.',
      imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200'
    },
    { 
      id: 102, 
      title: 'PakSat-MM1: Hardware Finalization Phase', 
      cat: 'Mission Update', 
      desc: 'The multi-mission satellite enters its final assembly stages at the Karachi facility.',
      longDesc: 'PakSat-MM1 is set to revolutionize Pakistan\'s digital landscape. Currently in its vacuum chamber testing phase, the satellite will provide multi-gigabit broadband capacity, ensuring that even the remotest regions of Balochistan and Gilgit-Baltistan are connected to the global grid.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200'
    },
    { 
      id: 103, 
      title: 'Ground Control Karachi Receives ISO Certification', 
      cat: 'Operation', 
      desc: 'Excellence in ground operations recognized by international standards bodies.',
      longDesc: 'Operational excellence at our Karachi Space Center has reached a new global benchmark. The ISO 9001:2015 certification reflects our commitment to data integrity, downlink reliability, and precision mission control for our active orbital assets.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const handleOpenStory = async (story: Story) => {
    setSelectedStory(story);
    setAiSummary('');
    setIsAiLoading(true);
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setAiSummary('AI summary unavailable - API key not configured.');
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `Summarize this space news for a high-school student in 2 short bullet points: "${story.longDesc}"`,
      });
      setAiSummary(response.text || '');
    } catch (e) {
      setAiSummary('Strategic analysis delayed by orbital interference.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white dark:bg-slate-950">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105 animate-slow-zoom">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2400" 
            alt="Deep Space Exploration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 pt-24 pb-32">
          <div className="max-w-5xl text-white">
            <div className="flex items-center space-x-4 space-x-reverse mb-10 animate-in slide-in-from-bottom duration-500">
              <span className="px-5 py-2 bg-blue-600 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-blue-500/40">
                {t.home.heroTag}
              </span>
              <div className="h-0.5 w-16 bg-white/30 hidden md:block"></div>
              <span className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-[0.2em]">PRSS-1 MISSION LOGS</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black leading-[0.9] mb-12 animate-in slide-in-from-bottom duration-700 tracking-tighter italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t.home.heroTitle.split('،')[0] || t.home.heroTitle.split(',')[0]}
              <br />
              <span className="text-blue-400 not-italic block mt-4 uppercase tracking-tighter">{t.home.heroTitle.split('،')[1] || t.home.heroTitle.split(',')[1]}</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-200 mb-14 leading-relaxed max-w-3xl animate-in slide-in-from-bottom duration-1000 font-medium opacity-90">
              {t.home.heroSub}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 sm:space-x-reverse animate-in slide-in-from-bottom duration-1000 delay-200">
              <Link to="/missions" className="px-12 py-6 bg-white text-[#002147] hover:bg-blue-600 hover:text-white rounded-[2rem] font-black text-lg flex items-center justify-center transition-all group shadow-2xl hover:scale-105 active:scale-95">
                {t.home.ctaExplore} <Icon className={`mx-3 w-7 h-7 group-hover:translate-x-${lang === 'en' ? '2' : '-2'} transition-transform`} />
              </Link>
              <Link to="/plus" className="px-12 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-3xl text-white rounded-[2rem] font-black text-lg flex items-center justify-center transition-all border border-white/20 hover:scale-105 active:scale-95">
                {t.home.ctaWatch} <Play className="mx-3 w-6 h-6 fill-white" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-0 left-0 hidden lg:block">
          <div className="container mx-auto px-4 flex justify-between items-end">
             <div className="glass-morphism px-8 py-5 rounded-[2rem] flex items-center space-x-10 space-x-reverse text-white">
                <div className="flex items-center space-x-3 space-x-reverse">
                   <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]" />
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Network Uptime</span>
                      <span className="text-sm font-black italic">{systemUptime.toFixed(4)}%</span>
                   </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center space-x-3 space-x-reverse">
                   <ShieldCheck className="w-5 h-5 text-blue-400" />
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Encryption Status</span>
                      <span className="text-sm font-black italic">Active 4096-bit</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center space-x-12 space-x-reverse p-6 glass-morphism rounded-[3rem] shadow-2xl">
                {[
                  { val: '1961', label: t.home.statsFounded, icon: Globe },
                  { val: '05+', label: t.home.statsSats, icon: Satellite },
                  { val: '12', label: t.home.statsGround, icon: Database }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center space-x-5 space-x-reverse px-6 border-r last:border-0 border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group">
                      <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-right">
                      <p className="text-white text-4xl font-black tracking-tighter italic leading-none">{stat.val}</p>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-2">{stat.label}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-12">
              <div className="max-w-xl">
                 <div className="flex items-center space-x-3 space-x-reverse mb-6">
                    <Zap className="w-6 h-6 text-blue-500 animate-pulse" />
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">{t.home.trackerTitle}</h2>
                 </div>
                 <h3 className="text-4xl md:text-7xl font-black text-[#002147] dark:text-white tracking-tighter italic mb-8 leading-none">
                    Orbital Command Center
                 </h3>
                 <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    Access real-time telemetry from our active fleet. From PRSS-1 Earth Observation to PakSat-MM1 communication nodes, witness Pakistan's digital eye in the sky.
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/launch-dashboard" className="px-10 py-5 bg-[#002147] text-white rounded-3xl font-black shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center">
                   Launch Dashboard <ArrowUpRight className="ml-3 w-5 h-5" />
                </Link>
                <Link to="/history" className="px-10 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl font-black shadow-xl hover:bg-gray-100 transition-all text-center">
                   Full History
                </Link>
              </div>
           </div>
           <SatTracker />
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl aspect-square lg:aspect-video">
                  <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                     <div className="flex items-center space-x-3 space-x-reverse mb-4">
                        <Radio className="w-5 h-5 text-blue-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Live Mission Feed</span>
                     </div>
                     <h4 className="text-3xl font-black text-white italic tracking-tight">Indus Basin Hydrology Sweep</h4>
                     <p className="text-white/60 text-sm font-medium mt-2">PRSS-1 sensors capturing high-resolution melt-water data over the Karakoram range.</p>
                  </div>
               </div>
               <div className="space-y-12">
                  <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em]">Agency Focus</h2>
                  <h3 className="text-5xl md:text-7xl font-black text-[#002147] dark:text-white tracking-tighter italic">Science for the Nation</h3>

                  <div className="space-y-8">
                     {[
                        { title: 'Agricultural Monitoring', desc: 'Optimizing crop yields through precision satellite data.', icon: Activity },
                        { title: 'National Security', desc: 'Secure communication links for federal defense protocols.', icon: ShieldCheck },
                        { title: 'Climate Adaptation', desc: 'Predicting extreme weather through atmospheric modeling.', icon: Globe }
                     ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-6 space-x-reverse p-6 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                           <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-600">
                              <item.icon className="w-6 h-6" />
                           </div>
                           <div>
                              <h5 className="text-xl font-bold text-[#002147] dark:text-white">{item.title}</h5>
                              <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 md:py-40 bg-gray-50 dark:bg-slate-900/40 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.5em] mb-6">Discovery Hub</h2>
              <h3 className="text-5xl md:text-7xl font-black text-[#002147] dark:text-white tracking-tighter italic">Top Stories</h3>
            </div>
            <Link to="/news" className="group px-10 py-5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2rem] text-[#002147] dark:text-white font-black text-sm flex items-center hover:border-emerald-500 hover:shadow-2xl transition-all">
              Latest from Press Center <Icon className="mx-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {stories.map((story, i) => (
               <div key={i} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700">
                  <div className="relative h-80 overflow-hidden">
                    <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-8 left-8 px-5 py-2 bg-blue-600/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                      {story.cat}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <h4 className="text-2xl md:text-3xl font-black mb-6 text-[#002147] dark:text-white leading-tight group-hover:text-blue-500 transition-colors tracking-tight">
                      {story.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-10 line-clamp-3 font-medium leading-relaxed">
                       {story.desc}
                    </p>
                    <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                       <button
                        onClick={() => handleOpenStory(story)}
                        className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-[#002147] dark:text-white group-hover:text-blue-600 transition-colors"
                       >
                         Full Access <Icon className="mx-2 w-4 h-4" />
                       </button>
                       <span className="text-[10px] font-black text-gray-300 uppercase">Oct 2024</span>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {selectedStory && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedStory(null)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-300 border border-white/10">
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-10 py-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 block">{selectedStory.cat} Intelligence</span>
                <h2 className="text-3xl font-black text-[#002147] dark:text-white tracking-tighter italic leading-none">{selectedStory.title}</h2>
              </div>
              <button onClick={() => setSelectedStory(null)} className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl hover:bg-gray-200 transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-10">
                  <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/10">
                    <img src={selectedStory.imageUrl} className="w-full h-full object-cover" alt="Article" />
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {selectedStory.longDesc}
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" /> AI Intelligence Summary
                    </h4>
                    {isAiLoading ? (
                      <div className="flex items-center space-x-3 text-emerald-500 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>Generating Summary...</span>
                      </div>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-400 font-bold leading-relaxed whitespace-pre-line">
                        {aiSummary}
                      </div>
                    )}
                  </div>
                  <div className="bg-[#002147] p-8 rounded-[2.5rem] text-white">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Mission Metadata</h5>
                    <div className="space-y-4 text-sm font-medium">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="opacity-40">Release Date</span>
                        <span>Oct 24, 2024</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="opacity-40">Classification</span>
                        <span>Unclassified</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-40">Region</span>
                        <span>Indus Basin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
