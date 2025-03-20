import { ScrollView, Text, View } from "react-native";
import Cardapio from "./Cardapio";
import Header from "./components/Header";

export default function Index() {
  return (
    <ScrollView className="w-full h-full">
      <Header />
      <View className="flex flex-col w-full h-full p-4 bg-[#faf3d7]">
        <Cardapio />
      </View>
    </ScrollView>
  );
}
