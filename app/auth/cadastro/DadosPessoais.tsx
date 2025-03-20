import React from "react";
import { View, Text } from "react-native";
import CadastroForm from "./components/CadastroForm";
import { Link } from "expo-router";

const DadosPessoais = () => {
  return (
    <View className="h-full w-full bg-[#F9FAFB] p-4">
      <Text className="font-bold text-3xl pt-4">Dados Pessoais</Text>
      <Text className="text-[#666] pb-8">
        Preencha os campos abaixo para se cadastrar.
      </Text>
      <View className="flex flex-col gap-4">
        <CadastroForm title="Nome Completo" description="Digite seu nome" />
        <CadastroForm title="Telefone" description="Digite seu telefone" />
        <CadastroForm title="CPF" description="Digite seu CPF" />
        <CadastroForm
          title="Data de Nascimento"
          description="Digite sua data de nascimento"
        />
        <CadastroForm title="E-mail" description="Digite seu e-mail" />
        <CadastroForm title="Senha" description="Digite sua senha" />
        <CadastroForm
          title="Confirme sua senha"
          description="Digite sua senha novamente"
        />
        <View className="flex flex-row pt-10 justify-end">
          <Link
            href="/"
            className="rounded-lg w-1/3 py-3 text-center text-white bg-[#2E8B57]"
          >
            <Text>
              Cadastrar
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default DadosPessoais;
