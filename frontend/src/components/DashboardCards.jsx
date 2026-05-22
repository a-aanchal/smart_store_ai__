import React from 'react';
import { DollarSign, Package, AlertTriangle, ArrowUpRight, TrendingUp } from 'lucide-react';

const DashboardCards = ({ revenue, totalProducts, lowStockCount }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: `$${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10 border-blue-500/10',
      textColor: 'text-blue-400',
      desc: '+12.5% sales growth this month',
    },
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      icon: Package,
      color: 'from-indigo-500 to-purple-500',
      bg: 'bg-indigo-500/10 border-indigo-500/10',
      textColor: 'text-indigo-400',
      desc: 'Active inventory catalog',
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockCount.toString(),
      icon: AlertTriangle,
      color: lowStockCount > 0 ? 'from-rose-500 to-amber-500' : 'from-emerald-500 to-teal-500',
      bg: lowStockCount > 0 ? 'bg-rose-500/10 border-rose-500/10' : 'bg-emerald-500/10 border-emerald-500/10',
      textColor: lowStockCount > 0 ? 'text-rose-400' : 'text-emerald-400',
      desc: lowStockCount > 0 ? 'Action required immediately' : 'All stock levels healthy',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="glass-panel p-6 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
          >
            {/* Ambient Background Glow on Hover */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-300`} />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${card.color} p-0.5 shadow-md shadow-slate-900/50`}>
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Icon size={18} className={card.textColor} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 relative z-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {card.value}
              </h3>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp size={12} className={card.textColor} />
                {card.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
