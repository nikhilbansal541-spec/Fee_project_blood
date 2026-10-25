import React, { useState } from 'react';

export const LoginSignupModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [isLoginTab, setIsLoginTab] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [role, setRole] = useState('donor');
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState(null);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage({ text: 'Please enter both email and password.', isError: true });
      return;
    }

    const loggedUser = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: email.split('@')[0],
      email: email.trim(),
      role: 'donor',
      bloodGroup: 'O+',
      city: 'Chandigarh',
    };

    if (remember) {
      localStorage.setItem('bloodcare_user', JSON.stringify(loggedUser));
    }

    setMessage({ text: `Welcome back, ${loggedUser.name}!`, isError: false });
    setTimeout(() => {
      onLoginSuccess(loggedUser);
      onClose();
    }, 600);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage({ text: 'Please fill in all required fields.', isError: true });
      return;
    }

    const newUser = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: name.trim(),
      email: email.trim(),
      role,
      bloodGroup: role === 'donor' ? bloodGroup : undefined,
      city: 'Chandigarh',
    };

    if (remember) {
      localStorage.setItem('bloodcare_user', JSON.stringify(newUser));
    }

    setMessage({ text: `Account created successfully for ${newUser.name}!`, isError: false });
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleDemoLogin = (type) => {
    const demoUser =
      type === 'donor'
        ? {
            id: 'DON-1',
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            role: 'donor',
            bloodGroup: 'O+',
            city: 'Chandigarh',
            phone: '+91 98140 12345',
          }
        : {
            id: 'REQ-USR-1',
            name: 'Dr. Anita Roy',
            email: 'anita.pgi@hospital.org',
            role: 'requester',
            city: 'Chandigarh',
            phone: '+91 98140 77665',
          };

    if (remember) {
      localStorage.setItem('bloodcare_user', JSON.stringify(demoUser));
    }

    setMessage({ text: `Logged in as ${demoUser.name}`, isError: false });
    setTimeout(() => {
      onLoginSuccess(demoUser);
      onClose();
    }, 400);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setMessage({
      text: `Password reset instructions sent to ${forgotEmail}.`,
      isError: false,
    });
    setIsForgotOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-md bg-[#12161f] border border-[#1e2533] rounded-2xl shadow-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2533] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 text-sm">
              <i className="fa-solid fa-droplet"></i>
            </div>
            <div>
              <h3 className="text-base font-bold">BloodCare Account</h3>
              <p className="text-[11px] text-[#8b95a5]">Secure donor and hospital portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Tab switch */}
        {!isForgotOpen && (
          <div className="flex bg-[#0b0e14] p-1 rounded-lg border border-[#1e2533] mb-4">
            <button
              onClick={() => {
                setIsLoginTab(true);
                setMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                isLoginTab
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLoginTab(false);
                setMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                !isLoginTab
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {message && (
          <div
            className={`p-2.5 rounded-lg text-xs mb-3 border ${
              message.isError
                ? 'bg-red-950 border-red-800 text-red-200'
                : 'bg-emerald-950 border-emerald-800 text-emerald-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {isForgotOpen ? (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
            <h4 className="text-sm font-bold text-white">Reset Your Password</h4>
            <p className="text-xs text-[#8b95a5]">
              Enter your registered email address to receive a recovery link.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
              required
            />
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsForgotOpen(false)}
                className="flex-1 py-2 rounded-lg border border-gray-700 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : isLoginTab ? (
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3 pr-10 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs cursor-pointer"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8b95a5] pt-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 accent-red-600 rounded"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-red-400 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              Login
            </button>

            {/* Quick Demo */}
            <div className="pt-2 border-t border-[#1e2533] flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('donor')}
                className="flex-1 p-2 bg-[#181d29] hover:bg-[#202737] border border-[#1e2533] rounded-lg text-[11px] font-semibold text-gray-300 cursor-pointer"
              >
                Demo Donor
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('requester')}
                className="flex-1 p-2 bg-[#181d29] hover:bg-[#202737] border border-[#1e2533] rounded-lg text-[11px] font-semibold text-gray-300 cursor-pointer"
              >
                Demo Hospital
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Jaswinder Kaur"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#8b95a5] mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 px-2.5 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none cursor-pointer"
                >
                  <option value="donor">Blood Donor</option>
                  <option value="requester">Patient / Hospital</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#8b95a5] mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full h-10 px-2.5 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none cursor-pointer"
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
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b95a5] mb-1">Password</label>
              <input
                type="password"
                placeholder="Choose password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3 bg-[#06080c] border border-[#1e2533] focus:border-red-600 rounded-lg text-xs text-white outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-user-check"></i>
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
