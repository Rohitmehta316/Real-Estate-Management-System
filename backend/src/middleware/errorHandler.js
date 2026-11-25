export default function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.name === "ValidationError") return res.status(400).json({ message: err.message });
  if (err.code === 11000) return res.status(409).json({ message: "A record with this value already exists" });
  res.status(err.status || 500).json({ message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message || "Server error" });
}
