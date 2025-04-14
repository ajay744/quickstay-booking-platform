export interface BookingRequest {
    pgId: string;
    pgName: string;
    pgType: string;
    location: string;
    city: string;
    price: number;
    image: string;
    description: string;
    features: {
      cleaning?: boolean;
      ac?: boolean;
      wifi?: boolean;
      food?: boolean;
      laundry?: boolean;
    };
    rating: number;
    contact: string;
    userName: string;
    userEmail: string;
    userId: string;
    date: Date;
    status: string;
  }
  