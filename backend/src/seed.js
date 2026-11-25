import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  User,
  Property,
  AgentProfile,
  Lead,
  Transaction,
  Appointment,
  Wishlist,
  Notification,
  ActivityLog,
} from "./models.js";
await mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dwellix",
);
await Promise.all(
  [
    User,
    Property,
    AgentProfile,
    Lead,
    Transaction,
    Appointment,
    Wishlist,
    Notification,
    ActivityLog,
  ].map((m) => m.deleteMany({})),
);
const password = await bcrypt.hash("Dwellix123!", 12);
const [admin, agent, agent2, customer] = await User.create([
  {
    name: "Jordan Davis",
    email: "admin@dwellix.com",
    password,
    role: "Admin",
    phone: "+1 (415) 555-0110",
  },
  {
    name: "Robert Fox",
    email: "agent@dwellix.com",
    password,
    role: "Agent",
    phone: "+1 (415) 555-0148",
  },
  {
    name: "Kathryn Murphy",
    email: "kathryn@dwellix.com",
    password,
    role: "Agent",
    phone: "+1 (415) 555-0161",
  },
  {
    name: "Michael Reynolds",
    email: "customer@dwellix.com",
    password,
    role: "Customer",
    phone: "+1 (415) 555-0148",
  },
]);
await AgentProfile.create([
  {
    user: agent.id,
    license: "NY-019344",
    territories: ["Albany", "Brooklyn"],
    target: 1500000,
    closedVolume: 1240000,
    rating: 4.9,
  },
  {
    user: agent2.id,
    license: "NY-014289",
    territories: ["Manhattan", "Queens"],
    target: 1200000,
    closedVolume: 892000,
    rating: 4.8,
  },
]);
const props = await Property.create([
  {
    name: "The Somerset",
    type: "House",
    category: "Buy",
    address: "New York, Albany",
    price: 1250000,
    beds: 6,
    baths: 4,
    area: 3240,
    description:
      "A contemporary home framed by mature trees and beautiful natural light.",
    amenities: ["Garden", "Parking", "Fireplace"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    ],
    status: "Available",
    approvalStatus: "Approved",
    agent: agent.id,
    views: 145,
  },
  {
    name: "Maison Sterling",
    type: "Villa",
    category: "Buy",
    address: "New York, Albany",
    price: 2500000,
    beds: 5,
    baths: 3,
    area: 2800,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Occupied",
    approvalStatus: "Approved",
    agent: agent.id,
    views: 320,
  },
  {
    name: "The Orchard",
    type: "Apartment",
    category: "Rent",
    address: "Ohio, Columbus",
    price: 420000,
    beds: 3,
    baths: 2,
    area: 1650,
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Available",
    approvalStatus: "Approved",
    agent: agent2.id,
    views: 985,
  },
  {
    name: "Alder House",
    type: "Commercial",
    category: "Commercial",
    address: "Brooklyn, New York",
    price: 860000,
    beds: 2,
    baths: 2,
    area: 2100,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Pending",
    approvalStatus: "Pending",
    agent: agent2.id,
    views: 276,
  },
]);
const leads = await Lead.create([
  {
    name: "Michael Reynolds",
    email: "michael.r@email.com",
    phone: "+1 (415) 555-0148",
    property: props[0].id,
    status: "Qualified",
    agent: agent.id,
    estimatedValue: 1250000,
    source: "Website",
  },
  {
    name: "Olivia Bennett",
    email: "olivia.b@email.com",
    phone: "+1 (415) 555-0162",
    property: props[2].id,
    status: "New",
    agent: agent2.id,
    estimatedValue: 420000,
  },
  {
    name: "James Mitchell",
    email: "j.mitchell@email.com",
    property: props[1].id,
    status: "Negotiation",
    agent: agent.id,
    estimatedValue: 2500000,
  },
  {
    name: "Sophia Chen",
    email: "s.chen@email.com",
    property: props[3].id,
    status: "Contacted",
    agent: agent2.id,
    estimatedValue: 860000,
  },
]);
const tx = await Transaction.create([
  {
    property: props[0].id,
    client: customer.id,
    agent: agent.id,
    type: "Sale",
    amount: 1475300,
    status: "Closed Won",
    paymentStatus: "Paid",
    closedAt: new Date("2025-01-20"),
    payments: [{ amount: 1475300, method: "Wire" }],
  },
  {
    property: props[2].id,
    client: customer.id,
    agent: agent2.id,
    type: "Rent",
    amount: 2450,
    status: "In Progress",
    paymentStatus: "Partial",
    closedAt: new Date("2025-01-18"),
  },
  {
    property: props[1].id,
    client: customer.id,
    agent: agent.id,
    type: "Sale",
    amount: 895000,
    status: "Closed Won",
    paymentStatus: "Paid",
    closedAt: new Date("2025-01-14"),
  },
]);
await Appointment.create([
  {
    title: "Property viewing",
    customer: customer.id,
    lead: leads[0].id,
    property: props[0].id,
    agent: agent.id,
    startAt: new Date("2025-11-24T10:30:00"),
  },
  {
    title: "Buyer consultation",
    lead: leads[1].id,
    property: props[2].id,
    agent: agent2.id,
    startAt: new Date("2025-11-24T13:00:00"),
  },
]);
await Wishlist.create({ user: customer.id, property: props[0].id });
await Notification.create([
  {
    user: admin.id,
    title: "New inquiry",
    message: "A new inquiry arrived for The Somerset",
    type: "lead",
  },
  {
    user: agent.id,
    title: "Appointment reminder",
    message: "Property viewing with Michael Reynolds",
    type: "appointment",
  },
]);
await ActivityLog.create({
  user: admin.id,
  action: "seeded the workspace with sample data",
  entityType: "Workspace",
});
console.log(
  "Seeded DWELLIX demo records. Accounts: admin@dwellix.com, agent@dwellix.com, customer@dwellix.com; password Dwellix123!",
);
await mongoose.disconnect();
