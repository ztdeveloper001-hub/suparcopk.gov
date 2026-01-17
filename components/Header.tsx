
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu as HamburgerIcon, X, Globe, User, ArrowUpRight, Sun, Moon, MoreVertical, ChevronDown, Shield, FileText, Map as MapIcon, ShieldCheck, Filter, Calendar, Tag, SortAsc, Rocket, Telescope, Newspaper, Play, Info, Briefcase } from 'lucide-react';
import { useTranslation } from '../App';
import { Language } from '../translations';
import AuthModal from './AuthModal';
import ShareButton from './ShareButton';

interface SearchItem {
  title: string;
  path: string;
  category: string;
  date: string; // ISO format for sorting
  description: string;
}

const Header: React.FC = () => {
  const { lang, setLang, t, theme, toggleTheme } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Advanced Search States
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchYear, setSearchYear] = useState('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');

  const location = useLocation();
  const navigate = useNavigate();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsLangDropdownOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'ur', name: 'اردو' },
    { code: 'pa', name: 'پنجابی' },
    { code: 'sd', name: 'سنڌي' },
    { code: 'ps', name: 'پښتو' },
  ];

  const navLinks: NavLink[] = [
    { name: t.nav.missions, path: '/missions', icon: Rocket },
    { name: t.nav.science, path: '/science', icon: Telescope },
    { name: t.nav.news, path: '/news', icon: Newspaper },
    { name: t.nav.multimedia, path: '/multimedia', icon: Play },
    { name: t.nav.about, path: '/about', icon: Info },
    { name: t.nav.careers, path: '/careers', icon: Briefcase },
  ];

  const utilityLinks = [
    { name: 'Cyber Intelligence', icon: ShieldCheck, path: '/security' },
    { name: 'Sitemap', icon: MapIcon, path: '/sitemap' },
    { name: 'Terms of Use', icon: FileText, path: '/terms' },
    { name: 'Privacy Policy', icon: Shield, path: '/privacy' },
  ];

  const searchableContent: SearchItem[] = [
    { title: "PRSS-1 Mission", path: "/missions", category: "Missions", date: "2018-07-09", description: "Remote sensing satellite mission for Earth observation." },
    { title: "Badr-1 History", path: "/about", category: "About", date: "1990-07-16", description: "The story of Pakistan's first indigenous satellite." },
    { title: "PakSat-1R Operations", path: "/missions", category: "Missions", date: "2011-08-11", description: "Communication satellite providing regional coverage." },
    { title: "Climate Analysis Report", path: "/science", category: "Science", date: "2024-10-24", description: "Satellite data-driven research on Indus Basin water levels." },
    { title: "Aerospace Engineering Lab", path: "/science", category: "Science", date: "2023-11-15", description: "Indigenous hardware development and testing protocols." },
    { title: "Latest Press Releases", path: "/news", category: "News", date: "2024-10-25", description: "Official updates and announcements from the agency." },
    { title: "SUPARCO Originals", path: "/plus", category: "Multimedia", date: "2024-05-01", description: "Exclusive mission documentaries and space features." },
    { title: "Cyber Intelligence Hub", path: "/security", category: "Security", date: "2024-10-26", description: "Live monitoring of national space digital infrastructure." },
    { title: "Careers in Space Ops", path: "/careers", category: "Careers", date: "2024-09-12", description: "Join our team of orbital mechanics and mission controllers." },
  ];

  const categories = ["All", "Missions", "Science", "News", "Multimedia", "Careers", "About", "Security"];
  const years = ["All", "2024", "2023", "2022", "2018", "2011", "1990"];

  const searchResults = useMemo(() => {
    if (!searchQuery && searchCategory === 'All' && searchYear === 'All') return [];
    
    let filtered = searchableContent.filter(item => {
      const matchesQuery = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = searchCategory === 'All' || item.category === searchCategory;
      const matchesYear = searchYear === 'All' || item.date.startsWith(searchYear);
      
      return matchesQuery && matchesCategory && matchesYear;
    });

    // Sort logic
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.date.localeCompare(b.date));
    } else if (searchQuery) {
      // Basic relevance: exact match in title comes first
      filtered.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
        const bTitleMatch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
      });
    }

    return filtered;
  }, [searchQuery, searchCategory, searchYear, sortBy]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    setIsLangDropdownOpen(false);
    setIsMoreOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    setIsLangDropdownOpen(false);
    setIsMoreOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[200] bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-[300]">
          Skip to content
        </a>

        {/* NASA-Style Top Utility Bar */}
        <div className="bg-gray-900 text-white py-2 px-4 text-xs flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <span className="flex items-center font-medium"><Globe className="w-3 h-3 mr-2" /> Pakistan.gov</span>
            <span className="hidden md:inline text-gray-300">National Space & Upper Atmosphere Research Commission</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/security" className="flex items-center text-blue-400 hover:text-white transition-colors font-medium">
              <ShieldCheck className="w-3 h-3 mr-1" /> SECURE NODE
            </Link>
            <ShareButton title="SUPARCO Official Website" text="Explore Pakistan's space program and latest missions" className="text-white hover:text-blue-400" />
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center hover:text-blue-400 transition-colors font-medium"
              >
                {languages.find(l => l.code === lang)?.name} <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-32 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-600 p-1 z-[210]">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setIsLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium rounded transition-colors ${
                        lang === l.code ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={toggleTheme} className="hover:text-blue-400 transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center hover:text-blue-400 transition-colors font-medium"
            >
              <User className="w-3 h-3 mr-1" /> {t.common.login}
            </button>
          </div>
        </div>

        {/* NASA-Style Main Navigation */}
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <img
                  src="/suparco-logo.jpg"
                  alt="SUPARCO Logo"
                  className="w-12 h-12 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 dark:text-white font-bold text-xl leading-tight">SUPARCO</span>
                  <span className="text-blue-600 text-xs font-medium uppercase tracking-wide">Space & Upper Atmosphere</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Search and Mobile Menu */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSearch}
                  className={`p-2 rounded-md transition-colors ${
                    isSearchOpen
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  aria-label="Search"
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={toggleMenu}
                    className={`p-2 rounded-md transition-colors ${
                      isMenuOpen
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-label="Menu"
                  >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <HamburgerIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Full Width Search Overlay - Advanced Implementation */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-white/5 shadow-2xl animate-in slide-in-from-top duration-300 z-[190] overflow-y-auto max-h-[calc(100vh-100px)]">
            <div className="container mx-auto px-4 py-8 md:py-12">
              <div className="max-w-6xl mx-auto">
                {/* Search Bar */}
                <div className="relative flex items-center mb-8">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.common.searchPlaceholder}
                    className="w-full py-6 px-8 text-2xl md:text-5xl font-black bg-transparent border-none focus:ring-0 outline-none placeholder:text-gray-200 dark:placeholder:text-gray-800 dark:text-white"
                    autoFocus
                  />
                  <button className="p-5 bg-[#002147] dark:bg-emerald-600 text-white rounded-3xl hover:opacity-90 transition-all shadow-2xl">
                    <Search className="w-8 h-8 md:w-10 md:h-10" />
                  </button>
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Category Filter */}
                  <div className="space-y-4">
                    <label className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 opacity-60">
                      <Tag className="w-3 h-3 mr-2" /> Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setSearchCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                            searchCategory === cat 
                              ? 'bg-[#002147] text-white border-[#002147] dark:bg-emerald-600 dark:border-emerald-600' 
                              : 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 hover:border-emerald-500'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div className="space-y-4">
                    <label className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 opacity-60">
                      <Calendar className="w-3 h-3 mr-2" /> Release Year
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {years.map(year => (
                        <button 
                          key={year}
                          onClick={() => setSearchYear(year)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                            searchYear === year 
                              ? 'bg-[#002147] text-white border-[#002147] dark:bg-emerald-600 dark:border-emerald-600' 
                              : 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 hover:border-emerald-500'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Controls */}
                  <div className="space-y-4">
                    <label className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 opacity-60">
                      <SortAsc className="w-3 h-3 mr-2" /> Sort By
                    </label>
                    <div className="flex flex-col space-y-2">
                      {[
                        { id: 'relevance', label: 'Relevance' },
                        { id: 'newest', label: 'Newest First' },
                        { id: 'oldest', label: 'Oldest First' }
                      ].map(option => (
                        <button 
                          key={option.id}
                          onClick={() => setSortBy(option.id as any)}
                          className={`flex items-center justify-between px-6 py-4 rounded-2xl border font-bold text-sm transition-all ${
                            sortBy === option.id 
                              ? 'bg-[#002147]/5 text-[#002147] border-[#002147] dark:bg-emerald-600/10 dark:text-emerald-400 dark:border-emerald-500/50' 
                              : 'bg-transparent text-gray-500 border-gray-100 dark:border-white/10 hover:border-emerald-500/30'
                          }`}
                        >
                          {option.label}
                          {sortBy === option.id && <ShieldCheck className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Area */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-12">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-black italic text-[#002147] dark:text-white">
                      Found {searchResults.length} Agency Records
                    </h4>
                    {(searchQuery || searchCategory !== 'All' || searchYear !== 'All') && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSearchCategory('All');
                          setSearchYear('All');
                          setSortBy('relevance');
                        }}
                        className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                      >
                        Reset All Filters ×
                      </button>
                    )}
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.map((res, i) => (
                        <button 
                          key={i} 
                          onClick={() => { navigate(res.path); setIsSearchOpen(false); }}
                          className="group text-left p-8 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-transparent hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                              {res.category}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              {new Date(res.date).getFullYear()}
                            </span>
                          </div>
                          <h5 className="text-2xl font-black text-[#002147] dark:text-white mb-2 italic tracking-tight group-hover:text-emerald-500 transition-colors">
                            {res.title}
                          </h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium">
                            {res.description}
                          </p>
                          <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Access Node <ArrowUpRight className="ml-1 w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-24 text-center">
                      <div className="inline-flex p-6 bg-gray-50 dark:bg-white/5 rounded-full mb-6 text-gray-300">
                        <Search className="w-12 h-12" />
                      </div>
                      <p className="text-xl font-bold text-gray-400 italic">
                        No agency records found matching your current parameters.
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NASA-Style Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-32 bg-white dark:bg-gray-900 z-[180] overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(link.path)
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account</h3>
                <button
                  onClick={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{t.common.login}</span>
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language</h3>
                <div className="grid grid-cols-2 gap-2">
                  {languages.slice(0, 4).map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        lang === l.code
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  © 2024 SUPARCO Pakistan
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </>
  );
};

export default Header;
