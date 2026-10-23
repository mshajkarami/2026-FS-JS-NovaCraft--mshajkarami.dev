import React from 'react';
import { Compass, Leaf, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="craftsmanship" className="px-4 md:px-8 py-12 md:py-18 max-w-[1280px] mx-auto border-t border-[#E8E6E1]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Right side (RTL start) - Editorial Typography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs text-[#787672] font-semibold">
            <span>فلسفه معماری و دی‌ان‌ای دیزاین</span>
            <span aria-hidden="true">·</span>
            <span>طراحی ماندگار</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141414] leading-[1.3] text-balance">
            وقار در سادگی؛ آنجا که پارچه، چرم و رایحه به زبان مشترک می‌رسند
          </h2>

          <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.8] text-pretty">
            در دنیایی سرشار از نویز و ترندهای زودگذر، ما به خلوص فرم و اصالت بافت بازمی‌گردیم. الهام‌گرفته از مکتب مینیمالیسم اسکاندیناوی، هر قطعه پوشاک، کیف چرمی یا شیشه عطر در این بوتیک نه به عنوان کالایی مصرفی، بلکه به مثابه شیئی معمارانه و باهویت طراحی شده است.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF9F7] border border-[#E8E6E1] flex items-center justify-center text-[#141414] mb-2">
                <Leaf className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#141414]">الیاف ۱۰۰٪ طبیعی</h3>
              <p className="text-xs text-[#787672] leading-relaxed">
                کشمیر اصیل مغولستان و پشم خالص ویرجین با دوام چنددهه‌ای و تنفس‌پذیری طبیعی.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF9F7] border border-[#E8E6E1] flex items-center justify-center text-[#141414] mb-2">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#141414]">دباغی گیاهی چرم</h3>
              <p className="text-xs text-[#787672] leading-relaxed">
                پرداخت دستی بدون مواد شیمیایی مخرب با شکل‌گیری پتینه زیبا در گذر زمان.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF9F7] border border-[#E8E6E1] flex items-center justify-center text-[#141414] mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#141414]">روایح اشرافی نیش</h3>
              <p className="text-xs text-[#787672] leading-relaxed">
                اکستریت‌های غلیظ دست‌ساز کارگاهی در گراس فرانسه با ماندگاری فراتر از ۱۶ ساعت.
              </p>
            </div>
          </div>
        </div>

        {/* Left side (RTL end) - Minimalist Tactile Visual Block */}
        <div className="lg:col-span-5 bg-[#F1EFEA] border border-[#E8E6E1] rounded-[4px] p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          <div className="space-y-3 relative z-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#787672] font-mono">
              MANIFESTO 2026
            </span>
            <blockquote className="text-lg sm:text-xl font-bold text-[#141414] leading-[1.6]">
              «لوکس واقعی در حذف زوائد است؛ زمانی که تنها کیفیت ناب پارچه و صداقت یک رایحه باقی می‌ماند.»
            </blockquote>
          </div>

          <div className="pt-8 border-t border-[#E8E6E1] flex items-center justify-between relative z-10">
            <div>
              <span className="text-xs font-bold text-[#141414] block">استودیو طراحی معماری</span>
              <span className="text-[11px] text-[#787672]">کالکشن کپسولی زمستانه</span>
            </div>
            <span className="text-xs font-mono text-[#787672]">COLLECTION OF STYLE</span>
          </div>

          {/* Background subtle watermark-less lines */}
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full border border-[#D4CEBF]/50 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};
