import React, { useState } from 'react';
import { X, Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, FORMAT_PRICE } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickTags = [
    'کت پشمی',
    'چوب صندل',
    'کشمیر مغولستان',
    'کیف چرم',
    'ترنج دودی',
    'پاپیروس',
    'فلانل',
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    const titleMatch = p.title.toLowerCase().includes(q) || p.latinTitle.toLowerCase().includes(q);
    const descMatch = p.shortDesc.toLowerCase().includes(q) || p.fullDesc.toLowerCase().includes(q);
    const categoryMatch = p.categoryLabel.toLowerCase().includes(q);
    const notesMatch = p.fragranceNotes
      ? [...p.fragranceNotes.top, ...p.fragranceNotes.heart, ...p.fragranceNotes.base].some((n) =>
          n.toLowerCase().includes(q)
        )
      : false;
    return titleMatch || descMatch || categoryMatch || notesMatch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141414]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative z-10 w-full max-w-[620px] bg-[#FFFFFF] rounded-[6px] shadow-2xl border border-[#E8E6E1] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#E8E6E1] flex items-center gap-3">
          <SearchIcon className="w-5 h-5 text-[#787672] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="جستجو در بین پوشاک، نت‌های عطری، یا اکسسوری‌ها..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base text-[#141414] placeholder-[#787672] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#787672] hover:text-[#141414] px-1.5 py-0.5 rounded"
            >
              پاک کردن
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#787672] hover:text-[#141414] rounded-full hover:bg-[#F1EFEA]"
            aria-label="بستن جستجو"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-3 bg-[#FAF9F7] border-b border-[#E8E6E1] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[#787672] shrink-0">جستجوهای پرطرفدار:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E8E6E1] hover:border-[#141414] rounded-full text-[#4A4A4A] hover:text-[#141414] shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[380px] overflow-y-auto p-4 divide-y divide-[#F1EFEA]">
          {query.trim() && filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#787672]">
              کالایی با عبارت «{query}» یافت نشد. می‌توانید با کلیدواژه‌های دیگری جستجو کنید.
            </div>
          ) : query.trim() ? (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF9F7] px-2 rounded transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-[#F1EFEA] rounded-[2px] overflow-hidden border border-[#E8E6E1] shrink-0">
                    <ProductArtwork type={prod.imageType} className="w-full h-full" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#787672]">{prod.categoryLabel}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#141414]">{prod.title}</h4>
                    <span className="text-xs font-semibold text-[#141414] num-tabular">
                      {FORMAT_PRICE(prod.price)} تومان
                    </span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-[#787672]" />
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-[#787672]">
              عبارت مورد نظر خود را تایپ کنید یا روی یکی از تگ‌های پرطرفدار کلیک نمایید.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
