import React, { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Product } from '../types';
import { FORMAT_PRICE } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getQuickButtonLabel = () => {
    if (product.category === 'apparel') return '+ انتخاب سایز و خرید';
    if (product.category === 'fragrance') return '+ انتخاب حجم و خرید';
    return '+ افزودن به سبد خرید';
  };

  const getMetaSpecs = () => {
    if (product.category === 'apparel' && product.apparelDetails) {
      return `سایز: ${product.apparelDetails.sizes.map((s) => s.size).join(' · ')}`;
    }
    if (product.category === 'fragrance' && product.fragranceNotes) {
      return `طبع: ${product.fragranceNotes.season} | ۵۰ / ۱۰۰ میل`;
    }
    if (product.category === 'accessories' && product.accessoryDetails) {
      return product.accessoryDetails.dimensions;
    }
    return product.shortDesc;
  };

  return (
    <article
      className="group bg-[#FFFFFF] border border-[#E8E6E1] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#141414] hover:shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Box with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] bg-[#F1EFEA] overflow-hidden cursor-pointer" onClick={() => onQuickAdd(product)}>
        <ProductArtwork
          type={product.imageType}
          isHovered={isHovered}
          className="w-full h-full"
        />

        {/* Quiet Category label */}
        <div className="absolute top-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-xs px-2.5 py-1 rounded-[2px] border border-[#E8E6E1] text-[11px] font-medium text-[#141414]">
          {product.categoryLabel}
        </div>

        {/* Low Stock or New Flag (single unboxed subtle indicator) */}
        {product.stockStatus === 'low_stock' && (
          <div className="absolute top-3 left-3 bg-[#B25E00]/10 text-[#B25E00] px-2 py-0.5 rounded-[2px] text-[10px] font-semibold">
            تعداد محدود
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#141414]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
          <span className="text-white text-xs font-medium inline-flex items-center gap-1.5 bg-[#141414]/80 px-3 py-1.5 rounded-[3px]">
            <Eye className="w-3.5 h-3.5" />
            مشاهده جزئیات و انتخاب
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-[#FFFFFF]">
        <div>
          {/* Subtle Latin Title */}
          <span className="text-[11px] text-[#787672] font-normal block tracking-wide line-clamp-1 mb-1">
            {product.latinTitle}
          </span>

          {/* Product Primary Name */}
          <h3 className="text-[13px] sm:text-[15px] font-bold text-[#141414] leading-[1.4] mb-1.5 line-clamp-1 group-hover:text-black">
            {product.title}
          </h3>

          {/* Clean Specs String */}
          <p className="text-[11px] sm:text-xs text-[#787672] line-clamp-1 mb-3">
            {getMetaSpecs()}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between pt-2 border-t border-[#F1EFEA] mb-3">
            <span className="text-xs text-[#787672]">قیمت:</span>
            <div className="text-sm sm:text-base font-bold text-[#141414] num-tabular">
              {FORMAT_PRICE(product.price)}{' '}
              <span className="text-[11px] font-normal text-[#787672]">تومان</span>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => onQuickAdd(product)}
            className="w-full min-h-[42px] px-3 py-2 bg-transparent hover:bg-[#141414] text-[#141414] hover:text-[#FAF9F7] border border-[#141414] rounded-[4px] text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-[0.98]"
            aria-label={`خرید ${product.title}`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{getQuickButtonLabel()}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
