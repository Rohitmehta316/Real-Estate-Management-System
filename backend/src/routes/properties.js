import { Router } from "express";
import { Property } from "../models.js";
import { auth, allow, asyncRoute } from "../middleware/auth.js";
import { audit } from "../services/activity.js";
import { imageUpload } from "../middleware/uploads.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import path from "node:path";

export default function createPropertiesRouter() {
  const router = Router();
  const upload = imageUpload;
  const uploads = path.resolve("uploads");
  router.get(
    "/properties",
    asyncRoute(async (req, res) => {
      const page = Math.max(1, +req.query.page || 1),
        limit = Math.min(50, Math.max(1, +req.query.limit || 12)),
        filter = {};
      if (req.query.status) filter.status = req.query.status;
      if (req.query.type) filter.type = req.query.type;
      if (req.query.category) filter.category = req.query.category;
      if (req.query.minPrice || req.query.maxPrice)
        filter.price = {
          $gte: +req.query.minPrice || 0,
          ...(req.query.maxPrice ? { $lte: +req.query.maxPrice } : {}),
        };
      if (req.query.search)
        filter.$or = ["name", "address", "description"].map((k) => ({
          [k]: { $regex: req.query.search, $options: "i" },
        }));
      if (req.user?.role === "Agent") filter.agent = req.user.id;
      if (req.user?.role === "Customer") filter.status = "Available";
      const [items, total] = await Promise.all([
        Property.find(filter)
          .sort(req.query.sort || "-createdAt")
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("agent", "name email"),
        Property.countDocuments(filter),
      ]);
      res.json({ items, total, page, pages: Math.ceil(total / limit) });
    }),
  );
  router.get(
    "/properties/:id",
    asyncRoute(async (req, res) => {
      const p = await Property.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true },
      ).populate("agent", "name email phone");
      if (!p) return res.status(404).json({ message: "Property not found" });
      res.json(p);
    }),
  );
  router.post(
    "/properties",
    auth,
    allow("Admin", "Agent"),
    asyncRoute(async (req, res) => {
      const p = await Property.create({
        ...req.body,
        agent: req.user.role === "Agent" ? req.user.id : req.body.agent,
        approvalStatus: req.user.role === "Admin" ? "Approved" : "Pending",
        status:
          req.user.role === "Admin" ? req.body.status || "Available" : "Pending",
      });
      await audit(req.user.id, "created property", "Property", p.id);
      res.status(201).json(p);
    }),
  );
  router.patch(
    "/properties/:id",
    auth,
    allow("Admin", "Agent"),
    asyncRoute(async (req, res) => {
      const p = await Property.findOneAndUpdate(
        {
          _id: req.params.id,
          ...(req.user.role === "Agent" ? { agent: req.user.id } : {}),
        },
        req.body,
        { new: true, runValidators: true },
      );
      if (!p) return res.status(404).json({ message: "Property not found" });
      await audit(req.user.id, "updated property", "Property", p.id);
      res.json(p);
    }),
  );
  router.delete(
    "/properties/:id",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) => {
      const p = await Property.findByIdAndDelete(req.params.id);
      if (!p) return res.status(404).json({ message: "Property not found" });
      await audit(req.user.id, "deleted property", "Property", p.id);
      res.json({ message: "Property deleted" });
    }),
  );
  router.patch(
    "/properties/:id/approval",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) => {
      const status = req.body.status;
      if (!["Approved", "Rejected"].includes(status))
        return res
          .status(400)
          .json({ message: "Status must be Approved or Rejected" });
      const p = await Property.findByIdAndUpdate(
        req.params.id,
        {
          approvalStatus: status,
          status: status === "Approved" ? "Available" : "Rejected",
        },
        { new: true },
      );
      if (!p) return res.status(404).json({ message: "Property not found" });
      res.json(p);
    }),
  );
  router.post(
    "/uploads",
    auth,
    allow("Admin", "Agent"),
    upload.array("images", 12),
    asyncRoute(async (req, res) => {
      const images = [];
      for (const f of req.files || []) {
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          const r = await cloudinary.uploader.upload(f.path, {
            folder: "dwellix/properties",
            resource_type: "image",
          });
          fs.unlink(f.path, () => {});
          images.push(r.secure_url);
        } else images.push(`/uploads/${path.basename(f.path)}`);
      }
      res.status(201).json({ images });
    }),
  );
  return router;
}
