import React from 'react';
import { Edit2, Trash2, AlertTriangle, Tag } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const isLowStock = product.stock < 10;

  return (
    <div className="glass-panel hover:bg-slate-900/60 transition-all duration-300 border border-slate-800/80 hover:border-slate-700/80 flex flex-col h-full overflow-hidden group">
      <div className="p-6 flex flex-col flex-1">
        {/* Header (Title & Price) */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.title}
          </h4>
          <span className="text-emerald-400 font-bold shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Category & Stock Status */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/50 flex items-center gap-1 font-medium">
            <Tag size={12} className="text-blue-400" />
            {product.category || 'General'}
          </span>

          <span
            className={`text-xs px-2.5 py-1 rounded-full border flex items-center gap-1 font-semibold ${
              isLowStock
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}
          >
            {isLowStock && <AlertTriangle size={12} />}
            {isLowStock ? `Low Stock (${product.stock})` : `Stock: ${product.stock}`}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3">
          {product.description || 'No description available for this product.'}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-800/60">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="bg-slate-950/40 px-6 py-3.5 border-t border-slate-800/80 flex items-center justify-end gap-3.5">
        <button
          onClick={() => onEdit(product)}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          <Edit2 size={13} />
          Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
        >
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
