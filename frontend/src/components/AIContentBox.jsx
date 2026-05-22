import React, { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Tag, FileText } from 'lucide-react';

const AIContentBox = ({ data, onApply }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!data) return null;

  return (
    <div className="bg-purple-950/15 border border-purple-500/20 rounded-2xl p-6 space-y-5 flex flex-col h-full relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-purple-500/10 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-400 animate-pulse w-5 h-5" />
          <h4 className="font-bold text-base text-purple-100">AI Generated Suggestions</h4>
        </div>
        {data.warning && (
          <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-medium">
            Simulated
          </span>
        )}
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
        {/* Description Box */}
        {data.description && (
          <div className="space-y-1.5 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <FileText size={13} />
                Description
              </span>
              <button
                onClick={() => handleCopy(data.description, 'desc')}
                className="text-purple-400/60 hover:text-purple-300 transition-colors p-1 rounded-md hover:bg-purple-500/10"
              >
                {copiedKey === 'desc' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="bg-purple-950/40 border border-purple-500/10 rounded-xl p-3 text-xs text-slate-200 leading-relaxed font-sans max-h-24 overflow-y-auto">
              {data.description}
            </div>
          </div>
        )}

        {/* SEO Tags Box */}
        {data.seoTags && (
          <div className="space-y-1.5 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <Tag size={13} />
                SEO Tags
              </span>
              <button
                onClick={() => handleCopy(data.seoTags, 'seo')}
                className="text-purple-400/60 hover:text-purple-300 transition-colors p-1 rounded-md hover:bg-purple-500/10"
              >
                {copiedKey === 'seo' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="bg-purple-950/40 border border-purple-500/10 rounded-xl p-3 text-xs text-slate-200 leading-relaxed font-mono truncate">
              {data.seoTags}
            </div>
          </div>
        )}

        {/* Marketing Caption Box */}
        {data.marketingCaption && (
          <div className="space-y-1.5 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <MessageSquare size={13} />
                Marketing Caption
              </span>
              <button
                onClick={() => handleCopy(data.marketingCaption, 'caption')}
                className="text-purple-400/60 hover:text-purple-300 transition-colors p-1 rounded-md hover:bg-purple-500/10"
              >
                {copiedKey === 'caption' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="bg-purple-950/40 border border-purple-500/10 rounded-xl p-3 text-xs text-purple-100 italic leading-relaxed font-sans">
              "{data.marketingCaption}"
            </div>
          </div>
        )}
      </div>

      {onApply && (
        <button
          onClick={onApply}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-2 px-4 rounded-xl text-xs transition-all duration-300 shadow-lg shadow-purple-900/20 active:scale-[0.98]"
        >
          Apply All AI Suggestions
        </button>
      )}
    </div>
  );
};

export default AIContentBox;
