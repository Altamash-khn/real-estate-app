export interface Property {
  $id: string;
  name: string;
  address: string;
  price: number;
  image: string;
  rating: number;
  type: string;
  description: string;
  facilities: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;

  agent: Agent;

  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];

  gallery: string[];
}

interface Agent {
  name: string;
  email: string;
  avatar: string;
}
