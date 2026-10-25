import React from 'react';

export const ServicesView = ({
  onNavigate,
  onRequestBlood,
  onTrackRequest,
  onRegisterDonor,
  onEmergencySOS,
}) => {
  const serviceCards = [
    {
      title: 'Request Blood',
      desc: 'Send an emergency request to hospitals and nearby verified donors without delay.',
      icon: 'fa-solid fa-droplet',
      action: onRequestBlood,
      btnText: 'Broadcast Request',
      badge: 'URGENT',
    },
    {
      title: 'Find Donors',
      desc: 'Connect with compatible, active donors filtered by blood type, city, and readiness.',
      icon: 'fa-solid fa-magnifying-glass',
      action: () => onNavigate('donors'),
      btnText: 'Search Community',
      badge: 'SEARCH',
    },
    {
      title: 'Track Requests',
      desc: 'Stay updated on your blood request status in one unified dashboard in real-time.',
      icon: 'fa-solid fa-route',
      action: onTrackRequest,
      btnText: 'Open Tracker',
      badge: 'REAL-TIME',
    },
    {
      title: 'Donation Camps',
      desc: 'Discover upcoming voluntary donation drives and reserve comfortable slots.',
      icon: 'fa-solid fa-tent',
      action: () => onNavigate('camps'),
      btnText: 'Explore Drives',
      badge: 'DRIVES',
    },
    {
      title: 'Emergency Support',
      desc: '24/7 dedicated hospital hotline, rapid coordination, and immediate guidance.',
      icon: 'fa-solid fa-truck-medical',
      action: onEmergencySOS,
      btnText: '24/7 SOS Desk',
      badge: 'HOTLINE',
      isEmergency: true,
    },
    {
      title: 'Donor Registration',
      desc: 'Join our network of certified blood donors and get notified when someone is in need.',
      icon: 'fa-solid fa-user-plus',
      action: onRegisterDonor,
      btnText: 'Join Network',
      badge: 'JOIN',
    },
  ];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* ================= HERO ================= */}
      <section className="text-center pt-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-3">
          <i className="fa-solid fa-hand-holding-medical"></i> Emergency Portfolio
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          HOW WE CAN <span className="text-red-500">HELP.</span>
        </h1>
        <p className="text-sm text-[#8b95a5]">
          Whether you are ready to donate or searching for urgent medical support, BloodCare gives you a clear place to begin.
        </p>
      </section>

      {/* ================= SERVICE CARDS ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {serviceCards.map((card) => (
          <div
            key={card.title}
            onClick={card.action}
            className={`p-6 bg-[#12161f] border border-[#1e2533] hover:border-gray-600 rounded-xl cursor-pointer flex flex-col justify-between ${
              card.isEmergency ? 'border-red-800' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    card.isEmergency
                      ? 'bg-red-600 text-white'
                      : 'bg-red-600/15 text-red-500'
                  }`}
                >
                  <i className={card.icon}></i>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0b0e14] border border-[#1e2533] text-gray-300">
                  {card.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">
                {card.title}
              </h2>
              <p className="text-xs text-[#8b95a5] leading-relaxed">
                {card.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1e2533] flex items-center justify-between text-xs font-bold text-red-500">
              <span>{card.btnText}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        ))}
      </section>

      {/* ================= WHY CHOOSE BLOODCARE ================= */}
      <section className="bg-[#12161f] rounded-xl p-6 sm:p-8 space-y-6 border border-[#1e2533]">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-1">
            Why Choose BloodCare?
          </h2>
          <p className="text-xs text-[#8b95a5]">
            Making blood donation and blood requests simple for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-[#0b0e14] border border-[#1e2533] rounded-lg text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-red-950 text-red-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <h3 className="text-base font-bold text-white">Quick &amp; Simple</h3>
            <p className="text-xs text-[#8b95a5]">
              Find donors and request blood with zero friction.
            </p>
          </div>

          <div className="p-5 bg-[#0b0e14] border border-[#1e2533] rounded-lg text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-red-950 text-red-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-shield-heart"></i>
            </div>
            <h3 className="text-base font-bold text-white">Trusted Community</h3>
            <p className="text-xs text-[#8b95a5]">
              Direct verification of voluntary donors and hospital requests.
            </p>
          </div>

          <div className="p-5 bg-[#0b0e14] border border-[#1e2533] rounded-lg text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-red-950 text-red-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-heart-pulse"></i>
            </div>
            <h3 className="text-base font-bold text-white">Save Lives</h3>
            <p className="text-xs text-[#8b95a5]">
              Every single donation can give someone another chance at life.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="bg-[#12161f] border border-red-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-xs font-bold text-red-400 tracking-wider uppercase">READY TO HELP?</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white">One donation can change everything.</h2>
          <p className="text-xs text-gray-300">
            Register today and be the reason someone gets another tomorrow.
          </p>
        </div>
        <button
          onClick={onRegisterDonor}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-colors shrink-0 cursor-pointer"
        >
          Register as a Donor
        </button>
      </section>
    </div>
  );
};
