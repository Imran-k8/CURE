import React from 'react'

import HomePage from "./pages/Homepage.jsx";
import SignUpPage from './pages/SignUpPage.jsx';
import Verify from './pages/Verify.jsx';
import LogInPage from './pages/LogInPage.jsx';
import Navbar from "./components/Navbar.jsx" 
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, checkRole, role } = useAuthStore();

  useEffect(() => {
    checkAuth();
    checkRole();
  }, [checkAuth, checkRole]);


  return (
    <>
     <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/verify/:token" element={<Verify/>} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App