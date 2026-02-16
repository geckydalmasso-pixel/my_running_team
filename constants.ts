import { MetricLog, Workout, ChatMessage } from './types';

// Mock Data for an Elite Athlete targeting Sub 2:20 Marathon
export const CURRENT_USER = {
  name: "Alessandro",
  targetRace: "Berlin Marathon 2025",
  targetTime: "2:19:59",
  currentPhase: "Specific Preparation",
  weight: 63,
  height: 178,
  maxHR: 195,
  restingHR: 42
};

export const MOCK_METRICS: MetricLog[] = [
  { id: '1', date: '2023-10-20', vo2Max: 69.5, runningFitness: 98, trainingLoad: 110, volume: 15.5, fatigue: 45, restingHR: 42 },
  { id: '2', date: '2023-10-21', vo2Max: 69.8, runningFitness: 99, trainingLoad: 125, volume: 18.2, fatigue: 52, restingHR: 43 },
  { id: '3', date: '2023-10-22', vo2Max: 70.1, runningFitness: 100, trainingLoad: 140, volume: 22.0, fatigue: 60, restingHR: 44 },
  { id: '4', date: '2023-10-23', vo2Max: 70.0, runningFitness: 101, trainingLoad: 95, volume: 10.0, fatigue: 48, restingHR: 41 },
  { id: '5', date: '2023-10-24', vo2Max: 70.3, runningFitness: 101.5, trainingLoad: 115, volume: 24.0, fatigue: 55, restingHR: 42 },
  { id: '6', date: '2023-10-25', vo2Max: 70.5, runningFitness: 102, trainingLoad: 130, volume: 8.0, fatigue: 62, restingHR: 43 },
  { id: '7', date: '2023-10-26', vo2Max: 71.2, runningFitness: 103, trainingLoad: 155, volume: 35.0, fatigue: 68, restingHR: 45 },
];

export const CURRENT_WEEK_WORKOUTS: Workout[] = [
  { 
    id: 'w1', day: 'Mon', date: 'Oct 23', title: 'Aerobic Recovery', type: 'Recovery', 
    distance: '12km', duration: '55m', description: 'Easy run Z1/Z2. Focus on cadence.', completed: true, intensity: 'Low',
    structure: [
      { type: 'Active', description: 'Easy Jog', duration: '12 km', target: '@ 4:35-4:45/km' },
      { type: 'Cooldown', description: 'Mobility', duration: '10 min', target: 'Static' }
    ],
    coachNotes: "Keep the heart rate below 135bpm. This is purely for blood flow."
  },
  { 
    id: 'w2', day: 'Tue', date: 'Oct 24', title: 'Threshold Repeats', type: 'Intervals', 
    distance: '18km', duration: '1h 15m', description: '3km warm, 4x3km @ 3:05/km (Rec 1km float), 2km cool.', completed: true, intensity: 'High',
    structure: [
      { type: 'Warmup', description: 'Easy running + Drills', duration: '3 km', target: 'Progressive' },
      { type: 'Active', description: 'Rep 1: Threshold', duration: '3 km', target: '@ 3:05/km' },
      { type: 'Rest', description: 'Float Recovery', duration: '1 km', target: '@ 3:45/km' },
      { type: 'Active', description: 'Rep 2: Threshold', duration: '3 km', target: '@ 3:05/km' },
      { type: 'Rest', description: 'Float Recovery', duration: '1 km', target: '@ 3:45/km' },
      { type: 'Active', description: 'Rep 3: Threshold', duration: '3 km', target: '@ 3:05/km' },
      { type: 'Rest', description: 'Float Recovery', duration: '1 km', target: '@ 3:45/km' },
      { type: 'Active', description: 'Rep 4: Threshold', duration: '3 km', target: '@ 3:05/km' },
      { type: 'Cooldown', description: 'Cool down jog', duration: '2 km', target: 'Easy' },
    ],
    coachNotes: "The key today is the 'float' recovery. Don't jog it too slow. Keep the tension on the system."
  },
  { 
    id: 'w3', day: 'Wed', date: 'Oct 25', title: 'Medium Long Run', type: 'Long Run', 
    distance: '22km', duration: '1h 35m', description: 'Steady state run. Last 5km progressive.', completed: true, intensity: 'Medium',
    structure: [
      { type: 'Active', description: 'Steady State', duration: '17 km', target: '@ 3:50/km' },
      { type: 'Active', description: 'Progression to MP', duration: '5 km', target: '@ 3:25/km' }
    ],
    coachNotes: "Feel the rhythm. If you feel good, push the last 2km to 3:15/km."
  },
  { 
    id: 'w4', day: 'Thu', date: 'Oct 26', title: 'Recovery + Strides', type: 'Recovery', 
    distance: '10km', duration: '48m', description: 'Very easy. 6x100m strides at the end.', completed: true, intensity: 'Low',
    structure: [
      { type: 'Active', description: 'Easy Run', duration: '9 km', target: 'Zone 1' },
      { type: 'Active', description: '6x100m Strides', duration: '1 km', target: 'Fast' }
    ]
  },
  { 
    id: 'w5', day: 'Fri', date: 'Oct 27', title: 'Marathon Pace Sim', type: 'Tempo', 
    distance: '24km', duration: '1h 40m', description: '15km @ MP (3:19/km). Focus on hydration strategy.', completed: false, intensity: 'Severe',
    structure: [
      { type: 'Warmup', description: 'Warmup', duration: '5 km', target: 'Easy' },
      { type: 'Active', description: 'Marathon Pace Block', duration: '15 km', target: '@ 3:19/km' },
      { type: 'Cooldown', description: 'Cooldown', duration: '4 km', target: 'Very Easy' }
    ],
    coachNotes: "This is a big simulator. Wear your race shoes (Alphaflys). Practice taking gels at km 5, 10, and 15."
  },
  { 
    id: 'w6', day: 'Sat', date: 'Oct 28', title: 'Shakeout', type: 'Recovery', 
    distance: '8km', duration: '40m', description: 'Easy jogging to flush legs.', completed: false, intensity: 'Low' 
  },
  { 
    id: 'w7', day: 'Sun', date: 'Oct 29', title: 'Long Run - Aerobic Power', type: 'Long Run', 
    distance: '35km', duration: '2h 25m', description: 'Big day. Maintain structural integrity.', completed: false, intensity: 'High',
    structure: [
       { type: 'Active', description: 'Long Run', duration: '35 km', target: '@ 3:55/km avg' }
    ],
    coachNotes: "Do not fade in the last 5k. Mental toughness training."
  },
];

export const INITIAL_CHAT_MESSAGES = [
  { id: '1', sender: 'ai', text: "Welcome to the team. My goal is simple: get you across the finish line in under 2 hours and 20 minutes. I am not here to be a cheerleader; I am here to manage your physiology.", timestamp: Date.now() },
  { id: '2', sender: 'ai', text: "I've analyzed your Coros history. Your VO2Max is sitting at 71.2, which is promising but insufficient for a 2:19 without optimization. Let's confirm your biometrics. Current weight?", timestamp: Date.now() + 1000 },
];

export const SUSANNA_CHAT_HISTORY: ChatMessage[] = [
  { id: '1', sender: 'ai', text: "Alessandro, I reviewed your file from Tuesday. Your lactate threshold heart rate seems to have dropped by 2 beats, which indicates improved efficiency.", timestamp: Date.now() - 1000000 },
  { id: '2', sender: 'user', text: "I felt strong during the floats. Should I increase the pace next week?", timestamp: Date.now() - 900000 },
  { id: '3', sender: 'ai', text: "Not yet. Keep the pace, but reduce the float duration to 800m. We want to increase density, not intensity, for this block.", timestamp: Date.now() - 800000 },
];
