import React, { useEffect, useState } from 'react';
import { BloodCompatibilityWidget } from '../BloodCompatibilityWidget';

export const HomeDashboard = ({
  onNavigate,
  onRequestBlood,
  onTrackRequest,
  onRegisterDonor,
  onSelectCamp,
  camps = [],
  donorsCount = 0,
}) => {
  const [counts, setCounts] = useState({
    donors: 8920 + donorsCount,
    donations: 12450,
    lives: 300,
    camps: 320,
  });

  return (
    <div className="w-full flex flex-col gap-6 pb-10">
      {/* ================= HERO SECTION WITHOUT ANIMATIONS ================= */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-8 py-4">
        {/* Left Hero Text */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-red-950/60 border border-red-800 text-red-300 text-xs font-bold tracking-wider uppercase mb-4 w-fit">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>24/7 National Emergency Blood Grid</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] mb-4 text-white">
            SAVE BLOOD.<br />
            <span className="text-red-500">SAVE LIVES.</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-lg leading-relaxed font-normal">
            Every second counts. Connect directly with verified voluntary donors across your city or broadcast an emergency blood request with instant dispatcher tracking.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onRegisterDonor}
              className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide transition-colors flex items-center gap-2.5 cursor-pointer"
            >
              <i className="fa-solid fa-hand-holding-droplet text-red-100"></i>
              Donate Blood
            </button>
            <button
              onClick={onRequestBlood}
              className="px-6 py-3 rounded-lg bg-[#12161f] hover:bg-[#181d29] text-white font-bold text-sm tracking-wide border border-[#1e2533] hover:border-gray-600 transition-colors flex items-center gap-2.5 cursor-pointer"
            >
              <i className="fa-solid fa-magnifying-glass text-red-400"></i>
              Find Blood
            </button>
          </div>
        </div>

        {/* Story Card */}
        <div className="w-full lg:w-[480px] bg-[#12161f] rounded-xl border border-[#1e2533] flex flex-col sm:flex-row overflow-hidden shrink-0">
          {/* Timeline */}
          <div className="sm:w-[48%] p-5 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-[#1e2533] space-y-4 bg-[#0a0d14]">
            <div className="relative pl-3 border-l-2 border-red-600">
              <span className="text-xs font-bold text-red-500 mr-1.5">01</span>
              <h4 className="text-xs font-bold text-white inline">One Donor</h4>
              <p className="text-[11px] text-[#8b95a5] mt-0.5">A decision to help.</p>
            </div>
            <div className="relative pl-3 border-l-2 border-red-600">
              <span className="text-xs font-bold text-red-500 mr-1.5">02</span>
              <h4 className="text-xs font-bold text-white inline">One Donation</h4>
              <p className="text-[11px] text-[#8b95a5] mt-0.5">A drop of hope.</p>
            </div>
            <div className="relative pl-3 border-l-2 border-red-600">
              <span className="text-xs font-bold text-red-500 mr-1.5">03</span>
              <h4 className="text-xs font-bold text-white inline">One Life</h4>
              <p className="text-[11px] text-[#8b95a5] mt-0.5">A new chance to live.</p>
            </div>
            <div className="relative pl-3 border-l-2 border-red-600">
              <span className="text-xs font-bold text-red-500 mr-1.5">04</span>
              <h4 className="text-xs font-bold text-white inline">Be The Reason</h4>
              <p className="text-[11px] text-[#8b95a5] mt-0.5">Someone is waiting for you.</p>
            </div>
          </div>

          {/* Image & Overlay */}
          <div className="sm:w-[52%] relative min-h-[220px]">
            <img
              src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=600&auto=format&fit=crop"
              alt="Blood Donation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75 p-5 flex flex-col justify-end items-center text-center">
              <h2 className="text-base font-bold text-white mb-2">
                Small Act.<br />Big Impact.
              </h2>
              <button
                onClick={onRegisterDonor}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>

        {/* Clean Static SVG Blood Droplet */}
        <div className="hidden xl:flex items-center justify-center shrink-0 w-36">
          <svg
            viewBox="0 0 200 250"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-40"
          >
            <path
              d="M100 10 C100 10,20 120,20 180 C20 224.18,55.82 260,100 260 C144.18 260,180 224.18,180 180 C180 120,100 10,100 10 Z"
              fill="#cc0000"
            />
            <polygon
              points="100,40 60,140 100,160 140,140"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <polygon
              points="60,140 35,180 100,240 165,180 140,140"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <circle cx="100" cy="40" r="3" fill="#fff" />
            <circle cx="60" cy="140" r="3" fill="#fff" />
            <circle cx="140" cy="140" r="3" fill="#fff" />
            <circle cx="100" cy="100" r="2.5" fill="#fff" />
            <circle cx="35" cy="180" r="3" fill="#fff" />
            <circle cx="165" cy="180" r="3" fill="#fff" />
            <circle cx="100" cy="240" r="3" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ================= BLOOD COMPATIBILITY WIDGET ================= */}
      <BloodCompatibilityWidget />

      {/* ================= DASHBOARD GRIDS ================= */}
      <section className="space-y-4">
        {/* ROW 1: 4 FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={onRequestBlood}
            className="p-5 bg-[#12161f] hover:bg-[#181d29] border border-[#1e2533] hover:border-red-600 rounded-xl text-center flex flex-col items-center justify-center transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-red-600/15 text-xl text-red-500 flex items-center justify-center mb-3">
              <i className="fa-solid fa-file-invoice"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Request Blood</h3>
            <p className="text-xs text-[#8b95a5]">Get help in emergency</p>
          </button>

          <button
            onClick={() => onNavigate('donors')}
            className="p-5 bg-[#12161f] hover:bg-[#181d29] border border-[#1e2533] hover:border-red-600 rounded-xl text-center flex flex-col items-center justify-center transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-red-600/15 text-xl text-red-500 flex items-center justify-center mb-3">
              <i className="fa-regular fa-user"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Find Donors</h3>
            <p className="text-xs text-[#8b95a5]">Connect with donors</p>
          </button>

          <button
            onClick={onTrackRequest}
            className="p-5 bg-[#12161f] hover:bg-[#181d29] border border-[#1e2533] hover:border-red-600 rounded-xl text-center flex flex-col items-center justify-center transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-red-600/15 text-xl text-red-500 flex items-center justify-center mb-3">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Track Request</h3>
            <p className="text-xs text-[#8b95a5]">Track your request</p>
          </button>

          <button
            onClick={() => onNavigate('camps')}
            className="p-5 bg-[#12161f] hover:bg-[#181d29] border border-[#1e2533] hover:border-red-600 rounded-xl text-center flex flex-col items-center justify-center transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-red-600/15 text-xl text-red-500 flex items-center justify-center mb-3">
              <i className="fa-solid fa-tent"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Donation Camps</h3>
            <p className="text-xs text-[#8b95a5]">Join donation drives</p>
          </button>
        </div>

        {/* ROW 2: STAT CARDS + STATIC MAP CARD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            onClick={() => onNavigate('donors')}
            className="p-4 bg-[#12161f] border border-[#1e2533] rounded-xl text-center flex flex-col justify-center items-center cursor-pointer hover:border-gray-600"
          >
            <p className="text-xs text-[#8b95a5] font-semibold mb-1">Donors</p>
            <div className="text-xl font-bold text-white">
              {counts.donors.toLocaleString()}+
            </div>
          </div>

          <div
            onClick={() => onNavigate('services')}
            className="p-4 bg-[#12161f] border border-[#1e2533] rounded-xl text-center flex flex-col justify-center items-center cursor-pointer hover:border-gray-600"
          >
            <p className="text-xs text-[#8b95a5] font-semibold mb-1">Donations</p>
            <div className="text-xl font-bold text-white">
              {counts.donations.toLocaleString()}+
            </div>
          </div>

          <div
            onClick={() => onNavigate('about')}
            className="p-4 bg-[#12161f] border border-[#1e2533] rounded-xl text-center flex flex-col justify-center items-center cursor-pointer hover:border-gray-600"
          >
            <p className="text-xs text-[#8b95a5] font-semibold mb-1">Lives Saved</p>
            <div className="text-xl font-bold text-white">
              {counts.lives.toLocaleString()}+
            </div>
          </div>

          <div
            onClick={() => onNavigate('camps')}
            className="p-4 bg-[#12161f] border border-[#1e2533] rounded-xl text-center flex flex-col justify-center items-center cursor-pointer hover:border-gray-600"
          >
            <p className="text-xs text-[#8b95a5] font-semibold mb-1">Camps</p>
            <div className="text-xl font-bold text-white">
              {counts.camps.toLocaleString()}+
            </div>
          </div>

          {/* STATIC MAP CARD */}
          <div className="col-span-2 relative min-h-[120px] bg-[#12161f] border border-[#1e2533] rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-red-500"></i>
                CAMP LOCATIONS
              </h4>
              <button
                onClick={() => onNavigate('camps')}
                className="text-[10px] text-red-400 hover:text-white hover:underline font-bold cursor-pointer"
              >
                View All &rarr;
              </button>
            </div>

            {/* Static Map Pins without expanding beacons */}
            <div className="relative h-14 w-full mt-1">
              {camps.map((camp) => (
                <div
                  key={camp.id}
                  style={{ top: camp.pinPosition.top, left: camp.pinPosition.left }}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5"
                  onClick={() => onSelectCamp(camp)}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  <div className="whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-semibold bg-black/90 text-gray-200 border border-gray-700">
                    {camp.badgeText}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-gray-400">
              Click any location to view camp info and book an appointment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
