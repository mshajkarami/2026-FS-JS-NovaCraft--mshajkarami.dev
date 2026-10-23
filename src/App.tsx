import React, { useState, useMemo } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryTabs } from './components/CategoryTabs';
import { ProductCard } from './components/ProductCard';
import { QuickAddBottomSheet } from './components/QuickAddBottomSheet';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { StorySection } from './components/StorySection';
import { TrustStrip } from './components/TrustStrip';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, OrderDetails } from './types';

export default function App() {
  // State management
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');
  
  // Modals & Drawers
  const [selectedProductForQuickAdd, setSelectedProductForQuickAdd] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Cart state - initialized with first boutique product as seen in scaffold.html
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial_cart_1',
      productId: 'p1',
      title: 'کت اورسایز پشمی ملانژ',
      category: 'apparel',
      imageType: 'wool_coat',
      unitPrice: 3850000,
      quantity: 1,
      selectedSize: '۴۰',
      selectedColor: 'زغالی ملانژ',
    },
  ]);

  // Discount promo
  const [promoCode, setPromoCode] = useState<string | null>('COS2026');

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, sortBy]);

  // Counts for tabs
  const categoryCounts = useMemo(() => {
    return {
      all: PRODUCTS.length,
      apparel: PRODUCTS.filter((p) => p.category === 'apparel').length,
      fragrance: PRODUCTS.filter((p) => p.category === 'fragrance').length,
      accessories: PRODUCTS.filter((p) => p.category === 'accessories').length,
    };
  }, []);

  // Cart calculations
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (promoCode === 'COS2026') {
      return Math.round(subtotalPrice * 0.1); // 10% discount
    }
    return 0;
  }, [promoCode, subtotalPrice]);

  const finalTotalPrice = Math.max(0, subtotalPrice - discountAmount);

  // Cart Handlers
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    setCartItems((prev) => {
      // Check if matching item exists with same size/color/volume
      const existingIndex = prev.findIndex(
        (it) =>
          it.productId === newItem.productId &&
          it.selectedSize === newItem.selectedSize &&
          it.selectedColor === newItem.selectedColor &&
          it.selectedVolume === newItem.selectedVolume
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += newItem.quantity;
        return copy;
      } else {
        const itemWithId: CartItem = {
          ...newItem,
          id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        };
        return [...prev, itemWithId];
      }
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: newQty } : it))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleApplyPromo = (code: string) => {
    if (code.toUpperCase() === 'COS2026') {
      setPromoCode('COS2026');
      return { success: true, message: 'کد تخفیف ۱۰٪ اختصاصی COS با موفقیت اعمال شد.' };
    }
    return { success: false, message: 'کد تخفیف وارد شده معتبر نمی‌باشد.' };
  };

  const handleRemovePromo = () => {
    setPromoCode(null);
  };

  const handleOrderComplete = (_order: OrderDetails) => {
    // Clear cart after successful checkout order
    setCartItems([]);
  };

  const handleScrollToProducts = () => {
    const el = document.getElementById('catalog-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#141414] font-['Vazirmatn'] relative pb-20 lg:pb-0">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Smart Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleScrollToProducts();
        }}
      />

      <main className="flex-1">
        
        {/* 3. Hero Lookbook Editorial Banner */}
        <HeroSection
          onExploreCollection={handleScrollToProducts}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            handleScrollToProducts();
          }}
        />

        {/* 4. Category Tabs & Segmented Filters */}
        <div id="catalog-showcase" className="scroll-mt-20">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            counts={categoryCounts}
          />
        </div>

        {/* 5. Curated Product Grid (Mobile-First 2 Columns) */}
        <section
          className="max-w-[1280px] mx-auto px-4 md:px-8 py-6"
          aria-label="ویترین محصولات منتخب"
        >
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#787672]">
              محصولی در این دسته‌بندی یافت نشد.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={(p) => setSelectedProductForQuickAdd(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* 6. Storytelling & Architectural Philosophy */}
        <StorySection />

        {/* 7. Trust & Confidence Strip */}
        <TrustStrip />

      </main>

      {/* 8. Footer */}
      <Footer />

      {/* 9. Sticky Bottom Checkout Bar (Mobile & Tablet) */}
      <StickyMobileBar
        cartCount={totalCartCount}
        totalPrice={finalTotalPrice}
        onOpenCart={() => setIsCartOpen(true)}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 10. Quick Add Bottom Sheet (Ergonomic Thumb-Zone Drawer) */}
      <QuickAddBottomSheet
        product={selectedProductForQuickAdd}
        isOpen={Boolean(selectedProductForQuickAdd)}
        onClose={() => setSelectedProductForQuickAdd(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setSelectedProductForQuickAdd(null);
          setIsSizeGuideOpen(true);
        }}
      />

      {/* 11. Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discount={discountAmount}
        promoApplied={promoCode}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* 12. One-Page Frictionless Guest Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotalPrice}
        discount={discountAmount}
        onOrderComplete={handleOrderComplete}
      />

      {/* 13. Real-Time Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProductForQuickAdd(p)}
      />

      {/* 14. Persian Apparel Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

    </div>
  );
}
