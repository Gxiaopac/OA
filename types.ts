
export enum ClaimStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum ExpenseCategory {
  TRANSPORT = 'Transport',
  MEALS = 'Meals',
  LODGING = 'Lodging',
  OFFICE = 'Office Supplies',
  COMMUNICATION = 'Communication',
  OTHER = 'Other'
}

export interface ExpenseClaim {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  description: string;
  status: ClaimStatus;
  receiptUrl?: string;
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewComment?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
  avatar?: string;
}
