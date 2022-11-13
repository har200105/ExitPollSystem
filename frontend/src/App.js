import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./screens/Home/Home";
import Welcome from "./screens/Welcome/Welcome";
import Register from "./screens/Signup/Signup";
import Login from "./screens/Login/Login";
import Voters from "./screens/Voters/Voters";
import Candidates from "./screens/Candidates/Candidates";
import Result from "./screens/Result/Result";
import Voting from "./screens/Voting/Voting";
import AddCandidates from "./screens/Candidates/AddCandidates";
import VoteRegistration from "./screens/Voters/VoterRegistration";
import ChangePhase from "./screens/Admin/ChangePhase/ChangePhase";
import AdminWelcome from "./screens/Admin/AdminWelcome/AdminWelcome";
import {useDispatch, useSelector} from "react-redux";
import { loadUser } from "./redux/reducers/user";
import { ProtectedRoute } from "protected-route-react"; 


const App = () => {

  const { user, isAuthenticated,isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser());
    }
  }, [dispatch]);



  useEffect(() => {
     navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);



  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/welcome" element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/login"
            >
              <Welcome/>
            </ProtectedRoute>
        } />
          <Route exact path="/admin-welcome"
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                adminRoute={true}
                redirect="/login"
                redirectAdmin="/login"
            >
              <AdminWelcome/>
            </ProtectedRoute>
            }
          />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register/>} />
          <Route exact path="/result" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}
              redirect="/login"
            >
              <Result/>
            </ProtectedRoute>
        } />
          <Route exact path="/voter-registration" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}
              redirect="/login"
            >
              <VoteRegistration />
            </ProtectedRoute>
            } />
          <Route exact path="/voters" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              adminRoute={true}
              redirect="/login"
              redirectAdmin="/login"
            >
              <Voters/>
            </ProtectedRoute>
        } />
          <Route exact path="/candidates" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}
              redirect="/login"
            >
              <Candidates />
            </ProtectedRoute>
            } />
          <Route exact path="/voting" element={
             <ProtectedRoute isAuthenticated={isAuthenticated}
              redirect="/login"
            >
             <Voting />
            </ProtectedRoute>
           } />
          <Route exact path="/change-phase" element={
             <ProtectedRoute isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              adminRoute={true}
              redirect="/login"
              redirectAdmin="/login"
            >
             <ChangePhase />
            </ProtectedRoute>
            } />
          <Route exact path="/add-candidates" element={
             <ProtectedRoute isAuthenticated={isAuthenticated}
              isAdmin={user && user.role === 'admin'}
              redirect="/login"
            >
            <AddCandidates />
            </ProtectedRoute>
            } />
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
