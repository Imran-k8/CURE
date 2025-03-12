import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const canvasRef = useRef(null);
  let nodes = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight * 0.7); // Reduce height to cut off below the logo
    
    const numNodes = 80; // Increased number of nodes
    const maxDistance = 120; // Adjusted distance for smoother connections
    const minDistance = 50;
    const attractionRadius = 150;
    const convergeForce = 0.1;
    const repulseForce = 0.3;
    const maxSpeed = 1.2; // Slightly reduced speed for a smoother effect

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 0.7; // Ensure it resizes properly
    };
    window.addEventListener("resize", resize);
    resize();
    
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, width, height);
      
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const alpha = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <div className="relative w-full h-[70vh] flex flex-col items-center justify-center text-center bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <h1 className="text-6xl font-extrabold text-white">Welcome to the Future</h1>
        <p className="text-lg text-gray-300 mt-4">
          Welcome to the future of undergraduate research.
        </p>
        <motion.img
          src="https://res.cloudinary.com/dlokrrvf0/image/upload/v1741728626/CURE_onsf0e.png"
          alt="CURE Logo"
          className="h-70 w-70 opacity-80 rounded-full mt-6 border-4 border-gray-600 mx-auto"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
