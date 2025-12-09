import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  FileText,
  Download,
  Wallet,
  Activity
} from 'lucide-react';
import { FINANCE_DATA, MOCK_INVOICES } from '../services/mockData';
import { PaymentStatus } from '../types';

export const Finance: React.FC = () => {
  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case PaymentStatus.INSURANCE_PROCESSING: return 'bg-blue-100 text-blue-700 border-blue-200';
      case PaymentStatus.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case PaymentStatus.OVERDUE: return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Finance & Billing</h2>
          <p className="text-slate-500 mt-1">Real-time Revenue Cycle Management (RCM)</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-white hover:border-slate-300 transition-colors shadow-sm bg-slate-50">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            <FileText className="w-4 h-4" /> New Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue (MTD)', value: 'IDR 2.4B', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', sub: '+8.2% vs last month' },
          { label: 'Outstanding Claims', value: 'IDR 450M', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', sub: '12 invoices pending' },
          { label: 'Cash on Hand', value: 'IDR 1.2B', icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50', sub: 'Liquid assets' },
          { label: 'AR Days', value: '45 Days', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', sub: 'Target: < 40 Days' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.sub.includes('+') ? '▲' : ''} {stat.sub.split(' ')[0]}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Analytics Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Revenue vs Expenses
            </h3>
            <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Revenue
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div> Expenses
                </span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Transaction Feed (Simulation) */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
           
           <h3 className="text-lg font-bold mb-4 relative z-10 flex items-center gap-2">
             <Activity className="w-5 h-5 text-emerald-400" /> Live Transactions
           </h3>
           
           <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar relative z-10">
              {[
                { time: '10:42 AM', desc: 'Pharmacy Dispense', amount: 'IDR 150.000', status: 'success' },
                { time: '10:38 AM', desc: 'MRI Scan (Brain)', amount: 'IDR 2.500.000', status: 'pending' },
                { time: '10:15 AM', desc: 'Consultation Fee', amount: 'IDR 300.000', status: 'success' },
                { time: '09:55 AM', desc: 'Lab Test: Blood', amount: 'IDR 450.000', status: 'success' },
                { time: '09:30 AM', desc: 'Emergency Admis.', amount: 'IDR 750.000', status: 'warning' },
                { time: '09:12 AM', desc: 'Ward Daily Rate', amount: 'IDR 1.200.000', status: 'success' },
              ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${tx.status === 'success' ? 'bg-emerald-400' : tx.status === 'pending' ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
                          <div>
                              <p className="text-sm font-medium text-slate-200">{tx.desc}</p>
                              <p className="text-xs text-slate-500">{tx.time}</p>
                          </div>
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-300">{tx.amount}</span>
                  </div>
              ))}
           </div>
           
           <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
               <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400">Projected Daily</span>
                   <span className="font-bold text-emerald-400">IDR 58.4M</span>
               </div>
           </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Invoices</h3>
            <div className="flex gap-2">
                {['All', 'Paid', 'Pending', 'Overdue'].map(filter => (
                    <button key={filter} className="px-3 py-1 text-xs font-medium rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                        {filter}
                    </button>
                ))}
            </div>
        </div>
        <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
                {MOCK_INVOICES.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-500">{invoice.id}</td>
                        <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{invoice.patientName}</div>
                            <div className="text-xs text-slate-400">{invoice.mrn}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{invoice.description}</td>
                        <td className="px-6 py-4 text-slate-500">
                            {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-mono font-medium text-slate-700">
                            {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(invoice.status)}`}>
                                {invoice.status === PaymentStatus.PAID && <CheckCircle className="w-3 h-3" />}
                                {invoice.status === PaymentStatus.PENDING && <Clock className="w-3 h-3" />}
                                {invoice.status === PaymentStatus.OVERDUE && <AlertCircle className="w-3 h-3" />}
                                {invoice.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-50 transition-colors">
                                View Details
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