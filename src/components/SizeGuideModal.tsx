import React from 'react';
import { X, Ruler, Info } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const sizeTable = [
    { size: '۳۶ (XS)', chest: '۸۲ - ۸۶', waist: '۶۴ - ۶۸', hip: '۸۸ - ۹۲', arm: '۵۸' },
    { size: '۳۸ (S)', chest: '۸۶ - ۹۰', waist: '۶۸ - ۷۲', hip: '۹۲ - ۹۶', arm: '۵۹' },
    { size: '۴۰ (M)', chest: '۹۰ - ۹۶', waist: '۷۲ - ۷۸', hip: '۹۶ - ۱۰۲', arm: '۶۰' },
    { size: '۴۲ (L)', chest: '۹۶ - ۱۰۲', waist: '۷۸ - ۸۴', hip: '۱۰۲ - ۱۰۸', arm: '۶۱' },
    { size: '۴۴ (XL)', chest: '۱۰۲ - ۱۰۸', waist: '۸۴ - ۹۰', hip: '۱۰۸ - ۱۱۴', arm: '۶۲' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141414]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-[580px] bg-[#FFFFFF] rounded-[6px] shadow-2xl border border-[#E8E6E1] overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#141414]" />
            <h3 className="text-base font-bold text-[#141414]">راهنمای سایز و ابعاد کپسولی</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787672] hover:text-[#141414] rounded-full hover:bg-[#F1EFEA]"
            aria-label="بستن راهنمای سایز"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          <p className="text-xs sm:text-sm text-[#4A4A4A] leading-[1.8]">
            لباس‌های بوتیک COS بر اساس الگوریتم کپسولی آزاد (Relaxed Fit) دوخته شده‌اند. برای انتخاب بهترین اندازه، کافیست با یک متر خیاطی دور سینه، کمر و باسن خود را اندازه‌گیری کنید.
          </p>

          {/* Table */}
          <div className="overflow-x-auto border border-[#E8E6E1] rounded-[4px]">
            <table className="w-full text-xs text-right divide-y divide-[#E8E6E1]">
              <thead className="bg-[#FAF9F7] text-[#141414] font-bold">
                <tr>
                  <th className="py-2.5 px-3">سایز</th>
                  <th className="py-2.5 px-3">دور سینه (cm)</th>
                  <th className="py-2.5 px-3">دور کمر (cm)</th>
                  <th className="py-2.5 px-3">دور باسن (cm)</th>
                  <th className="py-2.5 px-3">قد آستین (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EFEA] text-[#4A4A4A]">
                {sizeTable.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF9F7]/60">
                    <td className="py-2.5 px-3 font-semibold text-[#141414]">{row.size}</td>
                    <td className="py-2.5 px-3 num-tabular">{row.chest}</td>
                    <td className="py-2.5 px-3 num-tabular">{row.waist}</td>
                    <td className="py-2.5 px-3 num-tabular">{row.hip}</td>
                    <td className="py-2.5 px-3 num-tabular">{row.arm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips */}
          <div className="bg-[#FAF9F7] border border-[#E8E6E1] rounded-[4px] p-4 text-xs text-[#787672] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#141414]">
              <Info className="w-4 h-4 text-[#787672]" />
              <span>نکات مهم در اندازه‌گیری:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pr-1 text-[#4A4A4A]">
              <li>برای کت‌های اورسایز (مثل کت پشمی ملانژ)، اگر استایل فیت‌تر می‌پسندید، یک سایز کوچک‌تر انتخاب کنید.</li>
              <li>در صورت قرار گرفتن اندازه‌های شما بین دو سایز، انتخاب سایز بزرگ‌تر برای جریان بهتر پارچه پیشنهاد می‌شود.</li>
              <li>ضمانت ۷ روزه تعویض رایگان سایز برای تمامی سفارش‌های پوشاک فعال است.</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full min-h-[46px] bg-[#141414] text-white text-xs font-semibold rounded-[4px] hover:bg-[#2B2B2B]"
          >
            متوجه شدم، بازگشت به خرید
          </button>
        </div>

      </div>
    </div>
  );
};
