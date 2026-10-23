import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { FORMAT_PRICE } from '../data/products';

interface StickyMobileBarProps {
  cartCount: number;
  totalPrice: number;
  onOpenCart: () => void;
  onCheckout: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  cartCount,
  totalPrice,
  onOpenCart,
  onCheckout,
}) => {
  if (cartCount === 0) return null;

  return (
    <aside
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E8E6E1] px-4 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200"
      aria-label="سبد خرید سریع موبایل"
    >
      {/* Price Summary & Cart Trigger */}
      <div
        onClick={onOpenCart}
        className="flex items-center gap-2.5 cursor-pointer active:opacity-75 transition-opacity"
      >
        <div className="relative w-10 h-10 rounded-[4px] bg-[#FAF9F7] border border-[#E8E6E1] flex items-center justify-center text-[#141414]">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 bg-[#141414] text-[#FAF9F7] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none num-tabular">
            {cartCount}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-[#787672] leading-tight">
            جمع سبد خرید ({cartCount} کالا)
          </span>
          <span className="text-sm font-bold text-[#141414] num-tabular">
            {FORMAT_PRICE(totalPrice)}{' '}
            <span className="text-[10px] font-normal text-[#787672]">تومان</span>
          </span>
        </div>
      </div>

      {/* Direct One-Click Checkout Button */}
      <button
        onClick={onCheckout}
        className="min-h-[46px] px-5 bg-[#141414] hover:bg-[#2B2B2B] text-[#FAF9F7] rounded-[4px] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-xs"
      >
        <span>تکمیل و پرداخت</span>
        <ArrowLeft className="w-4 h-4" />
      </button>
    </aside>
  );
};
