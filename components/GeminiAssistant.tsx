
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, Terminal as TerminalIcon, Radio, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'bot', text: "AI assistant unavailable - API key not configured." }]);
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: "You are the SUPARCO Space Assistant. Answer questions about Pakistan's space program, satellites (like PRSS-1, Badr), and general astronomy. Be professional, inspiring, and concise. Mention SUPARCO's role in national development. If asked about things unrelated to space or SUPARCO, gently redirect to space topics.",
        },
      });

      const botText = response.text || "I am currently unable to process your request. Please try again later.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Connection issues. Please check if the mission is clear." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[250]">
      {isOpen ? (
        <div className="w-80 md:w-[400px] h-[600px] bg-[#020617] rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,100,0,0.3)] flex flex-col overflow-hidden border border-emerald-500/20 animate-in slide-in-from-bottom duration-300">
          
          {/* Header */}
          <div className="bg-[#002147] p-6 text-white flex justify-between items-center border-b border-emerald-500/20">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black italic tracking-tight">Mission Control</h3>
                <div className="flex items-center text-[9px] uppercase tracking-widest text-emerald-400 font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
                  Status: Secure Link
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors" aria-label="Close assistant">
              <X className="w-6 h-6 text-white/50" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-950 relative">
            {/* Visual scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            
            {messages.length === 0 && (
              <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TerminalIcon className="w-8 h-8 text-emerald-500" />
                </div>
                <p className="text-gray-400 text-xs font-bold leading-relaxed mb-8 uppercase tracking-widest">
                  Welcome to the SUPARCO AI Intelligence Terminal. How can I assist with your discovery today?
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["PRSS-1 Specs", "PakSat-MM1 Launch", "How to join?"].map(q => (
                    <button 
                      key={q} 
                      onClick={() => { setInput(q); }} 
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-xl' 
                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none font-mono text-xs'
                }`}>
                  {m.role === 'bot' && <span className="text-emerald-500 mr-2">{'>'}{'>'}{'>'}</span>}
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center space-x-3">
                  <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Processing Data...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-[#002147] border-t border-emerald-500/20">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Enter query..." 
                className="w-full pl-6 pr-14 py-4 bg-black/40 border border-white/10 rounded-2xl outline-none text-sm text-white focus:border-emerald-500 transition-all font-mono"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-3 bg-emerald-600 text-white rounded-xl disabled:opacity-50 hover:bg-emerald-500 transition-all shadow-lg"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-20 h-20 suparco-gradient text-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,100,0,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-500 border border-white/10"
          aria-label="Open AI assistant"
        >
          <div className="relative">
             <Radio className="w-9 h-9 group-hover:rotate-12 transition-transform" />
             <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
             </span>
          </div>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
