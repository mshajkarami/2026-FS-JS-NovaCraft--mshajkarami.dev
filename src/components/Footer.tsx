import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#141414] text-[#FFFFFF] pt-14 pb-28 lg:pb-14 px-4 md:px-8 border-t border-[#262626]">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Concept */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-black tracking-[0.2em] uppercase">COS BOUTIQUE</h3>
            <p className="text-xs text-[#A0A0A0] leading-[1.9] max-w-[380px]">
              فروشگاه آنلاین تخصصی پوشاک دست‌دوز کپسولی، اکسسوری‌های خاص چرم طبیعی و کلکسیون اکستریت‌های عطری نیش با استانداردهای طراحی مینیمال بین‌المللی.
            </p>
            <div className="text-xs text-[#787672] space-y-1">
              <p>دفتر طراحی: تهران، خیابان فرشته، پلاک ۱۸</p>
              <p>مرکز پشتیبانی مشتریان: ۰۲۱-۲۲۰۰۰۴۵۰</p>
            </div>
          </div>

          {/* Nav Links: Collections */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#FFFFFF] tracking-wider uppercase">کالکشن‌ها</h4>
            <ul className="space-y-2 text-[#A0A0A0]">
              <li><a href="#" className="hover:text-white transition-colors">کت و پالتوهای پشمی</a></li>
              <li><a href="#" className="hover:text-white transition-colors">پلیورهای کشمیر مغولستان</a></li>
              <li><a href="#" className="hover:text-white transition-colors">عطرهای نیش گراس فرانسه</a></li>
              <li><a href="#" className="hover:text-white transition-colors">کیف و کمربندهای چرم طبیعی</a></li>
              <li><a href="#" className="hover:text-white transition-colors">لوک‌بوک پاییز و زمستان ۲۰۲۶</a></li>
            </ul>
          </div>

          {/* Nav Links: Customer Service */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#FFFFFF] tracking-wider uppercase">راهنمای مشتریان</h4>
            <ul className="space-y-2 text-[#A0A0A0]">
              <li><a href="#" className="hover:text-white transition-colors">راهنمای انتخاب اندازه و فیت</a></li>
              <li><a href="#" className="hover:text-white transition-colors">قوانین و رویه تعویض ۷ روزه</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شیوه‌های پرداخت و رهگیری سفارش</a></li>
              <li><a href="#" className="hover:text-white transition-colors">پرسش‌های متداول روایح و نگهداری</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ارتباط در پیام‌رسان‌ها</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#FFFFFF] tracking-wider uppercase">عضویت در خبرنامه ادیتوریال</h4>
            <p className="text-[#A0A0A0] leading-relaxed">
              از رونمایی کالکشن‌های کپسولی جدید و نسخه‌های محدود زودتر باخبر شوید.
            </p>
            {subscribed ? (
              <div className="p-2.5 bg-[#262626] rounded text-[#D4CEBF] text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>ایمیل شما با موفقیت در فهرست اختصاصی ثبت شد.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="ایمیل شما (example@domain.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#212121] border border-[#333333] text-white rounded-[4px] focus:outline-none focus:border-[#FAF9F7] text-left"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#FAF9F7] hover:bg-white text-[#141414] font-semibold rounded-[4px] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>عضویت</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#787672]">
          <p>
            تمامی حقوق مادی و معنوی این وب‌سایت محفوظ است. طراحی الهام‌گرفته از اصول مینیمالیسم معمارانه COS و ارگونومی موبایل بومی راست‌چین.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>حریم خصوصی</span>
            <span>·</span>
            <span>شرایط استفاده</span>
            <span>·</span>
            <span>اصالت تضمین‌شده</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
