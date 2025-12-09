import React, { useState } from 'react';
import { INITIAL_PATIENTS } from '../services/mockData';
import { AdmissionStatus, TriageLevel } from '../types';
import { Search, Filter, MoreHorizontal, Bed, Activity } from 'lucide-react';

export const PatientADT: React.FC = () => {
  const [patients] = useState(INITIAL_PATIENTS);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: AdmissionStatus) => {
    switch (status) {
      case AdmissionStatus.ADMITTED: return 'bg-blue-100 text-blue-700 border-blue-200';
      case AdmissionStatus.EMERGENCY: return 'bg-red-100 text-red-700 border-red-200 animate-pulse';
      case AdmissionStatus.DISCHARGED: return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTriageColor = (level: TriageLevel) => {
    if (level === TriageLevel.RED) return 'text-red-600';
    if (level === TriageLevel.YELLOW) return 'text-amber-500';
    return 'text-green-600';
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Management</h2>
          <p className="text-slate-500 mt-1">ADT (Admission, Discharge, Transfer) & Triage</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          + New Admission
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by Patient Name or MRN..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">Patient Info</th>
                    <th className="px-6 py-4">Status / Room</th>
                    <th className="px-6 py-4">Triage Level</th>
                    <th className="px-6 py-4">Admission Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                                    {patient.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{patient.name}</p>
                                    <p className="text-xs text-slate-400 font-mono">{patient.mrn}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="space-y-1">
                                <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border ${getStatusColor(patient.status)}`}>
                                    {patient.status}
                                </span>
                                {patient.roomNumber && (
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <Bed className="w-3 h-3" /> {patient.roomNumber}
                                    </div>
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                                <Activity className={`w-4 h-4 ${getTriageColor(patient.triage)}`} />
                                <span className="text-sm font-medium text-slate-700">{patient.triage}</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500">
                            {new Date(patient.admissionDate).toLocaleDateString()}
                            <span className="block text-xs opacity-70">
                                {new Date(patient.admissionDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                            <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
