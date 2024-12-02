export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface Package {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  image: string;
}

export interface Membership {
  id: string;
  memberId: string;
  packageId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired';
}