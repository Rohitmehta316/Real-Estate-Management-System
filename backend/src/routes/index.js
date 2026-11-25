import { Router } from "express";
import mongoose from "mongoose";
import createAuthRouter from "./auth.js";
import createDashboardRouter from "./dashboard.js";
import createPropertiesRouter from "./properties.js";
import createLeadsRouter from "./leads.js";
import createTransactionsRouter from "./transactions.js";
import createAppointmentsRouter from "./appointments.js";
import createTeamRouter from "./team.js";
import createCustomerRouter from "./customer.js";

export default function createApiRouter(io) {
  const router = Router();
  router.get("/health", (req, res) => res.json({ ok: true, database: mongoose.connection.readyState === 1 }));
  router.use(createAuthRouter());
  router.use(createDashboardRouter());
  router.use(createPropertiesRouter());
  router.use(createLeadsRouter(io));
  router.use(createTransactionsRouter());
  router.use(createAppointmentsRouter(io));
  router.use(createTeamRouter());
  router.use(createCustomerRouter());
  return router;
}
