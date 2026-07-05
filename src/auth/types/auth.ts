export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "PASSENGER" | "DRIVER";
}

export interface AuthResponse {
  token: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "PASSENGER" | "DRIVER";
  available: boolean;
  rating: number;
}