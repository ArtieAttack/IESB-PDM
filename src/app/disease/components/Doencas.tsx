import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDisease, Disease } from "@/src/hooks/useDisease";
import { Separator } from "@/src/components/Separator";

// Componente para exibir cada item de doença
const DoencaItem = ({ item }: { item: Disease }) => {
  // Contabilizar quantos usuários e dependentes estão associados a esta doença
  const userCount = item.users?.length || 0;
  const dependentCount = item.dependentUsers?.length || 0;
  const totalCount = userCount + dependentCount;

  return (
    <View className="py-4">
      <Text className="text-lg font-bold text-[#0b8185]">{item.name}</Text>

      {totalCount > 0 && (
        <Text className="text-sm text-gray-600 mt-1">
          {totalCount}{" "}
          {totalCount === 1 ? "pessoa associada" : "pessoas associadas"}
        </Text>
      )}
    </View>
  );
};

// Componente principal com separador condicional
const DoencasList = () => {
  const { diseases, isLoading, error, refetch } = useDisease();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0b8185" />
        <Text className="mt-2">Carregando doenças...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-lg mb-4">
          Erro ao carregar doenças!
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
    <View className="flex-1">
      <FlatList
        data={diseases || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DoencaItem item={item} />}
        ItemSeparatorComponent={() => (
          <Separator className="w-full h-[1px] bg-[#0b8185]" />
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-[#0b8185]">Nenhuma doença cadastrada</Text>
          </View>
        }
      />
    </View>
  );
};

export default DoencasList;
