import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "./components/Header";
import MedicamentosList from "./medication/components/Medicamentos";
import { Button } from "@/components/Button";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="py-12">
      <ScrollView className="w-full h-full">
        <Header />
        <View className="flex flex-col w-full h-full p-4 gap-4 bg-[#feffe4]">
          <Text className="text-2xl font-bold text-[#0b8185]">
            Medicamentos
          </Text>
          <View className="flex flex-col w-full h-screen bg-white shadow-md rounded-lg px-4">
            <MedicamentosList />
            <View className="py-4">
              <Link
                href="/"
                className="bg-[#0b8185] rounded-lg h-12"
                onPress={() => console.log("Adicionar medicamento")}
              >
                <Text className="text-white text-center text-lg font-bold">
                  Ver mais
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
