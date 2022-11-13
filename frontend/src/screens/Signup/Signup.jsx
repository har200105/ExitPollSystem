import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Signup.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/reducers/user";
import { useEffect } from "react";

const Register = () => {

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const {user,isAuthenticated,error,message,success} = useSelector((state) => state.user);

  const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  };


  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const RegistersFunc = async (e) => {
    e.preventDefault();
    const { firstname, lastname, phoneno, email, password } =
      userDetails;

    if (
      firstname !== "" &&
      lastname !== "" &&
      phoneno !== "" &&
      email !== "" &&
      password !== "" 
    ) {
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
          dispatch(signupUser(userDetails));
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
    }
  }


  useEffect(() => {
    if (error) {
      
    }

    if (message) {
      
    }

  },[dispatch,error,message,success])

  return (
    <>
      <Navbar />
      <div className="RegisterContainer">
        <div className="registerMain">
          <div className="rightSideRegister">
            <ToastContainer theme="colored" />
            <h1>Register Here</h1>
            <form method="POST" className="registerForm">
              <div className="nameInfoGrp">
                <div className="inputBoxRegister firstName">
                  <i className="fa-solid fa-user"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    id="fname"
                    className="RegisterInputField"
                    onChange={handleChanges}
                    value={userDetails.firstname}
                    required
                  />
                </div>

                <div className="inputBoxRegister">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    id="lname"
                    className="RegisterInputField"
                    onChange={handleChanges}
                    value={userDetails.lastname}
                    required
                  />
                </div>
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="number"
                  name="phoneno"
                  placeholder="Enter your contact number"
                  id="phoneno"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDetails.phoneno}
                  required
                />
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  id="email"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDetails.email}
                  required
                />
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDetails.password}
                  required
                />
              </div>

              <div className="btnGroupRegister">
                <input
                  type="submit"
                  className="regiterSbumtBtn"
                  onClick={RegistersFunc}
                />
              </div>
            </form>

            <div className="alreadyAccount">
              <h2>Already have an Account ? </h2>
              <NavLink to="/login" className="loginLink">
                Login Here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
