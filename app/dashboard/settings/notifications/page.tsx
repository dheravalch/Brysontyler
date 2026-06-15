"use client";

import { useState } from "react";

export default function Notifications() {
  // Manage the state of each toggle
  const [settings, setSettings] = useState<Record<string, boolean>>({
    'Email Updates': true,
    'Marketing Tips': false,
    'System Alerts': true,
  });

  const toggleSetting = (item: string) => {
    setSettings(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black">Notification Settings</h2>
        <p className="text-zinc-400 text-sm mt-1">Choose what updates you want to receive.</p>
      </div>

      <div className="space-y-4">
        {Object.keys(settings).map((item) => (
          <div 
            key={item} 
            className="flex justify-between items-center bg-black p-5 rounded-2xl border border-white/5"
          >
            <span className="font-bold">{item}</span>
            <button 
              onClick={() => toggleSetting(item)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                settings[item] ? 'bg-yellow-500' : 'bg-zinc-800'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                settings[item] ? 'left-7 bg-black' : 'left-1 bg-zinc-500'
              }`} />
            </button>
          </div>
        ))}
      </div>

      <button className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-black hover:bg-yellow-400 transition-all">
        SAVE PREFERENCES
      </button>
    </div>
  );
}