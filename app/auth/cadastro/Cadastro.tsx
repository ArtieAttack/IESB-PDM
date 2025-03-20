import React from "react";
import { View, Text } from "react-native";
import CadastroForm from "./components/CadastroForm";

const Cadastro = () => {
  return (
    <View className="h-full bg-[#F9FAFB] p-4">
      <Text className="font-bold text-3xl pt-4">Cadastro</Text>
      <Text className="text-[#666] pb-8">
        Preencha os campos abaixo para se cadastrar.
      </Text>
      <View className="flex flex-col gap-4">
        <CadastroForm title="Nome Completo" description="Digite seu nome" />
        <CadastroForm title="Endereço" description="Digite seu endereço" />

        <View className="flex flex-row gap-4">
          <CadastroForm
            title="Cidade"
            description="Digite o nome do seu Cidade"
          />
          <CadastroForm title="Estado" description="Digite o Estado onde mora" />
        </View>
        <View className="flex flex-row gap-4">
          <CadastroForm
            title="Complemento"
            description="Digite o complemento"
          />
          <CadastroForm title="CEP" description="Digite seu CEP" />
        </View>
        <View className="flex flex-row gap-4">
          <CadastroForm
            title="Data de Nascimento"
            description="Digite sua data de nascimento"
          />
          <CadastroForm title="Telefone" description="Digite seu telefone" />
        </View>
        <View className="flex flex-row pt-10 justify-end">
          <Text className="rounded-lg w-1/3 py-3 text-center text-white bg-[#2E8B57]">
            Cadastrar
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Cadastro;
