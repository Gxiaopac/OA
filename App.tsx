
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import ClaimCard from './components/ClaimCard';
import SubmitClaim from './components/SubmitClaim';
import { MOCK_CLAIMS } from './constants';
import { ClaimStatus } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const stats = useMemo(() => {
    const total = MOCK_CLAIMS.reduce((acc, curr) => acc + curr.amount, 0);
    const pending = MOCK_CLAIMS.filter(c => c.status === ClaimStatus.PENDING).length;
    const approved = MOCK_CLAIMS.filter(c => c.status === ClaimStatus.APPROVED).length;
    
    // Group by category for chart
    const groups = MOCK_CLAIMS.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(groups).map(([name, value]) => ({ name, value }));

    return { total, pending, approved, chartData };
  }, []);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Reimbursed</p>
          <p className="text-3xl font-black text-slate-900 mt-1">¥{stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Tasks</p>
          <p className="text-3xl font-black text-amber-500 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Approved Requests</p>
          <p className="text-3xl font-black text-emerald-500 mt-1">{stats.approved}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Spending by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stats.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">AI Auditor Is Online</h3>
            <p className="text-indigo-200 mb-6">Our integrated Gemini AI model automatically checks your receipts for compliance and speeds up your approvals by 40%.</p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Automatic data extraction</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Smart categorization</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Policy violation detection</span>
              </li>
            </ul>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-800 rounded-full -mr-24 -mt-24 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full -ml-16 -mb-16 opacity-30 blur-2xl"></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">View All History</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CLAIMS.slice(0, 3).map(claim => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'submit':
        return <SubmitClaim onSuccess={() => setActiveTab('my-claims')} />;
      case 'my-claims':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">My Expense History</h2>
                <p className="text-slate-500">Track and manage your submitted reimbursement claims.</p>
              </div>
              <button 
                onClick={() => setActiveTab('submit')}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                + New Claim
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_CLAIMS.map(claim => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </div>
          </div>
        );
      case 'approvals':
        return (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-6xl mb-4">🛡️</div>
            <h2 className="text-xl font-bold text-slate-900">Manager View Required</h2>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">This module is only accessible to department managers. Please contact HR if you require approval permissions.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
