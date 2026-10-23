import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryTabsProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  sortBy: 'featured' | 'price_asc' | 'price_desc';
  onSortChange: (sort: 'featured' | 'price_asc' | 'price_desc') => void;
  counts: {
    all: number;
    apparel: number;
    fragrance: number;
    accessories: number;
  };
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  counts,
}) => {
  const tabs: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'همه محصولات', count: counts.all },
    { id: 'apparel', label: 'پوشاک کپسولی', count: counts.apparel },
    { id: 'fragrance', label: 'عطرهای نیش', count: counts.fragrance },
    { id: 'accessories', label: 'اکسسوری‌های چرم', count: counts.accessories },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-4 pb-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6E1]">
        
        {/* Horizontal scrollable category segment without ugly scrollbars */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`min-h-[42px] px-4 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#141414] text-[#FAF9F7] border-[#141414] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#4A4A4A] border-[#E8E6E1] hover:border-[#141414] hover:text-[#141414]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full num-tabular ${
                    isActive ? 'bg-[#2A2A2A] text-[#FAF9F7]' : 'bg-[#F1EFEA] text-[#787672]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Filter Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#787672]" />
          <span className="text-xs text-[#787672]">مرتب‌سازی:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-[#FFFFFF] border border-[#E8E6E1] text-[#141414] text-xs rounded-[4px] px-2.5 py-1.5 focus:outline-none focus:border-[#141414] cursor-pointer"
          >
            <option value="featured">پیش‌فرض کالکشن</option>
            <option value="price_asc">قیمت: کم به زیاد</option>
            <option value="price_desc">قیمت: زیاد به کم</option>
          </select>
        </div>

      </div>
    </div>
  );
};
