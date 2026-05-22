import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { BarChart3, TrendingUp, ShoppingBag, DollarSign, Calendar, Loader2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/analytics/data');
      setData(res.data);
    } catch (e) {
      console.error('Failed to fetch analytics:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="animate-spin text-blue-500 w-10 h-10 mx-auto" />
          <p className="text-slate-400 text-sm">Aggregating store records...</p>
        </div>
      </div>
    );
  }

  // 1. Line Chart Data (Revenue Trend)
  const lineChartData = {
    labels: data.revenueTrend.map(item => item.label),
    datasets: [
      {
        fill: true,
        label: 'Revenue ($)',
        data: data.revenueTrend.map(item => item.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverRadius: 6,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
    },
  };

  // 2. Doughnut Chart Data (Category Sales)
  const doughnutChartData = {
    labels: data.categorySales.map(item => item.category),
    datasets: [
      {
        label: 'Revenue ($)',
        data: data.categorySales.map(item => item.revenue),
        backgroundColor: [
          'rgba(59, 130, 246, 0.75)',
          'rgba(99, 102, 241, 0.75)',
          'rgba(168, 85, 247, 0.75)',
          'rgba(16, 185, 129, 0.75)',
          'rgba(245, 158, 11, 0.75)'
        ],
        borderColor: 'rgba(15, 23, 42, 1)',
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#cbd5e1',
          font: { size: 11 },
          boxWidth: 12
        }
      },
    },
    cutout: '65%',
  };

  // 3. Bar Chart Data (Top Selling Products)
  const barChartData = {
    labels: data.topProducts.map(item => item.title),
    datasets: [
      {
        label: 'Units Sold',
        data: data.topProducts.map(item => item.totalQty),
        backgroundColor: 'rgba(16, 185, 129, 0.65)',
        hoverBackgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
          <BarChart3 size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Sales & Inventory Analytics</h1>
          <p className="text-slate-400 text-xs mt-1">Deep analysis of orders, category trends, and inventory counts.</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Line Chart: Revenue Trend */}
        <div className="glass-panel p-6 border border-slate-800/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-200">Revenue Performance</h3>
              <p className="text-slate-400 text-xs mt-0.5">Monthly revenue aggregation for the past 6 months</p>
            </div>
            <TrendingUp size={18} className="text-blue-400" />
          </div>
          <div className="h-72">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Doughnut Chart: Category Sales */}
        <div className="glass-panel p-6 border border-slate-800/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-200">Product Category Share</h3>
              <p className="text-slate-400 text-xs mt-0.5">Revenue breakdown by product categories</p>
            </div>
            <DollarSign size={18} className="text-indigo-400" />
          </div>
          <div className="h-72 relative">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>

        {/* Bar Chart: Top Selling Products */}
        <div className="glass-panel p-6 border border-slate-800/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-200">Top-Selling Products</h3>
              <p className="text-slate-400 text-xs mt-0.5">Total units sold of our top 5 items</p>
            </div>
            <ShoppingBag size={18} className="text-emerald-400" />
          </div>
          <div className="h-72">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="glass-panel p-6 border border-slate-800/80 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-200">Recent Sales Activity</h3>
              <p className="text-slate-400 text-xs mt-0.5">Overview of the last 5 store transactions</p>
            </div>
            <Calendar size={18} className="text-slate-400" />
          </div>
          
          <div className="flex-1 overflow-auto max-h-72">
            <div className="space-y-3.5 pr-1">
              {data.recentOrders.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">No order transactions found in history.</p>
              ) : (
                data.recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="p-3.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800/50 hover:border-slate-800 rounded-xl flex items-center justify-between transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-white">
                        {order.products.map(p => p.product ? p.product.title : 'Deleted Product').join(', ')}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Ordered {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">
                      +${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
