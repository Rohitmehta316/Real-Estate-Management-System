import { Router } from "express";
import { Property, Lead, Transaction, Appointment } from "../models.js";
import { auth, asyncRoute } from "../middleware/auth.js";

export default function createDashboardRouter() {
  const router = Router();

  router.get(
    "/dashboard",
    auth,
    asyncRoute(async (req, res) => {
      const scope = req.user.role === "Agent" ? { agent: req.user.id } : {};
      const [properties, leads, closed, pending, revenue, monthly, appointments] =
        await Promise.all([
          Property.countDocuments(
            req.user.role === "Customer" ? { status: "Available" } : scope,
          ),
          Lead.countDocuments({ ...scope, status: { $nin: ["Won", "Lost"] } }),
          Transaction.countDocuments({ ...scope, status: "Closed Won" }),
          Transaction.countDocuments({ ...scope, status: "In Progress" }),
          Transaction.aggregate([
            { $match: { ...scope, status: "Closed Won" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
          ]),
          Transaction.aggregate([
            { $match: { ...scope, status: "Closed Won" } },
            {
              $group: {
                _id: { $month: "$closedAt" },
                total: { $sum: "$amount" },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ]),
          Appointment.find({
            ...scope,
            status: "Scheduled",
            startAt: { $gte: new Date() },
          })
            .sort({ startAt: 1 })
            .limit(5)
            .populate("property", "name address")
            .populate("agent", "name"),
        ]);
      res.json({
        stats: {
          properties,
          activeLeads: leads,
          closedDeals: closed,
          inProgress: pending,
          revenue: revenue[0]?.total || 0,
        },
        monthly,
        appointments,
      });
    }),
  );
  return router;
}
