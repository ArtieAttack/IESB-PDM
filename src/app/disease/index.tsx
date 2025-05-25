import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import DoencasList from "./components/Doencas";
import { Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

const DiseasePage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#feffe4]">
      <Stack.Screen options={{ title: "Doenças e Condições Médicas" }} />

      <View className="p-4">
        <Text className="text-2xl font-bold text-[#0b8185]">
          Doenças e Condições Médicas
        </Text>
        <Text className="text-base text-[#0b8185] mb-4">
          Gerencie as doenças e condições médicas para associar aos usuários
        </Text>
      </View>

      <View className="flex-1 bg-white shadow-md mx-4 rounded-lg">
        <DoencasList />
      </View>

      <TouchableOpacity
        className="bg-[#0b8185] w-14 h-14 rounded-full absolute bottom-10 right-5 justify-center items-center shadow-xl"
        onPress={() => router.push("/disease/components/Cadastro")}
        activeOpacity={0.8}
      >
        <Plus color="#fff" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default DiseasePage;
