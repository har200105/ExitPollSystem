import React from "react";
import Navbar from "../../components/Navbar";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/welcome");
    }
  },[isAuthenticated])
  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <div className="homeMain">
          <div className="rightHomeSide">
            <h1>
              The Next Generation of Voting
              <br />
              Based On
              <span id="blockchain">Blockchain</span>
            </h1>

            <h2 id="homeInfo">
              Conduct online elections with complete <br />
              confidence in their reliability.
            </h2>

            <div className="homeBtnGroup">
              <NavLink to="/login" className="letstart">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
