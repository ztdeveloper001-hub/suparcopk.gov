import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Send, CheckCircle, Rocket, Globe, Newspaper, Shield, Mail } from 'lucide-react';
import { useTranslation } from '../App';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <><footer className="bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-300 pt-16 pb-8 border-t border-gray-200 dark:border-white/5 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse mb-6">
              <img
                src="/suparco-logo.jpg"
                alt="SUPARCO Logo"
                className="w-12 h-12 rounded-full shadow-lg object-contain"
              />
              <div>
                <h3 className="text-[#002147] dark:text-white font-bold text-2xl tracking-tight">SUPARCO</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Pakistan Space Agency</p>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {[Facebook, Twitter, Youtube, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" aria-label={`Social link ${idx}`} className="group p-3 bg-white dark:bg-white/5 rounded-full shadow-sm hover:shadow-lg hover:bg-[#002147] dark:hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                  <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm flex items-center">
              <Rocket className="w-4 h-4 mr-2 text-blue-600" />
              Focus
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/missions" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                <Rocket className="w-3 h-3 mr-2 opacity-60" />
                {t.nav.missions}
              </Link></li>
              <li><Link to="/science" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                <Globe className="w-3 h-3 mr-2 opacity-60" />
                {t.nav.science}
              </Link></li>
              <li><Link to="/news" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                <Newspaper className="w-3 h-3 mr-2 opacity-60" />
                {t.nav.news}
              </Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Transparency</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.nav.careers}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm flex items-center">
              <Mail className="w-4 h-4 mr-2 text-blue-600" />
              {t.footer.stayUpdated}
            </h4>
            <p className="text-xs text-gray-500 mb-4">{t.footer.newsletterSub}</p>
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-blue-600 font-bold p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg animate-in fade-in duration-300">
                <CheckCircle className="w-5 h-5" />
                <span>Subscribed Successfully!</span>
              </div>
            ) : (
              <form className="relative" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  required
                  className="w-full py-3 px-4 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-[#002147] dark:focus:border-blue-600 outline-none text-sm pr-12 transition-all dark:text-white"
                  aria-label="Newsletter email" />
                <button type="submit" className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" aria-label="Subscribe">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} SUPARCO Pakistan. {t.footer.rights}</p>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
            <Link to="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400">Sitemap</Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Use</Link>
          </div>
        </div>
      </footer></>
  );
};

export default Footer;


