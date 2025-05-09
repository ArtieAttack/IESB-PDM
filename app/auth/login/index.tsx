import { SafeAreaView, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Separator } from "@/components/Separator";

const Login = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#feffe4] px-4">
      <View className="pt-36 items-center">
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 160, height: 80 }}
        />
      </View>

      <View className="pt-8 mb-4">
        <Text className="text-2xl font-bold text-[#0b8185] mt-4">Login</Text>
        <Text className="text-base text-[#0b8185] mb-2">
          Faça login para acessar sua conta
        </Text>
      </View>

      <View className="flex flex-col gap-4">
        <Text className="text-xl font-bold text-[#0b8185] mt-2">Usuário</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite seu Usuário"
          keyboardType="default"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Senha</Text>
        <View className="gap-1">
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite sua Senha"
            secureTextEntry={true}
            keyboardType="default"
          />
          <Link
            href="/"
            className="text-[#0b8185] text-sm font-bold"
            onPress={() => console.log("Esqueci minha senha")}
          >
            Esqueci minha senha
          </Link>
        </View>
        <Link href="/" className="bg-[#0b8185] rounded-lg py-2 mt-4">
          <Text className="text-white text-center text-lg font-bold">
            Entrar
          </Text>
        </Link>
        <View className="flex-row items-center justify-center gap-2">
          <Separator className="flex-1 h-[1px] bg-[#0b8185]" />
          <Text className="text-[#0b8185] font-bold text-base">Ou</Text>
          <Separator className="flex-1 h-[1px] bg-[#0b8185]" />
        </View>

        <Link href="./signup" className="bg-[#0b8185] rounded-lg py-2">
          <Text className="text-white text-center text-lg font-bold">
            Criar conta
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Login;
