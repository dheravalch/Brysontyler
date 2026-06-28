/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneNumberFieldProps {
  name: string;
  label?: string;
  rules?: any;
  control: any; 
  error?: string;
}

export default function PhoneNumberField({
  name,
  label = "Phone Number",
  rules = { required: "Phone number is required" },
  control,
  error,
}: PhoneNumberFieldProps) {
  return (
    <div className="flex flex-col gap-2">
   <label className="text-xs font-bold uppercase text-zinc-400">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <div
            className={`w-full bg-zinc-800 border rounded-xl px-4 transition-all focus-within:border-yellow-500 ${
              error ? "border-red-500" : "border-white/[0.08]"
            }`}
          >
            <PhoneInput
              international
              defaultCountry="NG"
              value={value}
              onChange={onChange}
              className="py-3 text-sm"
              style={
                {
                  "--PhoneInputCountrySelect-marginRight": "10px",
                } as React.CSSProperties
              }
            />
          </div>
        )}
      />

      {error && (
        <span className="text-red-500 text-[10px]  tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}