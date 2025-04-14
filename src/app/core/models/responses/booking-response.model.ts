export interface Booking {
    id: string;
    pgId: string;
    pgName: string;
    location: string;
    city: string;
    price: number;
    image: string;
    description: string;
    features: {
      cleaning: boolean;
      wifi: boolean;
      food: boolean;
    };
    rating: number;
    contact: string;
    userName: string;
    userEmail: string;
    userId: string;
    date: string; 
    status: string;
  }
  