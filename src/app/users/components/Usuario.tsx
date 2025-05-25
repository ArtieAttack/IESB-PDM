import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useDependentUser, DependentUser } from "@/src/hooks/useDependentUser";

const Usuario = () => {
  const router = useRouter();
  const { dependentUsers, isLoading, error, refetch } = useDependentUser();

  // Formatar data de nascimento
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Calcular idade
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };

  const renderItem = ({ item }: { item: DependentUser }) => (
    <TouchableOpacity
      className="bg-white px-3 py-4 mt-3 rounded-lg shadow-sm"
      onPress={() => router.push(`/users/Perfil?id=${item.id}`)}
    >
      <View className="flex-row items-start">
        <Image
          source={{
            uri:
              item.image ||
              "https://avatar.vercel.sh/" +
                item.name.toLowerCase().replace(/\s+/g, "-"),
          }}
          className="rounded-full"
          style={{ width: 40, height: 40 }}
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold text-[#0b8185]">{item.name}</Text>

          {item.birthDate && (
            <View className="flex-row items-center mt-1">
              <Text className="text-sm text-gray-600">
                {formatDate(item.birthDate)} • {calculateAge(item.birthDate)}{" "}
                anos
              </Text>
            </View>
          )}

          {item.diseases && item.diseases.length > 0 && (
            <View className="flex-row flex-wrap gap-1 mt-2">
              {item.diseases.map((disease) => (
                <View
                  key={disease.id}
                  className="bg-[#e8dbad] px-2 py-0.5 rounded"
                >
                  <Text className="text-xs text-[#0b8185]">{disease.name}</Text>
                </View>
              ))}
            </View>
          )}

          {item.description && (
            <Text className="text-sm mt-2 text-gray-700" numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0b8185" />
        <Text className="mt-2">Carregando usuários...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-lg mb-4">
          Erro ao carregar usuários!
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
        data={dependentUsers || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-[#0b8185]">
              Nenhum usuário dependente cadastrado
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Usuario;
