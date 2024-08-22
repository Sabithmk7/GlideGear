import React from 'react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-9xl font-extrabold text-gray-800">404</div>
        <h1 className="text-4xl font-semibold text-gray-700 mt-4">Oops! Page not found</h1>
        <p className="text-gray-600 mt-2">The page you are looking for might have been moved or deleted.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
