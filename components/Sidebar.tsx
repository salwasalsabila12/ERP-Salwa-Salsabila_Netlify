import React from 'react';
import { 
  Activity, 
  Users, 
  Pill, 
  CreditCard, 
  Settings, 
  LogOut, 
  LayoutDashboard
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'adt', label: 'Patient Management (ADT)', icon: Users },
    { id: 'pharmacy', label: 'Pharmacy & Inventory', icon: Pill },
    { id: 'finance', label: 'Finance & Billing', icon: CreditCard },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col shadow-2xl z-20 sticky top-0">
      {/* Brand Header */}
      <div className="p-8 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">AuraMed</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wider">ENTERPRISE ERP</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-900/50 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-100' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-200 shadow-[0_0_8px_rgba(191,219,254,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile / Footer */}
      <div className="p-6 border-t border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center">
            <span className="text-amber-700 font-bold">DR</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Dr. A. Hartanto</p>
            <p className="text-xs text-slate-400 truncate">Chief Medical Officer</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
          <LogOut className="w-3 h-3" /> Sign Out
        </button>
      </div>
    </div>
  );
};
