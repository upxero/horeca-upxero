import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";

const container = document.getElementById("root");
const application = <React.StrictMode><App /></React.StrictMode>;
if (container.dataset.prerendered === "true") {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
