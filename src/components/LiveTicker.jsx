import React from 'react';

export const LiveTicker = () => {
  return (
    <div className="w-full bg-[#0d1117] border-y border-[#1e2533] py-2 px-4 text-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span className="font-semibold text-red-400">CRITICAL NEED:</span>
          <span className="text-gray-300">2 Units O+ Needed at PGI Hospital Chandigarh (Trauma Center)</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-gray-400">
          <span>• 8,920+ Certified Donors On Standby</span>
          <span>• 24/7 Helpline: +91 98765 43210</span>
        </div>
      </div>
    </div>
  );
};
