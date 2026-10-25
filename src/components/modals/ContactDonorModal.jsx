import React, { useState } from 'react';
import { BLOOD_COMPATIBILITY_CHART } from '../../data/initialData';

export const ContactDonorModal = ({
  donor,
  onClose,
  onSendAlert,
}) => {
  const [alertSent, setAlertSent] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  if (!donor) return null;

  const compatibility = BLOOD_COMPATIBILITY_CHART[donor.bloodGroup];

  const handleSendAlert = () => {
    setAlertSent(true);
    onSendAlert(donor.name);
    setTimeout(() => {
      setAlertSent(false);
      onClose();
    }, 1800);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello ${donor.name}, I found your verified profile on BloodCare. We have an urgent blood requirement for ${donor.bloodGroup} in ${donor.city}. Are you available to help save a life?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-lg bg-[#12161f] border border-[#1e2533] rounded-2xl shadow-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2533] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 text-2xl">
              🩸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{donor.name}</h3>
                {donor.verified && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-green-950 text-green-400 border border-green-800 rounded">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8b95a5]">
                📍 {donor.city} • Last Donated: {donor.lastDonationDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Blood Group Tag & Status */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#181d29] p-3 rounded-lg border border-[#1e2533] flex items-center gap-3">
            <span className="text-2xl font-bold text-red-500">{donor.bloodGroup}</span>
            <div>
              <p className="text-[11px] text-[#8b95a5]">Blood Group</p>
              <p className="text-xs font-semibold text-white">Donor Type</p>
            </div>
          </div>
          <div className="bg-[#181d29] p-3 rounded-lg border border-[#1e2533] flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <div>
              <p className="text-[11px] text-[#8b95a5]">Status</p>
              <p className="text-xs font-semibold text-emerald-400">
                {donor.available ? 'Ready for Donation' : 'Currently Resting'}
              </p>
            </div>
          </div>
        </div>

        {/* Compatibility Info */}
        {compatibility && (
          <div className="bg-[#090d15] p-3 rounded-lg border border-[#1e2533] mb-4 text-xs">
            <p className="font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-info text-red-500"></i> Compatibility Guide:
            </p>
            <div className="flex flex-wrap gap-1 text-[11px]">
              <span className="text-[#8b95a5]">Can donate to:</span>
              {compatibility.giveTo.map((grp) => (
                <span
                  key={grp}
                  className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 font-semibold border border-red-900"
                >
                  {grp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact actions */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-[#8b95a5] uppercase tracking-wider">
            Choose Contact Method:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${donor.phone}`}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#181d29] hover:bg-[#202737] border border-[#1e2533] text-xs font-semibold text-white transition-colors"
            >
              <i className="fa-solid fa-phone text-emerald-400"></i>
              <span>Call: {donor.phone}</span>
            </a>
            <a
              href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#181d29] hover:bg-[#202737] border border-[#1e2533] text-xs font-semibold text-white transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-green-400"></i>
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="pt-2">
            <label className="block text-xs text-[#8b95a5] mb-1">
              Optional Message / Hospital Reference:
            </label>
            <input
              type="text"
              placeholder="e.g. Urgent at Sector 16 Hospital, Bed #12"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none mb-3"
            />
            <button
              onClick={handleSendAlert}
              disabled={alertSent}
              className={`w-full py-2.5 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                alertSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {alertSent ? (
                <>
                  <i className="fa-solid fa-check"></i>
                  Alert Dispatched to {donor.name}!
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bell"></i>
                  Send Emergency Notification to Donor
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
