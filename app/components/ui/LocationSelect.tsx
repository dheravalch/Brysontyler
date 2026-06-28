/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

interface LocationSelectProps {
  name: string;
  label: string;
  type: "country" | "state" | "city";
  countryCode?: string;
  stateCode?: string;  
  control: any;
  error?: string;
}

export default function LocationSelect({ name, label, type, countryCode, stateCode, control, error }: LocationSelectProps) {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    if (type === "country") setOptions(Country.getAllCountries());
    if (type === "state" && countryCode) setOptions(State.getStatesOfCountry(countryCode));
    if (type === "city" && countryCode && stateCode) setOptions(City.getCitiesOfState(countryCode, stateCode));
  }, [type, countryCode, stateCode]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase text-zinc-400">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <select
            value={value}
            onChange={onChange}
            className={`w-full bg-zinc-800 border rounded-xl py-3 px-4 text-sm text-white outline-none transition-all focus:border-yellow-500 ${error ? "border-red-500" : "border-white/[0.08]"}`}
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt.isoCode || opt.name} value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
        )}
      />
      {error && <span className="text-red-500 text-[10px]  tracking-wide">
          {error}
        </span>}
    </div>
  );
}