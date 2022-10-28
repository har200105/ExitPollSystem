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

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);



  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
          } else {
            console.log(`Permission not granted`);
          }
        });
    }
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
          <Route exact path="/admin-welcome" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}
              isAdmin={user && user.role === 'admin'}
              redirect="/login"
            >
              <AdminWelcome/>
            </ProtectedRoute>
        } />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register/>} />
        <Route exact path="/result" element={<Result />} />
          <Route exact path="/voter-registration" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}
              redirect="/login"
            >
              <VoteRegistration />
            </ProtectedRoute>
            } />
          <Route exact path="/voters" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}
                isAdmin={user && user.role === 'admin'}
              redirect="/login"
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
                isAdmin={user && user.role === 'admin'}
              redirect="/login"
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
