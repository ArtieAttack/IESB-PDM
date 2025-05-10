import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState, LoginCredentials, SignUpData, User } from "../types/auth";
import api from "../services/api";

// Valores iniciais para o contexto
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

// Definição da interface do contexto
interface AuthContextData extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
}

// Criação do contexto
const AuthContext = createContext<AuthContextData>({
  ...initialState,
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
});

// Chaves para armazenamento no AsyncStorage
const AUTH_TOKEN_KEY = "@Auth:token";
const AUTH_USER_KEY = "@Auth:user";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(initialState);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const [token, user] = await Promise.all([
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
          AsyncStorage.getItem(AUTH_USER_KEY),
        ]);

        if (token && user) {
          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          setData({
            token,
            user: JSON.parse(user),
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setData((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Erro ao carregar dados de autenticação:", error);
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    }

    loadStoredData();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log("Login credentials:", credentials);

      // Substitua esta chamada pela sua API real
      const response = await api.post("/auth", credentials);

      console.log("Login response:", response.data);

      const { accessToken, email, id, image, name } = response.data;

      console.log("AcessToken:", accessToken);
      console.log("User data:", { email, id, image, name });

      // Atualiza os headers da API com o token
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // Armazena os dados de autenticação no AsyncStorage
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({ email, id, image, name })
      );

      setData({
        token: accessToken,
        user: { email, id, image, name },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      // Substitua esta chamada pela sua API real
      const response = await api.post("/user", data);

      const auth = await api.post("/auth", {
        email: data.email,
        password: data.password,
      });

      const { accessToken, email, id, image, name } = auth.data;

      // Atualiza os headers da API com o token
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // Armazena os dados de autenticação no AsyncStorage
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify({ email, id, image, name }));

      setData({
        token: accessToken,
        user: { email, id, image, name },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Remove os dados de autenticação do AsyncStorage
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, AUTH_USER_KEY]);

      // Remove o header de autorização
      delete api.defaults.headers.common.Authorization;

      setData({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...data,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para utilizar o contexto de autenticação
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
