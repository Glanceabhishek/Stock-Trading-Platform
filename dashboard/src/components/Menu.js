import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Auto-logout when tab/app closes
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("dashToken");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // Auto-logout when token is missing
  useEffect(() => {
    const token = localStorage.getItem("dashToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dashToken");
    window.location.href = "https://stock-trading-platform-eta.vercel.app/login"; // update with your frontend URL
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => setSelectedMenu(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => setSelectedMenu(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => setSelectedMenu(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => setSelectedMenu(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => setSelectedMenu(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => setSelectedMenu(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />

        {/* Profile & Logout */}
        <div className="profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>

        {isProfileDropdownOpen && (
          <div style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "8px 0",
            marginTop: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <p
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                margin: 0,
                cursor: "pointer",
                color: "#e74c3c",
                fontWeight: "600",
              }}
            >
              🚪 Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
