import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getBookings, deleteBooking } from '../services/bookingService';
import { Booking } from '../types';
import { Calendar, Trash2 } from 'lucide-react';

const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      deleteBooking(id);
      setBookings(getBookings());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Trips</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600 font-medium mb-2">No trips booked yet</p>
            <p className="text-slate-400">Time to dust off your bags and start planning your next adventure.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-blue-600 px-6 py-3 flex justify-between items-center text-white">
                    <span className="font-semibold text-sm opacity-90">Booking ID: {booking.id}</span>
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded">Confirmed</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-900">{booking.hotelName}</h2>
                    <span className="text-2xl font-bold text-slate-900 mt-2 md:mt-0">${booking.totalPrice}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 mb-6">
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Check In</p>
                        <p className="font-medium text-slate-800 text-lg">{booking.checkIn}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Check Out</p>
                        <p className="font-medium text-slate-800 text-lg">{booking.checkOut}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Guest</p>
                        <p className="font-medium text-slate-800 text-lg">{booking.guestName}</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => handleCancel(booking.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;