import React, { useState } from 'react';
import { View, Workout } from './types';
import { Layout } from './components/Layout';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { PlanOverview } from './components/PlanOverview';
import { WeeklyView } from './components/WeeklyView';
import { CorosData } from './components/CorosData';
import { Profile } from './components/Profile';
import { Chat } from './components/Chat';
import { WorkoutDetail } from './components/WorkoutDetail';
import { CURRENT_WEEK_WORKOUTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.ONBOARDING);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const handleWorkoutSelect = (workout: Workout) => {
    setSelectedWorkout(workout);
    setCurrentView(View.WORKOUT_DETAIL);
  };

  const renderView = () => {
    switch (currentView) {
      case View.ONBOARDING:
        return <Onboarding onComplete={() => setCurrentView(View.DASHBOARD)} />;
      case View.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case View.PLAN:
        return <PlanOverview />;
      case View.WEEKLY:
        return <WeeklyView onSelectWorkout={handleWorkoutSelect} />;
      case View.WORKOUT_DETAIL:
        // Fallback to first workout if state is lost, though layout preserves it usually
        return <WorkoutDetail workout={selectedWorkout || CURRENT_WEEK_WORKOUTS[0]} onBack={() => setCurrentView(View.WEEKLY)} />;
      case View.COROS_DATA:
        return <CorosData />;
      case View.PROFILE:
        return <Profile />;
      case View.CHAT:
        return <Chat />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;