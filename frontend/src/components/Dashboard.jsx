import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
import { photos, money } from "../data.js";
import { Stat, Reminder, Appointment } from "./common.jsx";

export function Dashboard({ properties, leads, deals, setPage, setModal, note }) {
  const chart = [
    { m: "Jan", income: 42, expense: 20 },
    { m: "Feb", income: 70, expense: 21 },
    { m: "Mar", income: 66, expense: 22 },
    { m: "Apr", income: 101, expense: 25 },
    { m: "May", income: 103, expense: 34 },
    { m: "Jun", income: 75, expense: 30 },
    { m: "Jul", income: 132, expense: 38 },
    { m: "Aug", income: 105, expense: 29 },
    { m: "Sep", income: 114, expense: 37 },
    { m: "Oct", income: 79, expense: 25 },
    { m: "Nov", income: 62, expense: 31 },
    { m: "Dec", income: 110, expense: 26 },
  ];
  const circumference = 2 * Math.PI * 43;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard"
    >
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="live-dot" /> TUESDAY, NOVEMBER 24, 2025
          </div>
          <h1>
            Good morning, Jordan <span className="wave">✳</span>
          </h1>
          <p>Here’s what’s happening across your portfolio today.</p>
        </div>
        <div className="heading-buttons">
          <button
            className="button outline"
            onClick={() => note("Report downloaded")}
          >
            <Download size={16} /> Export report
          </button>
          <button
            className="button primary"
            onClick={() => setModal("property")}
          >
            <Plus size={17} /> Add property
          </button>
        </div>
      </div>
      <div className="stats-grid">
        <Stat
          icon={Users}
          label="Active leads"
          value={leads.length}
          change="12.8%"
          trend="up"
          foot="vs. last month"
          tint="sage"
        />
        <Stat
          icon={Handshake}
          label="Closed deals"
          value={deals.filter((d) => d.status === "Closed Won").length}
          change="8.2%"
          trend="up"
          foot="vs. last month"
          tint="lavender"
        />
        <Stat
          icon={Building2}
          label="Total properties"
          value={properties.length}
          change="4.3%"
          trend="up"
          foot="vs. last month"
          tint="peach"
        />
        <Stat
          icon={Wallet}
          label="Total revenue"
          value={money(
            deals
              .filter((d) => d.status === "Closed Won")
              .reduce((sum, d) => sum + Number(d.amount || 0), 0),
          )}
          change="2.1%"
          trend="down"
          foot="vs. last month"
          tint="blue"
        />
      </div>
      <div className="dashboard-grid">
        <div className="left-column">
          <section className="card analytics-card">
            <div className="card-head">
              <div>
                <h2>Sales overview</h2>
                <p>Revenue performance throughout the year</p>
              </div>
              <button
                className="select-button"
                onClick={() => note("Showing data for this year")}
              >
                This year <ChevronDown size={14} />
              </button>
            </div>
            <div className="chart-legend">
              <span>
                <i className="legend-green" /> Income
              </span>
              <span>
                <i className="legend-yellow" /> Expenses
              </span>
              <b>
                Income&nbsp; <strong>$6,620.00</strong>
              </b>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chart}
                  margin={{ top: 10, right: 6, bottom: 0, left: -20 }}
                >
                  <defs>
                    <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#218467"
                        stopOpacity={0.16}
                      />
                      <stop offset="100%" stopColor="#218467" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#edf0ec" vertical={false} />
                  <XAxis
                    dataKey="m"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ba39e", fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#a6ada8", fontSize: 10 }}
                    tickFormatter={(v) => `$${v}k`}
                    ticks={[0, 50, 100, 150]}
                  />
                  <Tooltip
                    formatter={(v) => `$${v}k`}
                    contentStyle={{
                      border: "1px solid #e7ebe7",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#208365"
                    strokeWidth={2.5}
                    fill="url(#incomeFill)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#d7dc46"
                    strokeWidth={2}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
          <div className="lower-grid">
            <section className="card goals-card">
              <div className="card-head">
                <div>
                  <h2>Goals</h2>
                  <p>Your yearly target progress</p>
                </div>
                <button
                  className="more-btn"
                  onClick={() => note("Goal settings opened")}
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="goal-content">
                <div className="donut-wrap">
                  <svg viewBox="0 0 104 104">
                    <circle
                      cx="52"
                      cy="52"
                      r="43"
                      fill="none"
                      stroke="#edf0ec"
                      strokeWidth="9"
                    />
                    <circle
                      cx="52"
                      cy="52"
                      r="43"
                      fill="none"
                      stroke="#14845f"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={`${circumference * 0.7} ${circumference}`}
                      transform="rotate(-90 52 52)"
                    />
                    <circle
                      cx="52"
                      cy="52"
                      r="32"
                      fill="none"
                      stroke="#e8e94b"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 32 * 0.34} ${2 * Math.PI * 32}`}
                      transform="rotate(80 52 52)"
                    />
                  </svg>
                  <div className="donut-label">
                    <b>$2.48M</b>
                    <small>of $3.5M</small>
                  </div>
                </div>
                <div className="goal-legend">
                  <div>
                    <i className="legend-green" />
                    <span>Sales target</span>
                    <b>71%</b>
                  </div>
                  <div>
                    <i className="legend-yellow" />
                    <span>New listings</span>
                    <b>34%</b>
                  </div>
                </div>
              </div>
              <div className="goal-foot">
                <div>
                  <small>Jan — Jun</small>
                  <b>$1,240,000</b>
                </div>
                <ArrowRight size={15} />
                <div>
                  <small>Jul — Dec</small>
                  <b>$1,240,000</b>
                </div>
              </div>
            </section>
            <section className="card reminders-card">
              <div className="card-head">
                <div>
                  <h2>Reminders</h2>
                  <p>Stay on top of what matters</p>
                </div>
                <button
                  className="more-btn"
                  onClick={() => setPage("Appointments")}
                >
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <Reminder
                icon={Users}
                title="Follow-ups"
                sub="15 leads need to be followed up"
                count="15"
                color="mint"
                onClick={() => setPage("Leads")}
              />
              <Reminder
                icon={CalendarDays}
                title="Visits"
                sub="2 properties and 3 leads visit today"
                count="3"
                color="blue"
                onClick={() => setPage("Appointments")}
              />
              <Reminder
                icon={Clock}
                title="Expiring listings"
                sub="2 listings are about to expire in 3 days"
                count="2"
                color="yellow"
                onClick={() => setPage("Properties")}
              />
            </section>
          </div>
          <section className="card listing-card">
            <div className="card-head">
              <div>
                <h2>
                  Active listings{" "}
                  <span className="tiny-count">{properties.length}</span>
                </h2>
                <p>Your portfolio, at a glance</p>
              </div>
              <div className="list-actions">
                <button
                  className="mini-search"
                  onClick={() => setPage("Properties")}
                >
                  <Search size={15} /> <span>Search listings</span>
                </button>
                <button
                  className="more-btn"
                  onClick={() => setPage("Properties")}
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>PROPERTY</th>
                    <th>TYPE</th>
                    <th>UNITS</th>
                    <th>PRICE</th>
                    <th>ACTIVE LEADS</th>
                    <th>VIEWS</th>
                    <th>STATUS</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {properties.slice(0, 3).map((p) => (
                    <tr key={p._id} onClick={() => setPage("Properties")}>
                      <td>
                        <div className="property-name">
                          <img src={p.image} />
                          <span>
                            <b>{p.name}</b>
                            <small>{p.address}</small>
                          </span>
                        </div>
                      </td>
                      <td>{p.type}</td>
                      <td>{p.units}</td>
                      <td>{money(p.price)}</td>
                      <td>
                        <div className="lead-avatars">
                          <span>MR</span>
                          <span>AB</span>
                          <small>+{p.activeLeads || 4}</small>
                        </div>
                      </td>
                      <td>{p.views}</td>
                      <td>
                        <span className={"pill " + p.status.toLowerCase()}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="row-more"
                          onClick={(e) => {
                            e.stopPropagation();
                            note(`${p.name} options`);
                          }}
                        >
                          <MoreHorizontal size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="view-all" onClick={() => setPage("Properties")}>
              View all properties <ArrowRight size={15} />
            </button>
          </section>
        </div>
        <div className="right-column">
          <section className="featured-card">
            <div className="featured-image">
              <img src={photos.hero} />
              <span className="featured-tag">
                <span /> Featured property
              </span>
              <button
                className="heart-btn"
                onClick={() => note("Added to favorites")}
              >
                <Heart size={18} />
              </button>
              <div className="image-counter">
                01 <span>/</span> 04{" "}
                <button onClick={() => note("Next property image")}>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
            <div className="featured-body">
              <div className="featured-title">
                <div>
                  <h2>The Somerset</h2>
                  <p>
                    <MapPin size={13} /> New York, Albany
                  </p>
                </div>
                <button
                  className="arrow-circle"
                  onClick={() => setPage("Properties")}
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="featured-price">
                <b>$1,250,000</b>
                <span className="pill available">For sale</span>
              </div>
              <div className="property-specs">
                <span>
                  <BedDouble size={15} /> 6 beds
                </span>
                <span>
                  <Bath size={15} /> 4 baths
                </span>
                <span>
                  <Maximize size={15} /> 3,240 sqft
                </span>
              </div>
              <div className="featured-rule" />
              <div className="deal-label">
                <span>DEAL PROGRESS</span>
                <button onClick={() => setPage("Transactions")}>
                  Details <ArrowRight size={13} />
                </button>
              </div>
              <div className="progress-track">
                <span />
              </div>
              <div className="progress-labels">
                <span>
                  <b>$1.25M</b>
                  <small>Closed deals</small>
                </span>
                <span>
                  <b>$2.4M</b>
                  <small>On progress</small>
                </span>
              </div>
              <div className="featured-footer">
                <span>
                  <Eye size={14} /> 145 views
                </span>
                <span>
                  <Users size={14} /> 42 interested
                </span>
                <button onClick={() => setPage("Properties")}>
                  View listing <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>
          <section className="card appointments-card">
            <div className="card-head">
              <div>
                <h2>Upcoming appointments</h2>
                <p>Your schedule at a glance</p>
              </div>
              <button
                className="more-btn"
                onClick={() => setPage("Appointments")}
              >
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="month-strip">
              <button onClick={() => setMonth((selectedMonth + 11) % 12)}>
                <ChevronLeft size={15} />
              </button>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
                <div className={"day " + (i === 2 ? "selected" : "")} key={d}>
                  <small>{d}</small>
                  <b>{String(24 + i - 2).padStart(2, "0")}</b>
                </div>
              ))}
              <button onClick={() => setMonth((selectedMonth + 1) % 12)}>
                <ChevronRight size={15} />
              </button>
            </div>
            <div className="calendar-tabs">
              <button className="chosen">
                All <i />
              </button>
              <button onClick={() => note("Showing assigned appointments")}>
                Assigned
              </button>
              <button onClick={() => note("Showing your schedule")}>
                My schedule
              </button>
            </div>
            <Appointment
              name="Michael Reynolds"
              title="Property viewing · The Somerset"
              time="10:30 AM — 11:15 AM"
              initials="MR"
              color="sage"
            />
            <Appointment
              name="Olivia Bennett"
              title="Buyer consultation · Video call"
              time="1:00 PM — 1:30 PM"
              initials="OB"
              color="peach"
            />
            <button
              className="view-all"
              onClick={() => setPage("Appointments")}
            >
              See full calendar <ArrowRight size={15} />
            </button>
          </section>
          <section className="insight-card">
            <div className="insight-icon">
              <TrendingUp size={17} />
            </div>
            <div>
              <b>You're on a roll</b>
              <p>
                You've closed <strong>8 deals</strong> this month. That's 2 more
                than October.
              </p>
            </div>
            <button onClick={() => setPage("Reports")}>
              <ArrowUpRight size={16} />
            </button>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
