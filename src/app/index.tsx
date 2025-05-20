import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Header from "./components/Header";
import MedicamentosList from "./medication/components/Medicamentos";
import { Link, useRouter } from "expo-router";
import { Users, Pill, Plus, UserPlus, HeartPulse } from "lucide-react-native";
import Usuario from "./users/components/Usuario";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <View className="flex-1 bg-[#feffe4] relative">
      <Header />

      <ScrollView className="px-4">
        <View className="flex flex-row items-center py-4 gap-2">
          <Users color="#0b8185" />
          <Text className="text-2xl font-bold text-[#0b8185]">
            Usuários Cadastrados
          </Text>
        </View>
        <View className="flex-1">
          <Usuario />
        </View>
        <View className="flex flex-row items-center py-4 gap-2">
          <Pill color="#0b8185" />
          <Text className="text-2xl font-bold text-[#0b8185]">
            Remédios Cadastrados
          </Text>
        </View>
        <View className="flex-1 bg-white shadow-md rounded-lg">
          <MedicamentosList />
        </View>
        <View className="py-4">
          <Link href="/" className="bg-[#0b8185] rounded-lg py-2">
            <Text className="text-white text-center text-lg font-bold">
              Ver mais
            </Text>
          </Link>
        </View>
      </ScrollView>

      {menuOpen && (
        <View className="absolute bottom-28 right-5 w-60 bg-white border border-[#0b8185] rounded-xl p-4 shadow-lg z-50">
          <TouchableOpacity
            className="flex flex-row items-center gap-2 mb-3"
            onPress={() => {
              setMenuOpen(false);
              router.push("/medication/components/Cadastro");
            }}
          >
            <HeartPulse color="#0b8185" size={20} />
            <Text className="text-[#0b8185] font-bold text-sm">
              Cadastrar novo Remédio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row items-center gap-2"
            onPress={() => {
              setMenuOpen(false);
              router.push("/users/components/Cadastro");
            }}
          >
            <UserPlus color="#0b8185" size={20} />
            <Text className="text-[#0b8185] font-bold text-sm">
              Cadastrar novo Usuário
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        className="bg-[#0b8185] w-14 h-14 rounded-full absolute bottom-10 right-5 justify-center items-center shadow-xl z-50"
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Plus color="#fff" size={28} />
      </TouchableOpacity>
    </View>
  );
}
