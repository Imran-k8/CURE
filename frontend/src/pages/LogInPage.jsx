import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import MeshAnimation from "../components/MeshAnimation";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const LogInPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    const { login } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
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
        <h1 className="text-5xl font-extrabold text-white">Welcome Back</h1>
        <p className="text-lg text-gray-300 mt-6 max-w-lg">
          Log in to access your account, manage your research, and engage with the CURE Network.
        </p>
      </motion.div>
      
      {/* Right Side - Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-xl p-10 lg:w-1/3 bg-black bg-opacity-40 backdrop-blur-lg rounded-lg border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="flex items-center bg-white text-black rounded-md p-3 gap-2">
              <FaEnvelope className="text-gray-700" />
              <input type="email" placeholder="example@email.com" className="w-full bg-transparent focus:outline-none" required  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="flex items-center bg-white text-black rounded-md p-3 gap-2">
              <FaLock className="text-gray-700" />
              <input type="password" placeholder="*********" className="w-full bg-transparent focus:outline-none" required value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            </div>
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg rounded-md font-bold cursor-pointer">Log In</button>
        </form>
        <p className="text-gray-400 text-center mt-8">
          Don't have an account? <a href="/signup" className="text-red-500 hover:underline">Sign Up</a>
        </p>
      </motion.div>
    </div>
  );
};

export default LogInPage;