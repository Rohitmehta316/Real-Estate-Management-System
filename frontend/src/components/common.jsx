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

export function Empty({ icon: Icon, title, action }) {
  return (
    <div className="empty-state">
      <div>
        <Icon size={24} />
      </div>
      <h3>{title}</h3>
      <p>Get started by adding your first record.</p>
      <button className="button primary" onClick={action}>
        <Plus size={16} /> Create new
      </button>
    </div>
  );
}

export function Stat({ icon: Icon, label, value, change, trend, foot, tint }) {
  return (
    <motion.div
      className="card stat-card"
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="stat-top">
        <div className={"stat-icon " + tint}>
          <Icon size={18} />
        </div>
        <span className="stat-period">
          This month <ChevronDown size={12} />
        </span>
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-bottom">
        <b>{value}</b>
        <span className={"change " + trend}>
          {trend === "up" ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}{" "}
          {change}
        </span>
      </div>
      <div className="stat-foot">{foot}</div>
      <svg className="sparkline" viewBox="0 0 80 28" preserveAspectRatio="none">
        <path
          d={
            trend === "up"
              ? "M0 23 C13 22 15 16 24 18 S34 10 44 14 S56 4 64 8 S75 3 80 2"
              : "M0 4 C13 8 18 3 27 9 S37 15 46 10 S59 22 66 17 S74 26 80 25"
          }
          fill="none"
          stroke={trend === "up" ? "#188763" : "#d7a64a"}
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  );
}
export function Reminder({ icon: Icon, title, sub, count, color, onClick }) {
  return (
    <button className="reminder-row" onClick={onClick}>
      <div className={"reminder-icon " + color}>
        <Icon size={15} />
      </div>
      <div className="reminder-copy">
        <b>{title}</b>
        <small>{sub}</small>
      </div>
      <span className="reminder-count">{count}</span>
      <ChevronRight size={15} />
    </button>
  );
}
export function Appointment({ name, title, time, initials, color }) {
  return (
    <div className="appointment-row">
      <div className={"avatar " + color}>{initials}</div>
      <div className="appointment-copy">
        <b>{name}</b>
        <small>{title}</small>
        <span>
          <Clock size={12} /> {time}
        </span>
      </div>
      <button className="appointment-more">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}
