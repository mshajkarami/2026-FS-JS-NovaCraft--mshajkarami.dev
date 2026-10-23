import React from 'react';
import { Product } from '../types';

interface ProductArtworkProps {
  type: Product['imageType'];
  isHovered?: boolean;
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  type,
  isHovered = false,
  className = '',
}) => {
  switch (type) {
    case 'wool_coat':
      return (
        <div className={`relative w-full h-full bg-[#EFECE6] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background lighting gradient */}
            <circle cx="150" cy="180" r="140" fill="url(#alabasterLight)" opacity="0.6" />
            <defs>
              <radialGradient id="alabasterLight" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(150 180) rotate(90) scale(140)">
                <stop stopColor="#FAF9F7" />
                <stop offset="1" stopColor="#E5E1D8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="charcoalWool" x1="50" y1="50" x2="250" y2="380" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2E3033" />
                <stop offset="0.5" stopColor="#212224" />
                <stop offset="1" stopColor="#141517" />
              </linearGradient>
              <pattern id="woolTexture" width="6" height="6" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="6" y2="6" stroke="#ffffff" strokeWidth="0.4" opacity="0.08" />
                <line x1="6" y1="0" x2="0" y2="6" stroke="#000000" strokeWidth="0.4" opacity="0.1" />
              </pattern>
            </defs>

            {/* Pedestal Shadow */}
            <ellipse cx="150" cy="370" rx="95" ry="12" fill="#000000" opacity="0.12" filter="blur(6px)" />

            {!isHovered ? (
              /* Front Tailored Coat */
              <g className="transition-opacity duration-500">
                {/* Hanger / Stand Neck */}
                <path d="M140 45 L150 30 L160 45" stroke="#8C857B" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="135" y="45" width="30" height="15" rx="3" fill="#D4CEBF" opacity="0.8" />
                <text x="150" y="55" textAnchor="middle" fill="#141414" fontSize="6" fontFamily="sans-serif" letterSpacing="1">COS</text>

                {/* Coat Body */}
                <path
                  d="M100 80 Q150 70 200 80 L230 200 L215 360 Q150 365 85 360 L70 200 Z"
                  fill="url(#charcoalWool)"
                />
                <path
                  d="M100 80 Q150 70 200 80 L230 200 L215 360 Q150 365 85 360 L70 200 Z"
                  fill="url(#woolTexture)"
                />

                {/* Left Lapel */}
                <path d="M120 78 L150 190 L105 130 Z" fill="#3A3C40" opacity="0.9" />
                {/* Right Overlapping Lapel */}
                <path d="M180 78 L150 190 L195 130 Z" fill="#252628" />

                {/* Minimalist Center Seam & Hidden Placket */}
                <line x1="150" y1="190" x2="150" y2="360" stroke="#101112" strokeWidth="2" strokeDasharray="6 4" />
                
                {/* Horn Buttons */}
                <circle cx="150" cy="210" r="3.5" fill="#4A453F" stroke="#252628" strokeWidth="1" />
                <circle cx="150" cy="260" r="3.5" fill="#4A453F" stroke="#252628" strokeWidth="1" />
                <circle cx="150" cy="310" r="3.5" fill="#4A453F" stroke="#252628" strokeWidth="1" />

                {/* Left & Right Welt Pockets */}
                <rect x="95" y="250" width="32" height="4" rx="1" fill="#1B1C1D" />
                <rect x="173" y="250" width="32" height="4" rx="1" fill="#1B1C1D" />

                {/* Sleeve Folds */}
                <path d="M72 195 Q85 240 92 310" stroke="#18191A" strokeWidth="2" strokeLinecap="round" />
                <path d="M228 195 Q215 240 208 310" stroke="#18191A" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              /* Back Silhouette / Alternate View */
              <g className="transition-opacity duration-500">
                <path
                  d="M100 75 Q150 68 200 75 L232 198 L218 360 Q150 365 82 360 L68 198 Z"
                  fill="url(#charcoalWool)"
                />
                <path
                  d="M100 75 Q150 68 200 75 L232 198 L218 360 Q150 365 82 360 L68 198 Z"
                  fill="url(#woolTexture)"
                />
                {/* Back Clean Center Seam & Vent */}
                <line x1="150" y1="72" x2="150" y2="280" stroke="#141517" strokeWidth="2" />
                <rect x="148" y="280" width="4" height="80" fill="#111213" />
                {/* Collar architectural fold */}
                <path d="M120 74 Q150 82 180 74" stroke="#4A4C50" strokeWidth="3" fill="none" />
                <text x="150" y="388" textAnchor="middle" fill="#787672" fontSize="9" letterSpacing="1">نمای پشت · برش آزاد</text>
              </g>
            )}
          </svg>
        </div>
      );

    case 'santal':
      return (
        <div className={`relative w-full h-full bg-[#EAE7DF] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Travertine Pedestal */}
            <defs>
              <linearGradient id="travertine" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#DDD8CF" />
                <stop offset="0.5" stopColor="#EAE5DC" />
                <stop offset="1" stopColor="#D4CEBF" />
              </linearGradient>
              <linearGradient id="smokeGlass" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#302D2A" stopOpacity="0.9" />
                <stop offset="0.6" stopColor="#1E1C1A" stopOpacity="0.95" />
                <stop offset="1" stopColor="#121110" />
              </linearGradient>
            </defs>

            {/* Base Plinth */}
            <ellipse cx="150" cy="335" rx="100" ry="24" fill="url(#travertine)" stroke="#C8C2B3" strokeWidth="1" />
            <path d="M50 335 L50 355 Q150 375 250 355 L250 335 Z" fill="#C5BEB0" />
            <ellipse cx="150" cy="355" rx="100" ry="16" fill="#B4AC9E" opacity="0.5" />

            {/* Perfume Bottle Shadow */}
            <ellipse cx="150" cy="330" rx="46" ry="12" fill="#000000" opacity="0.3" filter="blur(4px)" />

            {/* Bottle Glass Body */}
            <rect x="105" y="145" width="90" height="175" rx="6" fill="url(#smokeGlass)" />
            {/* Glass Rim Highlight */}
            <rect x="107" y="147" width="86" height="171" rx="4" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.18" />
            <line x1="113" y1="150" x2="113" y2="315" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" />

            {/* Niche Perfume Label */}
            <rect x="116" y="195" width="68" height="85" rx="2" fill="#FAF9F7" />
            <text x="150" y="215" textAnchor="middle" fill="#141414" fontSize="7" fontWeight="bold" letterSpacing="1.5">SANTAL</text>
            <text x="150" y="226" textAnchor="middle" fill="#787672" fontSize="5" letterSpacing="0.8">EAU DE PARFUM</text>
            <line x1="130" y1="233" x2="170" y2="233" stroke="#E8E6E1" strokeWidth="0.8" />
            <text x="150" y="246" textAnchor="middle" fill="#141414" fontSize="5.5" fontFamily="sans-serif">GRASSE · FRANCE</text>
            <text x="150" y="258" textAnchor="middle" fill="#787672" fontSize="5" fontFamily="sans-serif">50 ML / 1.7 FL.OZ</text>
            <text x="150" y="270" textAnchor="middle" fill="#2D6A4F" fontSize="4.5" fontWeight="600">طبع: گرم و چوبی</text>

            {/* Perfume Dip Tube */}
            <line x1="150" y1="140" x2="150" y2="315" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />

            {/* Cap Collar */}
            <rect x="140" y="134" width="20" height="12" fill="#8A867F" rx="1" />
            <rect x="141" y="135" width="18" height="10" stroke="#C4BEB2" strokeWidth="0.5" />

            {/* Architectural Matte Black Cap */}
            <rect x="127" y="70" width="46" height="65" rx="3" fill="#141414" />
            {/* Ribbed cap texture */}
            <line x1="133" y1="72" x2="133" y2="133" stroke="#2B2B2B" strokeWidth="1" />
            <line x1="141" y1="72" x2="141" y2="133" stroke="#2B2B2B" strokeWidth="1" />
            <line x1="150" y1="72" x2="150" y2="133" stroke="#2B2B2B" strokeWidth="1" />
            <line x1="159" y1="72" x2="159" y2="133" stroke="#2B2B2B" strokeWidth="1" />
            <line x1="167" y1="72" x2="167" y2="133" stroke="#2B2B2B" strokeWidth="1" />

            {/* Olfactory Note indicator on hover */}
            {isHovered && (
              <g className="transition-opacity duration-300">
                <circle cx="230" cy="110" r="32" fill="#FFFFFF" fillOpacity="0.95" stroke="#E8E6E1" strokeWidth="1" />
                <text x="230" y="105" textAnchor="middle" fill="#141414" fontSize="7" fontWeight="bold">نت اصلی</text>
                <text x="230" y="118" textAnchor="middle" fill="#4A4A4A" fontSize="6.5">چوب صندل</text>
                <text x="230" y="128" textAnchor="middle" fill="#787672" fontSize="5.5">و چرم دودی</text>
                <path d="M200 120 L180 145" stroke="#8A867F" strokeWidth="1" strokeDasharray="2 2" />
              </g>
            )}
          </svg>
        </div>
      );

    case 'leather_bag':
      return (
        <div className={`relative w-full h-full bg-[#F3EFE8] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sandLeather" x1="70" y1="160" x2="230" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#DFD5C6" />
                <stop offset="0.6" stopColor="#CFC2B0" />
                <stop offset="1" stopColor="#BAAA94" />
              </linearGradient>
              <linearGradient id="brassHardware" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#E2D4A8" />
                <stop offset="0.5" stopColor="#C9B47E" />
                <stop offset="1" stopColor="#9C8754" />
              </linearGradient>
            </defs>

            {/* Bag Drop Shadow */}
            <ellipse cx="150" cy="355" rx="85" ry="12" fill="#000000" opacity="0.14" filter="blur(6px)" />

            {/* Long Adjustable Shoulder Strap */}
            <path
              d="M80 200 C80 60, 220 60, 220 200"
              stroke="#B3A28B"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Strap stitching */}
            <path
              d="M80 200 C80 60, 220 60, 220 200"
              stroke="#8F806B"
              strokeWidth="0.8"
              strokeDasharray="4 3"
              fill="none"
            />

            {/* Bag Main Body Box */}
            <rect x="65" y="195" width="170" height="145" rx="8" fill="url(#sandLeather)" stroke="#B3A28B" strokeWidth="1" />

            {/* Subtle Edge Stitching */}
            <rect x="70" y="200" width="160" height="135" rx="6" stroke="#8E7E6A" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.6" />

            {/* Front Leather Flap */}
            <path
              d="M65 195 L235 195 L235 270 Q150 285 65 270 Z"
              fill="#D4C7B5"
              stroke="#B3A28B"
              strokeWidth="1"
            />
            <path
              d="M70 200 L230 200 L230 265 Q150 280 70 265 Z"
              stroke="#8E7E6A"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              fill="none"
              opacity="0.6"
            />

            {/* Minimalist Brass Lock Clasp */}
            <rect x="141" y="260" width="18" height="24" rx="2" fill="url(#brassHardware)" stroke="#8C7748" strokeWidth="0.8" />
            <circle cx="150" cy="272" r="3" fill="#695730" />
            <line x1="150" y1="275" x2="150" y2="280" stroke="#695730" strokeWidth="1.2" />

            {/* Subtle Handcrafted Tag */}
            <text x="150" y="322" textAnchor="middle" fill="#756755" fontSize="6" letterSpacing="1.2">HANDCRAFTED · 100% LEATHER</text>

            {isHovered && (
              <g className="transition-opacity duration-300">
                <rect x="75" y="365" width="150" height="22" rx="3" fill="#141414" />
                <text x="150" y="379" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600">چرم ۱۰۰٪ طبیعی گاوی دباغی گیاهی</text>
              </g>
            )}
          </svg>
        </div>
      );

    case 'amber_bergamot':
      return (
        <div className={`relative w-full h-full bg-[#EFECE4] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="amberLiquid" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#FFC875" stopOpacity="0.85" />
                <stop offset="0.6" stopColor="#E59B36" stopOpacity="0.95" />
                <stop offset="1" stopColor="#B36512" />
              </linearGradient>
            </defs>

            {/* Warm Sunlight Circle */}
            <circle cx="150" cy="200" r="130" fill="#FBF3E4" opacity="0.8" />

            {/* Plinth */}
            <ellipse cx="150" cy="340" rx="90" ry="16" fill="#DDD8CE" />
            <ellipse cx="150" cy="336" rx="42" ry="10" fill="#000000" opacity="0.25" filter="blur(4px)" />

            {/* Fresh Bergamot Slice & Leaf Art */}
            <g transform="translate(60, 290)">
              <circle cx="25" cy="25" r="22" fill="#E8D154" stroke="#B8A326" strokeWidth="1" />
              <circle cx="25" cy="25" r="17" fill="#FDF8CC" />
              {/* citrus wedges */}
              <line x1="25" y1="8" x2="25" y2="42" stroke="#E8D154" strokeWidth="1" />
              <line x1="8" y1="25" x2="42" y2="25" stroke="#E8D154" strokeWidth="1" />
              <line x1="13" y1="13" x2="37" y2="37" stroke="#E8D154" strokeWidth="1" />
              <line x1="37" y1="13" x2="13" y2="37" stroke="#E8D154" strokeWidth="1" />
              {/* Botanical green leaf */}
              <path d="M40 10 Q60 -5 70 15 Q55 25 40 10 Z" fill="#6B8E23" />
            </g>

            {/* Clear Heavy Crystal Perfume Flacon */}
            {/* Outer thick crystal glass */}
            <rect x="110" y="130" width="80" height="190" rx="8" fill="#FFFFFF" fillOpacity="0.5" stroke="#FAF9F7" strokeWidth="2" />
            {/* Inner Amber Fluid Chamber */}
            <rect x="117" y="145" width="66" height="165" rx="5" fill="url(#amberLiquid)" />
            {/* Glass Bevel Reflection */}
            <line x1="114" y1="135" x2="114" y2="315" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="186" y1="135" x2="186" y2="315" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />

            {/* Minimalist White Card Label */}
            <rect x="122" y="195" width="56" height="80" rx="2" fill="#FAF9F7" />
            <text x="150" y="215" textAnchor="middle" fill="#141414" fontSize="6.5" fontWeight="bold" letterSpacing="1">AMBER</text>
            <text x="150" y="225" textAnchor="middle" fill="#141414" fontSize="5" letterSpacing="0.8">& BERGAMOT</text>
            <line x1="132" y1="232" x2="168" y2="232" stroke="#E8E6E1" strokeWidth="0.8" />
            <text x="150" y="244" textAnchor="middle" fill="#787672" fontSize="5">EXTRAIT DE PARFUM</text>
            <text x="150" y="255" textAnchor="middle" fill="#141414" fontSize="5" fontFamily="sans-serif">28% CONCENTRATION</text>
            <text x="150" y="267" textAnchor="middle" fill="#B25E00" fontSize="4.5" fontWeight="600">ترنج کالابریا و کهربا</text>

            {/* Sprayer Neck */}
            <rect x="142" y="118" width="16" height="14" fill="#CBB682" rx="1" />
            {/* Cylindrical Tall Glossy Cap */}
            <rect x="131" y="60" width="38" height="60" rx="4" fill="#1C1C1C" />
            <rect x="133" y="62" width="5" height="56" fill="#FFFFFF" fillOpacity="0.15" />

            {isHovered && (
              <g className="transition-opacity duration-300">
                <rect x="65" y="365" width="170" height="22" rx="3" fill="#141414" />
                <text x="150" y="379" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600">ماندگاری ۱۶+ ساعت · پخش بوی مخملی</text>
              </g>
            )}
          </svg>
        </div>
      );

    case 'cashmere_sweater':
      return (
        <div className={`relative w-full h-full bg-[#EAE7E1] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="150" cy="360" rx="80" ry="12" fill="#000000" opacity="0.1" filter="blur(5px)" />
            
            {/* Folded / Draped Luxurious Turtleneck Sweater */}
            <path
              d="M100 110 Q150 95 200 110 L235 220 L220 340 Q150 350 80 340 L65 220 Z"
              fill="#F6F5F0"
              stroke="#E0DCD3"
              strokeWidth="1.5"
            />
            {/* Soft Ribbed Texture lines */}
            <line x1="110" y1="130" x2="110" y2="330" stroke="#E6E2D8" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="130" y1="125" x2="130" y2="335" stroke="#E6E2D8" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="150" y1="120" x2="150" y2="340" stroke="#E6E2D8" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="170" y1="125" x2="170" y2="335" stroke="#E6E2D8" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="190" y1="130" x2="190" y2="330" stroke="#E6E2D8" strokeWidth="1" strokeDasharray="2 3" />

            {/* Sculptural Soft Turtleneck Collar */}
            <rect x="120" y="65" width="60" height="50" rx="8" fill="#FFFFFF" stroke="#D8D3C8" strokeWidth="1.2" />
            <line x1="125" y1="75" x2="175" y2="75" stroke="#DDD8CD" strokeWidth="1" />
            <line x1="125" y1="85" x2="175" y2="85" stroke="#DDD8CD" strokeWidth="1" />
            <line x1="125" y1="95" x2="175" y2="95" stroke="#DDD8CD" strokeWidth="1" />
            <line x1="125" y1="105" x2="175" y2="105" stroke="#DDD8CD" strokeWidth="1" />

            {/* Sleeve Soft Folds */}
            <path d="M75 190 Q90 230 85 300" stroke="#D3CDC0" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M225 190 Q210 230 215 300" stroke="#D3CDC0" strokeWidth="1.5" strokeLinecap="round" />

            {/* Label preview */}
            <rect x="135" y="140" width="30" height="14" rx="2" fill="#EAE6DF" />
            <text x="150" y="150" textAnchor="middle" fill="#141414" fontSize="5.5" fontWeight="bold">100% CASHMERE</text>

            {isHovered && (
              <g className="transition-opacity duration-300">
                <rect x="70" y="365" width="160" height="22" rx="3" fill="#141414" />
                <text x="150" y="379" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600">کشمیر خالص مغولستان (Grade A)</text>
              </g>
            )}
          </svg>
        </div>
      );

    case 'rose_papyrus':
      return (
        <div className={`relative w-full h-full bg-[#EBE7E2] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="150" cy="340" rx="90" ry="16" fill="#DDD7CB" />
            <ellipse cx="150" cy="336" rx="42" ry="10" fill="#000000" opacity="0.22" filter="blur(4px)" />

            {/* Dried Egyptian Papyrus Reeds */}
            <path d="M60 330 Q75 180 90 90" stroke="#B8A88E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 330 Q90 210 105 130" stroke="#C9BC9F" strokeWidth="2" strokeLinecap="round" />

            {/* Velvet Rose Petals */}
            <path d="M220 320 Q240 300 250 325 Q235 340 220 320 Z" fill="#8B3A4A" opacity="0.85" />
            <path d="M235 330 Q255 320 260 335 Q245 348 235 330 Z" fill="#6B2836" opacity="0.85" />

            {/* Frosted Smoky Minimal Flacon */}
            <rect x="110" y="140" width="80" height="180" rx="6" fill="#3D3A38" fillOpacity="0.88" />
            <rect x="112" y="142" width="76" height="176" rx="4" stroke="#FAF9F7" strokeWidth="1" strokeOpacity="0.15" />

            {/* Label */}
            <rect x="120" y="195" width="60" height="80" rx="2" fill="#FAF9F7" />
            <text x="150" y="215" textAnchor="middle" fill="#141414" fontSize="6.5" fontWeight="bold" letterSpacing="1">ROSE</text>
            <text x="150" y="226" textAnchor="middle" fill="#141414" fontSize="5.5" letterSpacing="0.8">& PAPYRUS</text>
            <line x1="130" y1="233" x2="170" y2="233" stroke="#E8E6E1" strokeWidth="0.8" />
            <text x="150" y="246" textAnchor="middle" fill="#787672" fontSize="5">EAU DE PARFUM</text>
            <text x="150" y="258" textAnchor="middle" fill="#141414" fontSize="5" fontFamily="sans-serif">UNISEX · 50 ML</text>
            <text x="150" y="270" textAnchor="middle" fill="#8B3A4A" fontSize="4.5" fontWeight="600">رز دمشقی و پاپیروس</text>

            {/* Collar & Cap */}
            <rect x="142" y="128" width="16" height="14" fill="#A8A39B" rx="1" />
            <rect x="128" y="72" width="44" height="60" rx="3" fill="#121212" />

            {isHovered && (
              <g className="transition-opacity duration-300">
                <rect x="75" y="365" width="150" height="22" rx="3" fill="#141414" />
                <text x="150" y="379" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600">رز خشک اشرافی، وتیور و عود سفید</text>
              </g>
            )}
          </svg>
        </div>
      );

    case 'leather_belt':
      return (
        <div className={`relative w-full h-full bg-[#EFECE6] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="150" cy="345" rx="80" ry="14" fill="#000000" opacity="0.12" filter="blur(5px)" />
            
            {/* Elegant Coiled Italian Calfskin Belt */}
            <circle cx="150" cy="225" r="85" stroke="#1A1A1A" strokeWidth="24" fill="none" />
            <circle cx="150" cy="225" r="85" stroke="#333333" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <circle cx="150" cy="225" r="73" stroke="#000000" strokeWidth="1.5" fill="none" />
            <circle cx="150" cy="225" r="97" stroke="#000000" strokeWidth="1.5" fill="none" />

            {/* Inner loop */}
            <circle cx="150" cy="225" r="50" stroke="#1F1F1F" strokeWidth="20" fill="none" />

            {/* Gunmetal Matte Buckle */}
            <rect x="130" y="105" width="40" height="34" rx="3" fill="#2E3033" stroke="#484B4F" strokeWidth="1.5" />
            <rect x="136" y="112" width="28" height="20" rx="1" fill="#EFECE6" />
            {/* Buckle pin */}
            <rect x="148" y="105" width="4" height="26" rx="1" fill="#6B6E73" />

            {/* Micro belt holes */}
            <circle cx="95" cy="285" r="2.5" fill="#EFECE6" stroke="#000000" strokeWidth="0.8" />
            <circle cx="115" cy="298" r="2.5" fill="#EFECE6" stroke="#000000" strokeWidth="0.8" />
            <circle cx="138" cy="305" r="2.5" fill="#EFECE6" stroke="#000000" strokeWidth="0.8" />

            {isHovered && (
              <g className="transition-opacity duration-300">
                <rect x="70" y="365" width="160" height="22" rx="3" fill="#141414" />
                <text x="150" y="379" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600">چرم گوساله ایتالیایی · سگک مات ضدخش</text>
              </g>
            )}
          </svg>
        </div>
      );

    case 'flannel_trousers':
    default:
      return (
        <div className={`relative w-full h-full bg-[#EFECE8] flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}>
          <svg
            viewBox="0 0 300 400"
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="150" cy="365" rx="75" ry="10" fill="#000000" opacity="0.1" filter="blur(4px)" />

            {/* Minimalist Hanger */}
            <line x1="110" y1="60" x2="190" y2="60" stroke="#8C857B" strokeWidth="3" strokeLinecap="round" />
            <path d="M150 40 L150 60" stroke="#8C857B" strokeWidth="2.5" />

            {/* Flannel Trousers Silhouette */}
            <g>
              {/* Waistband */}
              <rect x="110" y="70" width="80" height="14" rx="2" fill="#75777B" />
              
              {/* Right Leg */}
              <path d="M110 84 L115 350 L145 350 L148 160 Z" fill="#888A8E" stroke="#717377" strokeWidth="1" />
              {/* Left Leg */}
              <path d="M190 84 L185 350 L155 350 L152 160 Z" fill="#7E8084" stroke="#717377" strokeWidth="1" />

              {/* Crisp Pressed Front Crease */}
              <line x1="130" y1="120" x2="130" y2="348" stroke="#A4A6AA" strokeWidth="1.2" />
              <line x1="170" y1="120" x2="170" y2="348" stroke="#686A6E" strokeWidth="1.2" />

              {/* Angled slant pockets */}
              <line x1="114" y1="92" x2="128" y2="122" stroke="#616367" strokeWidth="1.5" />
              <line x1="186" y1="92" x2="172" y2="122" stroke="#616367" strokeWidth="1.5" />
            </g>

            {isHovered && (
              <g className="transition-opacity duration-300">
                <rect x="70" y="365" width="160" height="22" rx="3" fill="#141414" />
                <text x="150" y="379" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600">برش راسته معمارانه با خط اتوی پایدار</text>
              </g>
            )}
          </svg>
        </div>
      );
  }
};
