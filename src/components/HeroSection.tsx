import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Feather } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onSelectCategory,
}) => {
  return (
    <section className="px-4 md:px-8 py-6 md:py-10 max-w-[1280px] mx-auto">
      <article className="bg-[#F1EFEA] border border-[#E8E6E1] rounded-[4px] overflow-hidden flex flex-col md:flex-row-reverse items-stretch shadow-sm">
        
        {/* Visual Showcase (In RTL: Left side on Desktop, Top on Mobile) */}
        <div className="w-full md:w-[55%] relative min-h-[360px] sm:min-h-[420px] md:min-h-[500px] bg-[#EAE6DF] overflow-hidden flex items-center justify-center">
          
          {/* Architectural Minimalist Lookbook Art */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#DDD7CB] via-[#EAE5DB] to-[#F7F5F0]" />
          
          <svg
            viewBox="0 0 600 500"
            className="w-full h-full object-cover relative z-10 p-4 sm:p-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="600" y2="500" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9F8F5" />
                <stop offset="0.5" stopColor="#EBE7DE" />
                <stop offset="1" stopColor="#DDD7CB" />
              </linearGradient>
              <radialGradient id="sunSpot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 220) rotate(90) scale(220)">
                <stop stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="1" stopColor="#E2DDD2" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Architectural Arch & Geometry */}
            <circle cx="300" cy="230" r="190" fill="url(#sunSpot)" />
            <path d="M120 450 L120 220 A180 180 0 0 1 480 220 L480 450 Z" stroke="#D1CBC0" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

            {/* Plinth / Stone Pedestal */}
            <path d="M140 430 L460 430 L430 460 L170 460 Z" fill="#D3CCC0" />
            <ellipse cx="300" cy="430" rx="160" ry="16" fill="#C7BFB1" opacity="0.4" />

            {/* Left Silhouette: Flacon of Santal Niche Fragrance */}
            <g transform="translate(180, 210)">
              <ellipse cx="40" cy="190" rx="35" ry="8" fill="#000000" opacity="0.25" filter="blur(3px)" />
              <rect x="15" y="60" width="50" height="130" rx="4" fill="#242220" />
              <rect x="17" y="62" width="46" height="126" rx="3" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.15" />
              <rect x="22" y="95" width="36" height="55" rx="1.5" fill="#FAF9F7" />
              <text x="40" y="112" textAnchor="middle" fill="#141414" fontSize="5.5" fontWeight="bold">SANTAL</text>
              <text x="40" y="122" textAnchor="middle" fill="#787672" fontSize="4.5">PARFUM</text>
              <text x="40" y="135" textAnchor="middle" fill="#141414" fontSize="4">COS 2026</text>
              {/* Cap */}
              <rect x="31" y="50" width="18" height="10" fill="#99948C" />
              <rect x="26" y="12" width="28" height="42" rx="2" fill="#121212" />
            </g>

            {/* Center/Right Silhouette: Elegant Tailored Wool Coat Drape */}
            <g transform="translate(290, 100)">
              <ellipse cx="100" cy="305" rx="75" ry="12" fill="#000000" opacity="0.2" filter="blur(4px)" />
              {/* Stand */}
              <line x1="100" y1="30" x2="100" y2="300" stroke="#706B62" strokeWidth="2.5" />
              <path d="M70 45 Q100 35 130 45" stroke="#706B62" strokeWidth="3" fill="none" />
              {/* Coat drape */}
              <path
                d="M60 55 Q100 48 140 55 L165 170 L155 300 Q100 305 45 300 L35 170 Z"
                fill="#202224"
              />
              <path d="M75 55 L100 150 L65 110 Z" fill="#323438" />
              <path d="M125 55 L100 150 L135 110 Z" fill="#18191B" />
              <line x1="100" y1="150" x2="100" y2="300" stroke="#121314" strokeWidth="1.5" strokeDasharray="5 3" />
            </g>

            {/* Editorial Label overlay */}
            <g transform="translate(50, 40)">
              <text x="0" y="0" fill="#141414" fontSize="11" fontWeight="800" letterSpacing="2">LOOKBOOK · ISSUE 04</text>
              <text x="0" y="16" fill="#787672" fontSize="9" letterSpacing="1">AUTUMN / WINTER 2026</text>
            </g>

            {/* Floating Clean Metric */}
            <g transform="translate(440, 420)">
              <text x="0" y="0" textAnchor="end" fill="#141414" fontSize="10" fontWeight="600">طراحی بر پایه خلوص فرم</text>
              <text x="0" y="14" textAnchor="end" fill="#787672" fontSize="8.5">کپنهاگ · استکهلم · تهران</text>
            </g>
          </svg>

          {/* Floating Subtle Quality Stamp */}
          <div className="absolute top-4 left-4 bg-[#FAF9F7]/90 backdrop-blur-md px-3 py-1.5 rounded-[4px] border border-[#E8E6E1] text-[11px] text-[#141414] font-medium flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 bg-[#2D6A4F] rounded-full" />
            <span>کالکشن پاییز و زمستان ۲۰۲۶</span>
          </div>
        </div>

        {/* Editorial Content (In RTL: Right side on Desktop, Bottom on Mobile) */}
        <div className="w-full md:w-[45%] p-6 sm:p-8 md:p-12 lg:p-14 bg-[#FFFFFF] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#787672] font-medium mb-3">
              <span>کالکشن انحصاری کپسولی</span>
              <span aria-hidden="true">·</span>
              <span>تعداد محدود</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-[#141414] leading-[1.3] mb-4 text-balance">
              وقار در سادگی؛ تلفیق بافت پشم و روایح نیش
            </h1>

            <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.8] mb-8 text-pretty">
              مجموعه‌ای برگزیده از کت‌های آزاد کشمیری، اکسسوری‌های دست‌دوز چرم گیاهی و اکستریت‌های عطری خالص برای افرادی که به اصالت ماندگار جزئیات باور دارند.
            </p>

            {/* Quick Value Badges */}
            <div className="grid grid-cols-2 gap-3 mb-8 pt-4 border-t border-[#E8E6E1]">
              <div className="flex items-start gap-2">
                <Feather className="w-4 h-4 text-[#787672] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#141414]">الیاف ۱۰۰٪ طبیعی</span>
                  <span className="text-[11px] text-[#787672]">پشم خالص و کشمیر مغولستان</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#787672] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#141414]">عصاره نیش گراس</span>
                  <span className="text-[11px] text-[#787672]">غلظت بالا با ماندگاری ۱۶ ساعت</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={onExploreCollection}
              className="w-full sm:w-auto flex-1 min-h-[48px] px-6 bg-[#141414] text-[#FAF9F7] font-semibold text-sm rounded-[4px] hover:bg-[#2A2A2A] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>مشاهده کالکشن کامل</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectCategory('fragrance')}
              className="w-full sm:w-auto min-h-[48px] px-5 bg-transparent border border-[#141414] text-[#141414] font-semibold text-sm rounded-[4px] hover:bg-[#FAF9F7] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#787672]" />
              <span>کشف عطرهای نیش</span>
            </button>
          </div>

        </div>

      </article>
    </section>
  );
};
