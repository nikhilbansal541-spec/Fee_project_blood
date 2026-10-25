import React, { useState } from 'react';

export const RequestBloodModal = ({
  isOpen,
  onClose,
  onSubmit,
  donors = [],
}) => {
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [units, setUnits] = useState(2);
  const [urgency, setUrgency] = useState('critical');
  const [hospital, setHospital] = useState('');
  const [city, setCity] = useState('Chandigarh');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const matchingDonors = donors.filter(
    (d) => d.bloodGroup === bloodGroup && d.available
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !hospital.trim() || !contactPerson.trim() || !phone.trim()) {
      setError('Please fill in all required fields (Patient, Hospital, Contact & Phone).');
      return;
    }

    onSubmit({
      patientName: patientName.trim(),
      bloodGroup,
      units: Number(units),
      urgency,
      hospital: hospital.trim(),
      city: city.trim(),
      contactPerson: contactPerson.trim(),
      phone: phone.trim(),
      reason: reason.trim() || 'Emergency medical requirement',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#12161f] border border-[#1e2533] rounded-2xl shadow-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2533] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 text-lg">
              <i className="fa-solid fa-droplet"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Request Blood Urgently</h2>
              <p className="text-xs text-[#8b95a5]">Post an emergency request to notify nearby verified donors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Live Matching Donor Info */}
        <div className="bg-[#181d29] border border-[#1e2533] rounded-lg p-3 mb-4 flex items-center justify-between text-xs">
          <span className="text-[#8b95a5]">
            Active donors available for <strong className="text-white">{bloodGroup}</strong>:
          </span>
          <span className="px-2.5 py-0.5 bg-red-950 text-red-400 font-bold rounded border border-red-800">
            {matchingDonors.length} Verified Donors
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950 border border-red-800 rounded-lg text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Patient Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Required Blood Group *
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none cursor-pointer"
              >
                <option value="A+">A+ (A Positive)</option>
                <option value="A-">A- (A Negative)</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+ (O Positive)</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Units Required
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-2 h-10">
                <button
                  type="button"
                  onClick={() => setUrgency('critical')}
                  className={`rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                    urgency === 'critical'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-[#06080c] text-gray-400 border-[#1e2533] hover:text-white'
                  }`}
                >
                  Critical
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('urgent')}
                  className={`rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                    urgency === 'urgent'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-[#06080c] text-gray-400 border-[#1e2533] hover:text-white'
                  }`}
                >
                  Urgent
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('standard')}
                  className={`rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                    urgency === 'standard'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-[#06080c] text-gray-400 border-[#1e2533] hover:text-white'
                  }`}
                >
                  24 Hours
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Hospital / Clinic Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Civil Hospital, Sector 16"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                City / Location *
              </label>
              <input
                type="text"
                placeholder="e.g. Chandigarh"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Contact Person & Relationship *
              </label>
              <input
                type="text"
                placeholder="e.g. Sumit (Brother)"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
                Phone Number *
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
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8b95a5] uppercase tracking-wider mb-1.5">
              Reason / Medical Context (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Scheduled for emergency surgery tomorrow morning"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-sm text-white outline-none resize-none"
            />
          </div>

          {/* Action buttons */}
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
              <i className="fa-solid fa-paper-plane"></i>
              Broadcast Blood Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
