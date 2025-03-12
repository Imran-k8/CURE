import React from 'react'

import HomePage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx" 
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  return (
    <>
     <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App