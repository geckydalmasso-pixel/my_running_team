import React from 'react';
import { CURRENT_WEEK_WORKOUTS } from '../constants';
import { Workout } from '../types';
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';

interface WeeklyViewProps {
  onSelectWorkout: (workout: Workout) => void;
}

export const WeeklyView: React.FC<WeeklyViewProps> = ({ onSelectWorkout }) => {
  return (
    <div className="h-full flex flex-col animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-semibold text-stone-900 tracking-tight">Weekly Schedule</h2>
           <p className="text-stone-500 mt-1">Week 8 of 12 • Specific Prep</p>
        </div>
        <div className="flex items-center gap-2 text-stone-500 font-medium text-sm bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm">
           <Calendar size={16} />
           <span>Oct 23 - Oct 29</span>
        </div>
      </div>

      <div className="space-y-4">
          {CURRENT_WEEK_WORKOUTS.map((workout) => (
            <div 
              key={workout.id} 
              onClick={() => onSelectWorkout(workout)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                workout.completed 
                  ? 'bg-stone-50 border-stone-100 opacity-80 hover:opacity-100' 
                  : 'bg-white border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-6 items-center">
                  <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border ${
                    workout.completed ? 'bg-white border-stone-200' : 'bg-stone-900 border-stone-900 text-white'
                  }`}>
                    <span className={`text-xs font-bold uppercase ${workout.completed ? 'text-stone-400' : 'text-stone-400'}`}>{workout.day}</span>
                    <span className={`text-xl font-bold ${workout.completed ? 'text-stone-900' : 'text-white'}`}>{workout.date.split(' ')[1]}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-yellow-600 transition-colors">{workout.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-stone-500 mt-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        workout.type === 'Rest' || workout.type === 'Recovery' 
                        ? 'bg-stone-100 text-stone-600' 
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>{workout.type}</span>
                      <span>{workout.distance}</span>
                      <span>{workout.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="hidden md:block text-right">
                      <span className={`text-xs font-bold uppercase block ${
                         workout.intensity === 'Severe' ? 'text-red-500' :
                         workout.intensity === 'High' ? 'text-orange-500' : 'text-stone-400'
                      }`}>{workout.intensity} Intensity</span>
                   </div>
                   
                   {workout.completed ? (
                     <div className="flex items-center gap-2 text-stone-400 bg-stone-100 px-3 py-1.5 rounded-full">
                       <CheckCircle2 size={16} />
                       <span className="text-xs font-bold uppercase">Done</span>
                     </div>
                   ) : (
                     <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-yellow-400 group-hover:text-stone-900 transition-all">
                       <ArrowRight size={20} />
                     </div>
                   )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};