
import React, { useState } from 'react';
import { CURRENT_USER } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'submit', label: 'Submit Claim', icon: '📝' },
    { id: 'my-claims', label: 'My History', icon: '📋' },
    { id: 'approvals', label: 'Team Approvals', icon: '✅' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-indigo-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="text-xl font-bold">SmartExpense</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 transition duration-200 ease-in-out
        w-64 bg-indigo-900 text-indigo-100 flex flex-col z-40 shadow-xl
      `}>
        <div className="p-8 hidden md:block">
          <h1 className="text-2xl font-black tracking-tight text-white italic">SmartExpense</h1>
          <p className="text-xs text-indigo-300 mt-1 uppercase tracking-widest">Enterprise OA Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 md:mt-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-indigo-700 text-white font-semibold' : 'hover:bg-indigo-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-indigo-800">
          <div className="flex items-center space-x-3">
            <img src={CURRENT_USER.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{CURRENT_USER.name}</p>
              <p className="text-xs text-indigo-400">{CURRENT_USER.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
