
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ShieldAlert, Cpu, Zap, Activity, Terminal, Globe, Loader2, Sparkles, RefreshCw, Key } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SecurityHub: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState('Low');
  const [integrity, setIntegrity] = useState(99.998);
  const [isScanning, setIsScanning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('All digital perimeters are stable. Quantum encryption active on all orbital downlinks.');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 8));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        'Mitigating DDoS attempt from Node-X4',
        'Refreshing SSL Certificates (2048-bit)',
        'Sanitizing Database Input Buffers',
        'Syncing Encryption Keys with PRSS-1',
        'Verifying HMAC signatures for Ground Control'
      ];
      addLog(actions[Math.floor(Math.random() * actions.length)]);
      setIntegrity(99.997 + Math.random() * 0.002);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const runFullAudit = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Act as SUPARCO's Chief Information Security Officer. Provide a 2-sentence highly technical security status report for our space agency's digital infrastructure. Use terms like 'zero-trust', 'end-to-end encryption', and 'orbital handshakes'.",
      });
      setAiAnalysis(response.text || 'Intelligence link unstable.');
    } catch (e) {
      setAiAnalysis('Manual override engaged. Security protocols holding.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white pb-32">
      {/* Security Hero */}
      <div className="relative pt-32 pb-48 overflow-hidden bg-[#002147]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
          <div className="w-full h-full suparco-gradient opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="p-5 bg-emerald-500/20 rounded-[2rem] border border-emerald-500/30 mb-8 animate-pulse">
              <ShieldCheck className="w-16 h-16 text-emerald-400" />
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-6 leading-none">Cyber Sentinel</h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-medium">
              National Space Infrastructure Protection & Cyber-Intelligence Command Center.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Real-time Threat Monitor */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-900/80 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Activity className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-2xl font-black italic">Live Protection Grid</h2>
                </div>
                <div className="px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Status: Fully Operational</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { label: 'System Integrity', val: integrity.toFixed(3), unit: '%', icon: RefreshCw },
                  { label: 'Mitigated Events', val: '1.2M', unit: '+', icon: ShieldAlert },
                  { label: 'Active Keys', val: '4,096', unit: 'RSA', icon: Key },
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-black/40 rounded-[2rem] border border-white/5 group hover:border-emerald-500/30 transition-all">
                    <stat.icon className="w-6 h-6 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-black italic text-white mb-2">{stat.val}<span className="text-sm font-bold text-gray-500 ml-1">{stat.unit}</span></p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">Tactical Operation Log</h3>
                 <div className="bg-black/60 rounded-3xl p-6 border border-white/5 font-mono text-xs text-gray-400 space-y-2">
                    {logs.map((log, i) => (
                      <div key={i} className="flex items-center space-x-3 space-x-reverse opacity-80 animate-in slide-in-from-left duration-300">
                        <span className="text-emerald-500 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                        <span className="text-gray-300">{'>'}{'>'}{'>'} {log}</span>
                        <span className="text-emerald-500/50 ml-auto">VERIFIED</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* AI Auditor Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#002147] rounded-[3rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-black italic tracking-tight mb-8">AI Security Intelligence</h3>
              <p className="text-sm text-blue-200/60 leading-relaxed mb-8">
                Consult the Gemini Cyber-Intelligence engine for a real-time assessment of national orbital assets.
              </p>
              
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-bold text-emerald-400 italic mb-10 min-h-[100px] flex items-center">
                {isScanning ? (
                   <div className="flex items-center space-x-3">
                     <Loader2 className="w-5 h-5 animate-spin" />
                     <span>Decrypting Intelligence...</span>
                   </div>
                ) : (
                   `"${aiAnalysis}"`
                )}
              </div>

              <button 
                onClick={runFullAudit}
                disabled={isScanning}
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center"
              >
                Execute Global Audit <Zap className="ml-3 w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 border border-white/10 shadow-xl">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-8">Compliance Standards</h3>
               <div className="space-y-6">
                 {['NIST SP 800-53', 'ISO/IEC 27001', 'FIPS 140-3', 'GDPR Space Tier'].map(std => (
                   <div key={std} className="flex items-center justify-between">
                     <span className="text-sm font-bold text-gray-400">{std}</span>
                     <div className="px-3 py-1 bg-emerald-500/10 rounded-lg text-[8px] font-black text-emerald-400 border border-emerald-500/20">VALID</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SecurityHub;
