
import React from 'react';
import { Calendar, ArrowRight, Filter, Search } from 'lucide-react';
import ShareButton from '../components/ShareButton';

const News: React.FC = () => {
  const news = [
    {
      id: 1,
      title: "SUPARCO Successfully Completes Ground Testing of New Propulsion System",
      date: "Oct 24, 2023",
      category: "Engineering",
      summary: "Technical teams at the Karachi facility have achieved a major milestone in indigenous propulsion technology.",
      image: "https://picsum.photos/id/48/800/600"
    },
    {
      id: 2,
      title: "National Space Week 2023 Concludes with Focus on Sustainability",
      date: "Oct 10, 2023",
      category: "Events",
      summary: "Over 50 schools participated in the week-long event aimed at inspiring the next generation of space scientists.",
      image: "https://picsum.photos/id/49/800/600"
    },
    {
      id: 3,
      title: "New Satellite Data Helps Mitigate Flood Risk in Punjab Region",
      date: "Sep 28, 2023",
      category: "Science",
      summary: "Remote sensing imagery provided real-time data to disaster management authorities for effective planning.",
      image: "https://picsum.photos/id/50/800/600"
    },
    {
      id: 4,
      title: "Collaboration Agreement Signed with International Space Agencies",
      date: "Aug 15, 2023",
      category: "International",
      summary: "SUPARCO expands its global footprint with new bilateral research and data-sharing agreements.",
      image: "https://picsum.photos/id/51/800/600"
    }
  ];

  return (
    <div className="pb-20">
      <div className="bg-[#002147] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black mb-4 italic tracking-tighter">News & Press Releases</h1>
          <p className="text-xl text-gray-300 max-w-3xl font-medium">Official updates from Pakistan's national space authority.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Feed */}
          <div className="lg:w-3/4 space-y-12">
            {news.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-8 group cursor-pointer animate-in fade-in slide-in-from-left duration-500">
                <div className="md:w-1/3 h-64 overflow-hidden rounded-[2rem] border border-gray-100 shadow-lg">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{item.category}</span>
                      <span className="text-xs text-gray-400 font-bold flex items-center"><Calendar className="w-3 h-3 mr-1" /> {item.date}</span>
                    </div>
                    <ShareButton 
                      title={item.title} 
                      text={item.summary} 
                      className="text-gray-400 hover:text-emerald-600" 
                    />
                  </div>
                  <h2 className="text-3xl font-black text-[#002147] mb-4 group-hover:text-emerald-600 transition-colors tracking-tight">{item.title}</h2>
                  <p className="text-gray-500 mb-6 font-medium leading-relaxed">{item.summary}</p>
                  <button className="text-[#002147] font-black text-sm flex items-center group-hover:translate-x-2 transition-transform uppercase tracking-widest">
                    Read Release <ArrowRight className="ml-2 w-5 h-5 text-emerald-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-10">
            <div className="bg-[#002147] p-8 rounded-3xl text-white shadow-xl">
              <h3 className="font-black text-xl mb-6 italic">Search Archive</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Keywords..." 
                  className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/10 focus:border-emerald-500 outline-none text-sm placeholder:text-white/30" 
                />
                <Search className="absolute right-3 top-3 w-4 h-4 text-white/40" />
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h3 className="font-black text-xl text-[#002147] mb-6 italic">Event Calendar</h3>
              <div className="space-y-6">
                {[
                  { date: "Nov 15", month: "2024", title: "Space Tech Symposium", loc: "Islamabad" },
                  { date: "Dec 02", month: "2024", title: "Satellite Ops Training", loc: "Karachi" }
                ].map((ev, i) => (
                  <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                    <div className="flex-shrink-0 w-14 h-14 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center group-hover:border-emerald-500 transition-all">
                      <span className="text-emerald-600 font-black text-sm">{ev.date.split(' ')[1]}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase">{ev.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#002147] text-sm group-hover:text-emerald-600 transition-colors">{ev.title}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{ev.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-[#002147] font-black text-xs uppercase tracking-[0.2em] border-2 border-[#002147]/10 rounded-xl hover:bg-[#002147] hover:text-white transition-all">
                Full Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
