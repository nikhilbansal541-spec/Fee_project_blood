import React, { useState } from 'react';
import { BLOOD_COMPATIBILITY_CHART } from '../data/initialData';

const ALL_GROUPS = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const BloodCompatibilityWidget = () => {
  const [selectedGroup, setSelectedGroup] = useState('O+');
  const [activeTab, setActiveTab] = useState('give');

  const compatibility = BLOOD_COMPATIBILITY_CHART[selectedGroup] || { giveTo: [], receiveFrom: [] };
  const activeTargets = activeTab === 'give' ? compatibility.giveTo : compatibility.receiveFrom;

  return (
    <div className="w-full bg-[#12161f] rounded-xl p-5 border border-[#1e2533]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-[#1e2533] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center text-lg">
            <i className="fa-solid fa-droplet"></i>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Blood Compatibility Matrix
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-red-950 text-red-400 border border-red-800 rounded">
                Match Guide
              </span>
            </h3>
            <p className="text-[11px] text-[#8b95a5]">Select any blood group to check transfusion compatibility</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-[#07090e] p-1 rounded-lg border border-[#1e2533] text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('give')}
            className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer ${
              activeTab === 'give'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Can Give To
          </button>
          <button
            onClick={() => setActiveTab('receive')}
            className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer ${
              activeTab === 'receive'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Can Receive From
          </button>
        </div>
      </div>

      {/* Blood Group Selectors */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-semibold text-[#8b95a5] shrink-0 uppercase tracking-wider">
            Choose Blood:
          </span>
          {ALL_GROUPS.map((bg) => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedGroup === bg
                  ? 'bg-red-600 text-white'
                  : 'bg-[#0e121a] text-gray-300 hover:text-white border border-[#1e2533]'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>

        {/* Compatibility Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 pt-1">
          {ALL_GROUPS.map((target) => {
            const isMatch = activeTargets.includes(target);
            return (
              <div
                key={target}
                className={`p-2.5 rounded-lg text-center border ${
                  isMatch
                    ? 'bg-red-950/40 border-red-600'
                    : 'bg-[#080b11] border-[#1e2533] opacity-40'
                }`}
              >
                <div className={`text-base font-bold ${isMatch ? 'text-white' : 'text-gray-500'}`}>
                  {target}
                </div>
                <div className="text-[10px] mt-1 font-semibold">
                  {isMatch ? (
                    <span className="text-emerald-400">Compatible</span>
                  ) : (
                    <span className="text-gray-500">Incompatible</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="p-2 bg-[#090d15] rounded-lg border border-[#1e2533] flex items-center justify-between text-[11px] text-[#8b95a5]">
          <span>
            {selectedGroup === 'O-' ? (
              <strong className="text-red-400">O- Negative is the Universal Red Cell Donor</strong>
            ) : selectedGroup === 'AB+' ? (
              <strong className="text-emerald-400">AB+ Positive is the Universal Recipient</strong>
            ) : (
              <span>
                Matching <strong className="text-white">{selectedGroup}</strong> with{' '}
                <strong className="text-red-400">{activeTargets.length} compatible blood groups</strong>
              </span>
            )}
          </span>
          <span className="text-gray-400 hidden sm:inline">Clinical Grade Cross-Match</span>
        </div>
      </div>
    </div>
  );
};
