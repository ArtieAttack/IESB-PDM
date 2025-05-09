import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "./components/Header";

export default function Index() {
  return (
    <SafeAreaView className="py-12">
      <ScrollView className="w-full h-full">
        <Header />
        <View className="flex flex-col w-full h-full p-4 bg-[#faf3d7]"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
