import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { SearchParams } from '../types';

interface SearchHeroProps {
  initialParams?: Partial<SearchParams>;
  variant?: 'hero' | 'compact';
}

const SearchHero: React.FC<SearchHeroProps> = ({ initialParams, variant = 'hero' }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialParams?.location || '');
  const [checkIn, setCheckIn] = useState(initialParams?.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialParams?.checkOut || '');
  const [guests, setGuests] = useState(initialParams?.guests || 2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    const params = new URLSearchParams();
    params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', guests.toString());

    navigate(`/search?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <div className="bg-blue-900 py-4 shadow-lg">
        <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-3">
           <div className="flex-grow relative">
             <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
             <input
              type="text"
              placeholder="Where to?"
              className="w-full pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
           </div>
           <div className="flex gap-2 md:w-1/3">
             <input type="date" className="w-full px-3 py-2.5 rounded-md text-slate-700" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
             <input type="date" className="w-full px-3 py-2.5 rounded-md text-slate-700" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
           </div>
           <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2.5 px-6 rounded-md transition">
             Search
           </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative bg-blue-900 h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2649&auto=format&fit=crop" 
          alt="Luxury Pool" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 w-full max-w-5xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-md">
          Find your next stay
        </h1>
        <p className="text-blue-100 text-center mb-8 text-lg drop-shadow-sm">
          Search deals on hotels, homes, and much more...
        </p>

        <form onSubmit={handleSearch} className="bg-white p-2 rounded-lg shadow-2xl flex flex-col md:flex-row gap-2">
          <div className="flex-grow relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 py-4 rounded-md text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
              placeholder="Going to"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="h-px md:h-auto md:w-px bg-slate-200 mx-2"></div>

          <div className="flex-shrink-0 md:w-64 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600" />
            </div>
             <div className="flex items-center h-full pl-10 pr-2">
                <input 
                  type="date" 
                  className="w-full bg-transparent focus:outline-none text-slate-700 font-medium"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                />
             </div>
          </div>

          <div className="h-px md:h-auto md:w-px bg-slate-200 mx-2"></div>

           <div className="flex-shrink-0 md:w-64 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600" />
            </div>
             <div className="flex items-center h-full pl-10 pr-2">
                <input 
                  type="date" 
                  className="w-full bg-transparent focus:outline-none text-slate-700 font-medium"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                />
             </div>
          </div>
          
          <div className="h-px md:h-auto md:w-px bg-slate-200 mx-2"></div>

          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition duration-200 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchHero;