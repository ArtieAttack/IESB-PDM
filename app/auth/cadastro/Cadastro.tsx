import React from "react";
import { View, Text } from "react-native";
import CadastroForm from "./components/CadastroForm";
import { Link } from "expo-router";

const Cadastro = () => {
  return (
    <View className="h-full bg-[#F9FAFB] p-4">
      <Text className="font-bold text-3xl pt-4">Cadastro</Text>
      <Text className="text-[#666] pb-8">
        Preencha os campos abaixo para se cadastrar.
      </Text>
      <View className="flex flex-col gap-4">
        <CadastroForm title="Endereço" description="Digite seu endereço" />
        <CadastroForm title="Complemento" description="Digite o complemento" />
        <CadastroForm title="CEP" description="Digite seu CEP" />
        <CadastroForm title="Estado" description="Digite o Estado onde mora" />
        <CadastroForm
          title="Cidade"
          description="Digite o nome do seu Cidade"
        />
        <View className="flex flex-row pt-10 justify-end">
          <Link
            href="/auth/cadastro/DadosPessoais"
            className="rounded-lg w-1/3 py-3 text-center text-white bg-[#2E8B57]"
          >
            <Text>Próximo</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Cadastro;
