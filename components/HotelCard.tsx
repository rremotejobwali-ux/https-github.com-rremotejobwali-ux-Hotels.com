import React from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onBook }) => {
  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-3 h-3" />;
    if (lower.includes('park') || lower.includes('valet')) return <Car className="w-3 h-3" />;
    if (lower.includes('breakfast') || lower.includes('coffee')) return <Coffee className="w-3 h-3" />;
    if (lower.includes('restaurant') || lower.includes('dining')) return <Utensils className="w-3 h-3" />;
    return <Star className="w-3 h-3" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition duration-200">
      <div className="md:w-72 h-48 md:h-auto flex-shrink-0 relative">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name} 
          className="w-full h-full object-cover"
        />
        {hotel.isFeatured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{hotel.name}</h3>
              <div className="flex items-center text-slate-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {hotel.location}
              </div>
            </div>
            <div className="flex flex-col items-end">
               {hotel.rating >= 4.5 ? (
                 <span className="bg-green-700 text-white text-sm font-bold px-2 py-1 rounded">
                   {hotel.rating} / 5
                 </span>
               ) : (
                 <span className="bg-blue-700 text-white text-sm font-bold px-2 py-1 rounded">
                   {hotel.rating} / 5
                 </span>
               )}
               <span className="text-xs text-slate-500 mt-1">{hotel.reviewsCount} reviews</span>
            </div>
          </div>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                {getAmenityIcon(amenity)}
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-xs text-slate-400 self-center">+{hotel.amenities.length - 4} more</span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-4 border-t border-slate-100 pt-4">
          <div className="text-green-600 text-sm font-medium">
             Fully refundable
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-500">Price per night</div>
             <div className="text-2xl font-bold text-slate-900">${hotel.pricePerNight}</div>
             <div className="text-xs text-slate-400">includes taxes & fees</div>
             <button 
                onClick={() => onBook(hotel)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition w-full md:w-auto"
              >
                Reserve
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;