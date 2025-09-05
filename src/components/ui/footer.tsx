import React from 'react';
import { Github, Linkedin, Mail, Brain, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-400 to-gray-900 text-white py-8 transition-all duration-300 hover:from-blue-500 hover:to-gray-800">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8">
          {/* About Section */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2 transition-transform duration-300 hover:scale-105">
              <Brain className="w-6 h-6 text-black" />
              <h3 className="text-xl text-black font-bold">About Brainy Bursts</h3>
            </div>
            <p className="text-sm text-blue-100 transition-colors duration-300 hover:text-white">
              Challenge your mind with our engaging quiz platform. Test your knowledge across various topics and track your progress.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 transition-transform duration-300 hover:scale-105">
              <Star className="w-6 h-6 text-black" />
              <h3 className="text-xl text-black font-bold">Quick Links</h3>
            </div>
            <div className="space-y-2">
              <Link to="/" className="block text-blue-100 hover:text-white transition-colors duration-300">Home</Link>
              <Link to="/high-scores" className="block text-blue-100 hover:text-white transition-colors duration-300">High Scores</Link>
              <Link to="/about" className="block text-blue-100 hover:text-white transition-colors duration-300">About</Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right space-y-3">
            <div className="flex items-center justify-center md:justify-end space-x-2 transition-transform duration-300 hover:scale-105">
              <Mail className="w-6 h-6 text-black" />
              <h3 className="text-xl text-black font-bold">Connect With Us</h3>
            </div>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://github.com/Aakarshi13" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 title="Visit GitHub Profile"
                 aria-label="GitHub Profile"
                 className="transform transition-all duration-300 hover:scale-110 hover:text-blue-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/aakarshi-singh" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 title="Visit LinkedIn Profile"
                 aria-label="LinkedIn Profile"
                 className="transform transition-all duration-300 hover:scale-110 hover:text-blue-200">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-blue-300/20 text-center space-y-2">
          <p className="text-sm transition-opacity duration-300 hover:opacity-80">
            &copy; 2025 Brainy Bursts. All rights reserved.
          </p>
          <p className="text-sm text-blue-100 transition-opacity duration-300 hover:opacity-80">
            Designed & Developed by Aakarshi Singh
          </p>
        </div>
      </div>
    </footer>
  );
};
