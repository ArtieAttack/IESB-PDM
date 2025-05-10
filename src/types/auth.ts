export interface User {
  id: string;
  name: string;
  email: string;
  // Adicione mais campos conforme necessário
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  // Adicione mais campos conforme necessário
}