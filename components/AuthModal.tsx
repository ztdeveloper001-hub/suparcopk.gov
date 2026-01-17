
import React, { useState } from 'react';
import { X, Mail, Lock, User, Chrome, Facebook, Twitter, ShieldCheck, ArrowRight, Loader2, Key, Fingerprint, Smartphone } from 'lucide-react';
import { useTranslation } from '../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useTranslation();
  const [mode, setMode] = useState<'login' | 'signup' | 'mfa'>('login');
  const [loading, setLoading] = useState(false);
  const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        setMode('mfa');
      } else {
        onClose();
      }
    }, 1500);
  };

  const handleMfaVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      setMode('login');
    }, 2000);
  };

  const socialLogins = [
    { name: t.auth.google, icon: Chrome, color: 'bg-white text-gray-700 border-gray-200' },
    { name: t.auth.facebook, icon: Facebook, color: 'bg-[#1877F2] text-white border-transparent' },
    { name: t.auth.x, icon: Twitter, color: 'bg-black text-white border-transparent' },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_0_100px_rgba(0,100,0,0.2)] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
        
        {/* Security Progress Bar */}
        <div className="h-2 w-full bg-gray-100 dark:bg-white/5 overflow-hidden">
          <div className={`h-full suparco-gradient transition-all duration-1000 ${
            mode === 'login' ? 'w-1/3' : mode === 'mfa' ? 'w-2/3' : 'w-full'
          }`} />
        </div>
        
        <div className="p-10">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center mb-10 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl transition-all duration-500 ${
              mode === 'mfa' ? 'bg-emerald-600 scale-110' : 'suparco-gradient'
            }`}>
              {mode === 'mfa' ? <ShieldCheck className="w-10 h-10" /> : <span className="font-black text-3xl">S</span>}
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <ShieldCheck className={`w-4 h-4 ${mode === 'mfa' ? 'text-emerald-500' : 'text-gray-400'}`} />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">
                {mode === 'mfa' ? 'Secured Gateway' : t.auth.heading}
              </h2>
            </div>
            
            <h3 className="text-4xl font-black text-[#002147] dark:text-white tracking-tighter italic leading-none">
              {mode === 'login' ? t.auth.login : mode === 'signup' ? t.auth.signup : 'Verify Identity'}
            </h3>
            {mode === 'mfa' && <p className="mt-4 text-xs font-bold text-gray-500">A multi-factor authentication token has been sent to your registered device.</p>}
          </div>

          {mode === 'mfa' ? (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
              <div className="flex justify-between gap-2">
                {mfaCode.map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-16 text-center text-2xl font-black bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-[#002147] dark:text-white"
                  />
                ))}
              </div>
              
              <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 flex items-center space-x-4 space-x-reverse">
                <div className="shrink-0 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                  <Fingerprint className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Biometric Handshake</p>
                   <p className="text-xs font-bold text-gray-500">Authorized finger-print detected via secondary link.</p>
                </div>
              </div>

              <button 
                onClick={handleMfaVerify}
                disabled={loading}
                className="w-full py-5 bg-[#002147] dark:bg-emerald-600 text-white rounded-2xl font-black shadow-2xl hover:opacity-90 transition-all flex items-center justify-center space-x-3"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Establish Secure Link</span>}
              </button>
              
              <button 
                onClick={() => setMode('login')}
                className="w-full text-xs font-black uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Cancel and Return
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleAuth} className="space-y-4">
                {mode === 'signup' && (
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Agency Full Name"
                      required
                      className="w-full pl-14 pr-4 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:border-emerald-500 transition-all dark:text-white font-bold"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder={t.auth.email}
                    required
                    className="w-full pl-14 pr-4 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:border-emerald-500 transition-all dark:text-white font-bold"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    placeholder={t.auth.password}
                    required
                    className="w-full pl-14 pr-4 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:border-emerald-500 transition-all dark:text-white font-bold"
                  />
                </div>

                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center space-x-2 space-x-reverse">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trust this node</span>
                   </div>
                   {mode === 'login' && (
                    <button type="button" className="text-[10px] font-black text-emerald-600 hover:text-emerald-500 uppercase tracking-widest">
                      {t.auth.forgot}
                    </button>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-[#002147] dark:bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:opacity-90 transition-all flex items-center justify-center space-x-3 space-x-reverse"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Initial Login' : t.auth.signup}</span>
                      <ArrowRight className={`w-5 h-5 ${lang === 'en' ? '' : 'rotate-180'}`} />
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100 dark:border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
                  <span className="bg-white dark:bg-slate-900 px-4 text-gray-400">Federal External SSO</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {socialLogins.map((social) => (
                  <button 
                    key={social.name}
                    type="button"
                    className={`flex items-center justify-center space-x-3 space-x-reverse py-4 rounded-2xl border font-black text-xs transition-all hover:scale-[1.02] active:scale-95 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                    <span>{social.name}</span>
                  </button>
                ))}
              </div>

              <p className="mt-10 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}{' '}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-emerald-600 hover:text-emerald-500 font-black"
                >
                  {mode === 'login' ? t.auth.signup : t.auth.login}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
