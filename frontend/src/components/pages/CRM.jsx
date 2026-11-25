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

export function CRMSections(props) {
  const { page, properties, allProperties, leads, deals, setPage, setModal, setProperties, setLeads, setDeals, onAddProperty, onAddLead, note, role, filter, setFilter, month, setMonth } = props;
  const isCustomer = role === "Customer";
  return (
    <>
      {page === "Properties" && <>
                <div className="stats-grid compact-stats">
                  <Stat
                    icon={Building2}
                    label="Total listings"
                    value={allProperties.length + 124}
                    change="4.3%"
                    trend="up"
                    foot="vs. last month"
                    tint="sage"
                  />
                  <Stat
                    icon={CheckCircle2}
                    label="Available"
                    value={
                      allProperties.filter((x) => x.status === "Available").length +
                      68
                    }
                    change="6.2%"
                    trend="up"
                    foot="ready to move in"
                    tint="blue"
                  />
                  <Stat
                    icon={Clock}
                    label="In review"
                    value="12"
                    change="2.4%"
                    trend="down"
                    foot="awaiting approval"
                    tint="peach"
                  />
                  <Stat
                    icon={Eye}
                    label="Listing views"
                    value="18.4k"
                    change="12.8%"
                    trend="up"
                    foot="this month"
                    tint="lavender"
                  />
                </div>
                <section className="card module-card">
                  <div className="module-toolbar">
                    <div className="filter-tabs">
                      {["All", "Buy", "Rent", "Commercial"].map((x) => (
                        <button
                          className={filter === x ? "active" : ""}
                          onClick={() => setFilter(x)}
                          key={x}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                    <div className="toolbar-right">
                      <label className="module-search">
                        <Search size={15} />
                        <input
                          placeholder="Search properties"
                          value={window.__dwellixSearch || ""}
                          onChange={(e) => {
                            window.__dwellixSearch = e.target.value;
                            document.dispatchEvent(new Event("dwsearch"));
                          }}
                        />
                      </label>
                      <select onChange={() => note("Sorted by most recent")}>
                        <option>Most recent</option>
                        <option>Price: low to high</option>
                        <option>Price: high to low</option>
                      </select>
                    </div>
                  </div>
                  <div className="property-grid">
                    {properties
                      .filter(
                        (p) =>
                          filter === "All" ||
                          (filter === "Buy"
                            ? p.type !== "Commercial"
                            : filter === "Commercial"
                              ? p.type === "Commercial"
                              : p.status === "Available"),
                      )
                      .map((p) => (
                        <article className="property-card" key={p._id}>
                          <div className="property-image">
                            <img src={p.image} />
                            <span className={"pill " + p.status.toLowerCase()}>
                              {p.status}
                            </span>
                            <button
                              className="heart-btn"
                              onClick={() => note("Property saved")}
                            >
                              <Heart size={17} />
                            </button>
                          </div>
                          <div className="property-info">
                            <span className="property-type">
                              {p.type} <i /> {p.address}
                            </span>
                            <h3>{p.name}</h3>
                            <div className="property-meta">
                              <span>
                                <BedDouble size={15} />
                                {p.beds || 3} beds
                              </span>
                              <span>
                                <Bath size={15} />
                                {p.baths || 2} baths
                              </span>
                              <span>
                                <Maximize size={15} />
                                {(p.area || 1800).toLocaleString()} sqft
                              </span>
                            </div>
                            <div className="property-price">
                              <b>{money(p.price)}</b>
                              <button onClick={() => note(`Opening ${p.name}`)}>
                                <ArrowUpRight size={16} />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                  {properties.length === 0 && (
                    <Empty
                      icon={Building2}
                      title="No properties yet"
                      action={() => setModal("property")}
                    />
                  )}
                  <div className="pagination">
                    <span>
                      Showing <b>{properties.length}</b> of{" "}
                      {allProperties.length + 124} properties
                    </span>
                    <div>
                      <button>‹</button>
                      <button className="current">1</button>
                      <button>2</button>
                      <button>3</button>
                      <button>…</button>
                      <button>13</button>
                      <button>›</button>
                    </div>
                  </div>
                </section>
              </>}
      {page === "Leads" && <section className="card module-card">
                <div className="module-toolbar">
                  <div className="filter-tabs">
                    {["All", "New", "Contacted", "Qualified", "Negotiation"].map(
                      (x) => (
                        <button
                          className={filter === x ? "active" : ""}
                          onClick={() => setFilter(x)}
                          key={x}
                        >
                          {x}
                        </button>
                      ),
                    )}
                  </div>
                  <div className="toolbar-right">
                    <button
                      className="button outline small"
                      onClick={() => note("Lead list exported")}
                    >
                      <Download size={15} /> Export
                    </button>
                    <button
                      className="icon-btn bordered"
                      onClick={() => note("Filters opened")}
                    >
                      <Filter size={16} />
                    </button>
                  </div>
                </div>
                <div className="table-scroll">
                  <table className="wide-table">
                    <thead>
                      <tr>
                        <th>CONTACT</th>
                        <th>PROPERTY INTEREST</th>
                        <th>STATUS</th>
                        <th>ASSIGNED AGENT</th>
                        <th>EST. VALUE</th>
                        <th>LAST ACTIVITY</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {leads
                        .filter((l) => filter === "All" || l.status === filter)
                        .map((l) => (
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
                            <td>
                              <b className="plain-cell">{l.property}</b>
                            </td>
                            <td>
                              <span className={"pill " + l.status.toLowerCase()}>
                                {l.status}
                              </span>
                            </td>
                            <td>{l.agent}</td>
                            <td>
                              <b className="plain-cell">{money(l.value)}</b>
                            </td>
                            <td>{l.date}</td>
                            <td>
                              <button
                                className="row-more"
                                onClick={() => note(`Lead details: ${l.name}`)}
                              >
                                <MoreHorizontal size={17} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {leads.length === 0 && (
                  <Empty
                    icon={Users}
                    title="Your next great connection starts here"
                    action={() => setModal("lead")}
                  />
                )}
                <div className="pagination">
                  <span>{leads.length} leads in your pipeline</span>
                  <div>
                    <button>‹</button>
                    <button className="current">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>›</button>
                  </div>
                </div>
              </section>}
    </>
  );
}
