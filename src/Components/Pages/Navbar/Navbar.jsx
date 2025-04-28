import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link component
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useDarkMode } from "../../../context/DarkModeContext";  // Correct path

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();  // Use context hook

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsVisualizerOpen(false);
  };

  const toggleVisualizer = () => {
    setIsVisualizerOpen(!isVisualizerOpen);
  };

  const menuLinks = [
    { to: "/scan", label: "SCAN" },
    { to: "/cscan", label: "C-SCAN" },
    { to: "/look", label: "LOOK" },
    { to: "/clook", label: "C-LOOK" }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 p-4 text-black dark:text-white flex justify-between items-center relative shadow-md">
      <div className="text-3xl font-bold tracking-wide text-purple-600 dark:text-purple-400">AlgoDisk</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-10 text-lg mx-auto">
        <ul className="flex gap-10">
          <li className="list-none hover:text-purple-400 cursor-pointer transition-colors duration-300">
            <Link to="/">Home</Link>
          </li>

          <div className="relative">
            <div
              className="flex items-center gap-1 hover:text-purple-400 cursor-pointer transition-colors duration-300"
              onClick={toggleVisualizer}
            >
              Visualizer <ChevronDown size={18} />
            </div>

            {isVisualizerOpen && (
              <ul className="absolute left-0 mt-2 bg-gray-200 dark:bg-gray-800 rounded shadow-lg w-[220px] text-center z-20">
                {menuLinks.map((link) => (
                  <li
                    key={link.to}
                    className="px-6 py-4 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <li className="list-none hover:text-purple-400 cursor-pointer transition-colors duration-300">Contact</li>
        </ul>
      </div>

      {/* Dark Mode Toggle Button */}
      <button 
        onClick={toggleDarkMode}
        className="ml-4 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Mobile Menu Icon */}
      <div className="md:hidden cursor-pointer z-30" onClick={toggleMenu}>
        {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-200 dark:bg-gray-800 flex flex-col items-center gap-4 py-6 shadow-lg md:hidden z-20">
          <ul className="flex flex-col items-center gap-4">
            <li className="list-none hover:text-purple-400 cursor-pointer transition-colors duration-300">
              <Link to="/">Home</Link>
            </li>

            <div className="flex flex-col items-center">
              <div 
                className="flex items-center gap-1 hover:text-purple-400 cursor-pointer transition-colors duration-300"
                onClick={toggleVisualizer}
              >
                Visualizer <ChevronDown size={18} />
              </div>

              {isVisualizerOpen && (
                <ul className="mt-2 bg-gray-300 dark:bg-gray-700 rounded shadow-lg w-[220px] text-center">
                  {menuLinks.map((link) => (
                    <li
                      key={link.to}
                      className="px-4 py-3 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <li className="list-none hover:text-purple-400 cursor-pointer transition-colors duration-300">Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
