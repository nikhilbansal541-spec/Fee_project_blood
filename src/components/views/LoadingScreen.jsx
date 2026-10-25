import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing BloodCare Emergency Grid...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next < 30) {
          setStatusText('Initializing Emergency Blood Grid...');
        } else if (next < 65) {
          setStatusText('Connecting Verified Donors Database...');
        } else if (next < 90) {
          setStatusText('Synchronizing Hospital Blood Banks...');
        } else if (next >= 100) {
          clearInterval(timer);
          setStatusText('BloodCare Grid Ready.');
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#06080c] text-white flex flex-col justify-center items-center px-4 select-none">
      <div className="w-full max-w-md bg-[#12161f] border border-[#1e2533] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        {/* Blood drop logo */}
        <div className="w-16 h-16 mx-auto rounded-full bg-red-600/15 flex items-center justify-center text-3xl text-red-500">
          <i className="fa-solid fa-droplet"></i>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Blood<span className="text-red-500">Care</span>
          </h1>
          <p className="text-xs text-[#8b95a5] mt-1">
            Every drop. Every donor. Every life.
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-300">{statusText}</span>
            <span className="text-red-500 font-mono">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-[#06080c] rounded-full overflow-hidden border border-[#1e2533]">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-red-600 rounded-full transition-all duration-75"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col gap-2">
          {progress >= 100 ? (
            <button
              onClick={onComplete}
              className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-arrow-right"></i>
              Enter BloodCare Dashboard
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="w-full py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Skip Loading &rarr;
            </button>
          )}
        </div>

        <div className="text-[11px] text-gray-500 font-medium">
          24/7 National Emergency Blood Dispatch Network
        </div>
      </div>
    </div>
  );
};
