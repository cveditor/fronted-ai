import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! La pagina che stai cercando non esiste.</p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-md">Torna alla Home</Link>
    </div>
  );
};

export default NotFound;
