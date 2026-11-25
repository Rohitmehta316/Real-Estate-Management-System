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

export function Modal({
  kind,
  close,
  addProperty,
  addLead,
  properties,
  note,
}) {
  const [busy, setBusy] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    const d = Object.fromEntries(new FormData(e.currentTarget));
    setTimeout(() => {
      if (kind === "property")
        addProperty({
          name: d.name,
          type: d.type,
          address: d.address,
          price: Number(d.price),
          beds: Number(d.beds),
          baths: Number(d.baths),
          area: Number(d.area),
          status: "Pending",
          image: photos.p5,
        });
      else if (kind === "lead")
        addLead({
          name: d.name,
          email: d.email,
          phone: d.phone,
          property: d.property || "Not specified",
          status: "New",
          agent: "Jordan Davis",
          value: Number(d.value) || 0,
        });
      else {
        close();
        note("Appointment scheduled successfully");
      }
      setBusy(false);
    }, 350);
  };
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
    >
      <motion.div
        className="modal"
        initial={{ y: 16, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 12, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">DWELLIX WORKSPACE</span>
            <h2>
              {kind === "property"
                ? "Add a property"
                : kind === "lead"
                  ? "Create a new lead"
                  : kind === "appointment"
                    ? "Schedule an appointment"
                    : "Your account"}
            </h2>
            <p>
              {kind === "property"
                ? "Bring a new opportunity into your portfolio."
                : kind === "lead"
                  ? "Start with the details you know."
                  : kind === "appointment"
                    ? "Plan a thoughtful client experience."
                    : "Add details to your workspace."}
            </p>
          </div>
          <button className="icon-btn bordered" onClick={close}>
            <X size={17} />
          </button>
        </div>
        <form onSubmit={submit}>
            {kind === "property" ? (
              <>
                <label>
                  Property name
                  <input name="name" placeholder="e.g. The Somerset" required />
                </label>
                <label>
                  Property type
                  <select name="type">
                    <option>House</option>
                    <option>Villa</option>
                    <option>Apartment</option>
                    <option>Commercial</option>
                  </select>
                </label>
                <label>
                  Address
                  <input name="address" placeholder="Street, city" required />
                </label>
                <div className="form-grid">
                  <label>
                    Asking price
                    <input
                      name="price"
                      type="number"
                      placeholder="1250000"
                      required
                    />
                  </label>
                  <label>
                    Bedrooms
                    <input name="beds" type="number" placeholder="3" />
                  </label>
                  <label>
                    Bathrooms
                    <input name="baths" type="number" placeholder="2" />
                  </label>
                  <label>
                    Area (sqft)
                    <input name="area" type="number" placeholder="1800" />
                  </label>
                </div>
                <label className="upload-box">
                  <Upload size={18} />
                  <span>
                    Upload property images <small>PNG, JPG up to 10MB</small>
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={() => note("Image selected for upload")}
                  />
                </label>
              </>
            ) : kind === "lead" ? (
              <>
                <label>
                  Full name
                  <input name="name" placeholder="Client name" required />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    required
                  />
                </label>
                <label>
                  Phone number
                  <input name="phone" placeholder="+1 (555) 000-0000" />
                </label>
                <label>
                  Property of interest
                  <select name="property">
                    <option value="">Select a property</option>
                    {properties.map((p) => (
                      <option key={p._id}>{p.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Estimated budget
                  <input name="value" type="number" placeholder="500000" />
                </label>
              </>
            ) : (
              <>
                <label>
                  Client name
                  <input name="name" placeholder="Client name" required />
                </label>
                <label>
                  Property
                  <select name="property">
                    {properties.map((p) => (
                      <option key={p._id}>{p.name}</option>
                    ))}
                  </select>
                </label>
                <div className="form-grid">
                  <label>
                    Date
                    <input name="date" type="date" required />
                  </label>
                  <label>
                    Time
                    <input name="time" type="time" required />
                  </label>
                </div>
                <label>
                  Appointment type
                  <select name="type">
                    <option>Property viewing</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                  </select>
                </label>
              </>
            )}
            <div className="modal-actions">
              <button type="button" className="button outline" onClick={close}>
                Cancel
              </button>
              <button className="button primary" disabled={busy}>
                {busy
                  ? "Saving…"
                  : kind === "property"
                    ? "Add property"
                    : kind === "lead"
                      ? "Create lead"
                      : "Schedule appointment"}{" "}
                <ArrowRight size={15} />
              </button>
            </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
