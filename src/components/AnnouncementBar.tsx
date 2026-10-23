import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      className="bg-[#141414] text-[#FAF9F7] py-2 px-4 text-xs font-normal relative z-50 text-center flex items-center justify-between transition-all"
      aria-label="اعلان ویژه فروشگاه"
    >
      <div className="flex-1 text-center font-normal tracking-wide">
        <span>ارسال رایگان برای سفارش‌های سراسر کشور بالای ۱,۵۰۰,۰۰۰ تومان</span>
        <span className="hidden sm:inline-block mx-2 text-[#787672]">·</span>
        <span className="hidden sm:inline-block text-[#D4CEBF]">کد تخفیف اولین خرید: COS2026</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#787672] hover:text-[#FAF9F7] p-1 -my-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4CEBF]"
        aria-label="بستن اعلان"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
