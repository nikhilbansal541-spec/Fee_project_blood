import React from 'react';

export const EmergencySOSModal = ({
  isOpen,
  onClose,
  onRequestBlood,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-lg bg-[#12161f] border-2 border-red-600 rounded-2xl shadow-xl p-6 text-white">
        {/* Emergency banner */}
        <div className="flex items-center justify-between border-b border-red-950 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center text-xl">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-red-500 uppercase tracking-wider">24/7 Emergency Desk</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                  HOTLINE
                </span>
              </div>
              <p className="text-xs text-[#8b95a5]">Immediate support for emergency trauma and acute blood loss</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Call Hotline */}
        <div className="bg-[#181d29] border border-red-800 rounded-xl p-4 mb-4 text-center space-y-2">
          <p className="text-xs font-bold text-red-300 uppercase tracking-wider">
            DIRECT BLOODCARE EMERGENCY HOTLINE
          </p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-base font-bold tracking-wide transition-colors"
          >
            <i className="fa-solid fa-phone"></i>
            +91 98765 43210
          </a>
          <p className="text-[11px] text-gray-400">Zero wait-time • Medical coordinator on standby</p>
        </div>

        {/* National Emergency Numbers */}
        <div className="space-y-2 mb-4">
          <p className="text-xs font-semibold text-[#8b95a5] uppercase tracking-wider">
            National Emergency Services:
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <a
              href="tel:108"
              className="p-2 bg-[#0b0e14] border border-[#1e2533] hover:border-red-500 rounded-lg transition-colors block"
            >
              <div className="text-base font-bold text-red-400">108</div>
              <div className="text-[10px] text-gray-400">Ambulance</div>
            </a>
            <a
              href="tel:104"
              className="p-2 bg-[#0b0e14] border border-[#1e2533] hover:border-red-500 rounded-lg transition-colors block"
            >
              <div className="text-base font-bold text-red-400">104</div>
              <div className="text-[10px] text-gray-400">Blood Info</div>
            </a>
            <a
              href="tel:1910"
              className="p-2 bg-[#0b0e14] border border-[#1e2533] hover:border-red-500 rounded-lg transition-colors block"
            >
              <div className="text-base font-bold text-red-400">1910</div>
              <div className="text-[10px] text-gray-400">Red Cross</div>
            </a>
          </div>
        </div>

        {/* Action */}
        <div className="space-y-2 pt-2 border-t border-[#1e2533]">
          <button
            onClick={() => {
              onClose();
              onRequestBlood();
            }}
            className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-bullhorn"></i>
            Broadcast Emergency Blood Request
          </button>
          <button
            onClick={onClose}
            className="w-full py-1 text-xs text-gray-400 hover:text-white cursor-pointer"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
