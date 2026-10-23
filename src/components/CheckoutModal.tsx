import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Truck, ArrowLeft, Printer, RefreshCw } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { FORMAT_PRICE } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'zarinpal' | 'saman' | 'cod'>('zarinpal');
  
  // Processing states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const baseShippingCost = subtotal >= 1500000 ? 0 : 75000;
  const shippingCost = shippingMethod === 'express' ? (baseShippingCost === 0 ? 45000 : 120000) : baseShippingCost;
  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);

    // Simulate direct Shaparak/Zarinpal bank transaction verification
    setTimeout(() => {
      const randomOrderId = `COS-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderDetails = {
        orderId: randomOrderId,
        customerName: name,
        phone,
        province,
        city,
        address,
        postalCode: postalCode || '۱۴۱۹۵۶۷۸۹۰',
        shippingMethod,
        paymentMethod,
        items,
        subtotal,
        discount,
        shippingCost,
        total: finalTotal,
        orderDate: new Intl.DateTimeFormat('fa-IR', {
          dateStyle: 'full',
          timeStyle: 'short',
        }).format(new Date()),
      };

      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderComplete(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141414]/60 backdrop-blur-xs transition-opacity"
        onClick={() => !isSubmitting && onClose()}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-[620px] bg-[#FFFFFF] rounded-[6px] shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar border border-[#E8E6E1]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6E1] flex items-center justify-between sticky top-0 bg-[#FFFFFF] z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
            <h2 className="text-base font-bold text-[#141414]">
              {completedOrder ? 'رسید تایید و فاکتور خرید' : 'تسویه‌حساب تک‌صفحه‌ای و ثبت سفارش'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787672] hover:text-[#141414] rounded-full hover:bg-[#F1EFEA] transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* COMPLETED ORDER RECEIPT VIEW */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-xs text-[#2D6A4F] font-semibold tracking-wider">سفارش با موفقیت ثبت و تایید شد</span>
              <h3 className="text-xl font-extrabold text-[#141414]">
                از اعتماد شما به COS BOUTIQUE سپاسگزاریم
              </h3>
              <p className="text-xs text-[#787672]">
                کد پیگیری مرسوله و جزییات فاکتور به شماره <strong className="text-[#141414] num-tabular">{completedOrder.phone}</strong> پیامک شد.
              </p>
            </div>

            {/* Official Receipt Card */}
            <div className="bg-[#FAF9F7] border border-[#E8E6E1] rounded-[4px] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E6E1] text-xs">
                <div>
                  <span className="text-[#787672] block">شماره فاکتور:</span>
                  <strong className="text-sm font-bold text-[#141414] num-tabular">{completedOrder.orderId}</strong>
                </div>
                <div className="text-left">
                  <span className="text-[#787672] block">تاریخ ثبت:</span>
                  <span className="text-[#141414] font-medium">{completedOrder.orderDate}</span>
                </div>
              </div>

              {/* Recipient summary */}
              <div className="text-xs space-y-1 text-[#4A4A4A]">
                <p><strong>تحویل‌گیرنده:</strong> {completedOrder.customerName}</p>
                <p><strong>نشانی ارسال:</strong> {completedOrder.province}، {completedOrder.city}، {completedOrder.address}</p>
                <p><strong>روش ارسال:</strong> {completedOrder.shippingMethod === 'express' ? 'پیک اکسپرس فوری' : 'پست پیشتاز سراسری'}</p>
              </div>

              {/* Items summary */}
              <div className="pt-3 border-t border-[#E8E6E1] space-y-2">
                <span className="text-xs font-bold text-[#141414] block">اقلام سفارش:</span>
                {completedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-xs text-[#4A4A4A]">
                    <span>
                      {it.title} ({it.quantity} عدد) {it.selectedSize ? `· سایز ${it.selectedSize}` : ''} {it.selectedVolume ? `· ${it.selectedVolume}` : ''}
                    </span>
                    <span className="num-tabular font-medium">{FORMAT_PRICE(it.unitPrice * it.quantity)} تومان</span>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-[#E8E6E1] flex justify-between items-center text-sm font-bold text-[#141414]">
                <span>مبلغ پرداخت‌شده نهایی:</span>
                <span className="num-tabular text-base text-[#2D6A4F]">
                  {FORMAT_PRICE(completedOrder.total)} تومان
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 min-h-[46px] border border-[#141414] text-[#141414] text-xs font-semibold rounded-[4px] hover:bg-[#FAF9F7] flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>چاپ فاکتور</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 min-h-[46px] bg-[#141414] text-white text-xs font-semibold rounded-[4px] hover:bg-[#2B2B2B] flex items-center justify-center gap-2"
              >
                <span>بازگشت به صفحه اصلی</span>
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* 1. Customer Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#141414] uppercase tracking-wider pb-1 border-b border-[#F1EFEA]">
                ۱. مشخصات خریدار و تحویل‌گیرنده
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                    نام و نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سارا محمدی"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-[#E8E6E1] rounded-[4px] focus:outline-none focus:border-[#141414] bg-[#FAF9F7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                    شماره موبایل (پیامک رهگیری) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-[#E8E6E1] rounded-[4px] focus:outline-none focus:border-[#141414] bg-[#FAF9F7] num-tabular"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#4A4A4A] mb-1">استان</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-[#E8E6E1] rounded-[4px] focus:outline-none focus:border-[#141414] bg-[#FAF9F7]"
                  >
                    <option value="تهران">تهران</option>
                    <option value="اصفهان">اصفهان</option>
                    <option value="فارس">فارس (شیراز)</option>
                    <option value="خراسان رضوی">خراسان رضوی (مشهد)</option>
                    <option value="آذربایجان شرقی">آذربایجان شرقی (تبریز)</option>
                    <option value="البرز">البرز (کرج)</option>
                    <option value="گیلان">گیلان (رشت)</option>
                    <option value="مازندران">مازندران (ساری)</option>
                    <option value="سایر استان‌ها">سایر استان‌ها</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4A4A] mb-1">شهر</label>
                  <input
                    type="text"
                    required
                    placeholder="نام شهر"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-[#E8E6E1] rounded-[4px] focus:outline-none focus:border-[#141414] bg-[#FAF9F7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                  نشانی پستی دقیق و پلاک <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="خیابان، کوچه، پلاک، واحد..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#E8E6E1] rounded-[4px] focus:outline-none focus:border-[#141414] bg-[#FAF9F7]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                  کد پستی ده‌رقمی (اختیاری)
                </label>
                <input
                  type="text"
                  placeholder="۱۲۳۴۵۶۷۸۹۰"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 border border-[#E8E6E1] rounded-[4px] focus:outline-none focus:border-[#141414] bg-[#FAF9F7] num-tabular"
                />
              </div>
            </div>

            {/* 2. Shipping Options */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#141414] uppercase tracking-wider pb-1 border-b border-[#F1EFEA]">
                ۲. روش ارسال مرسوله
              </h3>

              <div className="space-y-2">
                <label
                  className={`flex items-center justify-between p-3 border rounded-[4px] cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#141414] bg-[#FAF9F7]'
                      : 'border-[#E8E6E1] hover:border-[#141414]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#141414]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#141414] block">پست پیشتاز بیمه‌شده سراسری</span>
                      <span className="text-[11px] text-[#787672]">تحویل ۳ الی ۵ روز کاری در سراسر کشور</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#141414] num-tabular">
                    {baseShippingCost === 0 ? 'رایگان' : `${FORMAT_PRICE(75000)} تومان`}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 border rounded-[4px] cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#141414] bg-[#FAF9F7]'
                      : 'border-[#E8E6E1] hover:border-[#141414]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#141414]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#141414] block">پیک اکسپرس اختصاصی تهران</span>
                      <span className="text-[11px] text-[#787672]">تحویل در بازه انتخابی همان روز</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#141414] num-tabular">
                    {baseShippingCost === 0 ? `${FORMAT_PRICE(45000)} تومان` : `${FORMAT_PRICE(120000)} تومان`}
                  </span>
                </label>
              </div>
            </div>

            {/* 3. Payment Gateway */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#141414] uppercase tracking-wider pb-1 border-b border-[#F1EFEA]">
                ۳. شیوه پرداخت
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label
                  className={`p-3 border rounded-[4px] cursor-pointer transition-all flex items-center gap-2.5 ${
                    paymentMethod === 'zarinpal'
                      ? 'border-[#141414] bg-[#FAF9F7]'
                      : 'border-[#E8E6E1] hover:border-[#141414]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'zarinpal'}
                    onChange={() => setPaymentMethod('zarinpal')}
                    className="accent-[#141414]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#141414] block">درگاه شاپرک (زرین‌پال)</span>
                    <span className="text-[10px] text-[#787672]">کلیه کارت‌های عضو شتاب</span>
                  </div>
                </label>

                <label
                  className={`p-3 border rounded-[4px] cursor-pointer transition-all flex items-center gap-2.5 ${
                    paymentMethod === 'saman'
                      ? 'border-[#141414] bg-[#FAF9F7]'
                      : 'border-[#E8E6E1] hover:border-[#141414]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'saman'}
                    onChange={() => setPaymentMethod('saman')}
                    className="accent-[#141414]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#141414] block">درگاه پرداخت سامان کیش</span>
                    <span className="text-[10px] text-[#787672]">اتصال مستقیم بانکی</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Final Order Review */}
            <div className="bg-[#FAF9F7] p-4 rounded-[4px] border border-[#E8E6E1] space-y-2 text-xs">
              <div className="flex justify-between text-[#787672]">
                <span>جمع کل اقلام ({items.reduce((s, i) => s + i.quantity, 0)} عدد):</span>
                <span className="num-tabular font-medium text-[#141414]">{FORMAT_PRICE(subtotal)} تومان</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2D6A4F]">
                  <span>تخفیف ویژه:</span>
                  <span className="num-tabular font-medium">- {FORMAT_PRICE(discount)} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-[#787672]">
                <span>هزینه حمل و بیمه:</span>
                <span className="num-tabular font-medium text-[#141414]">
                  {shippingCost === 0 ? 'رایگان' : `${FORMAT_PRICE(shippingCost)} تومان`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#141414] pt-2 border-t border-[#E8E6E1]">
                <span>مبلغ قابل پرداخت:</span>
                <span className="num-tabular">{FORMAT_PRICE(finalTotal)} تومان</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[50px] bg-[#141414] hover:bg-[#2B2B2B] disabled:bg-[#787672] text-[#FAF9F7] font-bold text-sm rounded-[4px] transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>در حال اتصال به درگاه شاپرک...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>تایید سفارش و پرداخت آنلاین —</span>
                  <span className="num-tabular font-bold">{FORMAT_PRICE(finalTotal)} تومان</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-[#787672]">
              <span>🔒 پرداخت امن تحت نظارت شبکه شاپرک بانک مرکزی جمهوری اسلامی ایران</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
