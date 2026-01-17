
import React from 'react';
import { Target, History, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="bg-[#002147] text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-black mb-8">About SUPARCO</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Founded in 1961, the Space & Upper Atmosphere Research Commission (SUPARCO) is the executive and national space agency of Pakistan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100">
            <Target className="w-12 h-12 text-emerald-600 mb-6" />
            <h2 className="text-3xl font-extrabold text-[#002147] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              To promote space science and technology and its peaceful applications for the socio-economic uplift of the country. We strive for excellence in satellite engineering, atmospheric research, and remote sensing.
            </p>
          </div>
          <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
            <Award className="w-12 h-12 text-blue-600 mb-6" />
            <h2 className="text-3xl font-extrabold text-[#002147] mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              To be a leading space agency globally by advancing our indigenous capabilities and contributing significantly to the international space community.
            </p>
          </div>
        </div>

        {/* History Timeline */}
        <div className="mb-24">
          <div className="flex items-center space-x-4 mb-12">
            <History className="w-8 h-8 text-[#002147]" />
            <h2 className="text-4xl font-extrabold text-[#002147]">A Legacy of Discovery</h2>
          </div>
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            {[
              { year: '1961', event: 'SUPARCO established by Nobel Laureate Dr. Abdus Salam.' },
              { year: '1962', event: 'Successful launch of Rehbar-I, the first sounding rocket in South Asia.' },
              { year: '1990', event: 'Launch of Badr-1, Pakistan\'s first indigenous satellite.' },
              { year: '2018', event: 'Successful launch of PRSS-1 and PakTES-1A from Jiuquan, China.' }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-12">
                <div className="absolute left-0 top-1.5 w-8 h-8 suparco-gradient rounded-full flex items-center justify-center text-white text-[10px] font-bold ring-4 ring-white">
                  {idx + 1}
                </div>
                <h3 className="text-emerald-600 font-black text-xl mb-1">{item.year}</h3>
                <p className="text-gray-600 font-medium">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div>
          <div className="flex items-center space-x-4 mb-12">
            <Users className="w-8 h-8 text-[#002147]" />
            <h2 className="text-4xl font-extrabold text-[#002147]">Leadership</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: 'Dr. Amer Nadeem', role: 'Chairman SUPARCO', bio: 'Leading the agency toward modernization and indigenous satellite programs.' },
              { name: 'Maj Gen (R) Sohail', role: 'Director General', bio: 'Focusing on strategic infrastructure and international space collaborations.' },
              { name: 'Dr. Sarah Ahmad', role: 'Chief Scientist', bio: 'Pioneering remote sensing applications for national agricultural security.' }
            ].map((leader, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-6"></div>
                <h3 className="text-xl font-bold text-[#002147] mb-1">{leader.name}</h3>
                <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4">{leader.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
