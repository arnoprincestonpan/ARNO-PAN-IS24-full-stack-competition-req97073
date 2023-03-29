import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  // useState for activeTab(s)
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="header">
      <Link to="/">
        <p className="logo" onClick={() => setActiveTab("Home")}>
          Product Management System
        </p>
      </Link>
      <div className="header-right">
        {/* activeTabs by using className */}
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddProduct" ? "active" : ""}`}
            onClick={() => setActiveTab("AddProduct")}
          >
            Add Product
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
