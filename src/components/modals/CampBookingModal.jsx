import React, { useState } from 'react';

export const CampBookingModal = ({
  camp,
  onClose,
  onConfirmBooking,
}) => {
  const [donorName, setDonorName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 11:00 AM');
  const [isSuccess, setIsSuccess] = useState(false);
  const [passCode, setPassCode] = useState('');

  if (!camp) return null;

  const slots = [
    '09:30 AM - 10:30 AM',
    '10:30 AM - 11:30 AM',
    '11:30 AM - 12:30 PM',
    '01:30 PM - 02:30 PM',
    '02:30 PM - 03:30 PM',
  ];

  const handleBook = (e) => {
    e.preventDefault();
    if (!donorName.trim() || !phone.trim()) return;
    const code = 'CAMP-' + Math.floor(100000 + Math.random() * 900000);
    setPassCode(code);
    setIsSuccess(true);
    onConfirmBooking(camp.id, selectedSlot, donorName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-lg bg-[#12161f] border border-[#1e2533] rounded-2xl shadow-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2533] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 text-lg">
              <i className="fa-solid fa-tent"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Reserve Camp Donation Slot</h2>
              <p className="text-xs text-[#8b95a5]">Free health screening & official certificate included</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {isSuccess ? (
          /* Confirmation Pass */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Donation Slot Confirmed!</h3>
              <p className="text-xs text-[#8b95a5]">
                Thank you, <strong className="text-white">{donorName}</strong>. You are booked for:
              </p>
            </div>
            <div className="bg-[#0b0e14] border border-[#1e2533] rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8b95a5]">Camp Venue:</span>
                <span className="font-semibold text-white">{camp.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b95a5]">Address:</span>
                <span className="text-gray-300">{camp.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b95a5]">Date & Time Slot:</span>
                <span className="font-bold text-red-500">
                  {camp.date} @ {selectedSlot}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#1e2533]">
                <span className="text-[#8b95a5]">Digital Entry Pass:</span>
                <span className="font-mono text-sm font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800">
                  {passCode}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-bold text-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleBook} className="space-y-4">
            <div className="bg-[#181d29] p-3 rounded-lg border border-[#1e2533] text-xs">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-white">{camp.title}</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300">
                  {camp.daysLeft} Days Left
                </span>
              </div>
              <p className="text-[#8b95a5] mb-1.5">📍 {camp.address}</p>
              <div className="flex items-center gap-2 text-[11px] text-gray-300">
                <i className="fa-solid fa-calendar-days text-red-500"></i> {camp.date} ({camp.time})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#8b95a5] uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gurpreet Singh"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#8b95a5] uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase mb-1">
                Select Your Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none cursor-pointer"
              >
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

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase mb-1.5">
                Choose Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSlot(s)}
                    className={`py-2 px-2 text-[11px] rounded-lg border font-semibold transition-colors cursor-pointer ${
                      selectedSlot === s
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-[#06080c] text-gray-400 border-[#1e2533] hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2533]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-700 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-calendar-check"></i>
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
