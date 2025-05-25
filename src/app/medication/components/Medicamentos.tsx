import { Separator } from "@/src/components/Separator";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useMedication, Medication } from "@/src/hooks/useMedication";

// Componente para exibir cada item de medicamento
const MedicamentoItem = ({ item }: { item: Medication }) => {
  const { takeMedication, isTaking } = useMedication();
  const [showTakenButton, setShowTakenButton] = useState(false);

  const horarioFormatado = new Date(item.horario).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Formatar os dias da semana para exibição
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const diasExibicao = item.daysOfWeek
    ? item.daysOfWeek.split(",").map((dia) => diasSemana[parseInt(dia)])
    : [];

  const handleTakeMedication = () => {
    Alert.alert("Confirmar", `Você tomou o medicamento ${item.nome}?`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => {
          takeMedication(
            { id: item.id },
            {
              onSuccess: () => {
                Alert.alert("Sucesso", "Medicamento marcado como tomado!");
              },
              onError: (error) => {
                console.error("Erro ao registrar medicamento tomado:", error);
                Alert.alert(
                  "Erro",
                  "Não foi possível registrar que o medicamento foi tomado. Tente novamente."
                );
              },
            }
          );
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      className="flex-row gap-2 py-6"
      onPress={() => setShowTakenButton(!showTakenButton)}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri:
            item.imagem ||
            "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
        }}
        className="rounded-md"
        style={{ height: 75, width: 75 }}
      />

      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-start">
          <Text className="text-lg font-bold text-[#0b8185]">{item.nome}</Text>

          {item.dependentUser && (
            <View className="bg-[#e8dbad] px-2 py-1 rounded-md">
              <Text className="text-xs text-[#0b8185] font-semibold">
                Para: {item.dependentUser.name}
              </Text>
            </View>
          )}
        </View>

        <Text className="text-sm mb-2" numberOfLines={2}>
          {item.descricao}
        </Text>

        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-base font-bold text-[#0b8185]">Horário:</Text>
          <Text className="text-base text-[#0b8185]">{horarioFormatado}</Text>
        </View>

        {diasExibicao.length > 0 && (
          <View className="flex-row flex-wrap gap-1 mb-2">
            {diasExibicao.map((dia, index) => (
              <View key={index} className="bg-[#0b8185] px-2 py-0.5 rounded">
                <Text className="text-xs text-white">{dia}</Text>
              </View>
            ))}
          </View>
        )}

        {showTakenButton && (
          <TouchableOpacity
            className="bg-[#0b8185] rounded-md py-2 mt-2"
            onPress={handleTakeMedication}
            disabled={isTaking}
          >
            {isTaking ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white text-center font-bold">
                Marcar como tomado
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Componente principal com separador condicional
const MedicamentosList = () => {
  const { medications, isLoading, error, refetch } = useMedication();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0b8185" />
        <Text className="mt-2">Carregando medicamentos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-lg mb-4">
          Erro ao carregar medicamentos!
        </Text>
        <TouchableOpacity
          className="bg-[#0b8185] px-4 py-2 rounded-md"
          onPress={() => refetch()}
        >
          <Text className="text-white font-bold">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 h-full px-2 gap-4">
      <FlatList
        data={medications || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MedicamentoItem item={item} />}
        ItemSeparatorComponent={({ leadingItem }) => {
          const isLastItem =
            medications &&
            medications.length > 0 &&
            leadingItem?.id === medications[medications.length - 1].id;
          return !isLastItem ? (
            <Separator className="w-full h-[1px] bg-[#0b8185]" />
          ) : null;
        }}
        showsVerticalScrollIndicator={false}
        className="pb-4"
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-[#0b8185]">
              Nenhum medicamento encontrado
            </Text>
          </View>
        }
        ListFooterComponent={<View className="h-20" />}
      />
    </View>
  );
};

export default MedicamentosList;
