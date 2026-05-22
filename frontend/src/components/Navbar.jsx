import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, User, AlertTriangle, Package, Tag, X } from 'lucide-react';
import api from '../api/axios';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [showAlertDropdown, setShowAlertDropdown] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced product search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await api.get('/products');
        const query = searchQuery.toLowerCase();
        const filtered = res.data.filter(
          (p) =>
            p.title?.toLowerCase().includes(query) ||
            p.category?.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query) ||
            (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(query)))
        );
        setSearchResults(filtered.slice(0, 6));
        setShowSearchResults(true);
      } catch (e) {
        console.error('Search failed:', e);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const fetchAlerts = async () => {
    try {
      const res = await api.get('/analytics/summary');
      if (res.data && res.data.lowStockProducts) {
        setAlerts(res.data.lowStockProducts);
      }
    } catch (e) {
      console.error('Failed to fetch alerts:', e);
    }
  };

  const handleResultClick = () => {
    setSearchQuery('');
    setShowSearchResults(false);
    navigate('/products');
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard Overview';
      case '/products': return 'Product Management';
      case '/analytics': return 'Store Analytics';
      default: return 'SmartStore AI';
    }
  };

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900/20 backdrop-blur-lg flex items-center justify-between px-8 relative z-20">
      <div>
        <h2 className="text-xl font-bold text-white tracking-wide">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar with Live Results */}
        <div className="relative hidden md:block" ref={searchRef}>
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
            onKeyDown={handleSearchKeyDown}
            className="bg-slate-950 border border-slate-800/80 rounded-full pl-10 pr-9 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 w-72 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X size={14} />
            </button>
          )}

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute right-0 left-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              {searchLoading ? (
                <div className="p-4 text-center">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-[11px] text-slate-400 mt-2">Searching...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-400">No products matching "<span className="text-slate-200">{searchQuery}</span>"</p>
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto">
                  <div className="px-3 py-2 border-b border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                  {searchResults.map((product) => (
                    <button
                      key={product._id}
                      onClick={handleResultClick}
                      className="w-full text-left px-4 py-3 hover:bg-blue-500/5 border-b border-slate-800/40 last:border-0 flex items-start gap-3 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-blue-500/30">
                        <Package size={14} className="text-slate-400 group-hover:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-emerald-400 font-medium">${product.price?.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-500">•</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Tag size={9} /> {product.category || 'General'}
                          </span>
                          <span className="text-[10px] text-slate-500">•</span>
                          <span className={`text-[10px] font-medium ${product.stock < 10 ? 'text-rose-400' : 'text-slate-400'}`}>
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowAlertDropdown(!showAlertDropdown)}
            className="p-2.5 rounded-full hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors relative"
          >
            <Bell size={20} />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-slate-900 animate-pulse">
                {alerts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showAlertDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
                <span className="font-semibold text-slate-200 text-sm">Stock Alerts</span>
                <span className="text-xs bg-rose-500/20 text-rose-400 px-2.5 py-0.5 rounded-full font-medium">
                  {alerts.length} Warnings
                </span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2.5 scrollbar-thin">
                {alerts.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">All products are healthy in stock!</p>
                ) : (
                  alerts.map((item) => (
                    <div
                      key={item._id}
                      className="p-3 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/15 rounded-xl flex items-start gap-3 transition-colors"
                    >
                      <AlertTriangle className="text-rose-400 shrink-0 w-4 h-4 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Only <strong className="text-rose-400">{item.stock}</strong> items remaining!
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <User size={18} />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-slate-400">Admin Store</p>
            <p className="text-sm font-semibold text-white">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
