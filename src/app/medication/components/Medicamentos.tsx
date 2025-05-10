import { Separator } from "@/src/components/Separator";
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

// Os dados dos medicamentos
const medicamentos = [
  {
    id: "1",
    nome: "Paracetamol 500mg",
    descricao: "Analgésico e antitérmico para alívio de dores e febres.",
    horario: "08:00",
    imagem:
      "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
  },
  {
    id: "2",
    nome: "Ibuprofeno 400mg",
    descricao: "Anti-inflamatório não esteroidal para dor e inflamação.",
    horario: "12:00",
    imagem:
      "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
  },
  {
    id: "3",
    nome: "Amoxicilina 500mg",
    descricao: "Antibiótico para tratamento de infecções bacterianas.",
    horario: "18:00",
    imagem:
      "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
  },
  {
    id: "4",
    nome: "Omeprazol 20mg",
    descricao: "Inibidor da bomba de prótons para problemas gástricos.",
    horario: "20:00",
    imagem:
      "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
  },
  {
    id: "5",
    nome: "Loratadina 10mg",
    descricao: "Anti-histamínico para alívio de sintomas alérgicos.",
    horario: "22:00",
    imagem:
      "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
  },
  {
    id: "6",
    nome: "Dipirona 500mg",
    fabricante: "DorFree",
    descricao:
      "Analgésico e antitérmico para alívio de dores e febres intensas.",
    horario: "08:00",
    imagem:
      "https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8",
  },
];

interface Medicamento {
  id: string;
  nome: string;
  descricao: string;
  horario: string;
  imagem: string;
}

// Dentro do MedicamentoItem, remova o Separator
const MedicamentoItem = ({ item }: { item: Medicamento }) => {
  return (
    <TouchableOpacity
      className="flex-row gap-2 py-6"
      onPress={() => console.log(`Medicamento selecionado: ${item.nome}`)}
    >
      <Image
        source={{ uri: item.imagem }}
        className="rounded-md"
        style={{ height: 100, width: 100 }}
      />

      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-start">
          <Text className="text-lg font-bold text-[#0b8185]">{item.nome}</Text>
        </View>

        <Text className="text-sm mb-2" numberOfLines={2}>
          {item.descricao}
        </Text>

        <View className="flex-row items-center gap-2">
          <Text className="text-base font-bold text-[#0b8185]">Horário:</Text>
          <Text className="text-base text-[#0b8185]">{item.horario}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Componente principal com separador condicional
const MedicamentosList = () => {
  return (
    <View className="flex-1 h-full px-2 gap-4">
      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MedicamentoItem item={item} />}
        ItemSeparatorComponent={({ leadingItem }) => {
          const isLastItem =
            leadingItem?.id === medicamentos[medicamentos.length - 1].id;
          return !isLastItem ? (
            <Separator className="w-full h-[1px] bg-[#0b8185]" />
          ) : null;
        }}
        showsVerticalScrollIndicator={false}
        className="pb-4"
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-[#0b8185]">
              Nenhum medicamento encontrado
            </Text>
          </View>
        }
        ListFooterComponent={<View className="h-20" />}
      />
    </View>
  );
};

export default MedicamentosList;
