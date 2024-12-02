import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Dumbbell className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">FitHub</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/packages" className="text-white hover:text-gray-200">Packages</Link>
            <Link to="/trainers" className="text-white hover:text-gray-200">Trainers</Link>
            <Link to="/login" className="flex items-center text-white hover:text-gray-200">
              <User className="h-5 w-5 mr-1" />
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}