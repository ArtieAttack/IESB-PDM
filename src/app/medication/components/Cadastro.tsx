import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMedication } from "@/src/hooks/useMedication";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [horario, setHorario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");

  const vinculos = ["João", "Maria", "Ana", "Carlos"];
  const [vinculoSelecionado, setVinculoSelecionado] = useState<string | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const { addMedication, isAdding } = useMedication();
  const router = useRouter();

  const handleCadastro = async () => {
    if (!nome || !horario || !descricao || !vinculoSelecionado) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setError("");
      const imagem =
        "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8";

      const horarioFormatado = horario.replace(/[^0-9]/g, "");
      const horas = horarioFormatado.slice(0, 2);
      const minutos = horarioFormatado.slice(2, 4);
      const horarioDate = new Date();
      horarioDate.setHours(parseInt(horas, 10));
      horarioDate.setMinutes(parseInt(minutos, 10));

      await addMedication(
        {
          nome,
          horario: horarioDate.toISOString(),
          descricao,
          imagem,
        },
        {
          onSuccess: () => {
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
            keyboardType="number-pad"
            value={horario}
            onChangeText={(text) => {
              const formattedText = text.replace(/[^0-9]/g, "").slice(0, 4);
              const hours = formattedText.slice(0, 2);
              const minutes = formattedText.slice(2, 4);
              setHorario(`${hours}${minutes ? ":" + minutes : ""}`);
            }}
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

          <Text className="text-xl font-bold text-[#0b8185] mt-4">Vínculo</Text>

          <TouchableOpacity
            className="bg-white h-12 px-4 rounded-md shadow justify-center"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-[#0b8185]">
              {vinculoSelecionado || "Selecione um vínculo"}
            </Text>
          </TouchableOpacity>

          <Modal transparent visible={modalVisible} animationType="fade">
            <View className="flex-1 bg-black/40 justify-center items-center">
              <View className="bg-white w-4/5 rounded-lg shadow p-4">
                <Text className="text-lg font-bold text-[#0b8185] mb-2">
                  Selecione um vínculo
                </Text>
                {vinculos.map((item) => (
                  <TouchableOpacity
                    key={item}
                    className="py-2"
                    onPress={() => {
                      setVinculoSelecionado(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-[#0b8185]">{item}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  className="mt-4 py-2 bg-[#e8dbad] rounded"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-center text-[#0b8185] font-bold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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

export default Cadastro;
