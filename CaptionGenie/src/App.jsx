import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/authSlice";
import Login from "./pages/LoginPage/LoginPage";
import SigninPage from "./Pages/SigninPage/SinginPage";
import Profile from "./pages/ProfilePage/Profile";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Apply dark mode on load and when toggled
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/profile" /> : <HomePage />} />
          <Route path="/signin" element={user ? <Navigate to="/profile" /> : <SigninPage />} />
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginPage />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
