import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions, loginUser } from "../../redux/reducers/user";
import { useEffect } from "react";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const {user,isAuthenticated,error,message,success} = useSelector((state) => state.user);

  const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const loginFunc = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      if (!ValidateEmail(email)) {
        toast.error("Enter a valid email address", {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {


        dispatch(loginUser({email,password}));
      }
    } else {
      toast.error("Fill all Details !!", {
        style: {
          fontSize: "18px",
          letterSpacing: "1px",
        },
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/welcome`);
    }
    if (error) {
      console.log(`Error Occurred`);
    }
    dispatch(authActions.reset());
  },[dispatch,navigate,isAuthenticated])

  return (
    <>
      <Navbar />
      <div className="LoginContainer">
        <ToastContainer theme="colored" />
        <div className="LoginMain">
          <div className="rightSideLogin">
            <div className="headerInfo">
              <h2>
                Exit Poll Based <br />
                on Blockchain
              </h2>
            </div>

            <h3>Login Here</h3>
            <form action="/login" method="post" className="formOfLogin">
              <div className="inputBox">
                <i className="fa-solid fa-user"></i>
                <input
                  className="inputField"
                  type="email"
                  name="userEmail"
                  placeholder="Enter your Email"
                  id="userEmail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="inputBox">
                <i className="fa-solid fa-key"></i>
                <input
                  className="inputField"
                  type="password"
                  name="userPassword"
                  placeholder="Enter your Password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <input type="submit" className="loginBtn" onClick={loginFunc} />
            </form>

            <div className="moreoption">
              <h5>Not registered yet ? </h5>
              <NavLink to="/signup">Create an Account</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
