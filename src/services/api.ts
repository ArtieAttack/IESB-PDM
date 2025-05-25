/*import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Token storage key - deve ser o mesmo usado no AuthProvider
const AUTH_TOKEN_KEY = "@Auth:token";

// Crie a instância base do Axios
const api = axios.create({
  baseURL: "http://192.168.0.37:5000", // Substitua pela URL do seu backend
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para requisições - útil para adicionar tokens de autenticação
api.interceptors.request.use(
  async (config) => {
    // Recupera o token do AsyncStorage
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

    // Adiciona o token ao header Authorization se ele existir
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respostas - útil para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erros globais
    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error("Erro na API:", error.response.data);

      // Tratamento para erros de autenticação
      if (error.response.status === 401) {
        // Limpa os dados de autenticação quando o token estiver inválido
        AsyncStorage.multiRemove([AUTH_TOKEN_KEY, "@Auth:user"]).catch((err) =>
          console.error("Erro ao remover dados de autenticação:", err)
        );
      }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error("Sem resposta do servidor:", error.request);
    } else {
      // Algo aconteceu na configuração da requisição que causou o erro
      console.error("Erro na configuração:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
*/