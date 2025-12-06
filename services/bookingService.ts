import { Booking } from "../types";

const STORAGE_KEY = 'stayfinder_bookings';

export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const createBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const deleteBooking = (id: string): void => {
  const bookings = getBookings();
  const updated = bookings.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};