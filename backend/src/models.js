import mongoose from "mongoose";
const { Schema, model } = mongoose;
const opts = {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["Admin", "Agent", "Customer"],
      default: "Customer",
    },
    phone: String,
    avatar: String,
    isActive: { type: Boolean, default: true },
  },
  opts,
);
const propertySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["House", "Villa", "Apartment", "Commercial", "Condo", "Land"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Buy", "Rent", "Commercial"],
      default: "Buy",
    },
    address: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    description: String,
    amenities: [String],
    images: [String],
    status: {
      type: String,
      enum: ["Pending", "Available", "Occupied", "Sold", "Rejected"],
      default: "Pending",
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    agent: { type: Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
  },
  opts,
);
const agentProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    license: String,
    bio: String,
    territories: [String],
    target: { type: Number, default: 0 },
    closedVolume: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
  },
  opts,
);
const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true },
    phone: String,
    property: { type: Schema.Types.ObjectId, ref: "Property" },
    message: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Negotiation", "Won", "Lost"],
      default: "New",
    },
    agent: { type: Schema.Types.ObjectId, ref: "User" },
    source: { type: String, default: "Website" },
    estimatedValue: { type: Number, default: 0 },
    followUpAt: Date,
  },
  opts,
);
const transactionSchema = new Schema(
  {
    property: { type: Schema.Types.ObjectId, ref: "Property" },
    lead: { type: Schema.Types.ObjectId, ref: "Lead" },
    client: { type: Schema.Types.ObjectId, ref: "User" },
    agent: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["Sale", "Rent"], default: "Sale" },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["In Progress", "Closed Won", "Cancelled"],
      default: "In Progress",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Partial", "Paid"],
      default: "Unpaid",
    },
    payments: [
      {
        amount: Number,
        date: { type: Date, default: Date.now },
        method: String,
        reference: String,
      },
    ],
    closedAt: Date,
  },
  opts,
);
const appointmentSchema = new Schema(
  {
    title: { type: String, default: "Property viewing" },
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    lead: { type: Schema.Types.ObjectId, ref: "Lead" },
    property: { type: Schema.Types.ObjectId, ref: "Property" },
    agent: { type: Schema.Types.ObjectId, ref: "User" },
    startAt: { type: Date, required: true },
    endAt: Date,
    notes: String,
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  opts,
);
const wishlistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  },
  opts,
);
wishlistSchema.index({ user: 1, property: 1 }, { unique: true });
const notificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    message: String,
    type: { type: String, default: "info" },
    read: { type: Boolean, default: false },
  },
  opts,
);
const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    entityType: String,
    entityId: Schema.Types.ObjectId,
    details: Schema.Types.Mixed,
  },
  opts,
);
export const User = model("User", userSchema);
export const Property = model("Property", propertySchema);
export const AgentProfile = model("AgentProfile", agentProfileSchema);
export const Lead = model("Lead", leadSchema);
export const Transaction = model("Transaction", transactionSchema);
export const Appointment = model("Appointment", appointmentSchema);
export const Wishlist = model("Wishlist", wishlistSchema);
export const Notification = model("Notification", notificationSchema);
export const ActivityLog = model("ActivityLog", activitySchema);
