"use client";

import { useRouter } from 'next/navigation';

interface LogoProps {
  size?: number; 
}

export default function Logo({ size = 11 }: LogoProps) {
  const { push } = useRouter();

  return (
    <div
      className="flex items-center gap-3 cursor-pointer group"
      onClick={() => push("/home")}
    >
      <div 
        className="bg-linear-to-br from-[#F7E018] to-yellow-600 rounded-2xl flex items-center justify-center text-black font-black shadow-lg shadow-yellow-500/10 transition-all"
        style={{ 
          width: `${size * 0.25}rem`, 
          height: `${size * 0.25}rem`,
          fontSize: `${size * 0.15}rem`
        }}
      >
        BT
      </div>
      
      {/* Text Group */}
      <div className="flex flex-col">
        <h1 
          className="font-black tracking-tighter text-white leading-none group-hover:text-[#F7E018] transition-colors"
          style={{ fontSize: `${size * 0.15}rem` }}
        >
          BrysonTyler
        </h1>
        <p 
          className="text-[#F7E018] font-bold tracking-[0.25em] uppercase mt-0.5"
          style={{ fontSize: `${size * 0.08}rem` }}
        >
          Productions
        </p>
      </div>
    </div>
  );
}