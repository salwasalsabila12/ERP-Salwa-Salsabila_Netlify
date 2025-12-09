import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PatientADT } from './components/PatientADT';
import { Pharmacy } from './components/Pharmacy';
import { Finance } from './components/Finance';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'adt':
        return <PatientADT />;
      case 'pharmacy':
        return <Pharmacy />;
      case 'finance':
        return <Finance />;
      case 'settings':
         return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-600">System Settings</h3>
                <p>Configuration panel is restricted to Administrators.</p>
            </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
            {/* Top Bar for Mobile/Tablet context (Hidden on desktop sidebar design but good for structure) */}
            <header className="mb-8 flex justify-between items-center lg:hidden">
                <h1 className="text-2xl font-bold text-slate-900">AuraMed</h1>
                <button className="text-slate-500">Menu</button>
            </header>

            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;