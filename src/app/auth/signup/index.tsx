import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Invoca o método de registro do AuthProvider
      await signUp({
        name,
        username,
        email,
        password,
      });

      // Se chegou aqui, cadastro bem sucedido, redirecionando para a página principal
      router.replace("/");
    } catch (err) {
      setError("Falha ao criar conta. Verifique seus dados.");
      console.error("Erro no cadastro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#feffe4] px-4">
      <View className="pt-16 items-center">
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

      {error ? (
        <Text className="text-red-500 mb-4 text-center">{error}</Text>
      ) : null}

      <View>
        <Text className="text-xl font-bold text-[#0b8185] mt-2">Nome</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite seu Nome"
          keyboardType="default"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Nome de Usuário</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite seu Nome de Usuário"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Email</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite seu Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">Senha</Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite sua Senha"
          secureTextEntry={true}
          keyboardType="default"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        <Text className="text-xl font-bold text-[#0b8185] mt-4">
          Confirme sua Senha
        </Text>
        <TextInput
          className="bg-white h-12 px-4 rounded-md shadow"
          placeholder="Digite sua senha novamente"
          secureTextEntry={true}
          keyboardType="default"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />

        <View className="py-12">
          <TouchableOpacity
            className="bg-[#0b8185] rounded-lg py-2 mb-4"
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center text-lg font-bold">
                Criar conta
              </Text>
            )}
          </TouchableOpacity>

          <Link href="./login">
            <Text className="text-[#0b8185] text-center font-bold">
              Já tem uma conta? Faça login
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
