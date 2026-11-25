import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, SlidersHorizontal, Download } from "../icons.js";
import { CRMSections } from "./pages/CRM.jsx";
import { FinanceSections } from "./pages/Finance.jsx";
import { OperationsSections } from "./pages/Operations.jsx";

export function Page({ page, properties, allProperties, leads, deals, setPage, setModal, setProperties, setLeads, setDeals, onAddProperty, onAddLead, note, role }) {
  const [filter, setFilter] = useState("All");
  const [month, setMonth] = useState(10);
  const titleMap = {
    Properties: ["Property management", "Manage your portfolio, listings and approvals."],
    Leads: ["Lead management", "Build relationships and move every opportunity forward."],
    Transactions: ["Transactions", "Track deal progress, payments and revenue."],
    Appointments: ["Appointments", "Keep every visit and conversation on schedule."],
    Agents: ["Your team", "Meet the people making every move matter."],
    Customers: ["Customers", "A thoughtful view of every client relationship."],
    Reports: ["Reports & analytics", "A clear picture of your real estate performance."],
    Settings: ["Workspace settings", "Make DWELLIX work the way you do."],
  };
  const [title, subtitle] = titleMap[page] || ["Workspace", ""];
  const sectionProps = { page, properties, allProperties, leads, deals, setPage, setModal, setProperties, setLeads, setDeals, onAddProperty, onAddLead, note, role, filter, setFilter, month, setMonth };
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="subpage">
      <div className="page-heading">
        <div><div className="eyebrow"><span className="live-dot" /> DWELLIX WORKSPACE / {page.toUpperCase()}</div><h1>{title}</h1><p>{subtitle}</p></div>
        <div className="heading-buttons">
          {page === "Properties" && <><button className="button outline" onClick={() => note("Filters are up to date")}><SlidersHorizontal size={16} /> Filters</button><button className="button primary" onClick={() => setModal("property")}><Plus size={17} /> Add property</button></>}
          {page === "Leads" && <button className="button primary" onClick={() => setModal("lead")}><Plus size={17} /> Add lead</button>}
          {page === "Appointments" && <button className="button primary" onClick={() => setModal("appointment")}><Plus size={17} /> Schedule visit</button>}
          {page === "Transactions" && <button className="button outline" onClick={() => note("Revenue report downloaded")}><Download size={16} /> Export</button>}
        </div>
      </div>
      <CRMSections {...sectionProps} />
      <FinanceSections {...sectionProps} />
      <OperationsSections {...sectionProps} />
    </motion.div>
  );
}
