export interface PrivateRoomPg {
    id: string;
    pgType: string;
    name: string;
    location: string;
    city: string;
    price: number;
    image: string;
    description: string;
    features: {
      ac: boolean;
      wifi: boolean;
      food: boolean;
      laundry: boolean;
    };
    rating: number;
    contact: string;
  }
  