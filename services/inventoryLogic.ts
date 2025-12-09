import { Drug, DrugBatch } from '../types';

/**
 * FEFO (First Expired, First Out) Algorithm.
 * Sorts batches by expiry date and allocates stock from the earliest expiring batch.
 */
export const allocateStockFEFO = (drug: Drug, quantityRequested: number): { 
  updatedDrug: Drug; 
  allocatedBatches: { batchId: string; quantity: number }[]; 
  error?: string 
} => {
  // 1. Check total availability
  if (drug.totalStock < quantityRequested) {
    return { updatedDrug: drug, allocatedBatches: [], error: 'Insufficient total stock' };
  }

  // 2. Clone to avoid mutation of reference before commit
  const newDrug = JSON.parse(JSON.stringify(drug)) as Drug;
  
  // 3. Sort batches by Expiry Date (Ascending) - The core of FEFO
  newDrug.batches.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

  let remainingToAllocate = quantityRequested;
  const allocatedBatches: { batchId: string; quantity: number }[] = [];

  // 4. Iterate and deduct
  for (const batch of newDrug.batches) {
    if (remainingToAllocate <= 0) break;

    if (batch.quantity > 0) {
      const takeAmount = Math.min(batch.quantity, remainingToAllocate);
      batch.quantity -= takeAmount;
      remainingToAllocate -= takeAmount;
      
      allocatedBatches.push({
        batchId: batch.batchId,
        quantity: takeAmount
      });
    }
  }

  // 5. Update total stock
  newDrug.totalStock -= quantityRequested;

  // 6. Optimistic Locking: Increment Version
  newDrug.version += 1;

  return { updatedDrug: newDrug, allocatedBatches };
};

/**
 * Simulates an Optimistic Concurrency Control check.
 * In a real backend, this happens at the database level (e.g., UPDATE ... WHERE id=? AND version=?).
 */
export const checkConcurrency = (currentVersion: number, incomingVersion: number): boolean => {
  return currentVersion === incomingVersion;
};
