import React, { useState, useEffect } from 'react';
import { INITIAL_DONORS, INITIAL_REQUESTS, INITIAL_CAMPS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { HomeDashboard } from './components/views/HomeDashboard';
import { DonorsView } from './components/views/DonorsView';
import { ServicesView } from './components/views/ServicesView';
import { AboutView } from './components/views/AboutView';
import { ContactView } from './components/views/ContactView';
import { CampsView } from './components/views/CampsView';
import { LoadingScreen } from './components/views/LoadingScreen';
import { RequestBloodModal } from './components/modals/RequestBloodModal';
import { ContactDonorModal } from './components/modals/ContactDonorModal';
import { RegisterDonorModal } from './components/modals/RegisterDonorModal';
import { TrackRequestModal } from './components/modals/TrackRequestModal';
import { CampBookingModal } from './components/modals/CampBookingModal';
import { EmergencySOSModal } from './components/modals/EmergencySOSModal';
import { LoginSignupModal } from './components/modals/LoginSignupModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  const [donors, setDonors] = useState(() => {
    try {
      const saved = localStorage.getItem('bloodcare_donors');
      return saved ? JSON.parse(saved) : INITIAL_DONORS;
    } catch {
      return INITIAL_DONORS;
    }
  });

  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('bloodcare_requests');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [camps, setCamps] = useState(() => {
    try {
      const saved = localStorage.getItem('bloodcare_camps');
      return saved ? JSON.parse(saved) : INITIAL_CAMPS;
    } catch {
      return INITIAL_CAMPS;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bloodcare_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals state
  const [isRequestBloodOpen, setIsRequestBloodOpen] = useState(false);
  const [isTrackRequestOpen, setIsTrackRequestOpen] = useState(false);
  const [isRegisterDonorOpen, setIsRegisterDonorOpen] = useState(false);
  const [isEmergencySOSOpen, setIsEmergencySOSOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [contactDonorTarget, setContactDonorTarget] = useState(null);
  const [bookingCampTarget, setBookingCampTarget] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bloodcare_donors', JSON.stringify(donors));
    } catch {
      // ignore
    }
  }, [donors]);

  useEffect(() => {
    try {
      localStorage.setItem('bloodcare_requests', JSON.stringify(requests));
    } catch {
      // ignore
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem('bloodcare_camps', JSON.stringify(camps));
    } catch {
      // ignore
    }
  }, [camps]);

  // Handlers
  const handleCreateRequest = (data) => {
    const matchingCount = donors.filter(
      (d) => d.bloodGroup === data.bloodGroup && d.available
    ).length;

    const newRequest = {
      ...data,
      id: 'REQ-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: 'Just now',
      status: 'donors_notified',
      matchedDonorsCount: matchingCount,
    };

    setRequests([newRequest, ...requests]);
    showToast(
      `Emergency Request #${newRequest.id} broadcast! ${matchingCount} verified donors alerted in ${newRequest.city}.`,
      'alert'
    );
  };

  const handleRegisterDonor = (data) => {
    const newDonor = {
      ...data,
      id: 'DON-' + (donors.length + 1),
      donationsCount: 1,
      verified: true,
    };

    setDonors([newDonor, ...donors]);
    showToast(`Welcome ${newDonor.name}! You are registered as an active ${newDonor.bloodGroup} donor.`);
  };

  const handleConfirmCampBooking = (campId, slotTime, donorName) => {
    setCamps((prev) =>
      prev.map((c) =>
        c.id === campId ? { ...c, bookedSlots: Math.min(c.bookedSlots + 1, c.totalSlots) } : c
      )
    );
    showToast(`Appointment booked for ${donorName} on ${slotTime}! Entry pass generated.`);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('bloodcare_user');
    } catch {
      // ignore
    }
    setUser(null);
    showToast('You have been signed out.', 'info');
  };

  return (
    <div className="relative min-h-screen bg-[#06080c] text-white flex flex-col font-sans">
      {/* Loading Page Overlay */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Sticky Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRequestBlood={() => setIsRequestBloodOpen(true)}
        onEmergencySOS={() => setIsEmergencySOSOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Static Network Status Ticker */}
      <LiveTicker />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'home' && (
          <HomeDashboard
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestBlood={() => setIsRequestBloodOpen(true)}
            onTrackRequest={() => setIsTrackRequestOpen(true)}
            onRegisterDonor={() => setIsRegisterDonorOpen(true)}
            onSelectCamp={(camp) => setBookingCampTarget(camp)}
            camps={camps}
            donorsCount={donors.length}
          />
        )}

        {currentView === 'donors' && (
          <DonorsView
            donors={donors}
            onContactDonor={(donor) => setContactDonorTarget(donor)}
            onRegisterDonor={() => setIsRegisterDonorOpen(true)}
          />
        )}

        {currentView === 'services' && (
          <ServicesView
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestBlood={() => setIsRequestBloodOpen(true)}
            onTrackRequest={() => setIsTrackRequestOpen(true)}
            onRegisterDonor={() => setIsRegisterDonorOpen(true)}
            onEmergencySOS={() => setIsEmergencySOSOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onRegisterDonor={() => setIsRegisterDonorOpen(true)}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'camps' && (
          <CampsView
            camps={camps}
            onBookCamp={(camp) => setBookingCampTarget(camp)}
          />
        )}

        {currentView === 'contact' && (
          <ContactView onEmergencySOS={() => setIsEmergencySOSOpen(true)} />
        )}
      </main>

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border text-xs sm:text-sm font-semibold bg-[#12161f] ${
              toast.type === 'alert'
                ? 'text-red-400 border-red-600'
                : toast.type === 'info'
                ? 'text-blue-400 border-blue-600'
                : 'text-emerald-400 border-emerald-600'
            }`}
          >
            <i
              className={`fa-solid ${
                toast.type === 'alert'
                  ? 'fa-triangle-exclamation'
                  : toast.type === 'info'
                  ? 'fa-circle-info'
                  : 'fa-circle-check'
              }`}
            ></i>
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-white ml-2 text-xs cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <RequestBloodModal
        isOpen={isRequestBloodOpen}
        onClose={() => setIsRequestBloodOpen(false)}
        onSubmit={handleCreateRequest}
        donors={donors}
      />
      <ContactDonorModal
        donor={contactDonorTarget}
        onClose={() => setContactDonorTarget(null)}
        onSendAlert={(donorName) => {
          showToast(`Emergency alert ping dispatched to ${donorName}'s phone!`, 'alert');
        }}
      />
      <RegisterDonorModal
        isOpen={isRegisterDonorOpen}
        onClose={() => setIsRegisterDonorOpen(false)}
        onRegister={handleRegisterDonor}
      />
      <TrackRequestModal
        isOpen={isTrackRequestOpen}
        onClose={() => setIsTrackRequestOpen(false)}
        requests={requests}
        onOpenNewRequest={() => {
          setIsTrackRequestOpen(false);
          setIsRequestBloodOpen(true);
        }}
      />
      <CampBookingModal
        camp={bookingCampTarget}
        onClose={() => setBookingCampTarget(null)}
        onConfirmBooking={handleConfirmCampBooking}
      />
      <EmergencySOSModal
        isOpen={isEmergencySOSOpen}
        onClose={() => setIsEmergencySOSOpen(false)}
        onRequestBlood={() => setIsRequestBloodOpen(true)}
      />
      <LoginSignupModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(`Logged in successfully as ${loggedUser.name}!`);
        }}
      />

      {/* High-Level Footer */}
      <footer className="relative z-10 w-full border-t border-[#1e2533] bg-[#05070a] py-6 text-center text-xs text-[#8b95a5]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-red-600/20 text-red-500 flex items-center justify-center text-xs">
              <i className="fa-solid fa-droplet"></i>
            </div>
            <span className="text-white font-bold tracking-tight">BloodCare Network</span>
            <span className="text-gray-500">• Verified Donors &amp; Hospitals</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            <button
              onClick={() => setIsLoading(true)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-rotate-right mr-1"></i> Loading Screen
            </button>
            <span className="text-gray-700">•</span>
            <button
              onClick={() => setIsEmergencySOSOpen(true)}
              className="text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              24/7 Hotline: +91 98765 43210
            </button>
            <span className="text-gray-700">•</span>
            <button
              onClick={() => setIsRequestBloodOpen(true)}
              className="hover:text-white cursor-pointer"
            >
              Request Blood
            </button>
            <span className="text-gray-700">•</span>
            <button
              onClick={() => setIsRegisterDonorOpen(true)}
              className="hover:text-white cursor-pointer"
            >
              Become a Donor
            </button>
            <span className="text-gray-700">•</span>
            <button
              onClick={() => setCurrentView('camps')}
              className="hover:text-white cursor-pointer"
            >
              Donation Camps
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
