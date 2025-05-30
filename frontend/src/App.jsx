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
import ContactPage from './pages/ContactPage.jsx';
import TermsConditions from "./pages/TermsConditions.jsx";
import PaperDetails from "./pages/PaperDetails.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Navbar from "./components/Navbar.jsx" ;
import Footer from './components/Foorter.jsx';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import PaymentSuccess from './pages/PaymentSuccess.jsx';


const App = () => {
  const { isCheckingRole, isCheckingVerified, isCheckingAuth, authUser, checkAuth, checkRole, role, checkVerified, verified} = useAuthStore();

  useEffect(() => {
    checkAuth();
    checkRole();
    checkVerified();
  }, [checkAuth, checkRole, checkVerified]);

  if ((isCheckingAuth && !authUser))
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

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
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/terms-conditions" element={<TermsConditions/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/paper/:id" element={<PaperDetails/>} />
        <Route path="/profile/:id" element={authUser ? <ProfilePage/> : <HomePage/>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>

      <Footer />

      <Toaster />
    </>
  )
}

export default App