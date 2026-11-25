# DWELLIX

Premium real estate management platform built with React, Vite, Tailwind CSS, Express and MongoDB.

## Project structure

```text
frontend/
  src/App.jsx                 App shell and session flow
  src/components/             Login, dashboard, shared UI and dialogs
  src/components/pages/       Property/leads, finance and operations pages
  src/styles/                 Base, dashboard, module, responsive and auth styles
backend/
  src/routes/                 Auth, dashboard, property, lead and other API routes
  src/middleware/             Authentication, uploads and error handling
  src/services/               Activity logging and notification helpers
  src/models.js               Mongoose models
```

## Run locally (Windows PowerShell)
Install Node.js 20+ and start MongoDB locally, or create a MongoDB Atlas database. The frontend and backend have separate package files and run in separate terminals.

**Terminal 1 — backend:**

```powershell
Set-Location .\backend
npm install
Copy-Item .env.example .env
notepad .env
```

Set `MONGODB_URI` and replace `JWT_SECRET` with a long random secret. The local MongoDB URI example is `mongodb://127.0.0.1:27017/dwellix`. Save the file, then run the seed command once and start the API:

```powershell
npm run seed
npm run dev
```

**Terminal 2 — frontend:**

```powershell
Set-Location .\frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Open `http://localhost:5173`. The API uses `http://localhost:5000` by default. If those ports are occupied, set `PORT` and `CLIENT_URL` in `backend/.env`, and set matching `API_PORT` and `VITE_PORT` in `frontend/.env`.

**Seeding clears and recreates the collections in the configured DWELLIX database**, so use a fresh database if it contains data you need.

Demo sign in: `admin@dwellix.com` / `Dwellix123!` (also `agent@dwellix.com` and `customer@dwellix.com`, same password).

Without a database, the UI enters a local demo mode so the dashboard and navigation can be explored. Configure MongoDB to enable persistent API workflows. Cloudinary image uploads are enabled by setting the Cloudinary environment variables; otherwise uploads are stored in `backend/uploads`.

## Modules
Dashboard, property inventory, leads, transactions and invoices, appointments calendar, agent directory, customer portal, notifications and activity feed. JWT sessions are role-aware. Admins manage all records; agents work with assigned leads, properties and appointments; customers browse, favorite and request visits.

## Deployment
Build the frontend by running `npm run build` inside `frontend`. Deploy the Express service and static `frontend/dist` separately or configure the API to serve the built client. Set `CLIENT_URL`, `MONGODB_URI`, `JWT_SECRET`, and optional Cloudinary credentials in the backend environment. Use HTTPS in production.
