import { Patient, Drug, AdmissionStatus, TriageLevel, FinancialMetric, BedOccupancy, Invoice, PaymentStatus } from '../types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p1',
    mrn: 'MRN-2024-001',
    name: 'Eleanor Sterling',
    dob: '1985-04-12',
    gender: 'F',
    admissionDate: '2024-05-10T08:30:00',
    status: AdmissionStatus.ADMITTED,
    roomNumber: 'ICU-04',
    triage: TriageLevel.RED,
    insuranceProvider: 'BlueCross',
    balanceDue: 15400
  },
  {
    id: 'p2',
    mrn: 'MRN-2024-002',
    name: 'Marcus Thorne',
    dob: '1972-11-23',
    gender: 'M',
    admissionDate: '2024-05-11T14:15:00',
    status: AdmissionStatus.ADMITTED,
    roomNumber: 'WARD-202',
    triage: TriageLevel.YELLOW,
    insuranceProvider: 'Aetna',
    balanceDue: 3200
  },
  {
    id: 'p3',
    mrn: 'MRN-2024-003',
    name: 'Sarah Jenkins',
    dob: '1995-02-10',
    gender: 'F',
    admissionDate: '2024-05-12T09:00:00',
    status: AdmissionStatus.DISCHARGED,
    triage: TriageLevel.GREEN,
    insuranceProvider: 'Private',
    balanceDue: 0
  },
  {
    id: 'p4',
    mrn: 'MRN-2024-004',
    name: 'Albert Chen',
    dob: '1955-08-30',
    gender: 'M',
    admissionDate: '2024-05-12T10:45:00',
    status: AdmissionStatus.EMERGENCY,
    roomNumber: 'ER-B1',
    triage: TriageLevel.RED,
    insuranceProvider: 'Medicare',
    balanceDue: 500
  }
];

export const INITIAL_INVENTORY: Drug[] = [
  {
    id: 'd1',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    price: 15.00,
    totalStock: 500,
    version: 1,
    batches: [
      { batchId: 'B101', expiryDate: '2024-06-01', quantity: 100, location: 'Shelf-A1' }, // Expiring soon
      { batchId: 'B102', expiryDate: '2024-12-01', quantity: 400, location: 'Shelf-A2' }
    ]
  },
  {
    id: 'd2',
    name: 'Atorvastatin 20mg',
    category: 'Cardiovascular',
    price: 45.50,
    totalStock: 300,
    version: 1,
    batches: [
      { batchId: 'B201', expiryDate: '2025-01-15', quantity: 150, location: 'Shelf-B1' },
      { batchId: 'B202', expiryDate: '2025-06-20', quantity: 150, location: 'Shelf-B2' }
    ]
  },
  {
    id: 'd3',
    name: 'Insulin Glargine',
    category: 'Diabetes',
    price: 120.00,
    totalStock: 50,
    version: 1,
    batches: [
      { batchId: 'B301', expiryDate: '2024-05-20', quantity: 10, location: 'Fridge-1' }, // Very Urgent FEFO
      { batchId: 'B302', expiryDate: '2024-08-15', quantity: 40, location: 'Fridge-1' }
    ]
  }
];

export const FINANCE_DATA: FinancialMetric[] = [
  { date: 'Mon', revenue: 45000, expenses: 30000, cashFlow: 15000 },
  { date: 'Tue', revenue: 52000, expenses: 28000, cashFlow: 24000 },
  { date: 'Wed', revenue: 49000, expenses: 32000, cashFlow: 17000 },
  { date: 'Thu', revenue: 61000, expenses: 35000, cashFlow: 26000 },
  { date: 'Fri', revenue: 58000, expenses: 31000, cashFlow: 27000 },
  { date: 'Sat', revenue: 38000, expenses: 20000, cashFlow: 18000 },
  { date: 'Sun', revenue: 42000, expenses: 22000, cashFlow: 20000 },
];

export const OCCUPANCY_DATA: BedOccupancy[] = [
  { department: 'ICU', occupied: 8, total: 10 },
  { department: 'Surgery', occupied: 12, total: 20 },
  { department: 'General Ward', occupied: 45, total: 60 },
  { department: 'Maternity', occupied: 10, total: 15 },
  { department: 'Emergency', occupied: 18, total: 20 },
];

export const MOCK_INVOICES: Invoice[] = [
  { 
    id: 'INV-2024-001', 
    patientName: 'Eleanor Sterling', 
    mrn: 'MRN-2024-001', 
    amount: 15400000, 
    status: PaymentStatus.INSURANCE_PROCESSING, 
    date: '2024-05-12T09:15:00', 
    description: 'ICU Stay (3 Days) + Ventilator Support' 
  },
  { 
    id: 'INV-2024-002', 
    patientName: 'Marcus Thorne', 
    mrn: 'MRN-2024-002', 
    amount: 3200000, 
    status: PaymentStatus.PENDING, 
    date: '2024-05-12T10:30:00', 
    description: 'Ward Admission + Pharmacy (Cardio)' 
  },
  { 
    id: 'INV-2024-003', 
    patientName: 'Sarah Jenkins', 
    mrn: 'MRN-2024-003', 
    amount: 850000, 
    status: PaymentStatus.PAID, 
    date: '2024-05-11T14:20:00', 
    description: 'Outpatient Consultation + Lab Work' 
  },
  { 
    id: 'INV-2024-004', 
    patientName: 'Albert Chen', 
    mrn: 'MRN-2024-004', 
    amount: 1250000, 
    status: PaymentStatus.OVERDUE, 
    date: '2024-05-08T16:45:00', 
    description: 'Emergency Room - Triage Level 1' 
  },
  { 
    id: 'INV-2024-005', 
    patientName: 'Budi Santoso', 
    mrn: 'MRN-2024-005', 
    amount: 450000, 
    status: PaymentStatus.PAID, 
    date: '2024-05-12T11:00:00', 
    description: 'General Checkup' 
  },
];