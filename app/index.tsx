import { ScrollView, Text, View } from "react-native";
import Cardapio from "./Cardapio";
import Header from "./components/Header";

export default function Index() {
  return (
    <View className="flex flex-col w-full h-full p-4 bg-[#F9FAFB]">
      <Header />
      <Cardapio />
    </View>
  );
}
