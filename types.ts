export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  imageUrl: string;
  isFeatured?: boolean;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  guestName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  bookingDate: string;
}

export enum SortOption {
  RECOMMENDED = 'Recommended',
  PRICE_LOW_HIGH = 'Price: Low to High',
  PRICE_HIGH_LOW = 'Price: High to Low',
  RATING = 'Guest Rating'
}