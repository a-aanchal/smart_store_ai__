import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import DashboardCards from '../components/DashboardCards';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BrainCircuit, Loader2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalProducts: 0, lowStockCount: 0 });
  const [trendData, setTrendData] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch summary statistics
      const summaryRes = await api.get('/analytics/summary');
      setSummary(summaryRes.data);

      // Fetch analytics data (trend)
      const dataRes = await api.get('/analytics/data');
      setTrendData(dataRes.data.revenueTrend || []);

      setLoading(false);
      
      // Fetch AI Insights in parallel or slightly after
      setLoadingInsights(true);
      const aiRes = await api.get('/ai/insights');
      setInsights(aiRes.data.suggestions || aiRes.data);
      setLoadingInsights(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
      setLoadingInsights(false);
    }
  };

  const chartData = {
    labels: trendData.map(item => item.label),
    datasets: [
      {
        fill: true,
        label: 'Revenue ($)',
        data: trendData.map(item => item.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
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

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="animate-spin text-blue-500 w-10 h-10 mx-auto" />
          <p className="text-slate-400 text-sm">Loading dashboard analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 text-xs mt-1">Real-time metrics and AI sales guidance.</p>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <DashboardCards 
        revenue={summary.totalRevenue} 
        totalProducts={summary.totalProducts} 
        lowStockCount={summary.lowStockCount} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Line Chart Panel */}
        <div className="lg:col-span-2 glass-panel p-6 border border-slate-800/80">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-200">Revenue Performance</h2>
            <p className="text-slate-400 text-xs mt-0.5">Monthly revenue trend over the past 6 months</p>
          </div>
          <div className="h-[320px]">
            {trendData.length > 0 ? (
              <Line options={chartOptions} data={chartData} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                No revenue history available.
              </div>
            )}
          </div>
        </div>
        
        {/* AI Suggestions Panel */}
        <div className="glass-panel p-6 border border-slate-800/80 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit className="text-purple-400 animate-pulse w-5 h-5" />
            <div>
              <h2 className="text-lg font-bold text-slate-200">AI Sales Suggestions</h2>
              <p className="text-slate-400 text-xs mt-0.5">Gemini-generated insights for your store</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[320px] pr-1">
            {loadingInsights ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-slate-900 rounded-xl border border-white/5"></div>
                <div className="h-20 bg-slate-900 rounded-xl border border-white/5"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {Array.isArray(insights) && insights.length > 0 ? (
                  insights.map((suggestion, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-purple-950/10 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <p className="text-slate-300 text-xs leading-relaxed font-sans">{suggestion}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl">
                    <p className="text-slate-400 text-xs">No suggestions available at the moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
