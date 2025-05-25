import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useDisease } from "@/src/hooks/useDisease";

const CadastroDoenca = () => {
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { addDisease, isAdding } = useDisease();

  const handleCadastrar = async () => {
    if (!nome) {
      setError("Por favor, informe o nome da doença");
      return;
    }

    try {
      setError("");
      await addDisease(
        { name: nome },
        {
          onSuccess: () => {
            Alert.alert("Sucesso", "Doença cadastrada com sucesso!", [
              {
                text: "OK",
                onPress: () => router.back(),
              },
            ]);
          },
        }
      );
    } catch (err) {
      setError("Erro ao cadastrar doença. Tente novamente.");
      console.error("Erro no cadastro:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#feffe4]">
      <ScrollView className="px-4">
        <View className="items-center pt-10">
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 160, height: 80 }}
          />
        </View>

        <View className="pt-8">
          <Text className="font-bold text-2xl text-[#0b8185]">
            Cadastro de Doença
          </Text>
          <Text className="text-base text-[#0b8185] mb-2">
            Cadastre uma nova condição médica ou doença
          </Text>
        </View>

        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}

        <View>
          <Text className="text-xl font-bold text-[#0b8185] mt-2">
            Nome da doença*
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite o nome da doença ou condição médica"
            keyboardType="default"
            value={nome}
            onChangeText={setNome}
          />

          <View className="py-12">
            <TouchableOpacity
              className="bg-[#0b8185] rounded-lg py-2"
              onPress={handleCadastrar}
              disabled={isAdding}
            >
              {isAdding ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center text-lg font-bold">
                  Cadastrar doença
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-6 bg-[#e8dbad] rounded-lg py-2"
              onPress={() => router.back()}
              disabled={isAdding}
            >
              <Text className="text-[#0b8185] text-center text-lg font-bold">
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CadastroDoenca;
