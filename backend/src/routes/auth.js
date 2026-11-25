import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, AgentProfile } from "../models.js";
import { auth, asyncRoute } from "../middleware/auth.js";

export default function createAuthRouter() {
  const router = Router();

  router.post(
    "/auth/register",
    asyncRoute(async (req, res) => {
      const { name, email, password, role = "Customer" } = req.body;
      if (!name || !email || !password || password.length < 8)
        return res
          .status(400)
          .json({
            message: "Name, email and an 8 character password are required",
          });
      if (!["Customer", "Agent"].includes(role))
        return res.status(400).json({ message: "Invalid role" });
      if (await User.exists({ email }))
        return res.status(409).json({ message: "Email already registered" });
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 12),
        role,
      });
      if (role === "Agent") await AgentProfile.create({ user: user._id });
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "dev-only-secret",
        { expiresIn: "7d" },
      );
      res
        .status(201)
        .json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
    }),
  );
  router.post(
    "/auth/login",
    asyncRoute(async (req, res) => {
      const user = await User.findOne({ email: req.body.email }).select(
        "+password",
      );
      if (
        !user ||
        !user.isActive ||
        !(await bcrypt.compare(req.body.password || "", user.password))
      )
        return res
          .status(401)
          .json({ message: "Email or password is incorrect" });
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "dev-only-secret",
        { expiresIn: "7d" },
      );
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }),
  );
  router.get(
    "/auth/me",
    auth,
    asyncRoute(async (req, res) =>
      res.json(await User.findById(req.user.id).select("-password")),
    ),
  );
  router.post(
    "/auth/change-password",
    auth,
    asyncRoute(async (req, res) => {
      const u = await User.findById(req.user.id).select("+password");
      if (!(await bcrypt.compare(req.body.currentPassword || "", u.password)))
        return res.status(400).json({ message: "Current password is incorrect" });
      u.password = await bcrypt.hash(req.body.password, 12);
      await u.save();
      res.json({ message: "Password updated" });
    }),
  );
  return router;
}
