import React, { useState } from 'react';

export const Navbar = ({
  currentView,
  onNavigate,
  onRequestBlood,
  onEmergencySOS,
  onOpenLogin,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
    { id: 'about', label: 'About', icon: 'fa-solid fa-circle-info' },
    { id: 'services', label: 'Services', icon: 'fa-solid fa-hand-holding-medical' },
    { id: 'donors', label: 'Donors', icon: 'fa-solid fa-users' },
    { id: 'camps', label: 'Camps', icon: 'fa-solid fa-tent' },
    { id: 'contact', label: 'Contact', icon: 'fa-solid fa-envelope' },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[70px] flex items-center justify-between border-b border-[#1e2533] bg-[#07090e] px-4 sm:px-8">
      {/* Logo */}
      <div
        onClick={() => handleLinkClick('home')}
        className="flex items-center gap-2.5 text-xl sm:text-2xl font-black cursor-pointer select-none"
      >
        <i className="fa-solid fa-droplet text-red-600"></i>
        <span className="text-white tracking-tight font-extrabold flex items-center">
          Blood<span className="text-red-500">Care</span>
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
        {navLinks.map((link) => {
          const isActive = currentView === link.id;
          return (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Action Buttons */}
      <div className="hidden sm:flex items-center gap-3">

        {/* Emergency SOS */}
        <button
          onClick={onEmergencySOS}
          title="24/7 Emergency Blood Helpline"
          className="px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-800 text-red-400 hover:text-white hover:bg-red-900 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          24/7 SOS
        </button>

        {/* Request Blood Quick Button */}
        <button
          onClick={onRequestBlood}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <i className="fa-solid fa-plus text-[10px]"></i>
          Request Blood
        </button>

        {/* Login or User Profile */}
        {user ? (
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12161f] rounded-lg text-xs border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-bold text-white truncate max-w-[100px]">{user.name}</span>
              {user.bloodGroup && (
                <span className="px-1.5 py-0.5 bg-red-950 text-red-400 font-mono text-[10px] font-bold rounded">
                  {user.bloodGroup}
                </span>
              )}
            </div>
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 text-gray-400 hover:text-red-400 text-xs rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 rounded-lg border border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-bold text-xs tracking-wide transition-colors cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white p-2 text-xl hover:text-red-500 cursor-pointer"
        aria-label="Toggle Navigation Menu"
      >
        <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 right-0 bg-[#07090e] border-b border-[#1e2533] p-5 flex flex-col gap-2.5 md:hidden z-50">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <i className={link.icon}></i>
                  {link.label}
                </span>
                {isActive && <i className="fa-solid fa-chevron-right text-xs"></i>}
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onRequestBlood();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-red-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              <i className="fa-solid fa-plus mr-1.5"></i> Request Blood
            </button>
            <button
              onClick={() => {
                onEmergencySOS();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-red-950/70 border border-red-800 text-red-300 font-bold text-xs cursor-pointer"
            >
              24/7 Emergency Helpline
            </button>
            {user ? (
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg text-xs">
                <span className="font-bold text-white">Signed in as {user.name}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-red-400 font-bold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg border border-red-600 text-white font-bold text-xs cursor-pointer"
              >
                Login to BloodCare
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
