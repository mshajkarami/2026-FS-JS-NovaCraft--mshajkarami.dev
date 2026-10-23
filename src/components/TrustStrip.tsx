import React from 'react';
import { RefreshCw, Award, ShieldCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#F1EFEA] border-y border-[#E8E6E1] py-8 sm:py-10 px-4 md:px-8 mt-12 mb-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        
        <div className="flex flex-col items-center p-3">
          <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E8E6E1] flex items-center justify-center text-[#141414] mb-3 shadow-xs">
            <RefreshCw className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#141414] mb-1">ضمانت ۷ روزه بازگشت کالا</h4>
          <p className="text-xs text-[#787672] max-w-[260px]">
            امکان مرجوعی بدون قید و شرط و تعویض رایگان سایز برای پوشاک
          </p>
        </div>

        <div className="flex flex-col items-center p-3 border-y md:border-y-0 md:border-x border-[#E8E6E1]">
          <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E8E6E1] flex items-center justify-center text-[#141414] mb-3 shadow-xs">
            <Award className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#141414] mb-1">تضمین اصالت ۱۰۰٪ متریال</h4>
          <p className="text-xs text-[#787672] max-w-[260px]">
            پارچه‌های وارداتی پشم و کشمیر طبیعی و اسانس‌های دارای گواهی گراس
          </p>
        </div>

        <div className="flex flex-col items-center p-3">
          <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E8E6E1] flex items-center justify-center text-[#141414] mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#141414] mb-1">ارسال اکسپرس و بیمه‌شده</h4>
          <p className="text-xs text-[#787672] max-w-[260px]">
            بسته‌بندی مقاوم ضدضربه، جعبه کادویی هدیه و ارسال روز در تهران
          </p>
        </div>

      </div>
    </section>
  );
};
