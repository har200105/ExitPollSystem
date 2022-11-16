import React from "react";
import "./VoterNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../redux/reducers/user";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthenticated,isAdmin} = useSelector((state) => state.user);

  const logout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  
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
              <NavLink to={isAdmin ? "/admin-welcome":"/welcome"}>Welcome</NavLink>
            </li>
            <li>
              <NavLink to="/result">Result</NavLink>
            </li>
            <li>
              <NavLink to="/candidates">Parties</NavLink>
            </li>
            <li>
              <NavLink to="/voting">Voting</NavLink>
            </li>
             <li>
              <NavLink to="/voter-registration">Voter Registration</NavLink>
            </li>
            <li>
               <NavLink to="/login" onClick={()=>logout()}>Logout</NavLink>
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
