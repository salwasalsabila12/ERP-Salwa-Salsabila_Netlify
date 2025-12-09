export enum AdmissionStatus {
  ADMITTED = 'Admitted',
  DISCHARGED = 'Discharged',
  PENDING = 'Pending',
  EMERGENCY = 'Emergency'
}

export enum TriageLevel {
  RED = 'Red (Immediate)',
  YELLOW = 'Yellow (Urgent)',
  GREEN = 'Green (Standard)',
  BLACK = 'Black (Deceased)'
}

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  name: string;
  dob: string;
  gender: 'M' | 'F';
  admissionDate: string;
  status: AdmissionStatus;
  roomNumber?: string;
  triage: TriageLevel;
  insuranceProvider: string;
  balanceDue: number;
}

export interface DrugBatch {
  batchId: string;
  expiryDate: string;
  quantity: number;
  location: string;
}

export interface Drug {
  id: string;
  name: string;
  category: string;
  price: number;
  totalStock: number;
  batches: DrugBatch[]; // For FEFO logic
  version: number; // For Optimistic Concurrency Control
}

export interface FinancialMetric {
  date: string;
  revenue: number;
  expenses: number;
  cashFlow: number;
}

export interface BedOccupancy {
  department: string;
  occupied: number;
  total: number;
}

export interface UserSession {
  role: 'Admin' | 'Doctor' | 'Pharmacist' | 'Executive';
  name: string;
}

export enum PaymentStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  INSURANCE_PROCESSING = 'Insurance Processing',
  OVERDUE = 'Overdue'
}

export interface Invoice {
  id: string;
  patientName: string;
  mrn: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  description: string;
}