
import React, { useState, useEffect } from 'react';
import { Rocket, Clock, Zap, CloudSun, AlertTriangle, ShieldCheck, CheckCircle2, Loader2, Satellite } from 'lucide-react';

const LaunchDashboard: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 0, minutes: 45, seconds: 12 });
  const [telemetry, setTelemetry] = useState({ fuel: 98, thrust: 0, battery: 100, cabinPressure: 1.0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Launch Control Header */}
      <div className="bg-[#002147] border-b border-white/5 pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <Satellite className="w-full h-full rotate-45" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/30">
                  Mission Pending
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Flight Ref: PAK-2024-ALPHA</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 leading-none">PakSat-MM1</h1>
              <p className="text-xl text-gray-400 max-w-xl font-medium">Multi-Mission Satellite Deployment Operations. Launch Vehicle: SLV-X4 (Long March Class Variant).</p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl min-w-[320px]">
              <div className="flex items-center space-x-2 space-x-reverse mb-6">
                <Clock className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xs font-black uppercase tracking-widest text-emerald-500">Launch Countdown</h2>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label}>
                    <p className="text-4xl font-black italic tracking-tighter leading-none mb-2">{val.toString().padStart(2, '0')}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Telemetry & Checklist */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Telemetry Panel */}
            <div className="bg-slate-900 rounded-[3rem] p-10 border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Zap className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-2xl font-black italic tracking-tight">Systems Telemetry</h3>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-black text-emerald-500 uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Receiving Real-time Data</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { label: 'Rocket Fuel (LOX/RP-1)', val: telemetry.fuel, unit: '%', icon: Zap },
                  { label: 'Core Battery Reserves', val: telemetry.battery, unit: '%', icon: ShieldCheck },
                  { label: 'Cabin Pressure', val: telemetry.cabinPressure, unit: ' atm', icon: AlertTriangle },
                  { label: 'Main Engine Thrust', val: telemetry.thrust, unit: ' kN', icon: Rocket },
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
                      <span className="flex items-center"><item.icon className="w-4 h-4 mr-2" /> {item.label}</span>
                      <span>{item.val}{item.unit}</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full suparco-gradient transition-all duration-1000"
                        style={{ width: `${(item.val / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Range Checklist */}
            <div className="bg-slate-900 rounded-[3rem] p-10 border border-white/5">
              <h3 className="text-2xl font-black italic tracking-tight mb-8">Flight Readiness Checklist</h3>
              <div className="space-y-6">
                {[
                  { task: 'Payload Encapsulation Verified', status: 'Completed', time: 'L-24H' },
                  { task: 'Fueling Pad Clear Protocols', status: 'Completed', time: 'L-12H' },
                  { task: 'Weather Constraint Go/No-Go', status: 'In-Progress', time: 'L-4H' },
                  { task: 'Final Avionics Sweep', status: 'Pending', time: 'L-2H' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className={`p-2 rounded-full ${item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {item.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
                      </div>
                      <div>
                        <p className="font-bold">{item.task}</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase">{item.time}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${item.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Range Info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Weather Panel */}
            <div className="bg-slate-900 rounded-[3rem] p-10 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CloudSun className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-black italic tracking-tight mb-8">Sonmiani Range Weather</h3>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Visibility</span>
                  <span className="text-xl font-black italic">14.2 KM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Wind Speed</span>
                  <span className="text-xl font-black italic">12 KTS / NW</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Humidity</span>
                  <span className="text-xl font-black italic">45%</span>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-center space-x-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Conditions: GO for Launch</span>
                </div>
              </div>
            </div>

            {/* Launch Site Visual */}
            <div className="rounded-[3rem] overflow-hidden aspect-video border border-white/5 group relative">
              <img 
                src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt="Launch Pad"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Live View</p>
                <h4 className="font-bold">Pad-3 Flight Integration Facility</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDashboard;
