import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, BarChart3, LogOut, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-400' },
    { path: '/products', label: 'Products', icon: Package, color: 'text-indigo-400' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, color: 'text-emerald-400' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-lg flex flex-col h-full">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/80">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
          <Store className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          SmartStore AI
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-l-4 border-blue-500 text-white font-medium pl-3'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 pl-4'
              }`}
            >
              <Icon size={20} className={`${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
