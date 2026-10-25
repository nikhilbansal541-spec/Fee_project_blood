import React, { useState } from 'react';

export const ContactView = ({ onEmergencySOS }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMsg({ text: 'Please fill in all fields before sending.', isError: true });
      return;
    }

    const newTicket = 'TIC-' + Math.floor(1000 + Math.random() * 9000);
    setStatusMsg({
      text: `Thanks, ${name}! Your support ticket #${newTicket} has been received. Our coordinator will follow up via email.`,
      isError: false,
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="w-full space-y-8 pb-16">
      {/* ================= HERO ================= */}
      <section className="text-center pt-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold tracking-wider uppercase mb-3">
          <i className="fa-solid fa-headset"></i> 24/7 Support Desk
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Contact <span className="text-red-500">Us.</span>
        </h1>
        <p className="text-sm text-[#8b95a5]">
          Have a question, need urgent help, or want to volunteer? Our emergency support team connects donors, patients, and hospitals around the clock.
        </p>
      </section>

      {/* ================= CONTACT GRID ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Info Cards (4 items) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="tel:+919876543210"
            className="p-5 bg-[#12161f] border border-[#1e2533] hover:border-gray-600 rounded-xl block cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center text-base mb-3">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Phone Helpline</h3>
            <p className="text-xs text-[#8b95a5] font-mono">
              +91 98765 43210
            </p>
          </a>

          <a
            href="mailto:support@bloodcare.com"
            className="p-5 bg-[#12161f] border border-[#1e2533] hover:border-gray-600 rounded-xl block cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center text-base mb-3">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Support Email</h3>
            <p className="text-xs text-[#8b95a5] truncate">
              support@bloodcare.com
            </p>
          </a>

          <div className="p-5 bg-[#12161f] border border-[#1e2533] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center text-base mb-3">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Central Hub</h3>
            <p className="text-xs text-[#8b95a5]">Sector 16, Chandigarh, India</p>
          </div>

          <div className="p-5 bg-[#12161f] border border-[#1e2533] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center text-base mb-3">
              <i className="fa-solid fa-clock"></i>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Support Hours</h3>
            <p className="text-xs text-[#8b95a5]">24/7 for Emergencies</p>
          </div>

          <div className="sm:col-span-2 pt-1">
            <button
              onClick={onEmergencySOS}
              className="w-full py-3 rounded-lg bg-red-950 border border-red-800 text-red-300 hover:text-white hover:bg-red-900 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-truck-medical"></i>
              Open 24/7 Emergency Dispatch
            </button>
          </div>
        </div>

        {/* Message Form Card */}
        <div className="lg:col-span-7 bg-[#12161f] border border-[#1e2533] rounded-xl p-6 sm:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#8b95a5]">
              We respond quickly. For critical blood shortages, please use the 24/7 hotline.
            </p>
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-lg text-xs mb-4 border ${
                statusMsg.isError
                  ? 'bg-red-950 border-red-800 text-red-200'
                  : 'bg-emerald-950 border-emerald-800 text-emerald-200'
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-500 rounded-lg text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-500 rounded-lg text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] uppercase mb-1">
                Message / Inquiry *
              </label>
              <textarea
                rows={4}
                placeholder="How can we help you? Describe hospital requirement or inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-[#06080c] border border-[#1e2533] focus:border-red-500 rounded-lg text-xs text-white outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-paper-plane"></i>
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ================= EMERGENCY STRIP ================= */}
      <section
        onClick={onEmergencySOS}
        className="bg-[#12161f] border border-red-800 rounded-xl p-5 sm:p-6 flex items-center justify-between gap-6 cursor-pointer"
      >
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            Need blood urgently?
          </h3>
          <p className="text-xs text-gray-300">
            Skip the form — call our 24/7 emergency hotline for immediate hospital blood dispatch coordination.
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center text-2xl shrink-0">
          <i className="fa-solid fa-truck-medical"></i>
        </div>
      </section>
    </div>
  );
};
