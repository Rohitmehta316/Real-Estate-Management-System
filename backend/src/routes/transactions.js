import { Router } from "express";
import { Transaction } from "../models.js";
import { auth, allow, asyncRoute } from "../middleware/auth.js";

export default function createTransactionsRouter() {
  const router = Router();

  router.get(
    "/transactions",
    auth,
    asyncRoute(async (req, res) => {
      const f = {};
      if (req.user.role === "Agent") f.agent = req.user.id;
      if (req.query.status) f.status = req.query.status;
      res.json(
        await Transaction.find(f)
          .sort("-createdAt")
          .populate("property", "name")
          .populate("client", "name email")
          .populate("agent", "name"),
      );
    }),
  );
  router.post(
    "/transactions",
    auth,
    allow("Admin", "Agent"),
    asyncRoute(async (req, res) => {
      const t = await Transaction.create({
        ...req.body,
        agent: req.user.role === "Agent" ? req.user.id : req.body.agent,
      });
      await audit(req.user.id, "created transaction", "Transaction", t.id);
      res.status(201).json(t);
    }),
  );
  router.patch(
    "/transactions/:id",
    auth,
    allow("Admin", "Agent"),
    asyncRoute(async (req, res) => {
      const t = await Transaction.findOneAndUpdate(
        {
          _id: req.params.id,
          ...(req.user.role === "Agent" ? { agent: req.user.id } : {}),
        },
        req.body,
        { new: true, runValidators: true },
      );
      if (!t) return res.status(404).json({ message: "Transaction not found" });
      res.json(t);
    }),
  );
  router.post(
    "/transactions/:id/payments",
    auth,
    allow("Admin", "Agent"),
    asyncRoute(async (req, res) => {
      const t = await Transaction.findById(req.params.id);
      if (!t) return res.status(404).json({ message: "Transaction not found" });
      t.payments.push({
        amount: +req.body.amount,
        method: req.body.method,
        reference: req.body.reference,
      });
      const paid = t.payments.reduce((s, p) => s + p.amount, 0);
      t.paymentStatus = paid >= t.amount ? "Paid" : "Partial";
      await t.save();
      res.json(t);
    }),
  );
  router.get(
    "/transactions/:id/invoice",
    auth,
    asyncRoute(async (req, res) => {
      const t = await Transaction.findById(req.params.id)
        .populate("property")
        .populate("client")
        .populate("agent");
      if (!t) return res.status(404).json({ message: "Transaction not found" });
      res
        .type("text/html")
        .send(
          `<html><head><title>DWELLIX Invoice ${t.id}</title><style>body{font:16px Arial;color:#23352a;padding:60px;max-width:760px;margin:auto}h1{color:#176b53}table{width:100%;margin-top:35px}td{padding:15px;border-bottom:1px solid #ddd}.amount{font-size:24px;font-weight:bold;text-align:right}</style></head><body><h1>DWELLIX</h1><p>REAL ESTATE INVOICE</p><hr><p>Invoice #${t.id}<br>Issued ${new Date().toLocaleDateString()}</p><table><tr><td>Property</td><td>${t.property?.name || "Property transaction"}</td></tr><tr><td>Client</td><td>${t.client?.name || "Client"}</td></tr><tr><td>Payment status</td><td>${t.paymentStatus}</td></tr><tr><td>Total</td><td class="amount">$${t.amount.toLocaleString()}</td></tr></table><p>Thank you for working with DWELLIX.</p><script>window.print()</script></body></html>`,
        );
    }),
  );
  return router;
}
