import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useMedication } from "@/src/hooks/useMedication";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [horario, setHorario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");
  const { addMedication, isAdding } = useMedication();
  const router = useRouter();

  const handleCadastro = async () => {
    // Validações básicas
    if (!nome || !horario || !descricao) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setError("");
      // Utilizamos uma imagem padrão para simplificar
      const imagem =
        "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8";

      // Chama a mutação para adicionar o medicamento
      await addMedication(
        {
          nome,
          horario,
          descricao,
          imagem,
        },
        {
          onSuccess: () => {
            // Volta para a lista de medicamentos após o cadastro bem sucedido
            router.replace("/");
          },
        }
      );
    } catch (err) {
      setError("Erro ao cadastrar medicamento. Tente novamente.");
      console.error("Erro no cadastro de medicamento:", err);
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
            Cadastro de Medicamentos
          </Text>
          <Text className="text-base text-[#0b8185] mb-2">
            Aqui você pode cadastrar um novo medicamento
          </Text>
        </View>

        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}

        <View>
          <Text className="text-xl font-bold text-[#0b8185] mt-2">
            Nome do medicamento
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite o nome do medicamento"
            keyboardType="default"
            value={nome}
            onChangeText={setNome}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">Horário</Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite o horário a ser tomado"
            keyboardType="default"
            value={horario}
            onChangeText={setHorario}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Descrição
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite a descrição do medicamento"
            keyboardType="default"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <View className="py-12">
            <TouchableOpacity
              className="bg-[#0b8185] rounded-lg py-2"
              onPress={handleCadastro}
              disabled={isAdding}
            >
              {isAdding ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center text-lg font-bold">
                  Cadastrar medicamento
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={() => router.back()}
              disabled={isAdding}
            >
              <Text className="text-[#0b8185] text-center font-bold">
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;
