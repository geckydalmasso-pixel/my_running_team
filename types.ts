export enum View {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  PLAN = 'PLAN',
  WEEKLY = 'WEEKLY',
  WORKOUT_DETAIL = 'WORKOUT_DETAIL',
  COROS_DATA = 'COROS_DATA',
  PROFILE = 'PROFILE',
  CHAT = 'CHAT'
}

export interface MetricLog {
  id: string;
  date: string;
  vo2Max: number;
  runningFitness: number;
  trainingLoad: number;
  volume: number;
  fatigue: number;
  restingHR: number;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: number;
}

export interface WorkoutStep {
  type: 'Warmup' | 'Active' | 'Rest' | 'Cooldown';
  description: string;
  duration: string; // "15 min" or "3 km"
  target: string; // "@ 4:30/km"
}

export interface Workout {
  id: string;
  day: string;
  date: string;
  title: string;
  type: 'Recovery' | 'Long Run' | 'Intervals' | 'Tempo' | 'Rest';
  distance: string;
  duration: string;
  description: string;
  completed: boolean;
  intensity: 'Low' | 'Medium' | 'High' | 'Severe';
  structure?: WorkoutStep[]; // Detailed steps for the briefing
  coachNotes?: string;
}
