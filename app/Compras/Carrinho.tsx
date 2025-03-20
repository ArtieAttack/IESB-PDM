import { View, Text } from "react-native";
import React from "react";
import Produto from "./components/Produto";
import { ScrollView } from "react-native";
import { Link } from "expo-router";

const Carrinho = () => {
  return (
    <View className="flex flex-col w-full h-full px-4 py-8 gap-4 bg-[#F9FAFB]">
      <Text className="text-3xl font-bold pb-4">Carrinho</Text>
      <ScrollView>
        <View className="flex flex-col gap-4 p-2">
          <Produto
            title="Pão de Queijo"
            description="Delicioso pão de queijo"
            value="12,5"
            number="5"
          />
          <Produto
            title="Café Expresso"
            description="Café quentinho"
            value="7,0"
            number="2"
          />
          <Produto
            title="Folheado de frango"
            description="Folheado de frango quentinho"
            value="5,9"
            number="1"
          />
        </View>
      </ScrollView>
      <View className="flex flex-row justify-between">
        <Text className="font-semibold">SubTotal</Text>
        <Text className="text-sm">R$ 25,4</Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="font-semibold">Frete</Text>
        <Text className="text-sm">R$ 7,50</Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="font-bold text-xl">Total</Text>
        <Text className="text-lg">R$ 32,9</Text>
      </View>
      <View className="items-end">
        <Link
          href="/"
          className="rounded-md w-1/2 text-center py-3 bg-[#2E8B57] text-white"
        >
          <Text>
            Pagar
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default Carrinho;
