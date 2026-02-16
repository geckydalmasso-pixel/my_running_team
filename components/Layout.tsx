import React from 'react';
import { View } from '../types';
import { CURRENT_USER } from '../constants';
import { 
  LayoutDashboard, 
  Map, 
  CalendarDays, 
  Database, 
  LogOut, 
  Activity,
  Menu,
  User,
  MessageSquare
} from 'lucide-react';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
}

const NavItem = ({ view, label, icon: Icon, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
      active 
        ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200' 
        : 'text-stone-500 hover:bg-white/50 hover:text-stone-900'
    }`}
  >
    <Icon size={20} className={active ? 'text-stone-900' : 'text-stone-400 group-hover:text-stone-600'} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Onboarding keeps its own dark style for cinematic effect, or we can make it light.
  // Let's make it light to match the new theme request.
  if (currentView === View.ONBOARDING) {
    return <div className="min-h-screen bg-[#F5F5F4] text-stone-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F4] text-stone-900 flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-stone-200 bg-[#F5F5F4] h-screen sticky top-0">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 text-stone-900">
            <div className="bg-yellow-400 p-1.5 rounded-lg text-stone-900">
               <Activity size={20} strokeWidth={2.5} />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Crextio Run</h1>
          </div>
          <p className="text-xs text-stone-400 mt-2 font-medium ml-1">ELITE PROTOCOL v2.1</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem 
            view={View.DASHBOARD} 
            label="Dashboard" 
            icon={LayoutDashboard} 
            active={currentView === View.DASHBOARD} 
            onClick={() => setView(View.DASHBOARD)}
          />
          <NavItem 
            view={View.PLAN} 
            label="The Roadmap" 
            icon={Map} 
            active={currentView === View.PLAN} 
            onClick={() => setView(View.PLAN)}
          />
          <NavItem 
            view={View.WEEKLY} 
            label="Weekly & Analysis" 
            icon={CalendarDays} 
            active={currentView === View.WEEKLY || currentView === View.WORKOUT_DETAIL} 
            onClick={() => setView(View.WEEKLY)}
          />
          <NavItem 
            view={View.COROS_DATA} 
            label="Coros EvoLab" 
            icon={Database} 
            active={currentView === View.COROS_DATA} 
            onClick={() => setView(View.COROS_DATA)}
          />
          <NavItem 
            view={View.CHAT} 
            label="Coach Susanna" 
            icon={MessageSquare} 
            active={currentView === View.CHAT} 
            onClick={() => setView(View.CHAT)}
          />
        </nav>

        {/* User Profile Section in Sidebar */}
        <div className="p-4 mx-4 mb-4 bg-white rounded-3xl shadow-sm border border-stone-100 space-y-2">
          <button 
            onClick={() => setView(View.PROFILE)}
            className={`flex items-center gap-3 p-2 rounded-xl transition-colors w-full ${
              currentView === View.PROFILE ? 'bg-stone-100' : 'hover:bg-stone-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center border border-stone-100 text-stone-500 overflow-hidden">
               {/* Simulating User Avatar from screenshot */}
               <User size={20} />
            </div>
            <div className="flex flex-col items-start">
               <span className="text-sm font-bold text-stone-900">{CURRENT_USER.name}</span>
               <span className="text-[10px] text-stone-500 font-medium">Pro Athlete</span>
            </div>
          </button>
          
          <button className="flex items-center gap-3 px-2 py-2 text-stone-400 hover:text-red-500 transition-colors text-xs font-medium w-full mt-2">
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-[#F5F5F4]/90 backdrop-blur-md border-b border-stone-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-stone-900">
            <div className="bg-yellow-400 p-1 rounded">
               <Activity size={16} strokeWidth={2.5} />
            </div>
            <span className="font-bold">MRT</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="text-stone-600" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white z-50 md:hidden pt-20 px-6">
           <nav className="space-y-4">
            <NavItem view={View.DASHBOARD} label="Dashboard" icon={LayoutDashboard} active={currentView === View.DASHBOARD} onClick={() => { setView(View.DASHBOARD); setMobileMenuOpen(false); }} />
            <NavItem view={View.PLAN} label="The Roadmap" icon={Map} active={currentView === View.PLAN} onClick={() => { setView(View.PLAN); setMobileMenuOpen(false); }} />
            <NavItem view={View.WEEKLY} label="Weekly & Analysis" icon={CalendarDays} active={currentView === View.WEEKLY} onClick={() => { setView(View.WEEKLY); setMobileMenuOpen(false); }} />
            <NavItem view={View.COROS_DATA} label="Coros EvoLab" icon={Database} active={currentView === View.COROS_DATA} onClick={() => { setView(View.COROS_DATA); setMobileMenuOpen(false); }} />
            <NavItem view={View.CHAT} label="Coach Susanna" icon={MessageSquare} active={currentView === View.CHAT} onClick={() => { setView(View.CHAT); setMobileMenuOpen(false); }} />
            <NavItem view={View.PROFILE} label="Profile" icon={User} active={currentView === View.PROFILE} onClick={() => { setView(View.PROFILE); setMobileMenuOpen(false); }} />
           </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen md:pt-0 pt-16">
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};