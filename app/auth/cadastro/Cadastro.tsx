import React from "react";
import { View, Text } from "react-native";
import CadastroForm from "./components/CadastroForm";
import { Link } from "expo-router";

const Cadastro = () => {
  return (
    <View>
      <View className="text-3xl font-bold p-6 text-white bg-[#ce77bb]">
        <Text className="font-bold text-3xl text-white">Cadastro</Text>
        <Text className="text-white">
          Preencha os campos abaixo para se cadastrar.
        </Text>
      </View>
      <View className="h-full bg-[#faf3d7] p-6">
        <View className="flex flex-col gap-4">
          <CadastroForm title="Endereço" description="Digite seu endereço" />
          <CadastroForm
            title="Complemento"
            description="Digite o complemento"
          />
          <CadastroForm title="CEP" description="Digite seu CEP" />
          <CadastroForm
            title="Estado"
            description="Digite o Estado onde mora"
          />
          <CadastroForm
            title="Cidade"
            description="Digite o nome do seu Cidade"
          />
          <View className="flex flex-row pt-10 justify-end">
            <Link
              href="/auth/cadastro/DadosPessoais"
              className="rounded-lg w-1/3 py-3 text-center text-white bg-[#ce77bb]"
            >
              <Text>Próximo</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cadastro;
