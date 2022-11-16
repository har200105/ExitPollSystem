import React,{useState} from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {

  const [show, setShow] = useState(false);
  return (
    <>
         <nav className="main-nav">
        <div className="logo">
          <NavLink to="/admin-welcome">
             <h2>Exit Poll System</h2>
         </NavLink>
        </div>
        <div className={show ? "mobile-menu-link":"menu-link"}>
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
        <div className="hamburger-menu" onClick={()=>setShow(!show)}>
            <GiHamburgerMenu/>
          </div>
      </nav>
    </>
  );
};

export default Navbar;
