import { SafeAreaView, StyleSheet, Text, View, TextInput, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Cadastro = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#feffe4] py-36 px-4">
      <View className="items-center">
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 160, height: 80 }}
        />
      </View>
      <View className="pt-8">
        <Text className="font-bold text-2xl text-[#0b8185]">
          Cadastro de Medicamentos
        </Text>
        <Text className="text-base text-[#0b8185] mb-2">
          Aqui você pode cadastrar um novo medicamento
        </Text>
      </View>
      <View>
        <Text className="text-xl font-bold text-[#0b8185] mt-2">
          Nome do medicamento
        </Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite o nome do medicamento"
          keyboardType="default"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Horário</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite o horário a ser tomado"
          keyboardType="default"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Descrição</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite a descrição do medicamento"
          secureTextEntry={true}
          keyboardType="default"
        />

        <View className="py-12">
          <Link href="/" className="bg-[#0b8185] rounded-lg py-2">
            <Text className="text-white text-center text-lg font-bold">
              Cadastrar medicamento
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({});
