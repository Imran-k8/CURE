import React from "react";
import iveyLogo from "../assets/ivey.png";
import westernLogo from "../assets/western.png";

const AboutUs = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-16 px-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-6">About Us</h2>
      <p className="text-lg text-gray-300 max-w-3xl text-center mb-6">
        CURE Network is dedicated to advancing undergraduate research by providing students with a
        professional platform to showcase their work. We support student-driven research across various disciplines,
        offering mentorship, publication opportunities, and networking with industry professionals.
      </p>
      <p className="text-lg text-gray-300 max-w-3xl text-center mb-6">
        We are proud to be <span className="text-red-500 font-semibold">funded by the Ivey School of Business</span> and have
        <span className="text-red-500 font-semibold"> institutional backing from Western University</span>, ensuring
        credibility, academic rigor, and growth opportunities for researchers in our community.
      </p>
      
      <div className="flex justify-center items-center gap-12 mt-8">
        <img src={iveyLogo} alt="Ivey School of Business" className="h-15" />
        <img src={westernLogo} alt="Western University" className="h-20" />
      </div>
    </div>
  );
};

export default AboutUs;
