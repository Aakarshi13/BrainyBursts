import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">About Brainy Quiz</h1>
        <p className="text-gray-700">
          Brainy Quiz is an interactive platform designed to test your knowledge and improve your skills in various topics. Whether you are a trivia enthusiast or just looking to learn something new, Brainy Quiz offers a fun and engaging experience for everyone.
        </p>
      </div>
    </div>
  );
};

export default About;
