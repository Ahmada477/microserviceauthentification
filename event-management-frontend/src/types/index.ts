export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'ORGANIZER' | 'USER';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'ORGANIZER' | 'USER';
}

export interface AuthResponse {
  accessToken: string;  // ← Note: accessToken, pas token
  refreshToken: string;
  user?: User;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  createdBy: string;
}

export interface Guest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  eventId: number;
  eventName: string;
  createdByUserId: number;
  createdByUsername: string;
  createdByEmail: string;
  createdAt: string;
  updatedAt?: string;
  active?: boolean;
}

export interface Registration {
  id: number;
  eventId: number;
  eventTitle: string;
  guestId: number;
  guestName: string;
  userId: number;
  userName: string;
  userEmail?: string;
  registrationDate: string;
  registrationDateTime: string;
  qrCode: string;
  checkedIn: boolean;
  checkInDateTime?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export interface Logistics {
  id: number;
  eventId: number;
  location: string;
  equipment: string;
  capacity: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}