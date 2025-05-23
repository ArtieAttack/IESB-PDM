import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Separator } from "@/src/components/Separator";
import { useAuth } from "@/src/providers/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();


  /*const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Invoca o método de login do AuthProvider
      await login({
        email,
        password,
      });

      // Se chegou aqui, login foi bem sucedido, redirecionando para a página principal
      router.replace("/");
    } catch (err) {
      setError("Falha na autenticação. Verifique suas credenciais.");
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  };*/

  const handleLogin = async () => {

    // Pula o login completamente e navega direto
    router.replace("/");
  };
  

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

      {error ? (
        <Text className="text-red-500 mb-4 text-center">{error}</Text>
      ) : null}

      <View className="flex flex-col gap-4">
        <Text className="text-xl font-bold text-[#0b8185] mt-2">Email</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite seu email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Senha</Text>
        <View className="gap-1">
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite sua Senha"
            secureTextEntry={true}
            keyboardType="default"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <Link
            href="/"
            className="text-[#0b8185] text-sm font-bold"
            onPress={() => console.log("Esqueci minha senha")}
          >
            Esqueci minha senha
          </Link>
        </View>
        <TouchableOpacity
          className="bg-[#0b8185] rounded-lg py-3 mt-4"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center text-lg font-bold">
              Entrar
            </Text>
          )}
        </TouchableOpacity>
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
