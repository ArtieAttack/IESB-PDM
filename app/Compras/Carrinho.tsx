import { View, Text, TextInput } from "react-native";
import React from "react";
import Produto from "./components/Produto";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import { Separator } from "@/components/Separator";

const Carrinho = () => {
  return (
    <ScrollView className="">
      <Text className="text-3xl font-bold p-6 text-white bg-[#ce77bb]">
        Carrinho
      </Text>
      <View className="flex flex-col w-full h-full px-4 py-8 gap-6 bg-[#faf3d7]">
        <View className="flex flex-col gap-4">
          <Text className="text-2xl font-semibold">Items</Text>
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
        <Separator className="bg-[#ce77bb] w-full" />
        <View className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-black shadow-md">
          <Text className="font-bold">Cupom</Text>
          <TextInput className="border rounded-lg px-4 text-[#83a190] border-[#ce77bb]">
            Insira o seu cupom aqui
          </TextInput>
        </View>
        <View className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-black shadow-md">
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
        </View>
        <View className="items-end">
          <Link
            href="/"
            className="rounded-md w-1/2 text-center py-3 bg-[#ce77bb] text-white"
          >
            <Text>Pagar</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Carrinho;
