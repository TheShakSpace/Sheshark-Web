import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { SheSharkRole } from '@/store/useStore';
import { useStore } from '@/store/useStore';
import { 
  LayoutDashboard, 
  Zap, 
  MessageSquare, 
  ShoppingBag, 
  Coins, 
  GraduationCap, 
  Users, 
  User, 
  Car, 
  ShieldAlert,
  Briefcase,
  LogOut,
  Menu,
  X,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

// Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import EnergyHub from '@/pages/EnergyHub';
import AIAssistant from '@/pages/AIAssistant';
import Marketplace from '@/pages/Marketplace';
import MarketplaceProduct from '@/pages/MarketplaceProduct';
import Funding from '@/pages/Funding';
import Learning from '@/pages/Learning';
import LearningCourse from '@/pages/LearningCourse';
import Business from '@/pages/Business';
import Community from '@/pages/Community';
import Taxi from '@/pages/Taxi';
import Safety from '@/pages/Safety';
import Profile from '@/pages/Profile';
import { SheSharkChatbot } from '@/components/SheSharkChatbot';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { InitialLanguageModal } from '@/components/InitialLanguageModal';

const SidebarItem = ({ to, icon: Icon, label, active, isCollapsed }: any) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
      active ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-slate-500 hover:bg-primary/10 hover:text-primary",
      isCollapsed && "justify-center px-0"
    )}
    title={isCollapsed ? label : ""}
  >
    <Icon size={22} className={cn(isCollapsed ? "mx-auto" : "")} />
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </Link>
);

const Navbar = () => {
  const { user } = useStore();
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/icon.png"
            alt={t('nav.brandAlt')}
            className="w-10 h-10 object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-2xl font-bold gradient-text">SheShark</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="#features" className="text-slate-600 hover:text-primary font-medium whitespace-nowrap">
            {t('nav.features')}
          </a>
          <Link to="/marketplace" className="text-slate-600 hover:text-primary font-medium whitespace-nowrap">
            {t('nav.marketplace')}
          </Link>
          <Link to="/community" className="text-slate-600 hover:text-primary font-medium whitespace-nowrap">
            {t('nav.community')}
          </Link>
          <a
            href="/Sheshark.apk"
            download
            className="text-slate-600 hover:text-primary font-medium flex items-center gap-1 whitespace-nowrap"
          >
            <Download size={16} /> {t('nav.downloadApp')}
          </a>
          {user && (
            <Link to="/dashboard" className="text-slate-600 hover:text-primary font-medium whitespace-nowrap">
              {t('nav.dashboard')}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher variant="navbar" />
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/dashboard" className="btn-primary py-2 px-4 sm:px-6 text-sm hidden md:block whitespace-nowrap">
                {t('nav.dashboard')}
              </Link>
              <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
                  alt={t('nav.profileAlt')}
                />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/login" className="text-slate-600 hover:text-primary font-medium text-sm sm:text-base whitespace-nowrap">
                {t('nav.login')}
              </Link>
              <Link to="/login" className="btn-primary py-2 px-4 sm:px-6 text-sm whitespace-nowrap">
                {t('nav.joinNow')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t } = useTranslation();

  if (!user && location.pathname !== '/' && location.pathname !== '/login') {
    return <Navigate to="/" />;
  }

  const menuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('appShell.menu.dashboard') },
    { to: '/energy', icon: Zap, label: t('appShell.menu.energyHub') },
    { to: '/ai', icon: MessageSquare, label: t('appShell.menu.aiAssistant') },
    { to: '/business', icon: Briefcase, label: t('appShell.menu.myBusiness') },
    { to: '/marketplace', icon: ShoppingBag, label: t('appShell.menu.marketplace') },
    { to: '/funding', icon: Coins, label: t('appShell.menu.funding') },
    { to: '/learning', icon: GraduationCap, label: t('appShell.menu.learning') },
    { to: '/community', icon: Users, label: t('appShell.menu.community') },
    { to: '/taxi', icon: Car, label: t('appShell.menu.taxi') },
    { to: '/safety', icon: ShieldAlert, label: t('appShell.menu.safety') },
    { to: '/profile', icon: User, label: t('appShell.menu.profile') },
  ];

  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-mesh">
      {isAuthPage && <Navbar />}
      {!isAuthPage && (
        <div className="flex">
          {/* Sidebar */}
          <aside className={cn(
            "fixed left-0 top-0 h-screen glass border-r border-white/20 transition-all duration-500 z-40",
            isSidebarOpen ? "w-72" : "w-20"
          )}>
            <div className="p-6 flex items-center justify-between gap-2">
              {isSidebarOpen && <span className="text-2xl font-bold gradient-text">SheShark</span>}
              <div className="flex items-center gap-1 ml-auto">
                {isSidebarOpen && <LanguageSwitcher variant="compact" />}
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-primary/10 rounded-xl text-primary"
                  aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                  {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            <nav className="px-4 mt-4 space-y-2">
              {menuItems.map((item) => (
                <SidebarItem 
                  key={item.to} 
                  {...item} 
                  active={
                    location.pathname === item.to ||
                    (item.to === '/marketplace' && location.pathname.startsWith('/marketplace')) ||
                    (item.to === '/learning' && location.pathname.startsWith('/learning'))
                  } 
                  isCollapsed={!isSidebarOpen}
                />
              ))}
            </nav>

            <div className="absolute bottom-8 left-0 right-0 px-4">
              <button 
                onClick={() => auth.signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
              >
                <LogOut size={22} />
                {isSidebarOpen && <span className="font-medium">{t('appShell.logout')}</span>}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className={cn(
            "flex-1 transition-all duration-500 min-h-screen p-8",
            isSidebarOpen ? "ml-72" : "ml-20"
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
      {isAuthPage && children}
      <SheSharkChatbot />
    </div>
  );
};

export default function App() {
  const { setUser } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set store immediately so /dashboard guard doesn’t redirect before Firestore returns.
        const base = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: null as SheSharkRole,
        };
        setUser(base);

        const uid = user.uid;
        void (async () => {
          let role: SheSharkRole = null;
          try {
            const snap = await getDoc(doc(db, 'users', uid));
            if (snap.exists()) {
              const r = snap.data().role;
              role = r === 'business' ? 'business' : r === 'customer' ? 'customer' : null;
            }
          } catch {
            /* Firestore unavailable or rules — role stays null */
          }
          if (auth.currentUser?.uid !== uid) return;
          setUser({ ...base, role });
        })();
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <InitialLanguageModal />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/energy" element={<EnergyHub />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<MarketplaceProduct />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:id" element={<LearningCourse />} />
          <Route path="/business" element={<Business />} />
          <Route path="/community" element={<Community />} />
          <Route path="/taxi" element={<Taxi />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
