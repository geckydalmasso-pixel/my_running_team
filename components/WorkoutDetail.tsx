import React, { useState } from 'react';
import { Workout } from '../types';
import { UploadCloud, ChevronLeft, Flag, MapPin, Timer, Zap, Heart, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

interface WorkoutDetailProps {
  workout: Workout;
  onBack: () => void;
}

// Mock Analysis Data (generated after upload)
const MOCK_GPX_DATA = Array.from({ length: 60 }, (_, i) => ({
  time: i,
  pace: 180 + Math.random() * 20 + (i > 30 ? 10 : 0), // Pace seconds/km (mocked)
  hr: 130 + (i * 0.8) + Math.random() * 5,
  elevation: 10 + Math.sin(i/10) * 5
}));

export const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workout, onBack }) => {
  const [viewMode, setViewMode] = useState<'briefing' | 'analysis'>(workout.completed ? 'analysis' : 'briefing');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setViewMode('analysis');
    }, 2000);
  };

  const formatPace = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-3 bg-white rounded-full shadow-sm text-stone-500 hover:text-stone-900 transition-colors border border-stone-100">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">{workout.title}</h1>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <span>{workout.day}, {workout.date}</span>
            <span>•</span>
            <span className={`${
              workout.intensity === 'Severe' ? 'text-red-500' : 
              workout.intensity === 'High' ? 'text-orange-500' : 'text-stone-900'
            }`}>{workout.intensity} Intensity</span>
          </div>
        </div>
        <div className="ml-auto flex bg-white p-1 rounded-2xl border border-stone-200 shadow-sm">
          <button
            onClick={() => setViewMode('briefing')}
            className={`px-5 py-2 text-sm font-medium rounded-xl transition-all ${
              viewMode === 'briefing' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Briefing
          </button>
          <button
            disabled={!workout.completed && viewMode !== 'analysis'}
            className={`px-5 py-2 text-sm font-medium rounded-xl transition-all ${
              viewMode === 'analysis' ? 'bg-yellow-400 text-stone-900 shadow-sm' : 'text-stone-500'
            }`}
          >
            Analysis
          </button>
        </div>
      </div>

      {viewMode === 'briefing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Plan Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-stone-100 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
               {/* Soft gradient blob */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
               
               <h3 className="font-bold text-stone-900 mb-8 flex items-center gap-3 text-lg relative z-10">
                 <div className="bg-yellow-100 p-2 rounded-lg text-yellow-700">
                    <Flag size={20} />
                 </div>
                 Workout Structure
               </h3>
               
               <div className="space-y-0 relative z-10">
                  {workout.structure ? workout.structure.map((step, idx) => (
                    <div key={idx} className="relative pl-8 pb-8 border-l-2 border-stone-100 last:border-0 last:pb-0">
                      <div className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white ${
                        step.type === 'Active' ? 'bg-yellow-400' : 
                        step.type === 'Rest' ? 'bg-stone-300' : 'bg-blue-400'
                      }`}></div>
                      <div className="bg-stone-50 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                           <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${
                             step.type === 'Active' ? 'text-yellow-600' : 'text-stone-400'
                           }`}>{step.type}</span>
                           <span className="text-stone-900 font-bold text-lg">{step.description}</span>
                        </div>
                        <div className="flex gap-6 md:text-right">
                          <div>
                            <span className="block text-[10px] text-stone-400 uppercase font-bold">Duration</span>
                            <span className="text-stone-700 font-medium">{step.duration}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-stone-400 uppercase font-bold">Target</span>
                            <span className="font-bold text-stone-900">{step.target}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-stone-400 italic">No structured details available for this workout.</p>
                  )}
               </div>
            </div>

            {/* Coach Notes */}
            <div className="bg-[#1C1917] text-white p-8 rounded-[2rem] flex gap-6 shadow-xl">
               <div className="mt-1 text-yellow-400"><Zap size={28} /></div>
               <div>
                 <h4 className="font-bold text-white mb-2 text-lg">Coach's Instructions</h4>
                 <p className="text-stone-300 leading-relaxed">
                   {workout.coachNotes || "Execute the plan as prescribed. Focus on form when fatigued."}
                 </p>
               </div>
            </div>
          </div>

          {/* Sidebar Upload */}
          <div className="space-y-8">
            <div className="bg-white border border-stone-100 rounded-[2rem] p-8 text-center shadow-sm">
               <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-400">
                 <UploadCloud size={32} />
               </div>
               <h3 className="text-stone-900 font-bold mb-2 text-lg">Upload Data</h3>
               <p className="text-sm text-stone-500 mb-8 px-4">Import GPX/FIT file to unlock AI Analysis.</p>
               
               {isUploading ? (
                 <div className="flex flex-col items-center justify-center py-2">
                    <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-2"></div>
                    <span className="text-xs text-stone-500 animate-pulse">Processing...</span>
                 </div>
               ) : (
                 <button 
                   onClick={handleUpload}
                   className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
                 >
                   Select File
                 </button>
               )}
            </div>

            <div className="bg-white border border-stone-100 rounded-[2rem] p-8 shadow-sm">
               <h4 className="text-stone-400 text-xs font-bold uppercase mb-6 tracking-wider">Target Metrics</h4>
               <div className="space-y-5">
                 <div className="flex justify-between items-center">
                   <span className="text-stone-500 text-sm font-medium">Total Distance</span>
                   <span className="text-stone-900 font-bold">{workout.distance}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-stone-500 text-sm font-medium">Est. Duration</span>
                   <span className="text-stone-900 font-bold">{workout.duration}</span>
                 </div>
                 <div className="w-full h-px bg-stone-100 my-2"></div>
                 <div className="flex justify-between items-center">
                   <span className="text-stone-500 text-sm font-medium">Intensity Score</span>
                   <span className="text-stone-900 font-bold">145 TSS</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'analysis' && (
        <div className="space-y-8">
           {/* Top Stats Bar */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm text-center">
                 <span className="text-[10px] text-stone-400 uppercase block mb-1 font-bold">Distance</span>
                 <span className="text-2xl font-bold text-stone-900">18.02 <span className="text-xs text-stone-400">km</span></span>
              </div>
              <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm text-center">
                 <span className="text-[10px] text-stone-400 uppercase block mb-1 font-bold">Time</span>
                 <span className="text-2xl font-bold text-stone-900">1:04:12</span>
              </div>
              <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm text-center">
                 <span className="text-[10px] text-stone-400 uppercase block mb-1 font-bold">Avg Pace</span>
                 <span className="text-2xl font-bold text-stone-900">3:34 <span className="text-xs text-stone-400">/km</span></span>
              </div>
              <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm text-center">
                 <span className="text-[10px] text-stone-400 uppercase block mb-1 font-bold">Avg HR</span>
                 <span className="text-2xl font-bold text-stone-900">164 <span className="text-xs text-stone-400">bpm</span></span>
              </div>
              <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm text-center">
                 <span className="text-[10px] text-stone-400 uppercase block mb-1 font-bold">Power</span>
                 <span className="text-2xl font-bold text-stone-900">310 <span className="text-xs text-stone-400">W</span></span>
              </div>
           </div>

           {/* Coach Comment */}
           <div className="bg-[#1C1917] p-8 rounded-[2rem] flex gap-6 shadow-lg text-white">
              <div className="bg-yellow-400 p-3 rounded-full h-fit text-stone-900">
                <CheckCircle2 size={24} />
              </div>
              <div>
                 <h4 className="font-bold text-white mb-2 text-lg">Workout Executed Perfectly</h4>
                 <p className="text-stone-300 leading-relaxed text-sm">
                   Alessandro, this was a textbook execution. You nailed the threshold blocks at 3:05/km with extremely stable heart rate (cardiac drift &lt; 2%). 
                   The float recovery was a bit fast (3:40/km vs target 3:45/km), which increased the overall load, but you handled it well. 
                   Recovery tomorrow is non-negotiable.
                 </p>
              </div>
           </div>

           {/* Graphs */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-stone-100 rounded-[2rem] p-8 h-96 shadow-sm">
                 <h4 className="font-bold text-stone-900 mb-6 flex items-center gap-2">
                   <Activity size={18} className="text-yellow-500" /> Pace & Heart Rate Analysis
                 </h4>
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MOCK_GPX_DATA}>
                      <defs>
                        <linearGradient id="colorHR" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" vertical={false} />
                      <XAxis dataKey="time" tick={{fill: '#A8A29E'}} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" orientation="left" domain={[100, 200]} tick={{fill: '#ef4444'}} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" domain={[150, 240]} tick={{fill: '#10b981'}} axisLine={false} tickFormatter={(val) => formatPace(val)} />
                      <Tooltip contentStyle={{backgroundColor: '#fff', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderRadius: '12px'}} />
                      <Area yAxisId="left" type="monotone" dataKey="hr" stroke="#ef4444" fill="url(#colorHR)" name="Heart Rate" />
                      <Line yAxisId="right" type="monotone" dataKey="pace" stroke="#10b981" strokeWidth={2} dot={false} name="Pace (s/km)" />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="bg-white border border-stone-100 rounded-[2rem] p-8 shadow-sm overflow-y-auto max-h-96">
                 <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                   <Timer size={18} className="text-yellow-500" /> Splits
                 </h4>
                 <table className="w-full text-sm">
                   <thead className="text-stone-400 text-xs uppercase text-left">
                     <tr>
                       <th className="pb-4 pl-2">KM</th>
                       <th className="pb-4">Pace</th>
                       <th className="pb-4">HR</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-stone-100 text-stone-600 font-medium">
                     {[...Array(18)].map((_, i) => (
                       <tr key={i}>
                         <td className="py-3 pl-2 text-stone-400">{i + 1}</td>
                         <td className={`py-3 ${(i > 2 && i < 15) ? 'text-stone-900 font-bold' : ''}`}>
                           3:{Math.floor(Math.random() * 10) + (i > 2 && i < 15 ? 0 : 30) < 10 ? '0' : ''}{Math.floor(Math.random() * 10) + (i > 2 && i < 15 ? 4 : 35)}
                         </td>
                         <td className="py-3">1{60 + Math.floor(Math.random() * 10)}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};