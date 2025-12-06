import React, { useState } from 'react';
import { X, Calendar, CheckCircle } from 'lucide-react';
import { Hotel, Booking } from '../types';
import { createBooking } from '../services/bookingService';

interface BookingModalProps {
  hotel: Hotel;
  searchParams: { checkIn: string; checkOut: string; guests: number };
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, searchParams, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: ''
  });

  const checkIn = searchParams.checkIn || new Date().toISOString().split('T')[0];
  const checkOut = searchParams.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  // Calculate nights
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const totalPrice = diffDays * hotel.pricePerNight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      hotelId: hotel.id,
      hotelName: hotel.name,
      guestName: formData.guestName,
      email: formData.email,
      checkIn,
      checkOut,
      guests: searchParams.guests,
      totalPrice,
      bookingDate: new Date().toISOString()
    };

    createBooking(newBooking);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-6">
            You are all set for your stay at <strong>{hotel.name}</strong>. A confirmation email has been sent to {formData.email}.
          </p>
          <button 
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Secure Booking</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Summary */}
            <div className="md:w-1/3 order-2 md:order-1 bg-slate-50 p-4 rounded-xl h-fit border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">{hotel.name}</h3>
              <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Check-in</span>
                  <span className="font-medium text-slate-900">{checkIn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Check-out</span>
                  <span className="font-medium text-slate-900">{checkOut}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Guests</span>
                  <span className="font-medium text-slate-900">{searchParams.guests}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-base">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:w-2/3 order-1 md:order-2 space-y-4">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Guest Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="John Doe"
                  value={formData.guestName}
                  onChange={e => setFormData({...formData, guestName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mt-4">
                <p>🔒 Your payment information is safe. You won't be charged until you arrive at the property.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition mt-6"
              >
                Complete Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;