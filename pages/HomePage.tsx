import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchHero from '../components/SearchHero';
import HotelCard from '../components/HotelCard';
import BookingModal from '../components/BookingModal';
import { fetchFeaturedHotels } from '../services/geminiService';
import { Hotel } from '../types';
import { Star, TrendingUp, ShieldCheck } from 'lucide-react';

const HomePage: React.FC = () => {
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    const loadFeatured = async () => {
      const hotels = await fetchFeaturedHotels();
      setFeaturedHotels(hotels);
      setLoading(false);
    };
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <SearchHero />

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 mt-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="bg-blue-100 p-3 rounded-full">
                    <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">Best Prices Guaranteed</h3>
                    <p className="text-sm text-slate-500">Find a lower price? We'll match it.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">Hand-picked Hotels</h3>
                    <p className="text-sm text-slate-500">Curated for quality and comfort.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="bg-blue-100 p-3 rounded-full">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">Secure Booking</h3>
                    <p className="text-sm text-slate-500">Your data is always protected.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Trending Destinations</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-xl h-64 shadow-sm animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {featuredHotels.map(hotel => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                onBook={(h) => setSelectedHotel(h)} 
              />
            ))}
          </div>
        )}
      </div>

      {selectedHotel && (
        <BookingModal 
          hotel={selectedHotel} 
          searchParams={{
            checkIn: '',
            checkOut: '',
            guests: 2
          }}
          onClose={() => setSelectedHotel(null)} 
        />
      )}
    </div>
  );
};

export default HomePage;