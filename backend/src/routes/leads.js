import { Router } from "express";
import { Lead } from "../models.js";
import { auth, allow, asyncRoute } from "../middleware/auth.js";
import { audit, createNotifier } from "../services/activity.js";

export default function createLeadsRouter(io) {
  const router = Router();
  const notify = createNotifier(io);
  router.get(
    "/leads",
    auth,
    asyncRoute(async (req, res) => {
      const filter = {};
      if (req.user.role === "Agent") filter.agent = req.user.id;
      if (req.query.status) filter.status = req.query.status;
      if (req.query.search)
        filter.name = { $regex: req.query.search, $options: "i" };
      res.json(
        await Lead.find(filter)
          .sort("-createdAt")
          .populate("property", "name address price")
          .populate("agent", "name email"),
      );
    }),
  );
  router.post(
    "/leads",
    auth,
    allow("Admin", "Agent", "Customer"),
    asyncRoute(async (req, res) => {
      const lead = await Lead.create({
        ...req.body,
        agent:
          req.user.role === "Agent"
            ? req.user.id
            : mongoose.isValidObjectId(req.body.agent)
              ? req.body.agent
              : undefined,
        status: "New",
      });
      await audit(req.user.id, "created lead", "Lead", lead.id);
      if (lead.agent)
        notify(
          lead.agent,
          "New lead",
          `${lead.name} is interested in a property`,
        );
      res.status(201).json(lead);
    }),
  );
  router.patch(
    "/leads/:id",
    auth,
    allow("Admin", "Agent"),
    asyncRoute(async (req, res) => {
      const l = await Lead.findOneAndUpdate(
        {
          _id: req.params.id,
          ...(req.user.role === "Agent" ? { agent: req.user.id } : {}),
        },
        req.body,
        { new: true, runValidators: true },
      );
      if (!l) return res.status(404).json({ message: "Lead not found" });
      await audit(req.user.id, "updated lead", "Lead", l.id);
      res.json(l);
    }),
  );
  router.delete(
    "/leads/:id",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) => {
      await Lead.findByIdAndDelete(req.params.id);
      res.json({ message: "Lead deleted" });
    }),
  );
  return router;
}
