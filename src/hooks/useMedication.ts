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
  daysOfWeek?: string; // Dias da semana para tomar o medicamento (formato: "1,2,3,4,5,6,7")
  dependentUserId?: string; // ID do usuário dependente, se aplicável
  user?: { id: string; name: string; email: string };
  dependentUser?: { id: string; name: string };
}

export interface CreateMedicationData {
  nome: string;
  descricao: string;
  horario: string;
  imagem?: string;
  daysOfWeek?: string;
  dependentUserId?: string;
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

  // Query para buscar um medicamento específico
  const fetchMedication = async (id: string) => {
    const response = await api.get(`/medication/${id}`);
    return response.data;
  };

  // Mutation para adicionar um novo medicamento
  const addMedicationMutation = useMutation({
    mutationFn: async (medicationData: CreateMedicationData) => {
      console.log("Adicionando medicamento:", medicationData);
      const response = await api.post("/medication", medicationData);
      return response.data;
    },
    // Quando adicionar for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEDICATIONS_QUERY_KEY] });
    },
  });

  // Mutation para atualizar um medicamento
  const updateMedicationMutation = useMutation({
    mutationFn: async ({
      id,
      medicationData,
    }: {
      id: string;
      medicationData: Partial<CreateMedicationData>;
    }) => {
      const response = await api.patch(`/medication/${id}`, medicationData);
      return response.data;
    },
    // Quando atualizar for bem-sucedido, atualiza o cache
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

  // Mutation para marcar um medicamento como tomado
  const takeMedicationMutation = useMutation({
    mutationFn: async ({
      id,
      timestamp = new Date().toISOString(),
    }: {
      id: string;
      timestamp?: string;
    }) => {
      // Este endpoint precisa ser implementado no backend
      const response = await api.post(`/medication/${id}/taken`, { timestamp });
      return response.data;
    },
    // Quando marcar como tomado for bem-sucedido, atualiza o cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEDICATIONS_QUERY_KEY] });
    },
  });

  return {
    medications,
    isLoading,
    error,
    refetch,
    fetchMedication,
    addMedication: addMedicationMutation.mutate,
    isAdding: addMedicationMutation.isPending,
    addError: addMedicationMutation.error,
    updateMedication: updateMedicationMutation.mutate,
    isUpdating: updateMedicationMutation.isPending,
    updateError: updateMedicationMutation.error,
    deleteMedication: deleteMedicationMutation.mutate,
    isDeleting: deleteMedicationMutation.isPending,
    deleteError: deleteMedicationMutation.error,
    takeMedication: takeMedicationMutation.mutate,
    isTaking: takeMedicationMutation.isPending,
    takeError: takeMedicationMutation.error,
  };
}
