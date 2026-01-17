
import React from 'react';
import { Microscope, Cloud, Satellite, GraduationCap, FileText, Download, Activity, Globe, Zap, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const Science: React.FC = () => {
  const focusAreas = [
    {
      icon: Satellite,
      title: 'Remote Sensing & GIS',
      stats: '4.2TB/Day',
      desc: 'Harnessing multi-spectral imagery to solve national challenges in urban planning, disaster monitoring, and resource management.'
    },
    {
      icon: Cloud,
      title: 'Atmospheric Sciences',
      stats: '99% Integrity',
      desc: 'Monitoring air quality, ozone depletion, and climate patterns to provide critical environmental data for policy makers.'
    },
    {
      icon: Microscope,
      title: 'Aerospace Engineering',
      stats: 'ISO-2047',
      desc: 'Developing indigenous satellite subsystems and high-precision testing environments for robust space operations.'
    },
    {
      icon: GraduationCap,
      title: 'STEM & Education',
      stats: '12k Students',
      desc: 'Inspiring the next generation of engineers through university collaborations and national space competitions.'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 pb-32 animate-in fade-in duration-700">
      {/* Immersive technical header */}
      <div className="bg-[#002147] text-white py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="w-full h-full suparco-gradient opacity-40" />
        </div>
        
        {/* Abstract orbital paths */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
           <svg width="100%" height="100%" className="overflow-visible">
              <circle cx="85%" cy="30%" r="200" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="10 20" />
              <circle cx="85%" cy="30%" r="350" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="5 15" />
           </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 space-x-reverse mb-8">
               <div className="p-4 bg-emerald-500/20 rounded-[1.5rem] border border-emerald-500/30">
                  <Cpu className="w-10 h-10 text-emerald-400" />
               </div>
               <div>
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 mb-1">Scientific Excellence</h2>
                  <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Protocol: Knowledge Expansion</p>
               </div>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-10 leading-none">National <br /> <span className="text-emerald-500">Science</span></h1>
            
            <p className="text-xl md:text-3xl text-gray-300 leading-relaxed font-medium">
              SUPARCO transforms raw orbital data into actionable intelligence, driving national development and global environmental stewardship.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {focusAreas.map((area, idx) => (
            <div key={idx} className="group p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 shadow-2xl hover:border-emerald-500 transition-all duration-500">
              <div className="flex justify-between items-start mb-10">
                 <div className="w-16 h-16 suparco-gradient rounded-[1.5rem] flex items-center justify-center text-white group-hover:rotate-6 transition-transform shadow-xl">
                    <area.icon className="w-9 h-9" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{area.stats}</span>
              </div>
              <h3 className="text-2xl font-black text-[#002147] dark:text-white mb-4 italic tracking-tight">{area.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 font-medium">{area.desc}</p>
              <button className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center hover:translate-x-2 transition-transform">
                Read Abstract <ArrowUpRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Technical Data Visualization Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-black text-[#002147] dark:text-white italic tracking-tighter">Core Publication Stream</h2>
              <button className="text-xs font-black text-emerald-600 uppercase tracking-widest">Access Archive</button>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'A New Methodology for Snow-Melt Runoff Modeling in the Indus Basin', date: 'Oct 24, 2024', category: 'Hydrology', code: 'PRSS-H-24' },
                { title: 'Impact of Urban Heat Island Effect on Karachi: A Decadal Analysis', date: 'Sep 12, 2024', category: 'Climatology', code: 'CLI-U-12' },
                { title: 'Design and Simulation of Nano-Satellite Power Systems', date: 'Aug 05, 2024', category: 'Engineering', code: 'ENG-N-05' }
              ].map((pub, idx) => (
                <div key={idx} className="group p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow pr-8">
                      <div className="flex items-center space-x-3 space-x-reverse mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">{pub.category}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {pub.code}</span>
                      </div>
                      <h4 className="text-xl font-black text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight leading-tight">{pub.title}</h4>
                      <div className="flex items-center mt-4 space-x-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                         <span>Verified: Peer-Review</span>
                         <span>Published: {pub.date}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                       <Download className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
             <div className="bg-[#002147] p-10 rounded-[3rem] text-white shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Globe className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-black italic tracking-tight mb-8">Data Access Portal</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-10 font-medium">
                   Authorized institutions can request high-fidelity multi-spectral data packets for non-commercial academic research.
                </p>
                <div className="space-y-4 mb-10">
                   {['Geo-Spatial Data', 'Atmospheric Logs', 'Telemetry Archives'].map(item => (
                      <div key={item} className="flex items-center space-x-3 space-x-reverse text-xs font-bold">
                         <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                         <span>{item}</span>
                      </div>
                   ))}
                </div>
                <button className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20">
                   Request Access
                </button>
             </div>

             <div className="bg-gray-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-8">Science Spotlight</h3>
                <div className="aspect-video rounded-3xl bg-gray-200 dark:bg-black/40 overflow-hidden relative group cursor-pointer mb-8 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" alt="Laboratory" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Activity className="w-10 h-10 text-white animate-pulse" />
                  </div>
                </div>
                <h4 className="font-black text-[#002147] dark:text-white text-lg italic tracking-tight mb-4">Space Education Awareness Drive (SEAD)</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">Resources for teachers and students to bring space science into the classroom through immersive labs.</p>
                <button className="w-full py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[#002147] dark:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:border-emerald-500 transition-all">Download STEM Toolkit</button>
             </div>
          </div>
        </div>

        {/* Global Impact Grid */}
        <section className="bg-white dark:bg-slate-900 p-12 md:p-24 rounded-[4rem] border border-gray-100 dark:border-white/5 shadow-3xl text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(#006400_1px,transparent_1px)] [background-size:20px_20px]" />
           </div>
           
           <h3 className="text-4xl md:text-7xl font-black italic text-[#002147] dark:text-white tracking-tighter mb-12">Global Collaboration</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
              {['CNSA', 'ESA', 'NASA', 'ISRO', 'JAXA', 'ROSCOSMOS', 'UAESA', 'KARI'].map(partner => (
                 <div key={partner} className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 flex items-center justify-center font-black text-2xl text-gray-300 italic group hover:text-emerald-500 transition-colors cursor-default">
                    {partner}
                 </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default Science;
