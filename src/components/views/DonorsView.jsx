import React, { useState } from 'react';

export const DonorsView = ({
  donors = [],
  onContactDonor,
  onRegisterDonor,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlood, setSelectedBlood] = useState('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlood = selectedBlood === 'all' || donor.bloodGroup === selectedBlood;
    const matchesAvail = !onlyAvailable || donor.available;
    return matchesSearch && matchesBlood && matchesAvail;
  });

  return (
    <div className="w-full space-y-6 pb-16">
      {/* ================= HEADING ================= */}
      <section className="text-center pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-3">
          <i className="fa-solid fa-users"></i> Verified Community Network
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          OUR <span className="text-red-500">DONORS.</span>
        </h1>
        <p className="text-sm text-[#8b95a5] max-w-xl mx-auto">
          Meet verified volunteers ready to step forward when medical emergencies arise.
        </p>
      </section>

      {/* ================= SEARCH & ACTIONS ================= */}
      <section className="max-w-4xl mx-auto bg-[#12161f] rounded-xl p-4 sm:p-5 border border-[#1e2533]">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search donor by name or city (e.g. Rahul, Chandigarh, Mohali)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-[#06080c] border border-[#1e2533] focus:border-red-500 rounded-lg text-sm text-white outline-none"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedBlood}
              onChange={(e) => setSelectedBlood(e.target.value)}
              className="w-full h-11 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-500 rounded-lg text-sm text-white outline-none cursor-pointer"
            >
              <option value="all">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <button
            onClick={onRegisterDonor}
            className="w-full sm:w-auto h-11 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <i className="fa-solid fa-plus"></i>
            Join as Donor
          </button>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#1e2533] text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#8b95a5]">Quick Filter:</span>
            {['all', 'O+', 'O-', 'A+', 'B+', 'AB+'].map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBlood(bg)}
                className={`px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                  selectedBlood === bg
                    ? 'bg-red-600 text-white'
                    : 'bg-[#06080c] text-gray-400 hover:text-white border border-[#1e2533]'
                }`}
              >
                {bg === 'all' ? 'All Groups' : bg}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-[#8b95a5] hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-3.5 h-3.5 accent-red-600 rounded"
            />
            Available Donors Only
          </label>
        </div>
      </section>

      {/* ================= DONOR CARDS GRID ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDonors.map((donor) => (
          <div
            key={donor.id}
            className="bg-[#12161f] border border-[#1e2533] rounded-xl p-5 text-center flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-red-600/15 flex items-center justify-center text-2xl">
                🩸
              </div>

              <div className="flex items-center justify-center gap-1.5 mb-1">
                <h2 className="text-base font-bold text-white">
                  {donor.name}
                </h2>
                {donor.verified && (
                  <i className="fa-solid fa-circle-check text-emerald-400 text-xs" title="Verified Donor"></i>
                )}
              </div>

              {/* Blood group badge */}
              <div className="inline-block px-3 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold text-xs mb-3">
                {donor.bloodGroup}
              </div>

              <p className="text-xs text-[#8b95a5] mb-2 flex items-center justify-center gap-1.5">
                <span>📍 </span> {donor.city}
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#0b0e14] text-gray-300 border border-[#1e2533]">
                  {donor.donationsCount} Donations
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    donor.available
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-gray-900 text-gray-400'
                  }`}
                >
                  {donor.available ? 'Ready Now' : 'Resting'}
                </span>
              </div>
            </div>

            {/* Contact Donor Button */}
            <button
              onClick={() => onContactDonor(donor)}
              className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-paper-plane text-[11px]"></i>
              Contact Donor
            </button>
          </div>
        ))}
      </section>

      {filteredDonors.length === 0 && (
        <div className="text-center py-12 bg-[#12161f] border border-[#1e2533] rounded-xl p-8 max-w-md mx-auto space-y-3">
          <div className="text-3xl text-gray-500">🔍</div>
          <h3 className="text-base font-bold text-white">No Donors Match Your Filter</h3>
          <p className="text-xs text-[#8b95a5]">
            No verified donors match your search. Try resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedBlood('all');
              setOnlyAvailable(false);
            }}
            className="px-4 py-2 bg-[#181d29] hover:bg-[#202737] text-white rounded-lg text-xs font-semibold border border-gray-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
