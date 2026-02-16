import React, { useState } from 'react';
import { MOCK_METRICS } from '../constants';
import { MetricLog } from '../types';
import { Save, Plus, AlertTriangle } from 'lucide-react';

export const CorosData: React.FC = () => {
  const [data, setData] = useState<MetricLog[]>(MOCK_METRICS);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Helper to handle cell changes
  const handleChange = (id: string, field: keyof MetricLog, value: string) => {
    setData(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: Number(value) || value } : row
    ));
  };

  const addNewRow = () => {
    const newRow: MetricLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      vo2Max: 0,
      runningFitness: 0,
      trainingLoad: 0,
      volume: 0,
      fatigue: 0,
      restingHR: 0
    };
    setData([newRow, ...data]);
    setEditingId(newRow.id);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-stone-900 tracking-tight">Coros EvoLab Data</h2>
          <p className="text-stone-500 mt-1">Manual input override for non-synced sessions.</p>
        </div>
        <button 
          onClick={addNewRow}
          className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Add Entry</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-stone-50 text-stone-400 font-bold text-xs uppercase tracking-wider border-b border-stone-100">
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5">VO2 Max</th>
              <th className="px-8 py-5">Run Fitness</th>
              <th className="px-8 py-5">Training Load</th>
              <th className="px-8 py-5">Volume</th>
              <th className="px-8 py-5">Fatigue</th>
              <th className="px-8 py-5">Resting HR</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50 transition-colors group">
                <td className="px-8 py-5 whitespace-nowrap text-stone-600 font-medium">
                  {editingId === row.id ? (
                    <input 
                      type="date" 
                      value={row.date} 
                      onChange={(e) => handleChange(row.id, 'date', e.target.value)}
                      className="bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  ) : row.date}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-stone-900 font-bold">
                  {editingId === row.id ? (
                    <input 
                      type="number" 
                      value={row.vo2Max} 
                      onChange={(e) => handleChange(row.id, 'vo2Max', e.target.value)}
                      className="w-20 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  ) : row.vo2Max}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-stone-600">
                  {editingId === row.id ? (
                    <input 
                      type="number" 
                      value={row.runningFitness} 
                      onChange={(e) => handleChange(row.id, 'runningFitness', e.target.value)}
                      className="w-20 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  ) : row.runningFitness}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-stone-600">
                   {editingId === row.id ? (
                    <input 
                      type="number" 
                      value={row.trainingLoad} 
                      onChange={(e) => handleChange(row.id, 'trainingLoad', e.target.value)}
                      className="w-20 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      {row.trainingLoad}
                      {row.trainingLoad > 150 && <AlertTriangle size={14} className="text-orange-500" />}
                    </div>
                  )}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-stone-600">
                   {editingId === row.id ? (
                    <input 
                      type="number" 
                      value={row.volume} 
                      onChange={(e) => handleChange(row.id, 'volume', e.target.value)}
                      className="w-20 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  ) : row.volume}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-stone-600">
                   {editingId === row.id ? (
                    <input 
                      type="number" 
                      value={row.fatigue} 
                      onChange={(e) => handleChange(row.id, 'fatigue', e.target.value)}
                      className="w-20 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  ) : row.fatigue}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-stone-600">
                   {editingId === row.id ? (
                    <input 
                      type="number" 
                      value={row.restingHR} 
                      onChange={(e) => handleChange(row.id, 'restingHR', e.target.value)}
                      className="w-20 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  ) : row.restingHR}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-right">
                  {editingId === row.id ? (
                    <button 
                      onClick={() => setEditingId(null)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center justify-end gap-1 w-full"
                    >
                      <Save size={16} /> Save
                    </button>
                  ) : (
                    <button 
                      onClick={() => setEditingId(row.id)}
                      className="text-stone-400 hover:text-stone-900 font-medium text-sm"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-stone-900 p-6 rounded-[2rem] flex gap-6 text-white shadow-lg">
        <div className="text-yellow-400 mt-1">
          <AlertTriangle size={24} />
        </div>
        <div>
          <p className="text-sm font-bold mb-2">AI Safety Check</p>
          <p className="text-sm text-stone-300 leading-relaxed">
            I noticed your Fatigue score (68) is trending 15% higher than your Training Load increase. 
            This suggests incomplete recovery or non-training stress. I recommend updating your sleep logs or considering a recovery day.
          </p>
        </div>
      </div>
    </div>
  );
};