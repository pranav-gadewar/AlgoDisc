import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10 mt-10">
      <div className="container mx-auto px-6">
        {/* Footer Top - Social Media Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white hover:text-blue-600 transition-transform transform hover:scale-110"
            title="Follow us on Facebook"
          >
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-white hover:text-blue-400 transition-transform transform hover:scale-110"
            title="Follow us on Twitter"
          >
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-blue-700 transition-transform transform hover:scale-110"
            title="Follow us on LinkedIn"
          >
            <i className="fab fa-linkedin-in text-2xl"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white hover:text-pink-600 transition-transform transform hover:scale-110"
            title="Follow us on Instagram"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>

        {/* Footer Middle - Small Navigation Panel */}
        <div className="flex justify-center gap-8 mb-6">
          <nav>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-400 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gray-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-gray-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Footer Bottom - Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} "Car Distributors" Org. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
