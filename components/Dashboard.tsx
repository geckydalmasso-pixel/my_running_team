import React from 'react';
import { View } from '../types';
import { CURRENT_USER, CURRENT_WEEK_WORKOUTS, MOCK_METRICS } from '../constants';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Timer, TrendingUp, Activity, Zap, UploadCloud, ChevronRight, Play } from 'lucide-react';

interface DashboardProps {
  setView: (view: View) => void;
}

const MetricCard = ({ title, value, unit, trend, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-between h-full">
    <div className="flex justify-between items-start mb-2">
       <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">{title}</span>
       <Icon size={16} className="text-stone-900" />
    </div>
    <div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-light text-stone-900 tracking-tight">{value}</span>
        <span className="text-xs text-stone-400">{unit}</span>
      </div>
      <div className="mt-2 text-xs font-medium inline-flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-full text-stone-600">
        {trend}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const nextWorkout = CURRENT_WEEK_WORKOUTS.find(w => !w.completed) || CURRENT_WEEK_WORKOUTS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-500">
                Project Sub 2:20
             </div>
          </div>
          <h2 className="text-4xl font-semibold text-stone-900 tracking-tight">Welcome in, {CURRENT_USER.name}</h2>
          <p className="text-stone-500 mt-2">
             Current Phase: <span className="text-stone-900 font-medium">{CURRENT_USER.currentPhase}</span>
          </p>
        </div>
        <div className="bg-white border border-stone-100 px-6 py-3 rounded-full shadow-sm flex items-center gap-4">
          <div className="text-right">
             <span className="block text-[10px] text-stone-400 font-bold uppercase">Readiness</span>
             <span className="text-xl font-bold text-stone-900">84%</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-stone-900">
             <Zap size={20} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Next Workout Card - THE DARK CARD from Screenshot */}
        <div 
          onClick={() => setView(View.WEEKLY)}
          className="lg:col-span-2 bg-[#1C1917] rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer text-white shadow-xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Timer size={180} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="inline-block px-4 py-1.5 bg-stone-800 text-stone-300 rounded-full text-xs font-medium">
                  Up Next
                </span>
                <div className="bg-yellow-400 p-2 rounded-full text-stone-900 transition-transform group-hover:scale-110">
                  <ChevronRight size={20} />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-medium text-white mb-2">{nextWorkout.title}</h3>
              <p className="text-stone-400 line-clamp-2 max-w-lg text-sm leading-relaxed mb-6">
                {nextWorkout.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                 <div className="flex items-center gap-2 bg-stone-800/50 px-3 py-1.5 rounded-lg border border-stone-700">
                    <Timer size={14} className="text-yellow-400" />
                    <span>{nextWorkout.duration}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-stone-800/50 px-3 py-1.5 rounded-lg border border-stone-700">
                    <Activity size={14} className="text-yellow-400" />
                    <span>{nextWorkout.distance}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-stone-800/50 px-3 py-1.5 rounded-lg border border-stone-700">
                    <TrendingUp size={14} className="text-yellow-400" />
                    <span>{nextWorkout.intensity}</span>
                 </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-800 flex justify-between items-center">
               <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-stone-700 border-2 border-[#1C1917] flex items-center justify-center text-[10px]">AI</div>
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-[#1C1917] flex items-center justify-center text-stone-900 font-bold text-[10px]">ME</div>
               </div>
               <button 
                 onClick={(e) => { e.stopPropagation(); setView(View.WEEKLY); }}
                 className="flex items-center gap-2 text-stone-300 text-sm hover:text-yellow-400 transition-colors"
               >
                 <UploadCloud size={16} />
                 <span>Upload GPX to Analyze</span>
               </button>
            </div>
          </div>
        </div>

        {/* EvoLab Status - Refined Circular Widget */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-100 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Decorative Ring */}
          <div className="absolute -right-16 -top-16 w-64 h-64 border-[30px] border-stone-50 rounded-full opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10 w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-lg text-stone-900">EvoLab Metrics</h4>
              <div className="w-8 h-8 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors cursor-pointer">
                <ChevronRight size={16} />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center mb-4">
               <div className="relative w-52 h-52 flex items-center justify-center">
                  {/* High Quality SVG Ring */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                     {/* Background Track */}
                     <circle 
                        cx="60" 
                        cy="60" 
                        r="52" 
                        stroke="#F5F5F4" 
                        strokeWidth="8" 
                        fill="none" 
                     />
                     {/* Progress Arc */}
                     <circle 
                        cx="60" 
                        cy="60" 
                        r="52" 
                        stroke="#FACC15" 
                        strokeWidth="8" 
                        fill="none" 
                        strokeDasharray="326.72" /* 2 * PI * 52 */
                        strokeDashoffset="75" /* ~77% fill */
                        strokeLinecap="round" 
                     />
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-5xl font-bold text-stone-900 tracking-tighter leading-none">71.2</span>
                     <span className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-2">VO2 Max</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                  <span className="block text-xl font-bold text-stone-900">103</span>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Fitness</span>
               </div>
               <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                  <span className="block text-xl font-bold text-stone-900">68</span>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Fatigue</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <MetricCard title="Training Load" value="155" unit="TL" trend="+12%" icon={Zap} />
        <MetricCard title="Resting HR" value="45" unit="bpm" trend="+2%" icon={Activity} />
        <MetricCard title="Threshold Pace" value="3:05" unit="/km" trend="-2s" icon={TrendingUp} />
        <MetricCard title="Weekly Volume" value="128" unit="km" trend="+8km" icon={Timer} />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-100 h-96">
        <div className="flex justify-between items-center mb-8">
           <h4 className="font-semibold text-xl text-stone-900">Volume Progression</h4>
           <div className="flex gap-2">
              <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Weekly</span>
              <span className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-400">Monthly</span>
           </div>
        </div>
        
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={MOCK_METRICS}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4}/> {/* Yellow fade */}
                <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" vertical={false} />
            <XAxis dataKey="date" tick={{fill: '#A8A29E', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(str) => str.slice(5)} />
            <YAxis tick={{fill: '#A8A29E', fontSize: 12}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{backgroundColor: '#FFFFFF', border: 'none', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', color: '#1C1917'}}
              itemStyle={{color: '#EAB308'}}
            />
            <Area type="monotone" dataKey="volume" stroke="#EAB308" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" name="Kilometers" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};