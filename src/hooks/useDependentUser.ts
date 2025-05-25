import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useAuth } from "../providers/AuthProvider";

// Interface para os dados de usuário dependente
export interface Disease {
  id: string;
  name: string;
}

export interface DependentUser {
  id: string;
  name: string;
  description: string;
  image: string;
  birthDate: string;
  diseases?: Disease[];
  medications?: any[];
}

export interface CreateDependentUserData {
  name: string;
  description: string;
  birthDate: string;
  image?: string;
  diseases?: { id: string }[];
}

// Chave para o cache da query
export const DEPENDENT_USERS_QUERY_KEY = "dependentUsers";

// Hook para buscar e gerenciar usuários dependentes
export function useDependentUser() {
  const { isAuthenticated, token } = useAuth();
  const queryClient = useQueryClient();

  // Query para buscar todos os usuários dependentes
  const {
    data: dependentUsers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [DEPENDENT_USERS_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get("/dependent-user");
      return response.data;
    },
    // Só executa a query se o usuário estiver autenticado
    enabled: !!isAuthenticated && !!token,
  });

  // Query para buscar um usuário dependente específico
  const fetchDependentUser = async (id: string) => {
    const response = await api.get(`/dependent-user/${id}`);
    return response.data;
  };

  // Mutation para adicionar um novo usuário dependente
  const addDependentUserMutation = useMutation({
    mutationFn: async (userData: CreateDependentUserData) => {
      const response = await api.post("/dependent-user", userData);
      return response.data;
    },
    // Quando adicionar for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPENDENT_USERS_QUERY_KEY] });
    },
  });

  // Mutation para excluir um usuário dependente
  const deleteDependentUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/dependent-user/${id}`);
      return id;
    },
    // Quando excluir for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPENDENT_USERS_QUERY_KEY] });
    },
  });

  return {
    dependentUsers,
    isLoading,
    error,
    refetch,
    fetchDependentUser,
    addDependentUser: addDependentUserMutation.mutate,
    isAdding: addDependentUserMutation.isPending,
    addError: addDependentUserMutation.error,
    deleteDependentUser: deleteDependentUserMutation.mutate,
    isDeleting: deleteDependentUserMutation.isPending,
    deleteError: deleteDependentUserMutation.error,
  };
}
