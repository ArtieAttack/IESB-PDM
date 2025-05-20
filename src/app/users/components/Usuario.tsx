import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const usuarios = [
  {
    id: "1",
    nome: "João da Silva",
    descricao: "Paciente com hipertensão e diabetes.",
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    descricao: "Idosa com Alzheimer, necessita acompanhamento constante.",
  },
  {
    id: "3",
    nome: "Carlos Souza",
    descricao: "Paciente com epilepsia em tratamento medicamentoso.",
  },
];

const Usuario = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof usuarios)[0] }) => (
    <TouchableOpacity
      className="bg-white px-3 py-4 mt-3 rounded-lg shadow-sm"
      onPress={() => router.push(`/users/Perfil?id=${item.id}`)}
    >
      <Text className="text-lg font-bold text-[#0b8185]">{item.nome}</Text>
      <Text className="text-sm text-gray-600 mt-1">{item.descricao}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Usuario;
