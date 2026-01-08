
import React, { useState, useRef } from 'react';
import { ExpenseCategory, ClaimStatus } from '../types';
import { analyzeReceipt } from '../services/geminiService';

interface SubmitClaimProps {
  onSuccess: () => void;
}

const SubmitClaim: React.FC<SubmitClaimProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: ExpenseCategory.OTHER,
    description: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAiAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeReceipt(base64);
        
        setForm({
          ...form,
          title: `Expense at ${result.vendor || 'Unknown Vendor'}`,
          amount: result.amount?.toString() || '',
          date: result.date || form.date,
          category: (result.category as ExpenseCategory) || ExpenseCategory.OTHER,
          description: result.description || '',
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert("AI failed to read the receipt. Please fill manually.");
    } finally {
      setAiAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-indigo-600 p-8 text-white relative">
        <h2 className="text-2xl font-bold">New Reimbursement Request</h2>
        <p className="text-indigo-100 mt-2 opacity-90">Fill in the details or upload a receipt to use AI scanning.</p>
        <div className="absolute -bottom-6 right-8">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={aiAnalyzing}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            <span>{aiAnalyzing ? '🤖 Scanning...' : '📷 Scan Receipt'}</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 pt-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Expense Title</label>
            <input
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g., Client Dinner in Shanghai"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Amount (CNY)</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400">¥</span>
              <input
                required
                type="number"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Date of Expense</label>
            <input
              required
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Category</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ExpenseCategory })}
            >
              {Object.values(ExpenseCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Reason / Description</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-32"
            placeholder="Provide context for the approval team..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            className="px-6 py-3 font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            onClick={() => onSuccess()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? 'Submitting...' : 'Submit Claim'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitClaim;
