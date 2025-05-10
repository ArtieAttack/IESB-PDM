import { Separator } from "@/src/components/Separator";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useMedication, Medication } from "@/src/hooks/useMedication";

// Componente para exibir cada item de medicamento
const MedicamentoItem = ({ item }: { item: Medication }) => {

  const horarioFormatado = new Date(item.horario).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TouchableOpacity
      className="flex-row gap-2 py-6"
      onPress={() => console.log(`Medicamento selecionado: ${item.nome}`)}
    >
      <Image
        source={{
          uri:
            item.imagem ||
            "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
        }}
        className="rounded-md"
        style={{ height: 100, width: 100 }}
      />

      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-start">
          <Text className="text-lg font-bold text-[#0b8185]">{item.nome}</Text>
        </View>

        <Text className="text-sm mb-2" numberOfLines={2}>
          {item.descricao}
        </Text>

        <View className="flex-row items-center gap-2">
          <Text className="text-base font-bold text-[#0b8185]">Horário:</Text>
          <Text className="text-base text-[#0b8185]">{horarioFormatado}</Text>
        </View>
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
