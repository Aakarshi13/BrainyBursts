import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700">
          For inquiries, feedback, or support, feel free to reach out to us at:
        </p>
        <p className="text-blue-500 underline mt-2">
          <a href="mailto:support@brainyquiz.com">support@brainyquiz.com</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
