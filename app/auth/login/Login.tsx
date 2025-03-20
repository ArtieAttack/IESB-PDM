import React from "react";
import { View, Text } from "react-native";
import LoginForm from "./components/LoginForms";
import { Separator } from "@/components/Separator";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View>
      <View className="text-3xl font-bold p-4 text-white bg-[#ce77bb]">
        <Text className="font-bold text-3xl text-white pt-4">Login</Text>
        <Text className="text-white">
          Preencha os campos abaixo para efetuar o login.
        </Text>
      </View>
      <View className="flex flex-col w-full h-full p-4 bg-[#faf3d7]">
        <View className="gap-4">
          <LoginForm title="E-mail" description="Digite seu e-mail" />
          <LoginForm title="Senha" description="Digite sua senha" />
          <View className="flex flex-row gap-1 pt-2">
            <Text className="pb-4">Esqueceu sua senha?</Text>
            <Link href="/" className="text-[#ce77bb] font-bold pb-4">
              <Text>Clique aqui.</Text>
            </Link>
          </View>
          <Link
            href="/"
            className="rounded-lg w-full py-3 text-center text-white bg-[#ce77bb]"
          >
            <Text className="text-white font-bold">Entrar</Text>
          </Link>
          <View className="flex flex-row justify-center items-center gap-4 pt-4">
            <Separator className="bg-[#ce77bb] w-48" />
            <Text className="text-[#ce77bb] font-semibold">Ou</Text>
            <Separator className="bg-[#ce77bb] w-48" />
          </View>
          <View className="gap-6 pt-10">
            <Link
              href="/"
              className="rounded-lg w-full py-3 text-center bg-white font-bold text-[#ce77bb] shadow-black shadow-md"
            >
              <Text>Entrar com o Google</Text>
            </Link>
            <Link
              href="/"
              className="rounded-lg w-full py-3 text-center bg-white font-bold text-[#ce77bb] shadow-black shadow-md"
            >
              <Text>Entrar com o Facebook</Text>
            </Link>
          </View>
          <View className="flex flex-row justify-center items-center gap-2 pt-4">
            <Text className="pb-4">Ainda não tem uma conta?</Text>
            <Link
              href="/auth/cadastro/Cadastro"
              className="text-[#ce77bb] font-bold pb-4"
            >
              <Text>Cadastre-se.</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
