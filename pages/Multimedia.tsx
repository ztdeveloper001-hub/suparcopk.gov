
import React, { useState } from 'react';
import { Image as ImageIcon, Video, Maximize2, Play } from 'lucide-react';

const Multimedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos'>('all');

  const items = [
    { type: 'image', url: 'https://picsum.photos/id/52/600/400', title: 'Ground Control Karachi' },
    { type: 'video', url: 'https://picsum.photos/id/53/600/400', title: 'PRSS-1 Launch Highlights' },
    { type: 'image', url: 'https://picsum.photos/id/54/600/400', title: 'Solar Array Deployment' },
    { type: 'image', url: 'https://picsum.photos/id/55/600/400', title: 'Clean Room Operations' },
    { type: 'video', url: 'https://picsum.photos/id/56/600/400', title: 'Atmospheric Research Flight' },
    { type: 'image', url: 'https://picsum.photos/id/57/600/400', title: 'Satellite Telemetry Chart' },
  ];

  const filteredItems = activeTab === 'all' ? items : items.filter(i => i.type === (activeTab === 'images' ? 'image' : 'video'));

  return (
    <div className="pb-20">
      <div className="bg-[#002147] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-6">Multimedia Hub</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Explore the beauty of space science through our curated collections of imagery and video.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'images', 'videos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all capitalize ${
                activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl cursor-pointer">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                {item.type === 'video' ? (
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 fill-white text-white" />
                  </div>
                ) : (
                  <Maximize2 className="w-10 h-10 text-white" />
                )}
              </div>
              <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black via-black/60 to-transparent">
                <div className="flex items-center space-x-2">
                  {item.type === 'video' ? <Video className="w-4 h-4 text-emerald-400" /> : <ImageIcon className="w-4 h-4 text-emerald-400" />}
                  <span className="text-white font-bold">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Multimedia;
