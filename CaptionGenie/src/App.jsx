import React, { useEffect } from "react";
import { BrowserRouter , Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/authSlice";
import Login from "./pages/LoginPage/LoginPage";
import SigninPage from "./Pages/SigninPage/SinginPage";
import Profile from "./pages/ProfilePage/Profile";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () =>{
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return(
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes >
        <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/signin" element={user ? <Navigate to="/profile" /> : <SigninPage />} />
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginPage />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </>
  )};
  export default App;