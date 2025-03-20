import { Checkbox } from "@/components/Checkbox";
import { Check } from "lucide-react-native";
import React from "react";
import { View, Text } from "react-native";

interface ProdutoProps {
  title: string;
  description: string;
  value: string;
  number: string;
}

const Produto = ({ title, description, value, number }: ProdutoProps) => {
  return (
    <View className="flex flex-col w-full gap-2 p-4 bg-white rounded-lg shadow-black shadow-md">
      <Text className="font-semibold text-lg pb-1">{title}</Text>
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-justify text-[#666]">{description}</Text>
          <Text className="font-semibold text-lg">R$ {value}</Text>
        </View>
        <View>
          <Text className="font-semibold text-base">Quantidade</Text>
          <Text className="text-right">{number}</Text>
        </View>
      </View>
    </View>
  );
};

export default Produto;
