import React from "react";
import "./AdminPage.css";
import Home from "./pages/home/Home";

export default function AdminPage() {
  return (
    <div>
      <Home isHome={true} />
    </div>
  );
}
