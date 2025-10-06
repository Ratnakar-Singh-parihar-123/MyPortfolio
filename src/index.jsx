// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // ✅ make sure file name matches correctly
import "./styles/tailwind.css"; // ✅ must come first (for base styles)
import "./styles/index.css"; // ✅ optional, for your custom/global styles

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);