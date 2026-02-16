import React from 'react';
import { ChevronRight, CheckCircle2, Circle, Trophy } from 'lucide-react';

const PlanItem = ({ title, subtitle, status, isTarget }: any) => (
  <div className={`
    flex items-center p-6 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors cursor-pointer group
    ${isTarget ? 'bg-yellow-50' : ''}
  `}>
    <div className="mr-6 text-stone-300 group-hover:text-stone-900 transition-colors">
      {status === 'done' ? <CheckCircle2 size={24} className="text-stone-900" /> : <Circle size={24} />}
    </div>
    <div className="flex-1">
      <h4 className={`font-semibold text-lg ${isTarget ? 'text-stone-900' : 'text-stone-700'}`}>{title}</h4>
      <p className="text-sm text-stone-400 mt-1">{subtitle}</p>
    </div>
    {isTarget && <Trophy size={20} className="text-yellow-500 mr-6" />}
    <ChevronRight size={20} className="text-stone-300 group-hover:text-stone-500" />
  </div>
);

export const PlanOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-stone-900 tracking-tight mb-2">The Roadmap</h2>
        <p className="text-stone-500">Project <span className="text-stone-900 font-bold">Sub 2:20</span> - 5 Year Macrocycle</p>
      </div>

      <div className="grid gap-10">
        {/* Current Macrocycle */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-yellow-400 rounded-full"></span>
              2025 Season: The Breakthrough
            </h3>
            <span className="text-[10px] font-bold text-stone-400 border border-stone-200 px-3 py-1.5 rounded-full uppercase tracking-wide">MACROCYCLE 3/5</span>
          </div>
          
          <div className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-sm">
            <PlanItem title="Phase 1: Aerobic Capacity Expansion" subtitle="Jan - Mar • Focus on high volume, low intensity." status="done" />
            <PlanItem title="Phase 2: Lactate Threshold Development" subtitle="Apr - Jun • Raising the floor." status="done" />
            <PlanItem title="Phase 3: Specific Marathon Prep" subtitle="Jul - Sep • Race specific specificity." status="current" />
            <PlanItem title="Berlin Marathon 2025" subtitle="Sep 29 • Target: 2:19:59" status="future" isTarget={true} />
            <PlanItem title="Phase 4: Recovery & Mechanics" subtitle="Oct - Dec • Strength & biomechanics reset." status="future" />
          </div>
        </section>

        {/* Current Mesocycle Breakdown */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-stone-900 rounded-full"></span>
              Current Mesocycle: Peak Volume
            </h3>
            <span className="text-[10px] font-bold text-stone-400 border border-stone-200 px-3 py-1.5 rounded-full uppercase tracking-wide">WEEKS 8-12</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm opacity-50">
                <p className="text-[10px] text-stone-400 font-bold mb-2 uppercase">WEEK 1</p>
                <p className="font-bold text-stone-900 text-xl">110km</p>
                <p className="text-xs text-stone-500 mt-2 font-medium">Completed</p>
             </div>
             <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm opacity-50">
                <p className="text-[10px] text-stone-400 font-bold mb-2 uppercase">WEEK 2</p>
                <p className="font-bold text-stone-900 text-xl">125km</p>
                <p className="text-xs text-stone-500 mt-2 font-medium">Completed</p>
             </div>
             <div className="bg-stone-900 border border-stone-900 p-6 rounded-3xl shadow-xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500 rounded-bl-full -mr-12 -mt-12 opacity-20"></div>
                <p className="text-[10px] text-yellow-400 mb-2 font-bold uppercase">CURRENT</p>
                <p className="font-bold text-white text-3xl">140km</p>
                <p className="text-xs text-stone-400 mt-2">Focus: Long Run Durability</p>
             </div>
             <div className="bg-white border border-dashed border-stone-300 p-6 rounded-3xl">
                <p className="text-[10px] text-stone-400 font-bold mb-2 uppercase">WEEK 4</p>
                <p className="font-bold text-stone-400 text-xl">90km (Deload)</p>
                <p className="text-xs text-stone-400 mt-2">Scheduled</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};