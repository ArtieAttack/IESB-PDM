import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [doencasSelecionadas, setDoencasSelecionadas] = useState<string[]>([]);

  const doencas = [
    "Nenhuma",
    "Hipertensão",
    "Diabetes",
    "Alzheimer",
    "Parkinson",
    "Epilepsia",
    "Asma",
    "Depressão",
    "Transtorno Bipolar",
    "Esquizofrenia",
    "Transtorno de Ansiedade Generalizada",
    "Déficit de Atenção e Hiperatividade (TDAH)",
    "Insônia Crônica",
    "Dor Crônica",
    "Fibromialgia",
    "Transtorno Obsessivo-Compulsivo (TOC)",
    "Síndrome do Pânico",
    "Dependência Química",
    "Convulsões",
    "Síndrome de Tourette",
    "Câncer (em tratamento medicamentoso)",
    "Doença de Crohn",
    "Esclerose Múltipla",
    "Lúpus Eritematoso Sistêmico",
    "Miastenia Gravis",
    "Artrite Reumatoide",
  ];

  const toggleDoenca = (doenca: string) => {
    if (doencasSelecionadas.includes(doenca)) {
      setDoencasSelecionadas(doencasSelecionadas.filter((d) => d !== doenca));
    } else {
      setDoencasSelecionadas([...doencasSelecionadas, doenca]);
    }
  };

  const formatarData = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 8); // Apenas números, máx 8
    const parts = [];

    if (cleaned.length > 0) parts.push(cleaned.slice(0, 2));
    if (cleaned.length > 2) parts.push(cleaned.slice(2, 4));
    if (cleaned.length > 4) parts.push(cleaned.slice(4, 8));

    return parts.join("/");
  };

  return (
    <SafeAreaView className="flex-1 py-16 bg-[#feffe4]">
      <ScrollView className="px-4">
        <View className="items-center pt-10">
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 160, height: 80 }}
          />
        </View>

        <View className="pt-8">
          <Text className="font-bold text-2xl text-[#0b8185]">
            Cadastro de Usuários
          </Text>
          <Text className="text-base text-[#0b8185] mb-2">
            Aqui você pode cadastrar um usuário que irá tomar um medicamento
          </Text>
        </View>

        <View>
          <Text className="text-xl font-bold text-[#0b8185] mt-2">
            Nome do usuário
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite o nome do usuário"
            keyboardType="default"
            value={nome}
            onChangeText={setNome}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Data de Nascimento
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Ex: 01/01/2000"
            keyboardType="number-pad"
            value={nascimento}
            onChangeText={(text) => setNascimento(formatarData(text))}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Doenças Controladas
          </Text>
          <TouchableOpacity
            className="bg-white h-12 px-4 rounded-md shadow justify-center"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-[#0b8185]">
              {doencasSelecionadas.length > 0
                ? doencasSelecionadas.join(", ")
                : "Selecione doenças"}
            </Text>
          </TouchableOpacity>

          <Modal visible={modalVisible} transparent animationType="fade">
            <View className="flex-1 bg-black/40 justify-center items-center">
              <View className="bg-white w-4/5 rounded-lg shadow p-4 max-h-[80%]">
                <Text className="text-lg font-bold text-[#0b8185] mb-2">
                  Selecione as doenças
                </Text>

                <ScrollView className="mb-4">
                  {doencas.map((doenca) => {
                    const selecionada = doencasSelecionadas.includes(doenca);
                    return (
                      <TouchableOpacity
                        key={doenca}
                        className="flex-row items-center py-2"
                        onPress={() => toggleDoenca(doenca)}
                      >
                        <View
                          className={`w-5 h-5 mr-3 rounded border border-[#0b8185] ${
                            selecionada ? "bg-[#0b8185]" : "bg-white"
                          }`}
                        />
                        <Text className="text-[#0b8185]">{doenca}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <TouchableOpacity
                  className="mt-2 bg-[#0b8185] py-2 rounded"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white text-center font-bold">
                    Confirmar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="mt-2 bg-[#e8dbad] py-2 rounded"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-[#0b8185] text-center font-bold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View className="py-12">
          <TouchableOpacity className="bg-[#0b8185] rounded-lg py-2">
            <Link href="/">
              <Text className="text-white text-center text-lg font-bold">
                Cadastrar usuário
              </Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity className="mt-6 bg-[#e8dbad] rounded-lg py-2">
            <Link href="/">
              <Text className="text-[#0b8185] text-center text-lg font-bold">
                Voltar
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;
