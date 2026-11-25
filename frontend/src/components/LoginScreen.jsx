import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  Handshake,
  CalendarDays,
  Wallet,
  UserRound,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Clock,
  Phone,
  Mail,
  Ellipsis,
  Filter,
  Download,
  SlidersHorizontal,
  House,
  Check,
  Menu,
  X,
  Heart,
  LogOut,
  Activity,
  Briefcase,
  ArrowRight,
  TrendingUp,
  CalendarCheck,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sun,
  Command,
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
  ShieldCheck,
} from "../icons.js";
import { photos } from "../data.js";

export function LoginScreen({ onLogin, onDemo, error, notice }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    await onLogin({ email, password, remember });
    setBusy(false);
  };
  return (
    <main className="auth-screen">
      <section className="auth-showcase">
        <div className="auth-showcase-image" style={{ backgroundImage: `url(${photos.hero})` }} />
        <div className="auth-showcase-shade" />
        <div className="auth-showcase-top">
          <div className="brand auth-brand"><div className="brand-icon"><House size={18} /></div><span>DWELLIX</span></div>
          <span className="auth-top-note"><span className="live-dot" /> PROPERTY, MADE CLEAR</span>
        </div>
        <motion.div className="auth-showcase-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="auth-kicker"><Sparkles size={14} /> A MORE THOUGHTFUL WAY TO MOVE</span>
          <h1>Make every<br />move <em>matter.</em></h1>
          <p>One calm, clear workspace for the people and properties that move your business forward.</p>
          <div className="auth-proof"><div className="auth-proof-avatars"><span>JD</span><span>RF</span><span>KM</span><span>+2k</span></div><div><b>Built around better relationships</b><small>Trusted by teams who care about the details.</small></div></div>
        </motion.div>
        <motion.div className="auth-float-card" initial={{ opacity: 0, y: 12, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.35, duration: 0.65 }}>
          <div className="auth-float-thumb" style={{ backgroundImage: `url(${photos.p2})` }} />
          <div className="auth-float-content"><small>FEATURED THIS WEEK</small><b>Maison Sterling</b><span><MapPin size={12} /> Albany, New York</span></div>
          <div className="auth-float-price">$2.5M <ArrowUpRight size={14} /></div>
        </motion.div>
        <div className="auth-showcase-footer"><span>© 2025 DWELLIX</span><span>BUILT FOR THE WAY YOU WORK</span></div>
      </section>
      <section className="auth-panel">
        <div className="auth-mobile-brand"><div className="brand-icon"><House size={18} /></div><span>DWELLIX</span></div>
        <motion.div className="auth-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }}>
          <div className="auth-card-icon"><LockKeyhole size={19} /></div>
          <div className="auth-overline">YOUR WORKSPACE AWAITS</div>
          <h2>Welcome back</h2>
          <p className="auth-subtitle">Sign in to pick up right where you left off.</p>
          {notice && <div className="auth-notice"><CheckCircle2 size={15} />{notice}</div>}
          {error && <div className="auth-error"><AlertCircle size={15} />{error}</div>}
          <form className="auth-form" onSubmit={submit}>
            <label>Email address<div className="auth-input-wrap"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" autoComplete="username" required /></div></label>
            <label>Password<div className="auth-input-wrap"><LockKeyhole size={16} /><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
            <div className="auth-form-meta"><label className="remember-me"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> <span>Keep me signed in</span></label><button type="button" onClick={() => { setEmail("admin@dwellix.com"); setPassword("Dwellix123!"); }}>Use demo account</button></div>
            <button className="auth-submit" disabled={busy}>{busy ? <span className="auth-spinner" /> : <ShieldCheck size={17} />}{busy ? "Signing you in…" : "Sign in securely"}<ArrowRight size={16} /></button>
          </form>
          <div className="auth-separator"><span />or<span /></div>
          <button className="auth-preview" onClick={onDemo}><Eye size={16} /> Explore a sample workspace <ArrowRight size={15} /></button>
          <div className="auth-security"><ShieldCheck size={14} /> Your workspace is protected with encrypted authentication.</div>
        </motion.div>
        <div className="auth-help">Need a hand? <a href="mailto:support@dwellix.com">Contact your workspace admin</a></div>
      </section>
    </main>
  );
}
