import axios from 'axios';

// Crie a instância base do Axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // Substitua pela URL do seu backend
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para requisições - útil para adicionar tokens de autenticação
api.interceptors.request.use(
  (config) => {
    // Você pode adicionar um token de autenticação aqui
    // const token = AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
      console.error('Erro na API:', error.response.data);
      
      // Você pode tratar diferentes códigos de erro aqui
      // if (error.response.status === 401) {
      //   // Redirecionar para login, por exemplo
      // }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Sem resposta do servidor:', error.request);
    } else {
      // Algo aconteceu na configuração da requisição que causou o erro
      console.error('Erro na configuração:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;