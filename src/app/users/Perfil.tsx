import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Badge } from "@/src/components/Badge";
import Header from "../components/Header";
import { useDependentUser, DependentUser } from "@/src/hooks/useDependentUser";
import { useMedication, Medication } from "@/src/hooks/useMedication";

const Perfil = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [usuario, setUsuario] = useState<DependentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [medicamentos, setMedicamentos] = useState<Medication[]>([]);

  const { fetchDependentUser, deleteDependentUser, isDeleting } =
    useDependentUser();
  const { medications, isLoading: isLoadingMedications } = useMedication();

  useEffect(() => {
    if (!id) {
      setError("ID do usuário não fornecido");
      setIsLoading(false);
      return;
    }

    const carregarDados = async () => {
      try {
        setIsLoading(true);
        const userData = await fetchDependentUser(id as string);
        setUsuario(userData);
        setError("");
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setError("Erro ao carregar dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };

    carregarDados();
  }, [id, fetchDependentUser]);
  // Filtra os medicamentos deste usuário dependente
  useEffect(() => {
    if (medications && id) {
      const medicamentosDoUsuario = medications.filter(
        (med: Medication) => med.dependentUserId === id
      );
      setMedicamentos(medicamentosDoUsuario);
    }
  }, [medications, id]);

  const handleExcluir = () => {
    Alert.alert(
      "Excluir Usuário",
      `Tem certeza que deseja excluir ${usuario?.name}? Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              if (id) {
                await deleteDependentUser(id as string, {
                  onSuccess: () => {
                    Alert.alert(
                      "Sucesso",
                      "Usuário dependente excluído com sucesso"
                    );
                    router.back();
                  },
                });
              }
            } catch (err) {
              console.error("Erro ao excluir usuário:", err);
              Alert.alert("Erro", "Não foi possível excluir o usuário");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#feffe4]">
        <ActivityIndicator size="large" color="#0b8185" />
        <Text className="mt-4 text-[#0b8185]">Carregando perfil...</Text>
      </View>
    );
  }

  if (error || !usuario) {
    return (
      <View className="flex-1 justify-center items-center bg-[#feffe4]">
        <Text className="text-lg text-red-600">
          {error || "Usuário não encontrado."}
        </Text>
        <TouchableOpacity
          className="mt-4 bg-[#0b8185] px-4 py-2 rounded-md"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Formata a data de nascimento
  const formatarDataNascimento = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return `${data.getDate().toString().padStart(2, "0")}/${(
        data.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${data.getFullYear()}`;
    } catch (error) {
      return "Data inválida";
    }
  };

  return (
    <View className="flex-1 bg-[#feffe4] relative">
      <Header />
      <ScrollView className="flex-1 px-4">
        <View className="flex-row justify-between items-center gap-4 my-4">
          <Image
            source={{
              uri: usuario.image || "https://avatar.vercel.sh/user-default",
            }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#0b8185] mb-2">
              {usuario.name}
            </Text>

            <Text className="text-base text-[#0b8185]">
              Nascido em: {formatarDataNascimento(usuario.birthDate)}
            </Text>
          </View>
        </View>

        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-xl font-bold text-[#0b8185] mb-2">
            Descrição
          </Text>
          <Text className="text-base">{usuario.description}</Text>
        </View>

        {usuario.diseases && usuario.diseases.length > 0 && (
          <View className="bg-white p-4 rounded-lg shadow mb-4">
            <Text className="text-xl font-bold text-[#0b8185] mb-2">
              Doenças
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {usuario.diseases.map((doenca) => (
                <Badge
                  key={doenca.id}
                  label={doenca.name}
                  variant="secondary"
                />
              ))}
            </View>
          </View>
        )}

        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-xl font-bold text-[#0b8185] mb-2">
            Medicamentos
          </Text>
          {isLoadingMedications ? (
            <ActivityIndicator color="#0b8185" size="small" />
          ) : medicamentos.length > 0 ? (
            <>
              {medicamentos.map((medicamento) => (
                <View
                  key={medicamento.id}
                  className="border-b border-gray-200 py-2"
                >
                  <Text className="font-bold">{medicamento.nome}</Text>
                  <Text>{medicamento.descricao}</Text>
                  <Text className="text-gray-500">
                    Horário:{" "}
                    {new Date(medicamento.horario)
                      .toLocaleTimeString()
                      .slice(0, 5)}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text className="text-gray-500">Nenhum medicamento cadastrado</Text>
          )}{" "}
          <TouchableOpacity
            className="mt-4 bg-[#86c7c9] py-2 rounded"
            onPress={() => router.push("../medication/cadastro")}
          >
            <Text className="text-white text-center font-bold">
              Adicionar Medicamento
            </Text>
          </TouchableOpacity>
        </View>

        <View className="py-8">
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-2 mb-6"
            onPress={handleExcluir}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center text-lg font-bold">
                Excluir Usuário
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#e8dbad] rounded-lg py-2"
            onPress={() => router.back()}
          >
            <Text className="text-[#0b8185] text-center text-lg font-bold">
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Perfil;
