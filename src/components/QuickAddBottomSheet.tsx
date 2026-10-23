import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Sparkles, HelpCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product, CartItem } from '../types';
import { FORMAT_PRICE } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface QuickAddBottomSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onOpenSizeGuide: () => void;
}

export const QuickAddBottomSheet: React.FC<QuickAddBottomSheetProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  // Selected states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedVolume, setSelectedVolume] = useState<'50ml' | '100ml'>('50ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Initialize defaults on product change
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAddedSuccess(false);

      if (product.category === 'apparel' && product.apparelDetails) {
        // default to first in-stock size
        const firstInStockSize = product.apparelDetails.sizes.find((s) => s.inStock)?.size || product.apparelDetails.sizes[0]?.size || '';
        setSelectedSize(firstInStockSize);
        setSelectedColor(product.apparelDetails.colors[0]?.name || '');
      } else if (product.category === 'fragrance') {
        setSelectedVolume('50ml');
      } else if (product.category === 'accessories' && product.accessoryDetails) {
        setSelectedColor(product.accessoryDetails.colors[0]?.name || '');
      }
    }
  }, [product]);

  // Compute live price based on volume for fragrance
  const currentUnitPrice =
    product.category === 'fragrance' && selectedVolume === '100ml' && product.price100ml
      ? product.price100ml
      : product.price;

  const currentTotalPrice = currentUnitPrice * quantity;

  // Check inventory for current apparel size
  const currentSizeObj = product.apparelDetails?.sizes.find((s) => s.size === selectedSize);
  const isCurrentVariantAvailable =
    product.category === 'apparel' ? currentSizeObj?.inStock ?? true : true;

  const handleAdd = () => {
    if (!isCurrentVariantAvailable) return;

    onAddToCart({
      productId: product.id,
      title: product.title,
      category: product.category,
      imageType: product.imageType,
      unitPrice: currentUnitPrice,
      quantity,
      selectedSize: product.category === 'apparel' ? selectedSize : undefined,
      selectedColor: product.category === 'apparel' || product.category === 'accessories' ? selectedColor : undefined,
      selectedVolume: product.category === 'fragrance' ? selectedVolume : undefined,
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141414]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content Container with rounded top corners */}
      <div
        className="relative z-10 w-full max-w-[640px] bg-[#FFFFFF] rounded-t-[16px] shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar border-t border-[#E8E6E1] animate-in slide-in-from-bottom duration-300"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drag handle pill for mobile */}
        <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1 bg-[#E8E6E1] rounded-full" />
        </div>

        {/* Header Bar */}
        <div className="px-5 sm:px-7 py-3 flex items-start justify-between border-b border-[#F1EFEA]">
          <div className="flex gap-4">
            <div className="w-16 h-20 bg-[#F1EFEA] rounded-[4px] overflow-hidden shrink-0 border border-[#E8E6E1]">
              <ProductArtwork type={product.imageType} className="w-full h-full" />
            </div>
            <div>
              <span className="text-xs text-[#787672]">{product.categoryLabel}</span>
              <h2 className="text-base sm:text-lg font-bold text-[#141414] leading-snug">
                {product.title}
              </h2>
              <div className="text-sm font-bold text-[#141414] mt-1 num-tabular">
                {FORMAT_PRICE(currentUnitPrice)}{' '}
                <span className="text-xs font-normal text-[#787672]">تومان</span>
                {selectedVolume === '100ml' && (
                  <span className="text-[11px] text-[#787672] font-normal mr-2">
                    (حجم ۱۰۰ میل با صرفه اقتصادی)
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] -mr-2 text-[#787672] hover:text-[#141414] rounded-full hover:bg-[#F1EFEA] transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Configuration Options */}
        <div className="p-5 sm:p-7 space-y-6">

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#4A4A4A] leading-[1.8]">
            {product.fullDesc}
          </p>

          {/* APPAREL CONFIGURATION */}
          {product.category === 'apparel' && product.apparelDetails && (
            <div className="space-y-5">
              
              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#141414]">
                    انتخاب رنگ: <span className="font-normal text-[#787672]">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.apparelDetails.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.name)}
                      className={`min-w-[44px] min-h-[44px] rounded-full p-1 border-2 transition-all flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-[#141414] scale-105'
                          : 'border-transparent hover:border-[#D4CEBF]'
                      }`}
                      aria-label={c.name}
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor === c.name && (
                          <Check
                            className={`w-4 h-4 ${
                              c.hex === '#F5F5F0' || c.hex === '#D6CFC4'
                                ? 'text-black'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#141414]">
                    انتخاب سایز: <span className="font-normal text-[#787672]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#141414] underline hover:text-[#787672] inline-flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>راهنمای اندازه</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.apparelDetails.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        disabled={!s.inStock}
                        onClick={() => setSelectedSize(s.size)}
                        className={`min-h-[48px] rounded-[4px] border text-xs sm:text-sm font-semibold transition-all relative flex flex-col items-center justify-center ${
                          isSelected && s.inStock
                            ? 'bg-[#141414] text-[#FAF9F7] border-[#141414]'
                            : s.inStock
                            ? 'bg-[#FFFFFF] text-[#141414] border-[#E8E6E1] hover:border-[#141414]'
                            : 'bg-[#F1EFEA] text-[#A0A0A0] border-[#E8E6E1] cursor-not-allowed opacity-60'
                        }`}
                      >
                        <span className="num-tabular">{s.size}</span>
                        {!s.inStock ? (
                          <span className="text-[9px] text-[#A0A0A0] leading-none mt-0.5">ناموجود</span>
                        ) : s.stockCount <= 2 ? (
                          <span className="text-[9px] text-[#B25E00] leading-none mt-0.5">
                            {s.stockCount} عدد مانده
                          </span>
                        ) : null}

                        {/* Diagonal strike-through for out-of-stock */}
                        {!s.inStock && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-full h-[1px] bg-[#A0A0A0] rotate-25" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material & Care */}
              <div className="bg-[#FAF9F7] p-3.5 rounded-[4px] border border-[#E8E6E1] text-xs text-[#4A4A4A] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#787672]">ترکیب الیاف:</span>
                  <span className="font-medium text-[#141414]">{product.apparelDetails.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787672]">فرم و دوخت:</span>
                  <span className="font-medium text-[#141414]">{product.apparelDetails.fit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787672]">شستشو:</span>
                  <span className="font-medium text-[#141414]">{product.apparelDetails.care}</span>
                </div>
              </div>

            </div>
          )}

          {/* FRAGRANCE CONFIGURATION */}
          {product.category === 'fragrance' && product.fragranceNotes && (
            <div className="space-y-5">
              
              {/* Volume Selection Buttons */}
              <div>
                <span className="text-xs font-semibold text-[#141414] block mb-2">
                  انتخاب حجم شیشه عطر:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedVolume('50ml')}
                    className={`min-h-[48px] p-3 rounded-[4px] border text-right transition-all flex items-center justify-between ${
                      selectedVolume === '50ml'
                        ? 'border-[#141414] bg-[#FAF9F7] ring-1 ring-[#141414]'
                        : 'border-[#E8E6E1] bg-[#FFFFFF] hover:border-[#141414]'
                    }`}
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-bold block text-[#141414]">۵۰ میلی‌لیتر</span>
                      <span className="text-[11px] text-[#787672]">شیشه دودی مسافرتی</span>
                    </div>
                    <span className="text-xs font-bold num-tabular">{FORMAT_PRICE(product.price)} ت</span>
                  </button>

                  <button
                    onClick={() => setSelectedVolume('100ml')}
                    className={`min-h-[48px] p-3 rounded-[4px] border text-right transition-all flex items-center justify-between ${
                      selectedVolume === '100ml'
                        ? 'border-[#141414] bg-[#FAF9F7] ring-1 ring-[#141414]'
                        : 'border-[#E8E6E1] bg-[#FFFFFF] hover:border-[#141414]'
                    }`}
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-bold block text-[#141414]">۱۰۰ میلی‌لیتر</span>
                      <span className="text-[11px] text-[#2D6A4F]">ارزش خرید بالاتر</span>
                    </div>
                    <span className="text-xs font-bold num-tabular">
                      {FORMAT_PRICE(product.price100ml || product.price * 1.6)} ت
                    </span>
                  </button>
                </div>
              </div>

              {/* Olfactory Pyramid (هرم بویایی) */}
              <div className="bg-[#FAF9F7] p-4 rounded-[4px] border border-[#E8E6E1] space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#141414] pb-2 border-b border-[#E8E6E1]">
                  <Sparkles className="w-3.5 h-3.5 text-[#141414]" />
                  <span>هرم ساختار نت‌های بویایی (Olfactory Pyramid)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] font-bold text-[#787672] block mb-1">نت‌های آغازین (Top):</span>
                    <p className="text-[#141414] leading-relaxed">
                      {product.fragranceNotes.top.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#787672] block mb-1">نت‌های میانی (Heart):</span>
                    <p className="text-[#141414] leading-relaxed">
                      {product.fragranceNotes.heart.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#787672] block mb-1">نت‌های پایه (Base):</span>
                    <p className="text-[#141414] leading-relaxed">
                      {product.fragranceNotes.base.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Performance & Longevity */}
                <div className="pt-2 border-t border-[#E8E6E1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#787672]">
                  <span>غلظت: <strong className="text-[#141414] font-medium">{product.fragranceNotes.concentration}</strong></span>
                  <span>ماندگاری: <strong className="text-[#2D6A4F] font-semibold">{product.fragranceNotes.longevity}</strong></span>
                  <span>پخش بو: <strong className="text-[#141414] font-medium">{product.fragranceNotes.sillage}</strong></span>
                </div>
              </div>

            </div>
          )}

          {/* ACCESSORIES CONFIGURATION */}
          {product.category === 'accessories' && product.accessoryDetails && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#141414] block mb-2">
                  رنگ چرم: <span className="font-normal text-[#787672]">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-3">
                  {product.accessoryDetails.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.name)}
                      className={`min-w-[44px] min-h-[44px] rounded-full p-1 border-2 transition-all flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-[#141414] scale-105'
                          : 'border-transparent hover:border-[#D4CEBF]'
                      }`}
                      aria-label={c.name}
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor === c.name && <Check className="w-4 h-4 text-white" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF9F7] p-3.5 rounded-[4px] border border-[#E8E6E1] text-xs text-[#4A4A4A] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#787672]">نوع متریال:</span>
                  <span className="font-medium text-[#141414]">{product.accessoryDetails.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787672]">ابعاد:</span>
                  <span className="font-medium text-[#141414]">{product.accessoryDetails.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787672]">یراق‌آلات:</span>
                  <span className="font-medium text-[#141414]">{product.accessoryDetails.hardware}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-[#141414]">تعداد سفارش:</span>
            <div className="flex items-center border border-[#E8E6E1] rounded-[4px] bg-[#FAF9F7]">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#141414] hover:bg-[#E8E6E1] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="کاهش تعداد"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-bold num-tabular text-[#141414]">
                {quantity}
              </span>
              <button
                disabled={quantity >= 5}
                onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-[#141414] hover:bg-[#E8E6E1] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="افزایش تعداد"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Sticky Bottom Action Zone (Thumb-Zone Friendly >= 48px) */}
        <div className="sticky bottom-0 bg-[#FFFFFF] border-t border-[#E8E6E1] p-4 sm:p-5 flex items-center gap-3">
          <button
            disabled={!isCurrentVariantAvailable || addedSuccess}
            onClick={handleAdd}
            className={`w-full min-h-[50px] px-6 rounded-[4px] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] ${
              addedSuccess
                ? 'bg-[#2D6A4F] text-[#FAF9F7]'
                : !isCurrentVariantAvailable
                ? 'bg-[#E8E6E1] text-[#787672] cursor-not-allowed'
                : 'bg-[#141414] text-[#FAF9F7] hover:bg-[#2B2B2B]'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>با موفقیت به سبد خرید افزوده شد</span>
              </>
            ) : !isCurrentVariantAvailable ? (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>این سایز در حال حاضر موجود نیست</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>افزودن به سبد خرید —</span>
                <span className="num-tabular font-bold">{FORMAT_PRICE(currentTotalPrice)} تومان</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
