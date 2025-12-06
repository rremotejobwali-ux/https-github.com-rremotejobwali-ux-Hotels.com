import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900 tracking-tight">StayFinder</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/my-bookings" className="text-slate-600 hover:text-blue-600 font-medium transition">My Bookings</Link>
            <div className="text-slate-600 hover:text-blue-600 font-medium transition cursor-pointer">Support</div>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/my-bookings" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition">
              <Briefcase className="w-4 h-4" />
              Trips
            </Link>
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;