import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/lib/useMediaQuery';
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
  Download,
  ChevronsLeft,
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

const SidebarItem = ({
  to,
  icon: Icon,
  label,
  active,
  isCollapsed,
  onNavigate,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  isCollapsed: boolean;
  onNavigate?: () => void;
}) => (
  <Link
    to={to}
    onClick={onNavigate}
    className={cn(
      'flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300',
      active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-primary/10 hover:text-primary',
      isCollapsed && 'justify-center px-0',
    )}
    title={isCollapsed ? label : undefined}
  >
    <Icon size={22} className={cn(isCollapsed ? 'mx-auto' : '')} />
    {!isCollapsed && <span className="min-w-0 flex-1 truncate font-medium">{label}</span>}
  </Link>
);

const Navbar = () => {
  const { user } = useStore();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const mobileLinkClass =
    'flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors';

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:py-4">
      <div
        className={cn(
          'mx-auto flex items-center justify-between gap-2 rounded-full glass px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3',
          i18n.language === 'hi' ? 'max-w-[90rem]' : 'max-w-7xl',
        )}
      >
        <Link to="/" className="flex min-w-0 flex-1 shrink items-center gap-2 md:flex-initial" onClick={closeMobile}>
          <img
            src="/icon.png"
            alt={t('nav.brandAlt')}
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            referrerPolicy="no-referrer"
          />
          <span className="truncate text-lg font-bold gradient-text sm:text-2xl">{t('nav.brandWordmark')}</span>
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <LanguageSwitcher variant="navbar" />
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="btn-primary py-2 px-4 sm:px-6 text-sm hidden md:inline-flex whitespace-nowrap items-center justify-center"
              >
                {t('nav.dashboard')}
              </Link>
              <Link
                to="/profile"
                className="hidden sm:block w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0"
              >
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
                  alt={t('nav.profileAlt')}
                  className="h-full w-full object-cover"
                />
              </Link>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <Link to="/login" className="text-slate-600 hover:text-primary font-medium text-sm sm:text-base whitespace-nowrap">
                {t('nav.login')}
              </Link>
              <Link to="/login" className="btn-primary py-2 px-4 sm:px-6 text-sm whitespace-nowrap">
                {t('nav.joinNow')}
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden rounded-xl p-2 text-primary hover:bg-primary/10"
            aria-label={t('appShell.openMenu')}
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[60] bg-slate-950/45 backdrop-blur-[1px] md:hidden"
              aria-label={t('appShell.closeMenu')}
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(20rem,92vw)] flex-col border-l border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl md:hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <span className="truncate font-bold gradient-text">{t('nav.brandWordmark')}</span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
                  aria-label={t('appShell.closeMenu')}
                >
                  <X size={22} />
                </button>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3">
                <a href="#features" className={mobileLinkClass} onClick={closeMobile}>
                  {t('nav.features')}
                </a>
                <Link to="/marketplace" className={mobileLinkClass} onClick={closeMobile}>
                  {t('nav.marketplace')}
                </Link>
                <Link to="/community" className={mobileLinkClass} onClick={closeMobile}>
                  {t('nav.community')}
                </Link>
                <a href="/Sheshark.apk" download className={mobileLinkClass} onClick={closeMobile}>
                  <Download size={20} className="shrink-0 text-primary" /> {t('nav.downloadApp')}
                </a>
                {user && (
                  <>
                    <Link to="/dashboard" className={mobileLinkClass} onClick={closeMobile}>
                      {t('nav.dashboard')}
                    </Link>
                    <Link to="/profile" className={mobileLinkClass} onClick={closeMobile}>
                      {t('appShell.menu.profile')}
                    </Link>
                  </>
                )}
              </div>
              {!user && (
                <div className="border-t border-slate-100 p-4 space-y-3">
                  <Link to="/login" className="btn-primary flex w-full justify-center py-3 text-sm" onClick={closeMobile}>
                    {t('nav.joinNow')}
                  </Link>
                  <Link
                    to="/login"
                    className="flex w-full justify-center rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    onClick={closeMobile}
                  >
                    {t('nav.login')}
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useStore();
  const isMdUp = useMediaQuery('(min-width: 768px)');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { t } = useTranslation();

  if (!user && location.pathname !== '/' && location.pathname !== '/login') {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMdUp) setMobileDrawerOpen(false);
  }, [isMdUp]);

  useEffect(() => {
    if (!isMdUp && mobileDrawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    document.body.style.overflow = '';
    return undefined;
  }, [isMdUp, mobileDrawerOpen]);

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
  const navCollapsedDesktop = isMdUp && !sidebarExpanded;
  const showSidebarLabels = !navCollapsedDesktop;

  const closeMobileMenu = () => setMobileDrawerOpen(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-mesh">
      {isAuthPage && <Navbar />}
      {!isAuthPage && (
        <>
          {!isMdUp && (
            <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between gap-2 border-b border-white/25 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-lg md:hidden">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="rounded-xl p-2 text-primary hover:bg-primary/10"
                aria-label={t('appShell.openMenu')}
              >
                <Menu size={22} />
              </button>
              <Link to="/dashboard" className="min-w-0 truncate text-center text-lg font-bold gradient-text">
                {t('nav.brandWordmark')}
              </Link>
              <Link
                to="/profile"
                className="shrink-0 rounded-full p-2 text-slate-600 hover:bg-primary/10 hover:text-primary"
                aria-label={t('nav.profileAlt')}
              >
                <User size={22} />
              </Link>
            </header>
          )}

          {!isMdUp && mobileDrawerOpen && (
            <button
              type="button"
              className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[1px] md:hidden"
              aria-label={t('appShell.closeMenu')}
              onClick={closeMobileMenu}
            />
          )}

          <div className="flex min-h-screen">
            <aside
              className={cn(
                'fixed inset-y-0 left-0 z-50 flex h-screen min-h-0 w-[min(18rem,88vw)] flex-col border-r border-white/20 glass shadow-xl transition-transform duration-300 ease-out md:w-72 md:translate-x-0 md:shadow-none',
                !isMdUp && !mobileDrawerOpen && '-translate-x-full',
                !isMdUp && mobileDrawerOpen && 'translate-x-0',
                isMdUp && navCollapsedDesktop && 'md:w-20',
                isMdUp && sidebarExpanded && 'md:w-72',
              )}
            >
              <div className="flex shrink-0 items-center justify-between gap-2 p-4 pt-[max(1rem,env(safe-area-inset-top))] md:p-6">
                {showSidebarLabels && (
                  <span className="min-w-0 truncate text-xl font-bold gradient-text">{t('nav.brandWordmark')}</span>
                )}
                <div className={cn('flex items-center gap-1', showSidebarLabels ? 'ml-auto' : 'mx-auto md:w-full md:justify-center')}>
                  {showSidebarLabels && <LanguageSwitcher variant="compact" />}
                  <button
                    type="button"
                    onClick={() => {
                      if (isMdUp) setSidebarExpanded((e) => !e);
                      else closeMobileMenu();
                    }}
                    className="rounded-xl p-2 text-primary hover:bg-primary/10"
                    aria-label={
                      isMdUp
                        ? sidebarExpanded
                          ? t('appShell.collapseSidebar')
                          : t('appShell.expandSidebar')
                        : t('appShell.closeMenu')
                    }
                  >
                    {!isMdUp ? <X size={20} /> : sidebarExpanded ? <ChevronsLeft size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>

              <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 pb-4 md:space-y-2 md:px-4">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.to}
                    {...item}
                    active={
                      location.pathname === item.to ||
                      (item.to === '/marketplace' && location.pathname.startsWith('/marketplace')) ||
                      (item.to === '/learning' && location.pathname.startsWith('/learning'))
                    }
                    isCollapsed={navCollapsedDesktop}
                    onNavigate={!isMdUp ? closeMobileMenu : undefined}
                  />
                ))}
              </nav>

              <div className="shrink-0 border-t border-white/15 p-3 md:p-4">
                <button
                  type="button"
                  onClick={() => auth.signOut()}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-slate-500 transition-all hover:bg-red-50 hover:text-red-500',
                    navCollapsedDesktop && 'justify-center px-0',
                  )}
                  title={navCollapsedDesktop ? t('appShell.logout') : undefined}
                >
                  <LogOut size={22} className="shrink-0" />
                  {showSidebarLabels && <span className="min-w-0 truncate font-medium">{t('appShell.logout')}</span>}
                </button>
              </div>
            </aside>

            <main
              className={cn(
                'min-h-screen min-w-0 flex-1 overflow-x-hidden',
                'px-4 pb-12 pt-[calc(3.5rem+env(safe-area-inset-top))] sm:px-5',
                'md:px-6 md:py-8 md:pt-8 lg:px-8',
                isMdUp && sidebarExpanded && 'md:ml-72',
                isMdUp && navCollapsedDesktop && 'md:ml-20',
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-0"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </>
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
