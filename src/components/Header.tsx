import React, { useState } from 'react';
import { Menu, X, Search, ShoppingBag, Sparkles, BookOpen } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenSizeGuide: () => void;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenSizeGuide,
  activeCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'apparel', label: 'پوشاک کپسولی' },
    { id: 'fragrance', label: 'عطرهای نیش' },
    { id: 'accessories', label: 'اکسسوری‌ها' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#E8E6E1] transition-all">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 md:h-18 flex items-center justify-between gap-4">
          
          {/* Zone 1: Right anchor (RTL start) - Mobile Menu Toggle & Desktop Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -mr-2 min-w-[48px] min-h-[48px] inline-flex items-center justify-center text-[#141414] hover:text-[#4A4A4A] transition-colors focus-visible:outline-none"
              aria-label="باز کردن منو"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A4A4A]" aria-label="ناوبری اصلی">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors ${
                    activeCategory === item.id
                      ? 'text-[#141414] font-semibold'
                      : 'hover:text-[#141414]'
                  }`}
                >
                  {item.label}
                  {activeCategory === item.id && (
                    <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#141414] rounded-full" />
                  )}
                </button>
              ))}
              <a
                href="#craftsmanship"
                className="py-1 hover:text-[#141414] whitespace-nowrap transition-colors"
              >
                داستان برند
              </a>
              <button
                onClick={onOpenSizeGuide}
                className="py-1 hover:text-[#141414] whitespace-nowrap transition-colors inline-flex items-center gap-1.5"
              >
                <span>راهنمای سایز</span>
              </button>
            </nav>
          </div>

          {/* Zone 2: Center - Single Minimalist Wordmark */}
          <div className="text-center">
            <a
              href="#"
              className="text-xl md:text-2xl font-extrabold tracking-[0.2em] uppercase text-[#141414] hover:opacity-85 transition-opacity"
            >
              COS BOUTIQUE
            </a>
          </div>

          {/* Zone 3: Left anchor (RTL end) - Search and Bag Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="min-w-[44px] min-h-[44px] p-2 inline-flex items-center justify-center text-[#141414] hover:text-[#4A4A4A] transition-colors focus-visible:outline-none"
              aria-label="جستجوی کالا"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenCart}
              className="min-w-[44px] min-h-[44px] p-2 inline-flex items-center justify-center text-[#141414] hover:text-[#4A4A4A] relative transition-colors focus-visible:outline-none"
              aria-label={`سبد خرید (${cartCount} کالا)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 left-1.5 bg-[#141414] text-[#FAF9F7] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none num-tabular">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#141414]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer container from right (RTL start) */}
          <div className="fixed inset-y-0 right-0 w-[82%] max-w-[340px] bg-[#FAF9F7] shadow-xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E6E1]">
                <span className="text-sm font-bold tracking-widest uppercase">منوی فروشگاه</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[40px] min-h-[40px] p-2 inline-flex items-center justify-center text-[#787672] hover:text-[#141414]"
                  aria-label="بستن منو"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <span className="text-xs text-[#787672] font-medium mb-1">دسته‌بندی‌های کالا</span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCategory(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-right py-3 px-3 rounded text-sm transition-colors ${
                      activeCategory === item.id
                        ? 'bg-[#141414] text-[#FAF9F7] font-semibold'
                        : 'text-[#141414] hover:bg-[#F1EFEA]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="my-4 border-t border-[#E8E6E1]" />

                <a
                  href="#craftsmanship"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-right py-3 px-3 text-sm text-[#141414] hover:bg-[#F1EFEA] rounded flex items-center justify-between"
                >
                  <span>فلسفه معماری و اصالت COS</span>
                  <BookOpen className="w-4 h-4 text-[#787672]" />
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSizeGuide();
                  }}
                  className="text-right py-3 px-3 text-sm text-[#141414] hover:bg-[#F1EFEA] rounded flex items-center justify-between"
                >
                  <span>راهنمای سایز و ابعاد پوشاک</span>
                  <Sparkles className="w-4 h-4 text-[#787672]" />
                </button>
              </div>
            </div>

            {/* Footer info inside mobile drawer */}
            <div className="pt-6 border-t border-[#E8E6E1] text-xs text-[#787672] space-y-1">
              <p>پشتیبانی: شنبه تا پنجشنبه ۹ الی ۲۱</p>
              <p>ارسال به سراسر کشور با بیمه مرسوله</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
