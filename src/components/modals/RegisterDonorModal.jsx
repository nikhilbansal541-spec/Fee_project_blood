import React, { useState } from 'react';

export const RegisterDonorModal = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [lastDonation, setLastDonation] = useState('First time donor');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !phone.trim()) {
      setError('Please provide Name, City, and Phone Number.');
      return;
    }

    onRegister({
      name: name.trim(),
      bloodGroup,
      city: city.trim(),
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      available,
      lastDonationDate: lastDonation,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-lg bg-[#12161f] border border-[#1e2533] rounded-2xl shadow-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2533] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 text-lg">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Register as a Blood Donor</h2>
              <p className="text-xs text-[#8b95a5]">Be the lifeline for patients in emergency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950 border border-red-800 rounded-lg text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Jaswinder Singh"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Blood Group *
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none cursor-pointer"
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
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                City / Location *
              </label>
              <input
                type="text"
                placeholder="e.g. Chandigarh / Mohali"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Mobile Number *
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
              When did you last donate blood?
            </label>
            <select
              value={lastDonation}
              onChange={(e) => setLastDonation(e.target.value)}
              className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none cursor-pointer"
            >
              <option value="First time donor">First time donating blood</option>
              <option value="Over 3 months ago">Over 3 months ago (Eligible)</option>
              <option value="Over 6 months ago">Over 6 months ago (Eligible)</option>
              <option value="Over 1 year ago">Over 1 year ago (Eligible)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#181d29] rounded-lg border border-[#1e2533]">
            <input
              type="checkbox"
              id="availCheck"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="w-4 h-4 accent-red-600 rounded cursor-pointer"
            />
            <label htmlFor="availCheck" className="text-xs text-gray-200 cursor-pointer select-none">
              I am available to receive emergency donation requests in my city.
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2533]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-700 text-sm font-semibold text-gray-300 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-bold text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-check"></i>
              Join Donor Network
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
