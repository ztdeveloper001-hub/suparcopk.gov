
import React, { useState } from 'react';
import { Play, Star, Clock, Share2, Plus, Info, Volume2, Maximize, Activity, Radio, ChevronRight, Search } from 'lucide-react';

const SuparcoPlus: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Documentaries', 'Live Missions', 'Education', 'Shorts', 'Interviews'];

  const contentRows = [
    {
      title: 'SUPARCO Originals',
      subtitle: 'Premium series produced by our Multimedia Division',
      items: [
        { id: 201, title: 'Badr: The First Dawn', duration: '52m', type: 'Documentary', tag: 'Original', img: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=800' },
        { id: 202, title: 'Indus from Above', duration: '45m', type: 'Nature', tag: 'Original', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800' },
        { id: 203, title: 'Karachi Control', duration: '30m', type: 'Behind the Scenes', tag: 'New', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800' },
        { id: 204, title: 'The Next Orbit', duration: '1h 12m', type: 'Future Tech', tag: 'Original', img: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800' },
      ]
    },
    {
      title: 'Current Mission Streams',
      subtitle: 'Real-time telemetry and camera feeds',
      items: [
        { id: 205, title: 'PRSS-1 Live Feed', duration: 'LIVE', type: 'Observation', tag: 'Live', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800' },
        { id: 206, title: 'Ground Station Karachi', duration: 'LIVE', type: 'Ops', tag: 'Live', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800' },
        { id: 207, title: 'Deep Space Link-1', duration: 'LIVE', type: 'Comms', tag: 'Live', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800' },
        { id: 208, title: 'Launch Pad-3 View', duration: 'LIVE', type: 'Facility', tag: 'Live', img: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=800' },
      ]
    },
    {
      title: 'Science & Discovery',
      subtitle: 'Deep dives into astrophysics and atmospheric studies',
      items: [
        { id: 209, title: 'Climate Frontiers', duration: '38m', type: 'Science', tag: '', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800' },
        { id: 210, title: 'Rocketry 101', duration: '15m', type: 'Education', tag: '', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800' },
        { id: 211, title: 'Galaxy Mapping', duration: '28m', type: 'Research', tag: '', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800' },
        { id: 212, title: 'The Ozone Layer', duration: '42m', type: 'Atmosphere', tag: '', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800' },
      ]
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white animate-in fade-in duration-1000">
      {/* Immersive Cinematic Hero */}
      <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2400" 
            alt="Cinematic Space" 
            className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-soft"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent"></div>
          
          {/* Audio/Video UI Mockup elements */}
          <div className="absolute bottom-10 right-10 flex space-x-4">
             <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <Volume2 className="w-5 h-5" />
             </div>
             <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <Maximize className="w-5 h-5" />
             </div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="px-3 py-1 bg-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Global Premiere</div>
              <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
                <Star className="w-4 h-4 fill-emerald-400" /> <span>SUPARCO+ ORIGINAL</span>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-8 leading-none drop-shadow-2xl">
              MISSION <br /> <span className="text-emerald-500">CONTROL</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-medium max-w-2xl">
              An exclusive multi-part documentary series taking you behind the high-security gates of Pakistan's Space Agency.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-white text-black rounded-[2rem] font-black text-lg flex items-center hover:bg-emerald-500 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95">
                <Play className="w-6 h-6 mr-3 fill-current" /> Play Episode 1
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-3xl rounded-[2rem] font-black text-lg flex items-center hover:bg-white/20 transition-all border border-white/20 hover:scale-105 active:scale-95">
                <Plus className="w-6 h-6 mr-3" /> My Watchlist
              </button>
              <button className="p-5 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 hover:bg-white/10 transition-all">
                <Info className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Metadata Scroll */}
        <div className="absolute bottom-10 left-10 flex flex-col space-y-2 opacity-50">
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Telemetry Syncing...</span>
           <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-2/3 animate-pulse" />
           </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <div className="sticky top-[104px] z-50 bg-[#020617]/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 space-x-reverse">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
             <Search className="w-4 h-4 text-gray-500" />
             <input type="text" placeholder="Search SUPARCO+" className="bg-transparent border-none outline-none text-xs font-bold text-white placeholder:text-gray-600" />
          </div>
        </div>
      </div>

      {/* Content Browsing Area */}
      <div className="container mx-auto px-4 py-24 space-y-24">
        {contentRows.map((row, idx) => (
          <div key={idx} className="group/row">
            <div className="flex flex-col mb-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-black italic uppercase tracking-tight flex items-center">
                  {row.title}
                  <ChevronRight className="ml-2 w-6 h-6 text-emerald-500 opacity-0 group-hover/row:opacity-100 transition-all" />
                </h2>
                <button className="text-xs font-black text-gray-500 hover:text-emerald-500 uppercase tracking-widest transition-colors">See All Collection</button>
              </div>
              <p className="text-gray-500 text-sm font-medium">{row.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {row.items.map((item) => (
                <div key={item.id} className="group/item cursor-pointer">
                  <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/5 shadow-2xl transition-all duration-500 group-hover/item:scale-105 group-hover/item:shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#020617]/60 opacity-0 group-hover/item:opacity-100 transition-opacity flex flex-col justify-end p-6">
                       <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                             <div className="p-3 bg-emerald-600 text-white rounded-full">
                                <Play className="w-4 h-4 fill-white" />
                             </div>
                             <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <Plus className="w-4 h-4" />
                             </div>
                          </div>
                          <Share2 className="w-5 h-5 text-gray-400 hover:text-white" />
                       </div>
                    </div>

                    {/* Content Indicators */}
                    {item.tag && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        item.tag === 'Live' ? 'bg-red-600 animate-pulse' : 'bg-emerald-600'
                      }`}>
                        {item.tag}
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[9px] font-black">
                      {item.duration}
                    </div>
                  </div>

                  <div className="mt-6 space-y-1">
                    <h3 className="text-lg font-black text-gray-200 tracking-tight leading-none group-hover/item:text-emerald-400 transition-colors uppercase italic">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-[10px] text-gray-500 font-black uppercase tracking-widest">
                      <span className="text-emerald-500/60 mr-2">●</span>
                      {item.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Global Map Link for Missions */}
      <section className="container mx-auto px-4 pb-40">
        <div className="bg-[#002147] rounded-[4rem] p-12 md:p-20 relative overflow-hidden border border-white/10 shadow-3xl">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="flex items-center space-x-3 space-x-reverse mb-6">
                    <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400">Stream Every Launch</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 leading-none">NEVER MISS A <br /> <span className="text-emerald-500">MOMENT IN SPACE</span></h2>
                 <p className="text-xl text-gray-300 leading-relaxed mb-10 font-medium">
                    Download the SUPARCO+ app on your smart TV or mobile device to receive instant notifications for satellite deployments and live mission control briefings.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">App Store</button>
                    <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">Google Play</button>
                 </div>
              </div>
              
              <div className="relative">
                 <div className="aspect-video bg-slate-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                       <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-600/40 group-hover:scale-110 transition-transform">
                          <Play className="w-10 h-10 fill-white ml-2" />
                       </div>
                    </div>
                 </div>
                 <div className="absolute -bottom-6 -right-6 p-8 bg-emerald-600 rounded-3xl shadow-2xl animate-bounce-slow">
                    <Activity className="w-10 h-10" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-slow {
           0%, 100% { transform: translateY(0); }
           50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow { animation: bounce-slow 6s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default SuparcoPlus;
