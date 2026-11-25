import { ActivityLog, Notification } from "../models.js";

export const audit = (user, action, entityType, entityId, details = {}) =>
  ActivityLog.create({ user, action, entityType, entityId, details }).catch(() => {});

export const createNotifier = (io) => (user, title, message, type = "info") => {
  Notification.create({ user, title, message, type })
    .then((notification) => { if (user) io.to(String(user)).emit("notification", notification); })
    .catch(() => {});
};
