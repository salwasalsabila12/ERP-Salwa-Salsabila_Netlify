import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { TrendingUp, AlertCircle, DollarSign, Activity, Sparkles, Loader } from 'lucide-react';
import { FINANCE_DATA, OCCUPANCY_DATA } from '../services/mockData';

export const Dashboard: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Gemini AI Integration for Executive Summary
  const generateInsight = async () => {
    if (!process.env.API_KEY) {
      setAiAnalysis("API Key missing. Cannot generate AI insight.");
      return;
    }

    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a Hospital CEO Assistant. Analyze this data briefly:
        Bed Occupancy: ${JSON.stringify(OCCUPANCY_DATA)}
        Weekly Finance: ${JSON.stringify(FINANCE_DATA)}
        Provide a strategic 3-bullet summary focusing on revenue leakage risks or capacity bottlenecks.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      setAiAnalysis(response.text);
    } catch (e) {
      console.error(e);
      setAiAnalysis("Failed to connect to AI Neural System. Please try again.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Overview</h2>
          <p className="text-slate-500 mt-1">Real-time "Digital Nervous System" Metrics</p>
        </div>
        <div className="flex gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                SYSTEM OPERATIONAL
            </span>
        </div>
      </div>

      {/* KPI Cards - Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Today\'s Revenue', value: 'IDR 450.2M', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Bed Occupancy', value: '82.4%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Critical Patients', value: '14', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Growth (MoM)', value: '+12.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Financial Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Financial Performance</h3>
            <select className="text-sm border-slate-200 rounded-lg text-slate-500 p-1">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy & AI Insight */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Department Load</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={OCCUPANCY_DATA} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9"/>
                        <XAxis type="number" hide />
                        <YAxis dataKey="department" type="category" width={100} tick={{fontSize: 11, fill: '#475569'}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="occupied" radius={[0, 4, 4, 0]} barSize={20}>
                            {OCCUPANCY_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.occupied / entry.total > 0.8 ? '#ef4444' : '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI Insight Module */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="text-amber-400 w-5 h-5" />
                        <h3 className="text-white font-bold">AI Strategic Insight</h3>
                    </div>
                    
                    {aiAnalysis ? (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-slate-200 text-sm leading-relaxed border border-white/10">
                           <pre className="whitespace-pre-wrap font-sans">{aiAnalysis}</pre>
                        </div>
                    ) : (
                        <div className="text-slate-400 text-sm mb-4">
                            Generate real-time analysis of occupancy rates and cash flow anomalies using Gemini.
                        </div>
                    )}

                    <button 
                        onClick={generateInsight}
                        disabled={loadingAi}
                        className="mt-4 w-full py-2.5 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        {loadingAi ? <Loader className="animate-spin w-4 h-4" /> : 'Generate Analysis'}
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
