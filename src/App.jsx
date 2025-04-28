import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';  // Correct path
import Navbar from './Components/Pages/Navbar/Navbar';  // Correct path
import Hero from './Components/Pages/HeroSection/Hero';  // Correct path
import Members from './Components/Pages/Members/Members';  // Correct path
import Footer from './Components/Pages/Footer/Footer';  // Correct path
import SCAN from './Components/Pages/Algorithms/SCAN';  // Correct import path for SCAN
import CSCAN from './Components/Pages/Algorithms/C-SCAN';  // Correct import path for C-SCAN
import LOOK from './Components/Pages/Algorithms/LOOK';  // Correct import path for LOOK
import CLOOK from './Components/Pages/Algorithms/C-LOOK';  // Correct import path for C-LOOK
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<><Hero /><Members /></>} /> {/* Home Route */}
            <Route path="/scan" element={<SCAN />} />  {/* SCAN page route */}
            <Route path="/cscan" element={<CSCAN />} />  {/* C-SCAN page route */}
            <Route path="/look" element={<LOOK />} />  
            <Route path="/clook" element={<CLOOK />} />  
            <Route path="/members" element={<Members />} />
          </Routes>
          <Footer /> {/* Footer should be rendered outside of Routes to avoid duplication */}
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
