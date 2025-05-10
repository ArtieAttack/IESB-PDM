import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useAuth } from "../providers/AuthProvider";

// Interface para os dados de medicamento
export interface Medication {
  id: string;
  nome: string;
  descricao: string;
  horario: string;
  imagem: string;
}

// Chave para o cache da query
export const MEDICATIONS_QUERY_KEY = "medications";

// Hook para buscar e gerenciar medicamentos
export function useMedication() {
  const { isAuthenticated, token } = useAuth();
  const queryClient = useQueryClient();

  // Query para buscar a lista de medicamentos
  const {
    data: medications,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [MEDICATIONS_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get("/medication");
      return response.data;
    },
    // Só executa a query se o usuário estiver autenticado
    enabled: !!isAuthenticated && !!token,
  });

  // Mutation para adicionar um novo medicamento
  const addMedicationMutation = useMutation({
    mutationFn: async (medicationData: Omit<Medication, "id">) => {
      const response = await api.post("/medication", medicationData);
      return response.data;
    },
    // Quando adicionar for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEDICATIONS_QUERY_KEY] });
    },
  });

  // Mutation para excluir um medicamento
  const deleteMedicationMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/medication/${id}`);
      return id;
    },
    // Quando excluir for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEDICATIONS_QUERY_KEY] });
    },
  });

  return {
    medications,
    isLoading,
    error,
    refetch,
    addMedication: addMedicationMutation.mutate,
    isAdding: addMedicationMutation.isPending,
    addError: addMedicationMutation.error,
    deleteMedication: deleteMedicationMutation.mutate,
    isDeleting: deleteMedicationMutation.isPending,
    deleteError: deleteMedicationMutation.error,
  };
}
