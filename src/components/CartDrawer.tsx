import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowLeft, Tag, Truck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { FORMAT_PRICE } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  discount: number;
  promoApplied: string | null;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  discount,
  promoApplied,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500000;
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const shippingCost = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 75000;
  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = onApplyPromo(promoCodeInput.trim());
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoCodeInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141414]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-[460px] bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#141414]">سبد خرید شما</h2>
            <span className="text-xs text-[#787672] num-tabular font-medium">
              ({items.reduce((sum, item) => sum + item.quantity, 0)} کالا)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] -mr-2 text-[#787672] hover:text-[#141414] rounded-full hover:bg-[#F1EFEA] transition-colors"
            aria-label="بستن سبد خرید"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF9F7] px-5 py-3 border-b border-[#E8E6E1]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 text-[#141414] font-medium">
              <Truck className="w-4 h-4 text-[#787672]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#2D6A4F] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  شما واجد شرایط ارسال رایگان هستید!
                </span>
              ) : (
                <span>
                  تنها <strong className="num-tabular font-bold text-[#141414]">{FORMAT_PRICE(remainingForFreeShipping)} تومان</strong> تا ارسال رایگان
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#787672] num-tabular">{freeShippingProgress}٪</span>
          </div>
          <div className="w-full bg-[#E8E6E1] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                remainingForFreeShipping === 0 ? 'bg-[#2D6A4F]' : 'bg-[#141414]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F1EFEA]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#787672]">
              <div className="w-16 h-16 rounded-full bg-[#FAF9F7] border border-[#E8E6E1] flex items-center justify-center mb-4 text-[#A0A0A0]">
                <Truck className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-[#141414] mb-1">سبد خرید شما خالی است</p>
              <p className="text-xs text-[#787672] mb-6">
                محصولات کالکشن جدید را بررسی و گزینه‌های دلخواه خود را اضافه کنید.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#141414] text-[#FAF9F7] text-xs font-semibold rounded-[4px] hover:bg-[#2B2B2B]"
              >
                مشاهده محصولات
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                {/* Artwork Thumbnail */}
                <div className="w-18 h-24 bg-[#F1EFEA] rounded-[4px] overflow-hidden shrink-0 border border-[#E8E6E1]">
                  <ProductArtwork type={item.imageType} className="w-full h-full" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-[#141414] line-clamp-1">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#787672] hover:text-[#B25E00] p-1 -mt-1 -mr-1 transition-colors"
                        aria-label="حذف کالا"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Variant specs */}
                    <div className="text-[11px] text-[#787672] mt-1 space-x-2 space-x-reverse">
                      {item.selectedSize && <span>سایز: {item.selectedSize}</span>}
                      {item.selectedColor && (
                        <span>
                          {item.selectedSize && ' · '}رنگ: {item.selectedColor}
                        </span>
                      )}
                      {item.selectedVolume && <span>حجم: {item.selectedVolume}</span>}
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#E8E6E1] rounded-[3px] bg-[#FAF9F7]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#141414] hover:bg-[#E8E6E1] transition-colors"
                        aria-label="کاهش تعداد"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold num-tabular text-[#141414]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#141414] hover:bg-[#E8E6E1] transition-colors"
                        aria-label="افزایش تعداد"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-[#141414] num-tabular">
                      {FORMAT_PRICE(item.unitPrice * item.quantity)}{' '}
                      <span className="text-[10px] font-normal text-[#787672]">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8E6E1] bg-[#FFFFFF] space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثال: COS2026)"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#E8E6E1] rounded-[4px] focus:outline-none focus:border-[#141414] uppercase tracking-wider"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FAF9F7] hover:bg-[#141414] text-[#141414] hover:text-white border border-[#141414] text-xs font-semibold rounded-[4px] transition-colors"
              >
                اعمال
              </button>
            </form>

            {/* Promo Feedback message */}
            {promoMessage && (
              <p className={`text-[11px] ${promoMessage.error ? 'text-[#B25E00]' : 'text-[#2D6A4F]'}`}>
                {promoMessage.text}
              </p>
            )}

            {promoApplied && (
              <div className="flex items-center justify-between text-xs bg-[#F1EFEA] px-3 py-1.5 rounded-[4px]">
                <span className="flex items-center gap-1.5 text-[#2D6A4F] font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  کد {promoApplied} فعال است (۱۰٪ تخفیف)
                </span>
                <button
                  onClick={onRemovePromo}
                  className="text-[#787672] hover:text-[#141414] text-[11px] underline"
                >
                  حذف
                </button>
              </div>
            )}

            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-[#787672] pt-2 border-t border-[#F1EFEA]">
              <div className="flex justify-between">
                <span>جمع اقلام:</span>
                <span className="text-[#141414] font-medium num-tabular">{FORMAT_PRICE(subtotal)} تومان</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#2D6A4F]">
                  <span>تخفیف اعمال‌شده:</span>
                  <span className="num-tabular font-medium">- {FORMAT_PRICE(discount)} تومان</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>هزینه ارسال:</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-[#2D6A4F] font-semibold">رایگان</strong>
                  ) : (
                    <span className="text-[#141414] num-tabular">{FORMAT_PRICE(shippingCost)} تومان</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-bold text-[#141414] pt-2 border-t border-[#E8E6E1]">
                <span>مبلغ نهایی پرداخت:</span>
                <span className="num-tabular">{FORMAT_PRICE(finalTotal)} تومان</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full min-h-[48px] bg-[#141414] hover:bg-[#2B2B2B] text-[#FAF9F7] font-bold text-sm rounded-[4px] transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>ادامه فرآیند خرید و پرداخت</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
