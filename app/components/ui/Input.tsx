'use client';

import { useState, InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; 
}

export default function Input({ type, error, label,...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="relative w-full">
      {label&&  <label className="text-xs font-bold uppercase text-zinc-400">{label}</label>}
      <input
        {...props}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        className={`w-full bg-zinc-800 p-3 rounded-2xl border ${
          error ? 'border-red-500' : 'border-white/10'
        } focus:border-yellow-400 outline-none transition-all`}
      />
      
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 cursor-pointer text-zinc-500 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {error && (
         <span className="text-red-500 text-[10px]  tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}