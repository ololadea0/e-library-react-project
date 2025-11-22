import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/e-library-react-project">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
