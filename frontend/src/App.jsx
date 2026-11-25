import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Moon,
  Command,
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
  ShieldCheck,
} from "./icons.js";
import { photos, initProperties, initLeads, initDeals, nav } from "./data.js";
import { Dashboard } from "./components/Dashboard.jsx";
import { Page } from "./components/Pages.jsx";
import { Modal } from "./components/Modal.jsx";

export function App() {
  const [page, setPage] = useState("Overview"),
    [mobile, setMobile] = useState(false),
    [theme, setTheme] = useState(() => localStorage.getItem("dw-theme") || "light"),
    [role] = useState("Admin"),
    [properties, setProperties] = useState(
      () =>
        JSON.parse(localStorage.getItem("dw-props") || "null") ||
        initProperties,
    ),
    [leads, setLeads] = useState(
      () => JSON.parse(localStorage.getItem("dw-leads") || "null") || initLeads,
    ),
    [deals, setDeals] = useState(initDeals),
    [search, setSearch] = useState(""),
    [toast, setToast] = useState(""),
    [modal, setModal] = useState(""),
    [notif, setNotif] = useState(false),
    [selectedMonth, setMonth] = useState(10);
  const user = { name: "Jordan Davis", email: "admin@dwellix.com", role };
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("dw-theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("dw-props", JSON.stringify(properties));
    localStorage.setItem("dw-leads", JSON.stringify(leads));
  }, [properties, leads]);
  const note = (t) => {
    setToast(t);
    setTimeout(() => setToast(""), 2600);
  };
  const filtered = properties.filter((p) =>
    (p.name + p.address + p.type + p.status)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const addProperty = (p) => {
    setProperties([
      {
        ...p,
        _id: p._id || Date.now().toString(),
        image: p.image || photos.p5,
        views: 0,
        units: 1,
        activeLeads: 0,
      },
      ...properties,
    ]);
    setModal("");
    note("Property added successfully");
  };
  const addLead = (l) => {
    setLeads([
      {
        ...l,
        _id: l._id || Date.now().toString(),
        date: "Just now",
        avatar: l.name
          .split(" ")
          .map((x) => x[0])
          .join("")
          .slice(0, 2),
      },
      ...leads,
    ]);
    setModal("");
    note("Lead added successfully");
  };
  const actions = {
    setPage,
    note,
    setModal,
    setProperties,
    properties,
    setLeads,
    leads,
    setDeals,
    deals,
    role,
  };
  return (
    <div className="app-shell">
      <aside className={"sidebar " + (mobile ? "open" : "")}>
        <div className="brand">
          <div className="brand-icon">
            <House size={18} strokeWidth={2.4} />
          </div>
          <span>DWELLIX</span>
          <button className="mobile-close" onClick={() => setMobile(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="workspace">
          <div className="workspace-avatar">D</div>
          <div>
            <b>Dwelling Group</b>
            <small>Workspace</small>
          </div>
          <ChevronDown size={15} />
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          {nav.map(([name, Icon]) => (
            <button
              key={name}
              className={"nav-item " + (page === name ? "active" : "")}
              onClick={() => {
                setPage(name);
                setMobile(false);
              }}
            >
              <Icon size={18} />
              <span>{name}</span>
              {name === "Leads" && <i className="nav-count">8</i>}
            </button>
          ))}
        </nav>
        <div className="nav-label second-label">MANAGE</div>
        <nav>
          <button
            className={"nav-item " + (page === "Reports" ? "active" : "")}
            onClick={() => setPage("Reports")}
          >
            <Activity size={18} />
            <span>Reports & analytics</span>
          </button>
          <button
            className={"nav-item " + (page === "Customers" ? "active" : "")}
            onClick={() => setPage("Customers")}
          >
            <Briefcase size={18} />
            <span>Customers</span>
          </button>
          <button
            className={"nav-item " + (page === "Settings" ? "active" : "")}
            onClick={() => setPage("Settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-mark">
              <Sun size={16} />
            </div>
            <b>Make room for more</b>
            <p>Upgrade your workspace to unlock more possibilities.</p>
            <button onClick={() => note("You are on the Studio plan")}>
              Explore plans <ArrowRight size={14} />
            </button>
          </div>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-pressed={theme === "dark"}
            onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button className="hamburger" onClick={() => setMobile(true)}>
            <Menu size={20} />
          </button>
          <div className="breadcrumbs">
            Workspace <span>/</span> <b>{page}</b>
          </div>
          <div className="top-actions">
            <label className="search-global">
              <Search size={16} />
              <input
                placeholder="Search anything..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd>⌘ K</kbd>
            </label>
            <button
              className="icon-btn notif-btn"
              onClick={() => setNotif(!notif)}
            >
              <Bell size={18} />
              <i />
            </button>
            {notif && (
              <div className="notif-pop">
                <b>Notifications</b>
                <p>
                  <span className="dot green" /> New inquiry for The Somerset{" "}
                  <small>12 min ago</small>
                </p>
                <p>
                  <span className="dot amber" /> Follow-up with Olivia Bennett{" "}
                  <small>1 hr ago</small>
                </p>
                <button
                  onClick={() => {
                    setNotif(false);
                    note("All caught up");
                  }}
                >
                  Mark all as read
                </button>
              </div>
            )}
            <div className="divider" />
            <div className="user-menu">
              <div className="avatar">{user.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</div>
              <span>
                <b>{user.name}</b>
                <small>{user.role}</small>
              </span>
              <ChevronDown size={15} />
            </div>
          </div>
        </header>
        <div className="content">
          <AnimatePresence mode="wait">
            {page === "Overview" ? (
              <Dashboard
                key="dashboard"
                {...actions}
                properties={properties}
                leads={leads}
                deals={deals}
                setModal={setModal}
                note={note}
              />
            ) : (
              <Page
                key={page}
                page={page}
                {...actions}
                properties={filtered}
                allProperties={properties}
                leads={leads}
                deals={deals}
                search={search}
                setSearch={setSearch}
                onAddProperty={addProperty}
                onAddLead={addLead}
                setModal={setModal}
                note={note}
              />
            )}
          </AnimatePresence>
          <footer>
            © 2025 Dwellix, Inc. <span>Made for a better way home</span>
          </footer>
        </div>
      </main>
      <AnimatePresence>
        {modal && (
          <Modal
            kind={modal}
            close={() => setModal("")}
            addProperty={addProperty}
            addLead={addLead}
            properties={properties}
            note={note}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            className="toast"
          >
            <CheckCircle2 size={18} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
