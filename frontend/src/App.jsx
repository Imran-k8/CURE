import React from 'react'

import HomePage from "./pages/Homepage.jsx";
import SignUpPage from './pages/SignUpPage.jsx';
import Verify from './pages/Verify.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SearchResults from './pages/SearchResults.jsx';
import PublishWithUs from './pages/PublishWithUsPage.jsx';
import SubmissionForm from "./pages/SubmissionForm.jsx";
import AdminDashboard from './pages/AdminDashboard.jsx';
import SubmissionDetails from './pages/SubmissionDetails.jsx';
import Navbar from "./components/Navbar.jsx" ;
import Footer from './components/Foorter.jsx';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, checkRole, role, checkVerified, verified} = useAuthStore();

  useEffect(() => {
    checkAuth();
    checkRole();
    checkVerified();
  }, [checkAuth, checkRole, checkVerified]);


  return (
    <>
     <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/verify/:token" element={<Verify/>} />
        <Route path="/publish" element={<PublishWithUs/>} />
        <Route path="/submit-paper" element={verified ? <SubmissionForm /> : <Navigate to="/publish" />} />
        <Route path="/admin-dashboard" element={role.role==="Admin" ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/submission/:id" element={role.role==="Admin" ? <SubmissionDetails /> : <Navigate to="/" />} />
        <Route path="/search" element={<SearchResults/>} />
      </Routes>

      <Footer />

      <Toaster />
    </>
  )
}

export default App