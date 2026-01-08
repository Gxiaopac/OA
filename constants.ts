
import { ClaimStatus, ExpenseCategory, ExpenseClaim, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Zhang San',
  role: 'EMPLOYEE',
  avatar: 'https://picsum.photos/seed/user1/100/100'
};

export const MOCK_CLAIMS: ExpenseClaim[] = [
  {
    id: 'c1',
    title: 'Client Lunch - Tech Partners',
    amount: 450.50,
    date: '2024-05-15',
    category: ExpenseCategory.MEALS,
    description: 'Project kickoff lunch with the engineering team from Tech Partners.',
    status: ClaimStatus.APPROVED,
    submittedBy: 'Zhang San',
    submittedAt: '2024-05-16T10:00:00Z',
    reviewedBy: 'Manager Li',
    reviewComment: 'Approved as per project budget.'
  },
  {
    id: 'c2',
    title: 'New Wireless Mouse',
    amount: 299.00,
    date: '2024-05-20',
    category: ExpenseCategory.OFFICE,
    description: 'Replacement for broken peripheral.',
    status: ClaimStatus.PENDING,
    submittedBy: 'Zhang San',
    submittedAt: '2024-05-21T14:30:00Z'
  },
  {
    id: 'c3',
    title: 'Taxi to Airport',
    amount: 120.00,
    date: '2024-05-10',
    category: ExpenseCategory.TRANSPORT,
    description: 'Business trip to Shanghai.',
    status: ClaimStatus.REJECTED,
    submittedBy: 'Zhang San',
    submittedAt: '2024-05-11T09:15:00Z',
    reviewedBy: 'Manager Li',
    reviewComment: 'Please provide the official fapiao (tax receipt).'
  }
];
