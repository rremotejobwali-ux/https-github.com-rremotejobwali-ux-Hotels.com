import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchHero from '../components/SearchHero';
import HotelCard from '../components/HotelCard';
import BookingModal from '../components/BookingModal';
import { fetchHotelsByLocation } from '../services/geminiService';
import { Hotel, SortOption } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';

const SearchResultsPage: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  
  const location = queryParams.get('location') || '';
  const checkIn = queryParams.get('checkIn') || '';
  const checkOut = queryParams.get('checkOut') || '';
  const guests = parseInt(queryParams.get('guests') || '2');

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.RECOMMENDED);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  
  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      if (location) {
        const results = await fetchHotelsByLocation(location);
        setHotels(results);
      }
      setLoading(false);
    };
    loadHotels();
  }, [location]);

  const filteredAndSortedHotels = useMemo(() => {
    let result = hotels.filter(h => 
      h.pricePerNight >= priceRange[0] && 
      h.pricePerNight <= priceRange[1] &&
      h.rating >= minRating
    );

    switch (sortBy) {
      case SortOption.PRICE_LOW_HIGH:
        result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case SortOption.PRICE_HIGH_LOW:
        result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case SortOption.RATING:
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original AI ranking (Recommended)
        break;
    }
    return result;
  }, [hotels, sortBy, priceRange, minRating]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchHero variant="compact" initialParams={{ location, checkIn, checkOut, guests }} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                 <Filter className="w-5 h-5 text-blue-600" />
                 <h2 className="font-bold text-lg text-slate-900">Filters</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-slate-700 mb-2 text-sm">Price Range</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span>${priceRange[0]}</span>
                  <span>-</span>
                  <span>${priceRange[1]}+</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="50"
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-700 mb-3 text-sm">Guest Rating</h3>
                <div className="space-y-2">
                  {[4.5, 4, 3].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating" 
                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        checked={minRating === r}
                        onChange={() => setMinRating(r)}
                      />
                      <span className="text-sm text-slate-600">{r}+ stars</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating" 
                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        checked={minRating === 0}
                        onChange={() => setMinRating(0)}
                      />
                      <span className="text-sm text-slate-600">Any</span>
                    </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-slate-900">
                {location ? `${filteredAndSortedHotels.length} properties in ${location}` : 'Search Results'}
              </h1>
              
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <select 
                  className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  {Object.values(SortOption).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-xl h-64 w-full animate-pulse shadow-sm"></div>
                  ))}
                  <p className="text-center text-slate-500 mt-4">Asking Gemini to find the best hotels...</p>
               </div>
            ) : filteredAndSortedHotels.length > 0 ? (
              <div className="space-y-6">
                {filteredAndSortedHotels.map(hotel => (
                  <HotelCard 
                    key={hotel.id} 
                    hotel={hotel} 
                    onBook={(h) => setSelectedHotel(h)} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <p className="text-lg text-slate-600 font-medium">No hotels found matching your criteria.</p>
                <button 
                  onClick={() => { setMinRating(0); setPriceRange([0, 1000]); }}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedHotel && (
        <BookingModal 
          hotel={selectedHotel}
          searchParams={{ checkIn, checkOut, guests }}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;