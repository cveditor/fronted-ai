import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SaaS AI 🚀</Link>

        <div className="hidden md:flex gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/notifications" className="hover:underline">Notifiche</Link>
              <Link to="/profile" className="hover:underline">Profilo</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Registrati</Link>
            </>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full bg-white text-blue-600">
            ⚙️
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-md shadow-lg">
              {user ? (
                <>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profilo</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">Impostazioni</Link>
                  <LogoutButton /> {/* Bottone di logout */}
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">Login</Link>
                  <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">Registrati</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
