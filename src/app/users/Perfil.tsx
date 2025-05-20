import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import MedicamentosList from "../medication/components/Medicamentos";
import { Link } from "expo-router";
import Header from "../components/Header";

const usuarios = [
  {
    id: "1",
    nome: "João da Silva",
    nascimento: "01/01/1970",
    descricao: "Paciente com hipertensão e diabetes.",
    doencas: ["Hipertensão", "Diabetes"],
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    nascimento: "05/08/1945",
    descricao: "Idosa com Alzheimer, necessita acompanhamento constante.",
    doencas: ["Alzheimer"],
  },
  {
    id: "3",
    nome: "Carlos Souza",
    nascimento: "10/11/1985",
    descricao: "Paciente com epilepsia em tratamento medicamentoso.",
    doencas: ["Epilepsia"],
  },
];

const Perfil = () => {
  const { id } = useLocalSearchParams();
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return (
      <View className="flex-1 justify-center items-center bg-[#feffe4]">
        <Text className="text-lg text-red-600">Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#feffe4] relative">
      <Header />
      <ScrollView className="flex-1 px-4">
        <View className="flex-row justify-between items-center gap-4 my-4">
          <Image
            source={require("../../assets/images/iconPerfil.png")}
            style={{ width: 120, height: 120 }}
          />
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#0b8185] mb-2">
              {usuario.nome}
            </Text>
            <Text className="text-base text-gray-700 mb-2">
              <Text className="font-semibold text-[#0b8185]">
                Data de nascimento:
              </Text>{" "}
              {usuario.nascimento}
            </Text>
            <Text className="text-base text-gray-700 mb-4">
              <Text className="font-semibold text-[#0b8185]">Descrição: </Text>
              {usuario.descricao}
            </Text>
          </View>
        </View>
        <Text className="text-lg font-bold text-[#0b8185]  mb-2">
          Doenças Controladas
        </Text>
        {usuario.doencas.length > 0 ? (
          usuario.doencas.map((doenca, index) => (
            <Text key={index} className="text-base  text-gray-700">
              - {doenca}
            </Text>
          ))
        ) : (
          <Text className="text-base text-gray-500">
            Nenhuma doença registrada.
          </Text>
        )}
        <Text className="text-lg font-bold text-[#0b8185]  mt-4 mb-2">
          Medicamentos
        </Text>
        <View className="flex-1 bg-white shadow-md rounded-lg">
          <MedicamentosList />
        </View>
        <View>
          <TouchableOpacity className="mt-6 bg-[#e8dbad] rounded-lg py-2">
            <Link href="/">
              <Text className="text-[#0b8185] text-center text-lg font-bold">
                Voltar
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Perfil;
