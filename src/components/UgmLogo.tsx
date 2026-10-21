'use client';

import React from 'react';

interface UgmLogoProps {
  className?: string;
  variant?: 'shield' | 'full';
  size?: number;
}

export const UgmLogo: React.FC<UgmLogoProps> = ({ 
  className = '', 
  variant = 'shield',
  size = 40 
}) => {
  if (variant === 'shield') {
    return (
      <div 
        className={`relative flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 120 140"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Gold/Navy Laurel Crest Border */}
          <path
            d="M60 5 C90 5 112 25 112 60 C112 100 60 135 60 135 C60 135 8 100 8 60 C8 25 30 5 60 5 Z"
            fill="#0F2B5C"
            stroke="#C59B27"
            strokeWidth="4"
          />
          {/* Inner Shield */}
          <path
            d="M60 14 C84 14 102 30 102 60 C102 94 60 124 60 124 C60 124 18 94 18 60 C18 30 36 14 60 14 Z"
            fill="#FFFFFF"
          />
          {/* Star / Ascende rays */}
          <circle cx="60" cy="38" r="8" fill="#C59B27" />
          <path d="M60 22 L60 30 M60 46 L60 54 M44 38 L52 38 M68 38 L76 38" stroke="#C59B27" strokeWidth="2.5" strokeLinecap="round" />
          {/* Book with Motto */}
          <path
            d="M36 58 C48 55 58 58 60 62 C62 58 72 55 84 58 L84 88 C72 85 62 88 60 92 C58 88 48 85 36 88 Z"
            fill="#0F2B5C"
          />
          <path
            d="M38 62 C48 59 58 62 60 66 C62 62 72 59 82 62 L82 86 C72 83 62 86 60 90 C58 86 48 83 38 86 Z"
            fill="#FFFFFF"
          />
          {/* Text inside book: Latin motto */}
          <text x="43" y="73" fill="#0F2B5C" fontSize="5" fontWeight="bold" fontFamily="sans-serif">ASCENDE</text>
          <text x="63" y="73" fill="#0F2B5C" fontSize="5" fontWeight="bold" fontFamily="sans-serif">SUPERIUS</text>
          {/* Base ribbon / branches */}
          <path d="M40 102 C50 108 70 108 80 102" stroke="#C59B27" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 112 C55 115 65 115 70 112" stroke="#0F2B5C" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <UgmLogo variant="shield" size={size} />
      <div className="flex flex-col">
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-500 leading-none">
          UNIVERSIDAD
        </span>
        <span className="text-lg font-black text-[#0F2B5C] tracking-tight leading-none mt-0.5">
          Gabriela Mistral
        </span>
        <span className="text-[11px] text-[#00A3E0] italic font-serif leading-none mt-0.5">
          Juntos escribimos tu futuro
        </span>
      </div>
    </div>
  );
};
