import React from "react";

function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://via.placeholder.com/1600x900')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 space-y-6 max-w-5xl">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate__animated animate__fadeIn animate__delay-1s">
          Welcome to Our Project
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text px-6 animate__animated animate__fadeIn animate__delay-2s">
          "Disk Scheduling Algorithms Visualizer"
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl max-w-3xl animate__animated animate__fadeIn animate__delay-3s">
          Our disk scheduling algorithms visualizer will help you understand how disk scheduling algorithms work. 
          You can visualize the movement of the disk arm and see how algorithms like SCAN, C-SCAN, LOOK and C-LOOK handle scheduling.
        </p>

        {/* Call to Action Button */}
        <button className="bg-purple-600 hover:bg-purple-500 text-white py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
          Visualizer
        </button>

      </div>
    </section>
  );
}

export default Hero;
