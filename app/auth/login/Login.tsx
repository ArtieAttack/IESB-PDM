import React from "react";
import { View, Text } from "react-native";
import LoginForm from "./components/LoginForms";
import { Separator } from "@/components/Separator";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View className="flex flex-col w-full h-full p-4 bg-[#F9FAFB]">
      <Text className="font-bold text-3xl pt-4">Login</Text>
      <Text className="text-[#666] pb-8">
        Preencha os campos abaixo para efetuar o login.
      </Text>
      <View className="gap-4">
        <LoginForm title="E-mail" description="Digite seu e-mail" />
        <LoginForm title="Senha" description="Digite sua senha" />
        <View className="flex flex-row pt-2">
          <Text className="text-[#2E8B57] pb-4">Esqueceu sua senha?</Text>
        </View>
        <Link
          href="/"
          className="rounded-lg w-full py-3 text-center text-white bg-[#2E8B57]"
        >
          <Text>Entrar</Text>
        </Link>
        <View className="flex flex-row justify-center items-center gap-4 pt-4">
          <Separator className="bg-[#2E8B57] w-48" />
          <Text className="text-[#2E8B57] font-semibold">Ou</Text>
          <Separator className="bg-[#2E8B57] w-48" />
        </View>
        <View className="gap-6 pt-10">
          <Link
            href="/"
            className="border rounded-lg w-full py-3 text-center text-[#2E8B57] border-[#2E8B57]"
          >
            <Text>Entrar com o Google</Text>
          </Link>
          <Link
            href="/"
            className="border rounded-lg w-full py-3 text-center text-[#2E8B57] border-[#2E8B57]"
          >
            <Text>Entrar com o Facebook</Text>
          </Link>
        </View>
        <View className="flex flex-row justify-center items-center gap-2 pt-4">
          <Text className="pb-4">Ainda não tem uma conta?</Text>
          <Link href="/auth/cadastro/Cadastro" className="text-[#2E8B57] font-bold pb-4">
            <Text>Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Login;
