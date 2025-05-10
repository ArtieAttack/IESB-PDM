import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ Import correto
import Header from "./components/Header";
import MedicamentosList from "./medication/components/Medicamentos";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 bg-[#feffe4]">
      <Header />
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-bold text-[#0b8185] px-4 pt-6">
          Medicamentos
        </Text>
        <Link
          href="/medication/components/Cadastro"
          className="bg-[#0b8185] px-4 py-2 rounded-md mt-6 mr-4"
        >
          <Text className="text-white font-bold">Novo medicamento</Text>
        </Link>
      </View>

      <View className="flex-1 px-4 py-6 bg-[#feffe4">
        <View className="flex-1 bg-white shadow-md rounded-lg px-2">
          <MedicamentosList />

          <View className="py-4 px-2">
            <Link
              href="/"
              className="bg-[#0b8185] rounded-lg py-2"
              onPress={() => console.log("Adicionar medicamento")}
            >
              <Text className="text-white text-center text-lg font-bold">
                Ver mais
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
