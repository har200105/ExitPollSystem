import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  return (
    <>
      <div className="navbarMain">
        <div className="leftSideNavbar">
          <li style={{
           listStyle:"none"
         }}>
              <NavLink className="header" to="/">Exit Poll System</NavLink>
            </li>
        </div>
        <div className="rightSideNavbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
