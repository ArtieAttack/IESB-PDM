import React from "react";
import { View, Text } from "react-native";
import CadastroForm from "./components/CadastroForm";
import { Link } from "expo-router";

const DadosPessoais = () => {
  return (
    <View>
      <View className="text-3xl font-bold p-6 text-white bg-[#ce77bb]">
        <Text className="font-bold text-3xl text-white">Dados Pessoais</Text>
        <Text className="text-white">
          Preencha os campos abaixo para se cadastrar.
        </Text>
      </View>
      <View className="h-full w-full bg-[#faf3d7] p-6">
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
              className="rounded-lg w-1/3 py-3 text-center text-white bg-[#ce77bb]"
            >
              <Text>Cadastrar</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DadosPessoais;
