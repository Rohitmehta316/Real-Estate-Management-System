import { Router } from "express";
import { Wishlist, Notification, ActivityLog } from "../models.js";
import { auth, allow, asyncRoute } from "../middleware/auth.js";

export default function createCustomerRouter() {
  const router = Router();

  router.get(
    "/wishlist",
    auth,
    allow("Customer"),
    asyncRoute(async (req, res) =>
      res.json(await Wishlist.find({ user: req.user.id }).populate("property")),
    ),
  );
  router.post(
    "/wishlist/:propertyId",
    auth,
    allow("Customer"),
    asyncRoute(async (req, res) =>
      res
        .status(201)
        .json(
          await Wishlist.create({
            user: req.user.id,
            property: req.params.propertyId,
          }),
        ),
    ),
  );
  router.delete(
    "/wishlist/:propertyId",
    auth,
    allow("Customer"),
    asyncRoute(async (req, res) => {
      await Wishlist.findOneAndDelete({
        user: req.user.id,
        property: req.params.propertyId,
      });
      res.json({ message: "Removed from favorites" });
    }),
  );
  router.get(
    "/notifications",
    auth,
    asyncRoute(async (req, res) =>
      res.json(
        await Notification.find({ user: req.user.id })
          .sort("-createdAt")
          .limit(50),
      ),
    ),
  );
  router.patch(
    "/notifications/read-all",
    auth,
    asyncRoute(async (req, res) => {
      await Notification.updateMany(
        { user: req.user.id, read: false },
        { read: true },
      );
      res.json({ message: "Notifications marked as read" });
    }),
  );
  router.get(
    "/activity",
    auth,
    allow("Admin"),
    asyncRoute(async (req, res) =>
      res.json(
        await ActivityLog.find()
          .sort("-createdAt")
          .limit(100)
          .populate("user", "name"),
      ),
    ),
  );
  return router;
}
