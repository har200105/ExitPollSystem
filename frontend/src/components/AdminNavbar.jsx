import React from "react";
import "./AdminNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../redux/reducers/user";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import { useState } from "react";

const AdminNavbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const {isAuthenticated,isAdmin} = useSelector((state) => state.user);

  const logout = () => {
    localStorage.clear();
    dispatch(authActions.logout());

  }

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin]);
  
  

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
              <NavLink className="nav_link" to="/admin-welcome">Welcome</NavLink>
            </li>
            <li>
              <NavLink className="nav_link" to="/result">Result</NavLink>
            </li>
            <li>
              <NavLink className="nav_link" to="/candidates">Parties</NavLink>
            </li>
            <li>
              <NavLink className="nav_link" to="/change-phase">Change Phase</NavLink>
            </li>
             <li>
              <NavLink className="nav_link" to="/add-candidates">Add Parties</NavLink>
            </li>
            <li>
               <NavLink className="nav_link" to="/login" onClick={()=>logout()}>Logout</NavLink>
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

export default AdminNavbar;


/*
   <div className="navbarMain">
        <div className="leftSideNavbar">
          <li style={{
            listStyle: "none"
          }}>
              <NavLink className="header" to="/admin-welcome">Exit Poll System</NavLink>
            </li>
        </div>
        <div className="rightSideNavbar">
          <ul>
            <li>
              <NavLink to="/admin-welcome">Welcome</NavLink>
            </li>
            <li>
              <NavLink to="/result">Result</NavLink>
            </li>
            <li>
              <NavLink to="/candidates">Parties</NavLink>
            </li>
            <li>
              <NavLink to="/change-phase">Change Phase</NavLink>
            </li>
             <li>
              <NavLink to="/add-candidates">Add Parties</NavLink>
            </li>
            <li>
               <NavLink to="/login" onClick={()=>logout()}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>

      */