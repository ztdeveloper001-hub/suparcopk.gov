
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Missions from './pages/Missions';
import Science from './pages/Science';
import News from './pages/News';
import Multimedia from './pages/Multimedia';
import SuparcoPlus from './pages/SuparcoPlus';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Sitemap from './pages/Sitemap';
import TermsOfUse from './pages/TermsOfUse';
import LaunchDashboard from './pages/LaunchDashboard';
import MissionHistory from './pages/MissionHistory';
import SecurityHub from './pages/SecurityHub';
import GeminiAssistant from './components/GeminiAssistant';
import NewsTicker from './components/NewsTicker';
import { Language, translations } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'dark');

  useEffect(() => {
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const value = {
    lang,
    setLang,
    t: translations[lang] || translations.en,
    theme,
    toggleTheme
  };

  const getFontClass = () => {
    if (lang === 'en') return 'font-sans';
    return 'font-ur';
  };

  return (
    <LanguageContext.Provider value={value}>
      <HashRouter>
        <ScrollToTop />
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${getFontClass()} bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100`}>
          <Header />
          <div className="pt-16 md:pt-24">
            <NewsTicker />
          </div>
          <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/science" element={<Science />} />
              <Route path="/news" element={<News />} />
              <Route path="/multimedia" element={<Multimedia />} />
              <Route path="/plus" element={<SuparcoPlus />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/launch-dashboard" element={<LaunchDashboard />} />
              <Route path="/history" element={<MissionHistory />} />
              <Route path="/security" element={<SecurityHub />} />
            </Routes>
          </main>
          <GeminiAssistant />
          <Footer />
        </div>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;
