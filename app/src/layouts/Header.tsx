import React from "react";
import "../styles/Header.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  let del = false;

  if (location.pathname === "/") {
    del = true;
  }

  return (
    <>
      <header className="header">
        <div className="links">
          <NavLink to={"/"}>
            <span className="logo ">WEB 22</span>
          </NavLink>
          <NavLink to="/accounts">Accounts</NavLink>
          <NavLink to="/about/us">About Us</NavLink>
        </div>
      </header>
      {del ? (
        <h1 className="home-title center-align $40c4ff light-blue accent-3 white-text pulse">
         Hello Home Page
        </h1>
      ) : (
        ""
      )}
      <Outlet />
    </>
  );
}

export default Header;
