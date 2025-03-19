import { Button } from "@/components/Button";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="bg-white w-full h-full flex justify-center items-center gap-8">
      <Text className="text-2xl font-bold text-yellow-600">
        Teste Commit
      </Text>
    <Button>
      <Text className="text-white">Clique aqui</Text>
    </Button>
    </View>
  );
}
