
import React from "react";
import "./VoterNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../redux/reducers/user";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";


const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector((state) => state.user);

  const logout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("/login");
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
   }, [isAuthenticated]);

  return (
    <>
      <div className="navbarMain">
        <div className="leftSideNavbar">
          <li style={{
            listStyle: "none"
          }}>
              <NavLink className="header" to="/welcome">Exit Poll System</NavLink>
            </li>
        </div>
        <div className="rightSideNavbar">
          <ul>
            <li>
              <NavLink to="/welcome">Welcome</NavLink>
            </li>
            <li>
              <NavLink to="/result">Result</NavLink>
            </li>
            <li>
              <NavLink to="/candidates">Candidates</NavLink>
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
      </div>
    </>
  );
};

export default Navbar;
