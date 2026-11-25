import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles/base.css";
import "./styles/dashboard.css";
import "./styles/modules.css";
import "./styles/theme.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(<App />);
