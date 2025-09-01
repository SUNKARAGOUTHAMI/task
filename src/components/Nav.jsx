import React, { useState } from "react";
import "./Nav.css";  // ✅ import styles for Nav only

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        <h1 className="logo">MyStore</h1>
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li>Home</li>
          <li>Product Features</li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
