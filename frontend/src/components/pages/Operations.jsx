import { Stat, Empty } from "../common.jsx";
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
} from "../../icons.js";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { money } from "../../data.js";

export function OperationsSections(props) {
  const { page, properties, allProperties, leads, deals, setPage, setModal, setProperties, setLeads, setDeals, onAddProperty, onAddLead, note, role, filter, setFilter, month, setMonth } = props;
  const isCustomer = role === "Customer";
  return (
    <>
      {page === "Appointments" && <div className="card calendar-page">
                <div className="calendar-toolbar">
                  <div>
                    <h2>November 2025</h2>
                    <p>4 scheduled appointments this week</p>
                  </div>
                  <div>
                    <button
                      className="button outline"
                      onClick={() => note("Jumped to today")}
                    >
                      Today
                    </button>
                    <button
                      className="icon-btn bordered"
                      onClick={() => setMonth((month + 11) % 12)}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      className="icon-btn bordered"
                      onClick={() => setMonth((month + 1) % 12)}
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button className="select-button">
                      Month <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <div className="calendar-grid">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div className="calendar-day-name" key={d}>
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      className={"calendar-cell " + (i === 16 ? "today" : "")}
                      key={i}
                    >
                      <span>{i < 5 ? 26 + i : i - 4}</span>
                      {i === 16 && (
                        <div className="cal-event green-event">
                          <b>10:30</b> Michael · Viewing
                        </div>
                      )}
                      {i === 19 && (
                        <div className="cal-event yellow-event">
                          <b>1:00</b> Olivia · Consultation
                        </div>
                      )}
                      {i === 22 && (
                        <div className="cal-event blue-event">
                          <b>3:30</b> James · Follow-up
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>}
      {page === "Agents" && <div className="agents-grid">
                {[
                  [
                    "Robert Fox",
                    "Senior property consultant",
                    "18 listings · 24 leads",
                    "RF",
                    "$1.24M",
                  ],
                  [
                    "Kathryn Murphy",
                    "Residential sales agent",
                    "12 listings · 18 leads",
                    "KM",
                    "$892K",
                  ],
                  [
                    "Darlene Robertson",
                    "Commercial specialist",
                    "9 listings · 12 leads",
                    "DR",
                    "$640K",
                  ],
                  [
                    "Cody Fisher",
                    "Property consultant",
                    "11 listings · 9 leads",
                    "CF",
                    "$520K",
                  ],
                ].map((a, i) => (
                  <section className="card agent-card" key={a[0]}>
                    <div className="agent-menu">
                      <button
                        className="more-btn"
                        onClick={() => note(`${a[0]} profile options`)}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <div className={"agent-photo color-" + i}>{a[3]}</div>
                    <h3>{a[0]}</h3>
                    <p>{a[1]}</p>
                    <span className="agent-status">
                      <i /> Active this week
                    </span>
                    <div className="agent-stats">
                      <span>
                        <b>{a[4]}</b>
                        <small>Closed volume</small>
                      </span>
                      <span>
                        <b>{18 - i * 2}</b>
                        <small>Active leads</small>
                      </span>
                      <span>
                        <b>{4.9 - i * 0.1}</b>
                        <small>Rating</small>
                      </span>
                    </div>
                    <div className="agent-foot">
                      <span>
                        <Building2 size={14} />
                        {a[2]}
                      </span>
                      <button onClick={() => note(`Contacting ${a[0]}`)}>
                        <Mail size={15} />
                      </button>
                    </div>
                  </section>
                ))}
              </div>}
      {page === "Customers" && <section className="card module-card">
                <div className="card-head">
                  <div>
                    <h2>Customer directory</h2>
                    <p>People and relationships that move your business</p>
                  </div>
                  <button className="button primary" onClick={() => setModal("lead")}>
                    <Plus size={16} /> Add customer
                  </button>
                </div>
                <div className="table-scroll">
                  <table className="wide-table">
                    <thead>
                      <tr>
                        <th>CUSTOMER</th>
                        <th>INTERESTED IN</th>
                        <th>STATUS</th>
                        <th>ASSIGNED TO</th>
                        <th>LAST CONTACT</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l._id}>
                          <td>
                            <div className="contact-cell">
                              <div className="avatar sage">{l.avatar}</div>
                              <span>
                                <b>{l.name}</b>
                                <small>{l.email}</small>
                              </span>
                            </div>
                          </td>
                          <td>{l.property}</td>
                          <td>
                            <span className={"pill " + l.status.toLowerCase()}>
                              {l.status}
                            </span>
                          </td>
                          <td>{l.agent}</td>
                          <td>{l.date}</td>
                          <td>
                            <button
                              className="row-more"
                              onClick={() => note(`Opening ${l.name}`)}
                            >
                              <ArrowUpRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>}
      {page === "Settings" && <div className="settings-layout">
                <section className="card settings-nav">
                  <h3>Settings</h3>
                  {[
                    "Profile",
                    "Workspace",
                    "Notifications",
                    "Security",
                    "Billing",
                  ].map((x, i) => (
                    <button
                      className={i === 0 ? "current" : ""}
                      key={x}
                      onClick={() => note(`${x} settings selected`)}
                    >
                      {x}
                    </button>
                  ))}
                </section>
                <section className="card settings-form">
                  <h2>Profile information</h2>
                  <p>Manage your personal details and preferences.</p>
                  <div className="setting-person">
                    <div className="avatar avatar-dark">JD</div>
                    <div>
                      <b>Jordan Davis</b>
                      <small>JPG, GIF or PNG. 2MB max.</small>
                    </div>
                    <button
                      className="button outline small"
                      onClick={() => note("Choose a profile image")}
                    >
                      Upload photo
                    </button>
                  </div>
                  <div className="form-grid">
                    <label>
                      First name
                      <input defaultValue="Jordan" />
                    </label>
                    <label>
                      Last name
                      <input defaultValue="Davis" />
                    </label>
                    <label>
                      Email address
                      <input defaultValue="jordan@dwellix.com" />
                    </label>
                    <label>
                      Phone number
                      <input defaultValue="+1 (415) 555-0148" />
                    </label>
                  </div>
                  <button
                    className="button primary"
                    onClick={() => note("Profile changes saved")}
                  >
                    Save changes
                  </button>
                </section>
              </div>}
    </>
  );
}
