import React, { useState } from 'react';
import api from '../api/axios';
import AIContentBox from './AIContentBox';
import { X, Sparkles, Loader2 } from 'lucide-react';

const ProductForm = ({ onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '', 
    price: '', 
    stock: '', 
    category: 'General',
    description: '', 
    tags: '', 
    seoTags: '', 
    marketingCaption: ''
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContext, setAiContext] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

  const isEdit = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags
      };

      if (isEdit) {
        await api.put(`/products/${initialData._id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.title) {
      alert("Please enter a product title first");
      return;
    }
    setAiLoading(true);
    setAiResponse(null);
    try {
      const res = await api.post('/ai/generate', {
        title: formData.title,
        attributes: aiContext || `A premium ${formData.title} in the ${formData.category} category for our store.`
      });
      setAiResponse(res.data);
    } catch (error) {
      console.error("AI Generation failed:", error);
      const msg = error.response?.data?.message || "Make sure the Gemini API key is configured.";
      alert(`AI Generation failed: ${msg}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAI = () => {
    if (!aiResponse) return;
    setFormData(prev => ({
      ...prev,
      description: aiResponse.description || prev.description,
      seoTags: aiResponse.seoTags || prev.seoTags,
      marketingCaption: aiResponse.marketingCaption || prev.marketingCaption,
      tags: aiResponse.seoTags || prev.tags
    }));
  };

  const categories = ['General', 'Electronics', 'Clothing', 'Furniture', 'Fitness', 'Kitchen', 'Beauty', 'Books'];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-850">
          <div>
            <h2 className="text-xl font-bold text-white">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-xs text-slate-400 mt-1">Specify catalog properties and apply automated copywriting.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-slate-800 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        {/* Form Body Container */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Fields */}
          <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Product Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Ergonomic Office Chair"
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  required 
                  placeholder="0.00"
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Stock Count</label>
                <input 
                  type="number" 
                  required 
                  placeholder="e.g. 50"
                  value={formData.stock} 
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
              <select 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Description</label>
              <textarea 
                rows="3" 
                placeholder="Product description..."
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Tags (comma separated)</label>
              <input 
                type="text" 
                placeholder="office, comfort, chair"
                value={formData.tags} 
                onChange={e => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
              />
            </div>
          </form>

          {/* AI Content Generation & Box */}
          <div className="flex flex-col gap-6">
            <div className="bg-purple-950/10 border border-purple-500/10 rounded-2xl p-6 flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles size={18} className="animate-pulse" />
                <h3 className="text-sm font-bold text-slate-200">AI Copywriter Console</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generate marketing-focused copy, search engine optimization tags, and catalog listings with Gemini.
              </p>
              
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Additional Prompts / Guidelines
                </label>
                <textarea 
                  rows="2" 
                  placeholder="e.g. emphasize health benefits, use professional tone, target office workers..."
                  value={aiContext}
                  onChange={e => setAiContext(e.target.value)}
                  className="w-full bg-slate-955 border border-purple-500/10 rounded-xl px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-400 text-xs resize-none" 
                />
              </div>
              
              <button 
                type="button"
                onClick={handleGenerateAI}
                disabled={aiLoading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {aiLoading ? 'Synthesizing...' : 'Generate with Gemini'}
              </button>
            </div>

            {/* AI Preview Box */}
            {aiResponse && (
              <div className="flex-1 min-h-[220px]">
                <AIContentBox data={aiResponse} onApply={handleApplyAI} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-850 flex justify-end gap-3 bg-slate-950/40">
          <button 
            type="button"
            onClick={onClose} 
            className="px-5 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            form="product-form" 
            type="submit" 
            disabled={loading} 
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
