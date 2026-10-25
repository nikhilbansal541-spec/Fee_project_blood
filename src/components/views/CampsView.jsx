import React, { useState } from 'react';

export const CampsView = ({ camps = [], onBookCamp }) => {
  const [filterCity, setFilterCity] = useState('all');

  const filteredCamps = camps.filter(
    (c) => filterCity === 'all' || c.city.toLowerCase() === filterCity.toLowerCase()
  );

  return (
    <div className="w-full space-y-6 pb-16">
      {/* ================= HEADING ================= */}
      <section className="text-center pt-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-3">
          <i className="fa-solid fa-tent"></i> Community Blood Drives
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          DONATION <span className="text-red-500">CAMPS.</span>
        </h1>
        <p className="text-sm text-[#8b95a5]">
          Find nearby voluntary donation camps organized by hospitals and Red Cross. Book your preferred time slot.
        </p>
      </section>

      {/* Filter bar */}
      <div className="max-w-xl mx-auto flex items-center justify-center gap-2">
        <span className="text-xs text-[#8b95a5]">Location:</span>
        {['all', 'chandigarh', 'mohali'].map((city) => (
          <button
            key={city}
            onClick={() => setFilterCity(city)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterCity === city
                ? 'bg-red-600 text-white'
                : 'bg-[#12161f] text-gray-400 hover:text-white border border-[#1e2533]'
            }`}
          >
            {city === 'all' ? 'All Locations' : city.charAt(0).toUpperCase() + city.slice(1)}
          </button>
        ))}
      </div>

      {/* Camps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCamps.map((camp) => {
          const percentBooked = Math.round((camp.bookedSlots / camp.totalSlots) * 100);
          return (
            <div
              key={camp.id}
              className="bg-[#12161f] border border-[#1e2533] rounded-xl p-5 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center text-lg shrink-0">
                    <i className="fa-solid fa-tent"></i>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-950 text-red-300 border border-red-800">
                    {camp.daysLeft} Days Left
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-[#8b95a5] flex items-start gap-1">
                    <span className="text-red-500">📍 </span> {camp.address}
                  </p>
                </div>

                <div className="p-3 bg-[#0b0e14] rounded-lg border border-[#1e2533] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-gray-200">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <i className="fa-solid fa-calendar-day text-red-500"></i> {camp.date}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">{camp.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#8b95a5] pt-1 border-t border-[#1e2533]">
                    <span>Organized by:</span>
                    <span className="text-gray-200">{camp.organizer}</span>
                  </div>
                </div>

                {/* Slots Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#8b95a5]">Slots Reserved</span>
                    <span className="font-bold text-white">
                      {camp.bookedSlots} / {camp.totalSlots} ({percentBooked}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#06080c] rounded-full overflow-hidden border border-[#1e2533]">
                    <div
                      style={{ width: `${percentBooked}%` }}
                      className="h-full bg-red-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Perks */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-[#8b95a5] uppercase">
                    Free Donor Screening Perks:
                  </p>
                  <ul className="text-[11px] text-gray-300 space-y-0.5">
                    {camp.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-check text-emerald-400 text-[10px]"></i>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => onBookCamp(camp)}
                className="w-full mt-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-calendar-check"></i>
                Book Donor Slot
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
