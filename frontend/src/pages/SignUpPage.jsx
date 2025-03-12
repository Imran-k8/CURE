import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaKey } from "react-icons/fa";
import MeshAnimation from "../components/MeshAnimation";
import { useAuthStore } from "../store/useAuthStore";

import toast from "react-hot-toast";


const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        affiliation: "",
        adminCode: "",
      });
    
    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
        if (!formData.affiliation.trim()) return toast.error("Affiliations required");
    
        return true;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const success = validateForm();
    
        if (success === true) signup(formData);
      };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between text-white relative overflow-hidden px-8 bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MeshAnimation />
      </div>
      
      {/* Left Side - Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="relative z-10 lg:w-1/2 text-center lg:text-left"
      >
        <h1 className="text-5xl font-extrabold text-white">Join the CURE Network</h1>
        <p className="text-lg text-gray-300 mt-6 max-w-lg">
          Connect with researchers, collaborate on groundbreaking projects, and publish your work with us.
        </p>
      </motion.div>
      
      {/* Right Side - Signup Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-2xl p-10 lg:w-2/5 bg-black bg-opacity-30 backdrop-blur-lg rounded-lg border border-gray-700 mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Create an Account</h2>
        <form onSubmit={handleSubmit}  className="space-y-8">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <div className="flex items-center bg-white text-black rounded-md p-3 gap-2">
              <FaUser className="text-gray-700" />
              <input type="text" placeholder="John Doe" className="w-full bg-transparent focus:outline-none" value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="flex items-center bg-white text-black rounded-md p-3 gap-2">
              <FaEnvelope className="text-gray-700" />
              <input type="email" placeholder="example@email.com" className="w-full bg-transparent focus:outline-none" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="flex items-center bg-white text-black rounded-md p-3 gap-2">
              <FaLock className="text-gray-700" />
              <input type="password" placeholder="*********" className="w-full bg-transparent focus:outline-none" value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Affiliations</label>
            <div className="flex items-center bg-white text-black rounded-md p-3 gap-2">
              <FaBuilding className="text-gray-700" />
              <input type="text" placeholder="University of Toronto" className="w-full bg-transparent focus:outline-none" value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}/>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Admin Code (if applicable)</label>
            <div className="flex items-center bg-white text-black rounded-md p-3 gap-2">
              <FaKey className="text-gray-700" />
              <input type="text" placeholder="Admin123" className="w-full bg-transparent focus:outline-none" value={formData.adminCode}
                  onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg rounded-md font-bold cursor-pointer">Sign Up</button>
        </form>
        <p className="text-gray-400 text-center mt-8">
          Already have an account? <a href="/login" className="text-red-500 hover:underline">Log in</a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
