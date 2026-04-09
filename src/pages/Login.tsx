import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { GlassCard, Button } from '@/components/UI';
import { Mail, Lock, ArrowRight, Smartphone, KeyRound, UserCircle, Building2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useStore } from '@/store/useStore';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Shown in UI and accepted after “Send OTP” until Firebase SMS/email OTP is wired. */
const DEMO_OTP = '123456';

type LoginMethod = 'email' | 'mobile';
type Role = 'customer' | 'business';

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 15);
}

function translateAuthError(err: unknown, t: TFunction, mode: 'signin' | 'signup'): string {
  const code =
    err && typeof err === 'object' && 'code' in err
      ? String((err as { code?: string }).code)
      : '';
  switch (code) {
    case 'auth/invalid-email':
      return t('login.errors.validEmail');
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return t('login.errors.badCredentials');
    case 'auth/email-already-in-use':
      return t('login.errors.emailInUse');
    case 'auth/weak-password':
      return t('login.errors.weakPassword');
    case 'auth/network-request-failed':
      return t('login.errors.network');
    default:
      return mode === 'signin' ? t('login.errors.signInFailed') : t('login.errors.signUpFailed');
  }
}

const Login = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [role, setRole] = useState<Role>('customer');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [pendingOtp, setPendingOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useStore((s) => s.setUser);

  const toFirebaseEmail = (method: LoginMethod, em: string, mob: string): string => {
    if (method === 'email') {
      const e = em.trim().toLowerCase();
      if (!e || !e.includes('@')) throw new Error(t('login.errors.validEmail'));
      return e;
    }
    const digits = normalizePhone(mob);
    if (digits.length < 10) throw new Error(t('login.errors.validMobile'));
    return `phone_${digits}@sheshark.app`;
  };

  const contactValid =
    loginMethod === 'email'
      ? email.trim().length > 3 && email.includes('@')
      : normalizePhone(mobile).length >= 10;

  const sendOtp = async () => {
    setError('');
    if (!contactValid) {
      setError(loginMethod === 'email' ? t('login.errors.contactEmail') : t('login.errors.contactMobile'));
      return;
    }
    setOtpSending(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      setPendingOtp(DEMO_OTP);
      setOtpSent(true);
      setOtp('');
    } finally {
      setOtpSending(false);
    }
  };

  const persistProfile = async (uid: string, firebaseEmail: string) => {
    const digits = normalizePhone(mobile);
    await setDoc(
      doc(db, 'users', uid),
      {
        role,
        loginMethod,
        displayEmail: loginMethod === 'email' ? email.trim().toLowerCase() : null,
        phone: loginMethod === 'mobile' ? digits : null,
        authEmail: firebaseEmail,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let authEmail: string;
    try {
      authEmail = toFirebaseEmail(loginMethod, email, mobile);
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : t('login.errors.signInFailed'));
      return;
    }
    try {
      const cred = await signInWithEmailAndPassword(auth, authEmail, password);
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        role: null,
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(translateAuthError(err, t, 'signin'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otpSent || pendingOtp === null) {
      setError(t('login.errors.otpFlow'));
      return;
    }
    if (otp.trim() !== pendingOtp) {
      setError(t('login.errors.otpInvalid'));
      return;
    }
    if (password.length < 6) {
      setError(t('login.errors.passwordShort'));
      return;
    }
    setLoading(true);
    let authEmail: string;
    try {
      authEmail = toFirebaseEmail(loginMethod, email, mobile);
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : t('login.errors.signUpFailed'));
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, authEmail, password);
      try {
        await persistProfile(cred.user.uid, authEmail);
      } catch (firestoreErr) {
        console.warn('[signup] Firestore profile save failed (check rules):', firestoreErr);
      }
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        role,
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(translateAuthError(err, t, 'signup'));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (login: boolean) => {
    setIsLogin(login);
    setError('');
    setOtp('');
    setOtpSent(false);
    setPendingOtp(null);
  };

  const MethodToggle = () => (
    <div className="space-y-2">
      <span className="text-sm font-semibold text-slate-600 ml-1">{t('login.loginMethod')}</span>
      <div className="flex gap-2 p-1 glass rounded-2xl">
        <button
          type="button"
          onClick={() => setLoginMethod('email')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all',
            loginMethod === 'email' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-600 hover:bg-white/50'
          )}
        >
          <Mail size={18} /> {t('login.email')}
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod('mobile')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all',
            loginMethod === 'mobile' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-600 hover:bg-white/50'
          )}
        >
          <Smartphone size={18} /> {t('login.mobileNo')}
        </button>
      </div>
    </div>
  );

  const RoleToggle = () => (
    <div className="space-y-2">
      <span className="text-sm font-semibold text-slate-600 ml-1">{t('login.selectRole')}</span>
      <div className="flex gap-2 p-1 glass rounded-2xl">
        <button
          type="button"
          onClick={() => setRole('customer')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all',
            role === 'customer' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-600 hover:bg-white/50'
          )}
        >
          <UserCircle size={18} /> {t('login.customer')}
        </button>
        <button
          type="button"
          onClick={() => setRole('business')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all',
            role === 'business' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-600 hover:bg-white/50'
          )}
        >
          <Building2 size={18} /> {t('login.businessOwner')}
        </button>
      </div>
    </div>
  );

  const demoOtpBodyHtml = t('login.demoOtpBody');

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-mesh">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold gradient-text">SheShark</span>
          </Link>
          <h1 className="text-3xl font-bold">{isLogin ? t('login.welcomeBack') : t('login.createAccount')}</h1>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-sm mx-auto">
            {isLogin ? t('login.subtitleLogin') : t('login.subtitleSignup')}
          </p>
        </div>

        <GlassCard className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-2xl font-medium border border-red-100">
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <MethodToggle />

              {loginMethod === 'email' ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">{t('login.emailAddress')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('login.placeholders.email')}
                      autoComplete="email"
                      className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">{t('login.mobileNo')}</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder={t('login.placeholders.mobile')}
                      autoComplete="tel"
                      className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">{t('login.password')}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('login.placeholders.password')}
                    autoComplete="current-password"
                    className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="text-right">
                <button type="button" className="text-sm font-bold text-primary hover:underline">
                  {t('login.forgotPassword')}
                </button>
              </div>

              <Button type="submit" loading={loading} className="w-full py-4 text-lg">
                {t('login.signIn')} <ArrowRight size={20} />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <MethodToggle />
              <RoleToggle />

              {loginMethod === 'email' ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">{t('login.emailAddress')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('login.placeholders.email')}
                      autoComplete="email"
                      className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">{t('login.mobileNo')}</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder={t('login.placeholders.mobile')}
                      autoComplete="tel"
                      className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">{t('login.password')}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('login.placeholders.password')}
                    autoComplete="new-password"
                    className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <p className="text-xs text-slate-400 ml-1">{t('login.atLeast6')}</p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 space-y-1">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">{t('login.demoOtpTitle')}</p>
                <p className="text-sm text-amber-900" dangerouslySetInnerHTML={{ __html: demoOtpBodyHtml }} />
                <p className="text-2xl font-black tracking-[0.35em] text-primary font-mono">{DEMO_OTP}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">{t('login.otpLabel')}</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={t('login.placeholders.otp')}
                    className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono tracking-widest"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  loading={otpSending}
                  disabled={!contactValid}
                  className="flex-1 py-3"
                  onClick={sendOtp}
                >
                  {t('login.sendOtp')}
                </Button>
                <Button type="submit" loading={loading} className="flex-[1.4] py-3">
                  {t('login.signUpOtp')} <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          )}

          <div className="text-center pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => toggleMode(!isLogin)}
              className="text-sm font-bold text-slate-500 hover:text-primary transition-colors"
            >
              {isLogin ? t('login.signUpSwitch') : t('login.signInSwitch')}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Login;
