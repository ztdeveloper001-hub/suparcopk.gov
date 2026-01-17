
import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pb-24">
      <div className="bg-gray-50 border-b border-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black text-[#002147] mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl">Have questions about our missions, services, or research? Our team is here to help.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                  <input type="text" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#002147] transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#002147] transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Subject</label>
                <select className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#002147] transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Remote Sensing Services</option>
                  <option>Career Opportunities</option>
                  <option>Media & Press</option>
                  <option>University Collaboration</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea rows={5} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#002147] transition-all resize-none" placeholder="Your message here..."></textarea>
              </div>
              <button className="px-10 py-4 bg-[#002147] text-white rounded-xl font-bold flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/20">
                Send Message <Send className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-[#002147] mb-8">Headquarters</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Karachi HQ</h3>
                    <p className="text-gray-500">Sector 28, Gulzar-e-Hijri, Off University Road, Karachi, Pakistan.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Call Center</h3>
                    <p className="text-gray-500">+92-21-34650765-79</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Mon - Fri: 9AM to 5PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">General Email</h3>
                    <p className="text-gray-500">info@suparco.gov.pk</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden h-80 border border-gray-200 relative grayscale hover:grayscale-0 transition-all duration-500 cursor-crosshair">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <img src="https://picsum.photos/id/164/800/400" alt="Map" className="w-full h-full object-cover opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                   </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#002147] border border-gray-200">
                Open in Google Maps
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
