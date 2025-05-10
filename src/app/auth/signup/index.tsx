import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const signup = () => {
  return (
    <View className="flex-1 bg-[#feffe4] px-4">
      <View className="pt-36 items-center">
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 160, height: 80 }}
        />
      </View>

      <View className="pt-8">
        <Text className="text-2xl font-bold text-[#0b8185] mt-4">Cadastro</Text>
        <Text className="text-base text-[#0b8185] mb-2">
          Crie uma conta para acessar o aplicativo
        </Text>
      </View>
      <View>
        <Text className="text-xl font-bold text-[#0b8185] mt-2">Nome</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite seu Nome"
          keyboardType="default"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Email</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite seu Email"
          keyboardType="email-address"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Senha</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite sua Senha"
          secureTextEntry={true}
          keyboardType="default"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">
          Confirme sua Senha
        </Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite sua senha novamente"
          secureTextEntry={true}
          keyboardType="default"
        />

        <View className="py-12">
          <Link href="./login" className="bg-[#0b8185] rounded-lg py-2">
            <Text className="text-white text-center text-lg font-bold">
              Criar conta
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default signup;

const styles = StyleSheet.create({});
