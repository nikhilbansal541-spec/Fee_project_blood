import React, { useState } from 'react';

export const TrackRequestModal = ({
  isOpen,
  onClose,
  requests = [],
  onOpenNewRequest,
}) => {
  const [searchId, setSearchId] = useState('');
  const [selectedReq, setSelectedReq] = useState(
    requests.length > 0 ? requests[0] : null
  );

  if (!isOpen) return null;

  const filteredRequests = requests.filter(
    (r) =>
      r.id.toLowerCase().includes(searchId.toLowerCase()) ||
      r.patientName.toLowerCase().includes(searchId.toLowerCase()) ||
      r.hospital.toLowerCase().includes(searchId.toLowerCase()) ||
      r.bloodGroup.toLowerCase().includes(searchId.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
            Submitted / Verifying
          </span>
        );
      case 'donors_notified':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
            Donors Notified
          </span>
        );
      case 'matched':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            Donors Responded
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-950 text-purple-400 border border-purple-800">
            Fulfilled
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-gray-800 text-gray-300">
            Active
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#12161f] border border-[#1e2533] rounded-2xl shadow-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2533] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 text-lg">
              <i className="fa-solid fa-route"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Live Blood Request Tracker</h2>
              <p className="text-xs text-[#8b95a5]">Monitor real-time responses from donors and hospitals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Search input */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search by Request ID or Patient Name..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
            />
          </div>
          <button
            onClick={onOpenNewRequest}
            className="px-3.5 h-10 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            <i className="fa-solid fa-plus"></i> New Request
          </button>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* List of requests */}
          <div className="md:col-span-5 space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedReq?.id === req.id
                    ? 'bg-[#181d29] border-red-600'
                    : 'bg-[#0b0e14] border-[#1e2533] hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-red-500">{req.id}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300">
                    {req.bloodGroup} • {req.units} Units
                  </span>
                </div>
                <h4 className="text-sm font-semibold truncate text-white">{req.patientName}</h4>
                <p className="text-[11px] text-[#8b95a5] truncate">📍 {req.hospital}</p>
                <div className="mt-2 flex items-center justify-between">
                  {getStatusBadge(req.status)}
                  <span className="text-[10px] text-gray-500">{req.timestamp}</span>
                </div>
              </div>
            ))}
            {filteredRequests.length === 0 && (
              <div className="p-6 text-center text-xs text-[#8b95a5] bg-[#0b0e14] rounded-lg border border-[#1e2533]">
                No matching requests found.
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-7 bg-[#0b0e14] p-4 rounded-lg border border-[#1e2533]">
            {selectedReq ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b border-[#1e2533] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-red-500">{selectedReq.id}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white">
                        {selectedReq.bloodGroup}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{selectedReq.patientName}</h3>
                    <p className="text-xs text-[#8b95a5]">
                      {selectedReq.hospital}, {selectedReq.city}
                    </p>
                  </div>
                  {getStatusBadge(selectedReq.status)}
                </div>

                {/* Urgency & Context */}
                <div className="bg-[#12161f] p-3 rounded-lg border border-[#1e2533] text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8b95a5]">Units Needed:</span>
                    <span className="font-bold text-white">{selectedReq.units} Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b95a5]">Contact Person:</span>
                    <span className="font-semibold text-white">{selectedReq.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b95a5]">Contact Phone:</span>
                    <a href={`tel:${selectedReq.phone}`} className="text-red-400 hover:underline font-mono">
                      {selectedReq.phone}
                    </a>
                  </div>
                  {selectedReq.reason && (
                    <div className="pt-1 text-[#8b95a5]">
                      <span className="text-gray-400 font-medium">Context:</span> {selectedReq.reason}
                    </div>
                  )}
                </div>

                {/* Steps without animated pulse */}
                <div>
                  <h4 className="text-xs font-semibold text-[#8b95a5] uppercase mb-2">
                    Progress Timeline
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>1. Emergency Request Broadcasted</span>
                    </div>
                    <div className={`flex items-center gap-2 ${selectedReq.status !== 'submitted' ? 'text-emerald-400' : 'text-gray-400'}`}>
                      <i className="fa-solid fa-circle-check"></i>
                      <span>2. Donors Alerted ({selectedReq.matchedDonorsCount || 0} active matches)</span>
                    </div>
                    <div className={`flex items-center gap-2 ${selectedReq.status === 'matched' || selectedReq.status === 'completed' ? 'text-emerald-400' : 'text-gray-400'}`}>
                      <i className="fa-solid fa-circle-check"></i>
                      <span>3. Donor Responded &amp; Confirmed</span>
                    </div>
                    <div className={`flex items-center gap-2 ${selectedReq.status === 'completed' ? 'text-emerald-400' : 'text-gray-400'}`}>
                      <i className="fa-solid fa-circle-check"></i>
                      <span>4. Blood Unit Delivered to Hospital</span>
                    </div>
                  </div>
                </div>

                {/* Call Contact Button */}
                <div className="pt-2">
                  <a
                    href={`tel:${selectedReq.phone}`}
                    className="w-full py-2.5 rounded-lg bg-[#181d29] hover:bg-[#202737] border border-[#1e2533] text-xs font-bold text-emerald-400 flex items-center justify-center gap-2 transition-colors"
                  >
                    <i className="fa-solid fa-phone"></i>
                    Call Hospital Contact ({selectedReq.contactPerson})
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8 text-xs text-[#8b95a5]">
                Select a request on the left to inspect its live status.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
