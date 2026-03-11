export interface User {
  id: string;
  email: string;
  name: string;
  created_at?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface SkinAnalysis {
  id: string;
  user_id: string;
  skin_type: string;
  skin_tone: string;
  concerns: string[];
  scores: Record<string, number>;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image_url: string;
  rating: number;
}

export interface SkincareRoutine {
  id: string;
  morning_routine: Product[];
  evening_routine: Product[];
  budget_level: string;
}