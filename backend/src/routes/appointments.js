import { Router } from "express";
import { Appointment } from "../models.js";
import { auth, allow, asyncRoute } from "../middleware/auth.js";
import { audit, createNotifier } from "../services/activity.js";

export default function createAppointmentsRouter(io) {
  const router = Router();
  const notify = createNotifier(io);
  router.get(
    "/appointments",
    auth,
    asyncRoute(async (req, res) => {
      const f = {};
      if (req.user.role === "Agent") f.agent = req.user.id;
      if (req.user.role === "Customer") f.customer = req.user.id;
      if (req.query.from || req.query.to)
        f.startAt = {
          ...(req.query.from ? { $gte: new Date(req.query.from) } : {}),
          ...(req.query.to ? { $lte: new Date(req.query.to) } : {}),
        };
      res.json(
        await Appointment.find(f)
          .sort("startAt")
          .populate("property", "name address")
          .populate("agent", "name")
          .populate("customer", "name"),
      );
    }),
  );
  router.post(
    "/appointments",
    auth,
    allow("Admin", "Agent", "Customer"),
    asyncRoute(async (req, res) => {
      const a = await Appointment.create({
        ...req.body,
        agent: req.user.role === "Agent" ? req.user.id : req.body.agent,
        customer: req.user.role === "Customer" ? req.user.id : req.body.customer,
      });
      await audit(req.user.id, "scheduled appointment", "Appointment", a.id);
      if (a.agent)
        notify(
          a.agent,
          "Appointment scheduled",
          `A new appointment is scheduled for ${new Date(a.startAt).toLocaleString()}`,
        );
      res.status(201).json(a);
    }),
  );
  router.patch(
    "/appointments/:id",
    auth,
    asyncRoute(async (req, res) => {
      const a = await Appointment.findOneAndUpdate(
        {
          _id: req.params.id,
          ...(req.user.role === "Agent"
            ? { agent: req.user.id }
            : req.user.role === "Customer"
              ? { customer: req.user.id }
              : {}),
        },
        req.body,
        { new: true, runValidators: true },
      );
      if (!a) return res.status(404).json({ message: "Appointment not found" });
      res.json(a);
    }),
  );
  return router;
}
