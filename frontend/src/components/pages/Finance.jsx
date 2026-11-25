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

export function FinanceSections(props) {
  const { page, properties, allProperties, leads, deals, setPage, setModal, setProperties, setLeads, setDeals, onAddProperty, onAddLead, note, role, filter, setFilter, month, setMonth } = props;
  const isCustomer = role === "Customer";
  return (
    <>
      {page === "Transactions" && <>
                <div className="stats-grid compact-stats">
                  <Stat
                    icon={Wallet}
                    label="Total revenue"
                    value="$2.48M"
                    change="12.8%"
                    trend="up"
                    foot="year to date"
                    tint="sage"
                  />
                  <Stat
                    icon={CheckCircle2}
                    label="Closed deals"
                    value="52"
                    change="8.2%"
                    trend="up"
                    foot="this year"
                    tint="blue"
                  />
                  <Stat
                    icon={Clock}
                    label="In progress"
                    value="18"
                    change="2.4%"
                    trend="up"
                    foot="across 6 agents"
                    tint="peach"
                  />
                  <Stat
                    icon={TrendingUp}
                    label="Avg. deal value"
                    value="$476K"
                    change="5.1%"
                    trend="up"
                    foot="vs. last year"
                    tint="lavender"
                  />
                </div>
                <div className="transactions-grid">
                  <section className="card module-card">
                    <div className="card-head">
                      <div>
                        <h2>Recent transactions</h2>
                        <p>A running record of every deal</p>
                      </div>
                      <button
                        className="select-button"
                        onClick={() => note("Showing all transactions")}
                      >
                        All time <ChevronDown size={14} />
                      </button>
                    </div>
                    <div className="table-scroll">
                      <table className="wide-table">
                        <thead>
                          <tr>
                            <th>CLIENT / PROPERTY</th>
                            <th>DATE</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {deals.map((d) => (
                            <tr key={d.id}>
                              <td>
                                <div className="contact-cell">
                                  <div className="avatar sage">{d.avatar}</div>
                                  <span>
                                    <b>{d.client}</b>
                                    <small>{d.property}</small>
                                  </span>
                                </div>
                              </td>
                              <td>{d.date}</td>
                              <td>
                                <b className="plain-cell">{money(d.amount)}</b>
                              </td>
                              <td>
                                <span
                                  className={
                                    "pill " +
                                    (d.status === "Closed Won"
                                      ? "available"
                                      : "pending")
                                  }
                                >
                                  {d.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="row-more"
                                  onClick={() => note("Invoice is ready to download")}
                                >
                                  <Download size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                  <section className="card revenue-card">
                    <div className="card-head">
                      <div>
                        <h2>Revenue summary</h2>
                        <p>Monthly income</p>
                      </div>
                      <button className="more-btn">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <div className="revenue-total">
                      $428,650{" "}
                      <span>
                        <ArrowUpRight size={14} /> 18.4%
                      </span>
                    </div>
                    <div className="revenue-chart">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { m: "Jan", v: 38 },
                            { m: "Feb", v: 54 },
                            { m: "Mar", v: 44 },
                            { m: "Apr", v: 73 },
                            { m: "May", v: 62 },
                            { m: "Jun", v: 89 },
                            { m: "Jul", v: 68 },
                            { m: "Aug", v: 100 },
                            { m: "Sep", v: 76 },
                            { m: "Oct", v: 92 },
                            { m: "Nov", v: 81 },
                            { m: "Dec", v: 106 },
                          ]}
                        >
                          <CartesianGrid stroke="#edf0ec" vertical={false} />
                          <XAxis
                            dataKey="m"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a5ada7", fontSize: 10 }}
                          />
                          <Tooltip
                            contentStyle={{ borderRadius: 10, fontSize: 12 }}
                          />
                          <Bar dataKey="v" fill="#218467" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                </div>
              </>}
      {page === "Reports" && <>
                <div className="stats-grid compact-stats">
                  <Stat
                    icon={Wallet}
                    label="Gross revenue"
                    value="$2.48M"
                    change="12.8%"
                    trend="up"
                    foot="year to date"
                    tint="sage"
                  />
                  <Stat
                    icon={Handshake}
                    label="Conversion rate"
                    value="18.6%"
                    change="2.4%"
                    trend="up"
                    foot="vs. last quarter"
                    tint="blue"
                  />
                  <Stat
                    icon={Users}
                    label="New leads"
                    value="248"
                    change="8.4%"
                    trend="up"
                    foot="this month"
                    tint="peach"
                  />
                  <Stat
                    icon={Building2}
                    label="Avg. time to close"
                    value="32 days"
                    change="5.2%"
                    trend="down"
                    foot="faster than before"
                    tint="lavender"
                  />
                </div>
                <section className="card analytics-card report-chart">
                  <div className="card-head">
                    <div>
                      <h2>Revenue performance</h2>
                      <p>Income and expenses over the last twelve months</p>
                    </div>
                    <button className="select-button">
                      2025 <ChevronDown size={14} />
                    </button>
                  </div>
                  <div className="chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
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
                        ]}
                      >
                        <CartesianGrid stroke="#edf0ec" vertical={false} />
                        <XAxis
                          dataKey="m"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#9ba39e", fontSize: 11 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#a6ada8", fontSize: 10 }}
                          tickFormatter={(v) => `$${v}k`}
                        />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="income"
                          stroke="#208365"
                          strokeWidth={2.5}
                          fill="#20836522"
                        />
                        <Area
                          type="monotone"
                          dataKey="expense"
                          stroke="#d7dc46"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              </>}
    </>
  );
}
