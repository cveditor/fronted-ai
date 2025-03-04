import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold text-red-500 mb-4">Accesso Negato</h1>
      <p className="text-xl mb-8">Non hai l'autorizzazione per accedere a questa pagina.</p>
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md">Vai al Login</Link>
    </div>
  );
};

export default AccessDenied;
