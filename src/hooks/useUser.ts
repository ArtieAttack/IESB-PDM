import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../providers/AuthProvider';
import { User } from '../types/auth';

// Chave para o cache da query
const USER_PROFILE_KEY = 'userProfile';

// Hook para buscar e gerenciar dados do usuário logado
export function useUser() {
  const { isAuthenticated, token } = useAuth();
  const queryClient = useQueryClient();
  
  // Query para buscar o perfil do usuário
  const { 
    data: user, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: [USER_PROFILE_KEY],
    queryFn: async () => {
      const response = await api.get('/user/profile');
      return response.data;
    },
    // Só executa a query se o usuário estiver autenticado
    enabled: !!isAuthenticated && !!token,
  });
  
  // Mutation para atualizar o perfil do usuário
  const updateProfileMutation = useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const response = await api.put('/user/profile', userData);
      return response.data;
    },
    // Quando a atualização for bem-sucedida, atualizamos o cache
    onSuccess: (newData) => {
      queryClient.setQueryData([USER_PROFILE_KEY], newData);
    },
  });

  return {
    user,
    isLoading,
    error,
    refetch,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
}