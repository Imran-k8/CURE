import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 px-8 flex flex-col items-center border-t border-gray-700">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Social Media Links */}
        <div className="flex items-center space-x-6">
          <a href="https://www.instagram.com/cure.journal/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition text-2xl">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/cure-network-941567353/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition text-2xl">
            <FaLinkedin />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0">
          <Link to="/about" className="text-gray-300 hover:text-red-500 transition">About Us</Link>
          <Link to="/terms" className="text-gray-300 hover:text-red-500 transition">Terms & Services</Link>
          <Link to="/privacy" className="text-gray-300 hover:text-red-500 transition">Privacy Policy</Link>
          <Link to="/contact" className="text-gray-300 hover:text-red-500 transition">Contact</Link>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-gray-500 text-sm mt-6">&copy; {new Date().getFullYear()} CURE Network. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
