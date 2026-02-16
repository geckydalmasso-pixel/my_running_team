import React, { useState } from 'react';
import { CURRENT_USER } from '../constants';
import { Save, User, Heart, Scale, Ruler, Activity } from 'lucide-react';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState(CURRENT_USER);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const InputGroup = ({ label, value, field, unit, icon: Icon }: any) => (
    <div className="bg-white border border-stone-100 p-6 rounded-[2rem] flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6">
        <div className="p-4 bg-stone-50 rounded-2xl text-stone-900">
           <Icon size={24} />
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1">{label}</label>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              value={value}
              onChange={(e) => setProfile({...profile, [field]: Number(e.target.value)})}
              className="bg-transparent text-3xl font-bold text-stone-900 w-24 focus:outline-none border-b-2 border-transparent focus:border-yellow-400 transition-all"
            />
            <span className="text-stone-500 font-medium">{unit}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-stone-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Athlete Profile</h2>
          <p className="text-stone-500 mt-1">Biometrics & Physiology Configuration</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
            isSaved 
              ? 'bg-green-500 text-white' 
              : 'bg-stone-900 text-white hover:bg-stone-800'
          }`}
        >
          {isSaved ? (
            <>Saved Successfully</>
          ) : (
            <><Save size={18} /> Save Changes</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Weight" value={profile.weight} field="weight" unit="kg" icon={Scale} />
        <InputGroup label="Height" value={profile.height} field="height" unit="cm" icon={Ruler} />
        <InputGroup label="Max Heart Rate" value={profile.maxHR} field="maxHR" unit="bpm" icon={Heart} />
        <InputGroup label="Resting Heart Rate" value={profile.restingHR} field="restingHR" unit="bpm" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div className="bg-white border border-stone-100 rounded-[2rem] p-8 shadow-sm">
           <h3 className="font-bold text-stone-900 mb-6 flex items-center gap-2 text-lg">
             <Activity size={20} className="text-yellow-500" />
             Calculated Heart Rate Zones
           </h3>
           <div className="space-y-5">
              <div className="flex justify-between items-center text-sm">
                 <span className="text-stone-500 font-medium">Zone 1 (Recovery)</span>
                 <span className="font-mono text-stone-900 font-bold">{Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.5)} - {Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.6)} bpm</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-stone-300 w-full opacity-50"></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                 <span className="text-stone-500 font-medium">Zone 2 (Aerobic)</span>
                 <span className="font-mono text-stone-900 font-bold">{Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.6)} - {Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.7)} bpm</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 w-full opacity-70"></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                 <span className="text-stone-500 font-medium">Zone 3 (Tempo)</span>
                 <span className="font-mono text-stone-900 font-bold">{Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.7)} - {Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.8)} bpm</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-yellow-400 w-full opacity-80"></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                 <span className="text-stone-500 font-medium">Zone 4 (Threshold)</span>
                 <span className="font-mono text-stone-900 font-bold">{Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.8)} - {Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.9)} bpm</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-orange-500 w-full opacity-80"></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                 <span className="text-stone-500 font-medium">Zone 5 (VO2 Max)</span>
                 <span className="font-mono text-stone-900 font-bold">{Math.round(profile.restingHR + (profile.maxHR - profile.restingHR) * 0.9)}+ bpm</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                 <div className="h-full bg-red-500 w-full opacity-80"></div>
              </div>
           </div>
        </div>

        <div className="bg-stone-100 border border-stone-200 rounded-[2rem] p-8 shadow-inner">
           <h3 className="font-bold text-stone-900 mb-4 text-lg">Physiology Notes</h3>
           <p className="text-sm text-stone-600 leading-relaxed">
             Based on your max heart rate of <span className="text-stone-900 font-bold">{profile.maxHR}</span> and resting heart rate of <span className="text-stone-900 font-bold">{profile.restingHR}</span>, your Heart Rate Reserve (HRR) is {profile.maxHR - profile.restingHR}. 
             <br/><br/>
             Your current weight of <span className="text-stone-900 font-bold">{profile.weight}kg</span> places you at a power-to-weight ratio optimal for sub-3:00/km pacing, provided relative strength is maintained.
           </p>
           <div className="mt-8 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm">
              <span className="text-yellow-600 text-[10px] font-bold uppercase tracking-wider">AI Recommendation</span>
              <p className="text-stone-700 text-sm mt-2 font-medium">
                Update your weight weekly, ideally on Friday mornings before the long run block, to track hydration status and fueling efficiency.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};