import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useAuth } from "../providers/AuthProvider";

// Interface para os dados de doença
export interface Disease {
  id: string;
  name: string;
  users?: { id: string; name: string }[];
  dependentUsers?: { id: string; name: string; userId: string }[];
}

export interface CreateDiseaseData {
  name: string;
}

// Chave para o cache da query
export const DISEASES_QUERY_KEY = "diseases";

// Hook para buscar e gerenciar doenças
export function useDisease() {
  const { isAuthenticated, token } = useAuth();
  const queryClient = useQueryClient();

  // Query para buscar todas as doenças
  const {
    data: diseases,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [DISEASES_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get("/disease");
      return response.data;
    },
    // Só executa a query se o usuário estiver autenticado
    enabled: !!isAuthenticated && !!token,
  });

  // Query para buscar uma doença específica
  const fetchDisease = async (id: string) => {
    const response = await api.get(`/disease/${id}`);
    return response.data;
  };

  // Mutation para adicionar uma nova doença
  const addDiseaseMutation = useMutation({
    mutationFn: async (diseaseData: CreateDiseaseData) => {
      const response = await api.post("/disease", diseaseData);
      return response.data;
    },
    // Quando adicionar for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DISEASES_QUERY_KEY] });
    },
  });

  // Mutation para atualizar uma doença
  const updateDiseaseMutation = useMutation({
    mutationFn: async ({
      id,
      diseaseData,
    }: {
      id: string;
      diseaseData: Partial<CreateDiseaseData>;
    }) => {
      const response = await api.patch(`/disease/${id}`, diseaseData);
      return response.data;
    },
    // Quando atualizar for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DISEASES_QUERY_KEY] });
    },
  });

  // Mutation para excluir uma doença
  const deleteDiseaseMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/disease/${id}`);
      return id;
    },
    // Quando excluir for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DISEASES_QUERY_KEY] });
    },
  });

  return {
    diseases,
    isLoading,
    error,
    refetch,
    fetchDisease,
    addDisease: addDiseaseMutation.mutate,
    isAdding: addDiseaseMutation.isPending,
    addError: addDiseaseMutation.error,
    updateDisease: updateDiseaseMutation.mutate,
    isUpdating: updateDiseaseMutation.isPending,
    updateError: updateDiseaseMutation.error,
    deleteDisease: deleteDiseaseMutation.mutate,
    isDeleting: deleteDiseaseMutation.isPending,
    deleteError: deleteDiseaseMutation.error,
  };
}
