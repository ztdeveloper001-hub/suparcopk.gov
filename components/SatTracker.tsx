
import React, { useState, useEffect, useMemo } from 'react';
import { Satellite, Info, RefreshCw, Zap, Globe, Activity, Terminal, Shield, Cpu, MapPin, Loader2, Sparkles } from 'lucide-react';
import { useTranslation } from '../App';
import { GoogleGenAI } from "@google/genai";

interface SatStats {
  name: string;
  type: string;
  altitude: number; // km
  velocity: number; // km/s
  period: number;   // mins
  battery: number;
  temp: string;
  lat: number;
  lng: number;
}

const SatTracker: React.FC = () => {
  const { lang, t } = useTranslation();
  const [selectedSat, setSelectedSat] = useState(0);
  const [telemetry, setTelemetry] = useState<SatStats[]>([]);
  const [aiReport, setAiReport] = useState<string>('Initializing link with Ground Control Karachi...');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [tick, setTick] = useState(0);

  const baseSats = useMemo(() => [
    { name: 'PRSS-1', type: 'Remote Sensing', altitude: 643.2, velocity: 7.5, period: 98, battery: 94, temp: '-12°C', lat: 30.3, lng: 69.3 },
    { name: 'PakSat-1R', type: 'Communication', altitude: 35786, velocity: 3.07, period: 1440, battery: 88, temp: '+2°C', lat: 0, lng: 38.0 },
    { name: 'PakTES-1A', type: 'Experimental', altitude: 638.1, velocity: 7.6, period: 97, battery: 91, temp: '-45°C', lat: 24.8, lng: 67.0 }
  ], []);

  // Update telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
      setTelemetry(prev => {
        if (prev.length === 0) return baseSats;
        return prev.map(sat => ({
          ...sat,
          // Simulate orbital movement
          lat: (sat.lat + (sat.name === 'PakSat-1R' ? 0 : 0.05)) % 90,
          lng: (sat.lng + (sat.name === 'PakSat-1R' ? 0.01 : 0.1)) % 180,
          altitude: sat.altitude + (Math.random() * 0.2 - 0.1),
          velocity: sat.velocity + (Math.random() * 0.01 - 0.005),
          battery: Math.max(0, Math.min(100, sat.battery + (Math.random() * 0.1 - 0.05)))
        }));
      });
    }, 100);
    return () => clearInterval(timer);
  }, [baseSats]);

  // Fetch AI Situational Report via Gemini
  const fetchStatusReport = async (satName: string) => {
    setIsLoadingAi(true);
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setAiReport('AI report unavailable - API key not configured.');
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `Act as a SUPARCO Mission Controller. Provide a technical 2-sentence situational update for the satellite "${satName}". Mention its current focus (e.g. imaging the Indus Delta, signal relay in the North). Keep it professional and high-tech.`,
      });
      setAiReport(response.text || 'Signal stable. No anomalies detected.');
    } catch (e) {
      setAiReport('Error: Link degradation. Check encryption keys.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  useEffect(() => {
    fetchStatusReport(baseSats[selectedSat].name);
  }, [selectedSat, baseSats]);

  const currentSat = telemetry[selectedSat] || baseSats[selectedSat];

  return (
    <div className="bg-slate-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,100,0,0.15)] animate-in fade-in duration-1000">
      {/* Tracker Header */}
      <div className="bg-[#002147] px-10 py-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="p-3 bg-blue-500/20 rounded-2xl">
            <Activity className="w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black italic tracking-tight text-white uppercase">{t.home.trackerTitle}</h3>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Status: Ground Station Link Active</p>
          </div>
        </div>
        <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 space-x-1 space-x-reverse">
          {baseSats.map((sat, i) => (
            <button
              key={sat.name}
              onClick={() => setSelectedSat(i)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedSat === i ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {sat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Telemetry Data Grid */}
        <div className="lg:col-span-4 p-10 bg-slate-900/50 border-r border-white/5 space-y-10">
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] flex items-center">
              <Terminal className="w-4 h-4 mr-2" /> Live Telemetry Data
            </h4>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { label: 'Orbital Velocity', val: currentSat.velocity.toFixed(3), unit: 'km/s', icon: Zap },
                { label: 'Current Altitude', val: currentSat.altitude.toFixed(1), unit: 'km', icon: Globe },
                { label: 'Battery Capacity', val: currentSat.battery.toFixed(1), unit: '%', icon: Shield },
                { label: 'Instrument Temp', val: currentSat.temp, unit: '', icon: RefreshCw },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <stat.icon className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-xl font-black italic text-white tracking-tighter">
                      {stat.val} <span className="text-[10px] text-gray-400 not-italic ml-1">{stat.unit}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-white/10">
             <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-500 tracking-widest mb-6">
               <span>Subsystem Health</span>
               <span className="text-blue-500">Nominal</span>
             </div>
             <div className="grid grid-cols-2 gap-3">
               {['Power Bus', 'Transponder', 'Reaction Wheel', 'Thermal Shield'].map(system => (
                 <div key={system} className="flex items-center space-x-2 space-x-reverse p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                   <span className="text-[9px] font-bold text-gray-400">{system}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Center/Right: Map & AI Briefing */}
        <div className="lg:col-span-8 flex flex-col h-full bg-black relative">
          {/* Mock Orbital Ground Track Map */}
          <div className="flex-grow p-10 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                {/* Visual grid pattern */}
                <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
             </div>
             
             {/* NASA Style Stylized Map Background */}
             <div className="relative w-full aspect-[2/1] bg-slate-900 rounded-[2rem] border border-white/5 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-30 grayscale" 
                  alt="Ground Track" 
                />
                
                {/* Ground Track Simulation Line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <path 
                    d={`M 0 50 Q ${currentSat.lng * 2} ${currentSat.lat * 2}, 1000 50`} 
                    stroke="rgba(16, 185, 129, 0.3)" 
                    strokeWidth="2" 
                    fill="none" 
                    className="animate-dash"
                  />
                </svg>

                {/* Satellite Location Marker */}
                <div 
                  className="absolute transition-all duration-300 ease-linear"
                  style={{ 
                    left: `${((currentSat.lng + 180) / 360) * 100}%`, 
                    top: `${((90 - currentSat.lat) / 180) * 100}%` 
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-8 bg-emerald-500/20 rounded-full animate-ping" />
                    <div className="absolute -inset-4 bg-emerald-500/40 rounded-full animate-pulse" />
                    <Satellite className="w-8 h-8 text-white relative z-10 filter drop-shadow-[0_0_10px_rgba(16,185,129,1)]" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-[#002147] text-[9px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/50 whitespace-nowrap text-emerald-400">
                      LIVE: {currentSat.lat.toFixed(2)}N, {currentSat.lng.toFixed(2)}E
                    </div>
                  </div>
                </div>

                {/* Ground Stations */}
                {[
                  { name: 'KHI', lat: 24.8607, lng: 67.0011 },
                  { name: 'ISB', lat: 33.6844, lng: 73.0479 },
                  { name: 'LHR', lat: 31.5204, lng: 74.3587 }
                ].map(gs => (
                  <div 
                    key={gs.name}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full"
                    style={{ 
                      left: `${((gs.lng + 180) / 360) * 100}%`, 
                      top: `${((90 - gs.lat) / 180) * 100}%` 
                    }}
                  >
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] font-black text-blue-400 opacity-50">{gs.name}</div>
                  </div>
                ))}
             </div>
          </div>

          {/* Bottom: AI Intelligence Report */}
          <div className="bg-white/5 backdrop-blur-3xl border-t border-white/10 p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0 flex items-center space-x-4 space-x-reverse">
               <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-emerald-600/20">
                  <Sparkles className="w-8 h-8 text-white" />
               </div>
               <div>
                 <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">AI Mission Analysis</h5>
                 <p className="text-white font-bold text-lg tracking-tight italic leading-none">Strategic Report</p>
               </div>
            </div>
            <div className="flex-grow">
               {isLoadingAi ? (
                 <div className="flex items-center space-x-3 text-emerald-500 font-bold italic">
                   <Loader2 className="w-5 h-5 animate-spin" />
                   <span>Accessing Orbital Intelligence...</span>
                 </div>
               ) : (
                 <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-xs md:text-sm text-gray-300 leading-relaxed animate-in slide-in-from-bottom duration-500">
                    <span className="text-emerald-500 mr-2">{'>'}{'>'}{'>'}</span>
                    {aiReport}
                 </div>
               )}
            </div>
            <button 
              onClick={() => fetchStatusReport(baseSats[selectedSat].name)}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Re-Sync Briefing
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .animate-dash {
          stroke-dasharray: 10;
          animation: dash 10s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </div>
  );
};

export default SatTracker;
