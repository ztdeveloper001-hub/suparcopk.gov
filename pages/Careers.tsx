
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, MapPin, ArrowRight, UserCheck, Star, 
  Search, Filter, Sparkles, Loader2, ShieldAlert, 
  Calendar, ChevronRight, X, Send, CheckCircle2,
  Globe
} from 'lucide-react';
import { useTranslation } from '../App';
import { Job, JobService } from '../services/JobService';
import { GoogleGenAI } from "@google/genai";

const Careers: React.FC = () => {
  const { t, lang } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ department: 'All', location: 'All' });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [userBackground, setUserBackground] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadJobs();
  }, [filters]);

  const loadJobs = async () => {
    setLoading(true);
    const data = await JobService.getJobs(filters);
    setJobs(data);
    setLoading(false);
  };

  const handleAiMatch = async () => {
    if (!userBackground.trim()) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have the following background: "${userBackground}". Based on the typical needs of a national space agency (SUPARCO), which department (Engineering, Space Ops, Science, IT, Administration) suits me best? Give a concise 2-sentence career recommendation.`,
      });
      setAiAnalysis(response.text || "Contact our HR for a personalized assessment.");
    } catch (e) {
      setAiAnalysis("Could not reach the AI career consultant. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pb-32 bg-white dark:bg-slate-950">
      {/* Immersive Hero */}
      <div className="bg-[#002147] relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Careers" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002147] to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-8">
            <Star className="w-4 h-4 fill-emerald-400" />
            <span>Pakistan's Premier Space Research Team</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter italic">Join the Mission</h1>
          <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            We are looking for the bold, the brilliant, and the driven to propel Pakistan into the next era of cosmic exploration.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: AI Matcher & Culture */}
          <div className="lg:col-span-4 space-y-8">
            {/* AI Career Matcher */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-32 h-32 text-emerald-500" />
              </div>
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#002147] dark:text-white">AI Career Matcher</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Powered by Gemini</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
                Not sure where you fit? Paste your bio or skills below and let our AI suggest a department.
              </p>
              <textarea 
                value={userBackground}
                onChange={(e) => setUserBackground(e.target.value)}
                placeholder="e.g. I am a software engineer with 5 years of experience in Python and IoT..."
                className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm outline-none focus:border-emerald-500 transition-all dark:text-white h-32 resize-none"
              />
              <button 
                onClick={handleAiMatch}
                disabled={isAnalyzing || !userBackground}
                className="w-full mt-4 py-4 bg-[#002147] dark:bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Analyze Background</span>}
              </button>
              {aiAnalysis && (
                <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 animate-in slide-in-from-top duration-300">
                  <p className="text-sm text-emerald-800 dark:text-emerald-400 font-bold leading-relaxed italic">"{aiAnalysis}"</p>
                </div>
              )}
            </div>

            {/* Cultural Values */}
            <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
              <h3 className="text-2xl font-black text-[#002147] dark:text-white mb-8 italic">Agency Life</h3>
              <div className="space-y-8">
                {[
                  { icon: UserCheck, title: 'Mentorship', desc: 'Work directly with industry legends and Nobel-nominated minds.' },
                  { icon: ShieldAlert, title: 'National Pride', desc: 'Every line of code and bolt tightened serves the future of Pakistan.' },
                  // Added Globe icon to fixed the "Cannot find name 'Globe'" error
                  { icon: Globe, title: 'Global Impact', desc: 'Collaborate with international space agencies on planetary defense.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 space-x-reverse">
                    <div className="p-3 bg-white dark:bg-white/5 rounded-2xl shadow-sm">
                      <item.icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002147] dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Job Listings */}
          <div className="lg:col-span-8 space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search mission roles..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:border-[#002147] transition-all"
                />
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <select
                  onChange={(e) => setFilters(f => ({ ...f, department: e.target.value }))}
                  className="px-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-bold text-sm outline-none cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  <option value="Space Operations">Space Ops</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Science">Science</option>
                  <option value="IT & Cyber">Cyber Security</option>
                </select>
                <button className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl hover:bg-gray-200 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Jobs Feed */}
            <div className="space-y-4">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="font-bold uppercase tracking-widest text-xs">Accessing Job Database...</p>
                </div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <div 
                    key={job.id} 
                    onClick={() => setSelectedJob(job)}
                    className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-emerald-500 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 space-x-reverse mb-3">
                        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                          <Calendar className="w-3 h-3 mr-1" /> Posted {job.postedDate}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-[#002147] dark:text-white group-hover:text-emerald-500 transition-colors tracking-tight">
                        {job.title}
                      </h3>
                      <div className="flex items-center mt-3 space-x-6 space-x-reverse text-sm font-medium text-gray-500">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-emerald-500" /> {job.location}</span>
                        <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-emerald-500" /> {job.type}</span>
                        <span className="hidden sm:flex items-center"><Star className="w-4 h-4 mr-1 text-emerald-500" /> {job.experience}</span>
                      </div>
                    </div>
                    <button className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:bg-[#002147] group-hover:text-white transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center bg-gray-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-gray-200">
                  <p className="text-gray-400 italic">No matching mission roles currently available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => { setSelectedJob(null); setIsApplying(false); }} />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-300">
            
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-8 py-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-[#002147] dark:text-white tracking-tighter italic">Job Details</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Ref: {selectedJob.id}</p>
              </div>
              <button onClick={() => { setSelectedJob(null); setIsApplying(false); }} className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="p-10">
              {isApplying ? (
                <ApplicationForm job={selectedJob} onCancel={() => setIsApplying(false)} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-10">
                    <section>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">The Role</h4>
                      <h3 className="text-4xl font-black text-[#002147] dark:text-white mb-6 leading-none">{selectedJob.title}</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        {selectedJob.description}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Mission Critical Requirements</h4>
                      <ul className="space-y-4">
                        {selectedJob.requirements.map((req, i) => (
                          <li key={i} className="flex items-start space-x-3 space-x-reverse">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-bold">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
                      <h5 className="font-black text-[#002147] dark:text-white uppercase tracking-widest text-xs mb-6">Snapshot</h5>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Clearance Required</p>
                          <p className="font-bold text-red-500 flex items-center"><ShieldAlert className="w-4 h-4 mr-2" /> {selectedJob.clearance}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Salary Range</p>
                          <p className="font-bold text-[#002147] dark:text-white">{selectedJob.salaryRange}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Office Location</p>
                          <p className="font-bold text-[#002147] dark:text-white">{selectedJob.location}, Pakistan</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsApplying(true)}
                      className="w-full py-5 bg-[#002147] dark:bg-emerald-600 text-white rounded-3xl font-black text-lg shadow-2xl hover:opacity-95 transition-all active:scale-95 flex items-center justify-center"
                    >
                      Begin Application <Send className="ml-3 w-5 h-5" />
                    </button>
                    <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                      By applying, you agree to rigorous background security vetting as per National Space Policy.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationForm: React.FC<{ job: Job; onCancel: () => void }> = ({ job, onCancel }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await JobService.submitApplication(job.id, {});
    setSubmitting(false);
    if (success) setSuccess(true);
  };

  if (success) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-4xl font-black text-[#002147] dark:text-white mb-4 italic">Mission Received</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Your application for <span className="text-emerald-600 font-bold">{job.title}</span> has been securely transmitted to our HR division. Expect a response within 14 Earth days.
        </p>
        <button 
          onClick={onCancel}
          className="mt-10 px-12 py-4 bg-[#002147] dark:bg-white/10 rounded-2xl font-black text-white hover:opacity-80 transition-all"
        >
          Return to Portal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex justify-between items-center mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= s ? 'bg-[#002147] text-white' : 'bg-gray-100 text-gray-400'}`}>
              {s}
            </div>
            {s < 3 && <div className={`w-20 md:w-32 h-1 mx-2 rounded-full ${step > s ? 'bg-[#002147]' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-2xl font-black text-[#002147] dark:text-white">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl" />
              <input type="text" placeholder="Last Name" required className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl" />
            </div>
            <input type="email" placeholder="Email Address" required className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl" />
            <input type="tel" placeholder="Phone Number" required className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-2xl font-black text-[#002147] dark:text-white">Professional Background</h3>
            <input type="text" placeholder="Current Company / University" className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl" />
            <input type="text" placeholder="LinkedIn Profile URL" className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl" />
            <div className="p-10 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[2rem] text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Upload CV / Portfolio (PDF)</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-2xl font-black text-[#002147] dark:text-white">Mission Statement</h3>
            <p className="text-sm text-gray-500">Why are you the right fit for SUPARCO's vision?</p>
            <textarea placeholder="Your statement..." className="w-full p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2rem] h-48" />
          </div>
        )}

        <div className="flex justify-between pt-10 border-t border-gray-100 dark:border-white/5">
          <button 
            type="button"
            onClick={() => step === 1 ? onCancel() : setStep(step - 1)}
            className="px-8 py-4 text-gray-400 font-black uppercase tracking-widest text-xs hover:text-[#002147] transition-all"
          >
            {step === 1 ? 'Discard' : 'Go Back'}
          </button>
          <button 
            type="button"
            onClick={() => step < 3 ? setStep(step + 1) : handleSubmit({} as any)}
            disabled={submitting}
            className="px-12 py-4 bg-[#002147] dark:bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:opacity-90 transition-all flex items-center"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : step === 3 ? 'Final Submit' : 'Next Step'}
            {step < 3 && <ArrowRight className="ml-2 w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Careers;
