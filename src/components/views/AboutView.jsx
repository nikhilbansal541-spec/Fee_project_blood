import React from 'react';

export const AboutView = ({
  onRegisterDonor,
  onNavigate,
}) => {
  return (
    <div className="w-full space-y-10 pb-16">
      {/* ================= HERO ================= */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-4">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase">
            <i className="fa-solid fa-droplet text-red-500"></i> The Mission Behind BloodCare
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            EVERY DROP<br />
            <span className="text-red-500">TELLS A STORY.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
            BloodCare brings donors, hospitals, and families together when every moment matters. One simple decision to donate can give a patient in emergency a second chance at life.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onRegisterDonor}
              className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              Become a Donor
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="px-6 py-2.5 rounded-lg bg-[#12161f] hover:bg-[#181d29] border border-[#1e2533] text-gray-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              Explore Our Services
            </button>
          </div>
        </div>

        {/* Clean Static SVG Blood Drop Graphic */}
        <div className="w-48 h-60 shrink-0 flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 200 270"
            aria-label="Blood drop"
          >
            <path
              d="M100 10S20 120 20 180a80 80 0 0 0 160 0C180 120 100 10 100 10Z"
              fill="#b30000"
            />
            <path
              d="M100 42 60 140 35 180 100 240 165 180 140 140Z"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
            />
            <g fill="#fff">
              <circle cx="100" cy="42" r="3.5" />
              <circle cx="60" cy="140" r="3.5" />
              <circle cx="140" cy="140" r="3.5" />
              <circle cx="35" cy="180" r="3.5" />
              <circle cx="165" cy="180" r="3.5" />
              <circle cx="100" cy="240" r="3.5" />
            </g>
          </svg>
        </div>
      </section>

      {/* ================= ABOUT GRID ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Panel */}
        <div className="lg:col-span-5 bg-[#12161f] border border-[#1e2533] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center text-xl">
              <i className="fa-solid fa-heart-pulse"></i>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Care that reaches people faster.
            </h2>
            <p className="text-xs text-[#8b95a5] leading-relaxed">
              We make blood donation easier to understand, easier to access, and safer for everyone involved — from voluntary donors to emergency hospital trauma units.
            </p>
          </div>
          <button
            onClick={onRegisterDonor}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            Become a Donor Today
          </button>
        </div>

        {/* 4 Feature Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-[#12161f] border border-[#1e2533] rounded-xl space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-600/15 text-red-400 flex items-center justify-center text-base">
              <i className="fa-solid fa-shield-heart"></i>
            </div>
            <h3 className="text-sm font-bold text-white">Safe Donations</h3>
            <p className="text-xs text-[#8b95a5]">
              Clear medical eligibility guidance, sterile equipment, and pre-donation check.
            </p>
          </div>

          <div className="p-5 bg-[#12161f] border border-[#1e2533] rounded-xl space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-600/15 text-red-400 flex items-center justify-center text-base">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <h3 className="text-sm font-bold text-white">Quick Support</h3>
            <p className="text-xs text-[#8b95a5]">
              Instant matching connects patients to verified nearby blood donors in minutes.
            </p>
          </div>

          <div className="p-5 bg-[#12161f] border border-[#1e2533] rounded-xl space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-600/15 text-red-400 flex items-center justify-center text-base">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3 className="text-sm font-bold text-white">Community Driven</h3>
            <p className="text-xs text-[#8b95a5]">
              Powered by thousands of local voluntary heroes ready to step forward.
            </p>
          </div>

          <div className="p-5 bg-[#12161f] border border-[#1e2533] rounded-xl space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-600/15 text-red-400 flex items-center justify-center text-base">
              <i className="fa-solid fa-route"></i>
            </div>
            <h3 className="text-sm font-bold text-white">Live Tracking</h3>
            <p className="text-xs text-[#8b95a5]">
              Full visibility on request progress from broadcast to donor match.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
