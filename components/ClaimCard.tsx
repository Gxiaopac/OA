
import React from 'react';
import { ExpenseClaim, ClaimStatus } from '../types';

interface ClaimCardProps {
  claim: ExpenseClaim;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case ClaimStatus.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case ClaimStatus.APPROVED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case ClaimStatus.REJECTED: return 'bg-rose-100 text-rose-700 border-rose-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Meals': return '🍴';
      case 'Transport': return '🚗';
      case 'Lodging': return '🏨';
      case 'Office Supplies': return '📎';
      default: return '📦';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-xl shadow-inner">
              {getCategoryIcon(claim.category)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 line-clamp-1">{claim.title}</h3>
              <p className="text-xs text-slate-500">{claim.date}</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusColor(claim.status)}`}>
            {claim.status}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-slate-900">
            ¥{claim.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2 italic">"{claim.description}"</p>
        </div>

        {claim.reviewComment && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border-l-4 border-indigo-400">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Feedback:</p>
            <p className="text-xs text-slate-700">{claim.reviewComment}</p>
          </div>
        )}
      </div>
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[10px] text-slate-400 uppercase font-medium">Ref: {claim.id}</span>
        <button className="text-indigo-600 text-xs font-semibold hover:underline">View Details</button>
      </div>
    </div>
  );
};

export default ClaimCard;
