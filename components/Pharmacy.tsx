import React, { useState } from 'react';
import { INITIAL_INVENTORY } from '../services/mockData';
import { allocateStockFEFO } from '../services/inventoryLogic';
import { Drug } from '../types';
import { AlertTriangle, CheckCircle, Package, Clock, RefreshCw } from 'lucide-react';

export const Pharmacy: React.FC = () => {
  const [inventory, setInventory] = useState<Drug[]>(INITIAL_INVENTORY);
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);
  const [dispenseAmount, setDispenseAmount] = useState<number>(1);
  const [lastAction, setLastAction] = useState<any | null>(null);

  const selectedDrug = inventory.find(d => d.id === selectedDrugId);

  const handleDispense = () => {
    if (!selectedDrug) return;

    const result = allocateStockFEFO(selectedDrug, dispenseAmount);

    if (result.error) {
      alert(result.error);
      return;
    }

    // Update State
    const newInventory = inventory.map(d => d.id === selectedDrug.id ? result.updatedDrug : d);
    setInventory(newInventory);
    setLastAction({
        drugName: selectedDrug.name,
        allocated: result.allocatedBatches
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pharmacy & Inventory</h2>
          <p className="text-slate-500 mt-1">FEFO (First Expired, First Out) Management System</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Inventory List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
             <h3 className="font-bold text-slate-800">Drug Stock</h3>
             <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">LIVE UPDATES</span>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Drug Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Total Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {inventory.map(drug => (
                <tr key={drug.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{drug.name}</td>
                  <td className="px-6 py-4 text-slate-500">{drug.category}</td>
                  <td className="px-6 py-4 font-mono">{drug.totalStock}</td>
                  <td className="px-6 py-4">
                    {drug.totalStock < 50 ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium">
                            <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3" /> Healthy
                        </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                        onClick={() => {
                            setSelectedDrugId(drug.id);
                            setLastAction(null);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: FEFO Control Panel */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col">
            {/* Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>

            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                <RefreshCw className="w-5 h-5 text-amber-400" /> Dispense Logic
            </h3>

            {selectedDrug ? (
                <div className="space-y-6 relative z-10 flex-1">
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Selected Drug</p>
                        <p className="text-2xl font-bold">{selectedDrug.name}</p>
                        <p className="text-indigo-300 text-sm mt-1">Current Version: {selectedDrug.version} (Optimistic Locking)</p>
                    </div>

                    <div className="space-y-2">
                         <p className="text-slate-400 text-xs uppercase tracking-wider">Available Batches (Sorted by Expiry)</p>
                         <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {selectedDrug.batches.sort((a,b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()).map(batch => (
                                <div key={batch.batchId} className="bg-white/10 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <Package className="w-3 h-3 text-slate-400" />
                                            {batch.batchId}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-amber-400 mt-1">
                                            <Clock className="w-3 h-3" />
                                            Exp: {batch.expiryDate}
                                        </div>
                                    </div>
                                    <span className="text-lg font-mono font-bold">{batch.quantity}</span>
                                </div>
                            ))}
                         </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <label className="block text-xs text-slate-400 mb-2">Quantity to Dispense</label>
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                min="1"
                                value={dispenseAmount}
                                onChange={(e) => setDispenseAmount(parseInt(e.target.value) || 1)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button 
                                onClick={handleDispense}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Dispense
                            </button>
                        </div>
                    </div>

                    {lastAction && (
                        <div className="mt-4 bg-green-900/30 border border-green-800 rounded-lg p-3 animate-pulse">
                            <p className="text-xs text-green-300 font-bold mb-1">✓ FEFO Allocation Successful</p>
                            <ul className="text-xs text-green-100 list-disc pl-4">
                                {lastAction.allocated.map((a: any) => (
                                    <li key={a.batchId}>Batch {a.batchId}: Took {a.quantity} units</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-sm relative z-10">
                    Select a drug to manage stock
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
