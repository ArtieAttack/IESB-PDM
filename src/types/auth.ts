export interface User {
  id: string;
  email: string;
  name: string;
  image: string; // URL da imagem do usuário
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
  username: string;
  name: string;
  email: string;
  password: string;
  // Adicione mais campos conforme necessário
}
