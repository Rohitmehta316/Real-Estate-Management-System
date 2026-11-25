import { Router } from "express";
import bcrypt from "bcryptjs";
import { AgentProfile, User } from "../models.js";
import { auth, allow, asyncRoute } from "../middleware/auth.js";

export default function createTeamRouter() {
  const router = Router();

  router.get(
    "/agents",
    auth,
    asyncRoute(async (req, res) =>
      res.json(
        await AgentProfile.find().populate(
          "user",
          "name email phone avatar isActive",
        ),
      ),
    ),
  );
  router.post(
    "/agents",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) => {
      const { name, email, password, ...profile } = req.body;
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 12),
        role: "Agent",
      });
      const a = await AgentProfile.create({ ...profile, user: user.id });
      res.status(201).json(await a.populate("user", "name email phone"));
    }),
  );
  router.patch(
    "/agents/:id",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) => {
      const a = await AgentProfile.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate("user", "name email phone");
      res.json(a);
    }),
  );
  router.get(
    "/users",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) =>
      res.json(await User.find().select("-password").sort("name")),
    ),
  );
  router.patch(
    "/users/:id",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) =>
      res.json(
        await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        }).select("-password"),
      ),
    ),
  );
  return router;
}
