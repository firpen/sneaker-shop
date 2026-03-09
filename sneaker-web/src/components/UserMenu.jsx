

import React, { useState, useRef, useEffect } from "react";
import "../css/Navbar.css";
import { useSession } from "./useSession";

export default function UserMenu({ isLoggedIn, userInfo }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => window.location.reload());
  }

  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      <button className="user-menu-btn" onClick={() => setOpen((o) => !o)}>
        <span className="user-icon" aria-label="user">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="13" r="5" stroke="#111" strokeWidth="2" fill="none" />
            <path d="M8 25c2.5-4 13.5-4 16 0" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="user-menu-dropdown">
          {!isLoggedIn ? (
            <>
              <a href="/register" className="user-menu-item">Registrera dig</a>
              <a href="/login" className="user-menu-item">Logga in</a>
            </>
          ) : (
            <>
              <div className="user-menu-item" style={{cursor:'default'}}>
                {userInfo.firstName} {userInfo.lastName}
              </div>
              {userInfo.role === "Admin" && (
                <a href="/admin" className="user-menu-item">Admin Dashboard</a>
              )}
              <button className="user-menu-logout-btn" onClick={handleLogout}>Logga ut</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
