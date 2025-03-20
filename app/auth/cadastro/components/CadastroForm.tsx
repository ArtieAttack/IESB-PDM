import { Input } from "@/components/Input";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface CadastroFormProps {
  title: string;
  description: string;
}

const CadastroForm = ({ title, description }: CadastroFormProps) => {
  return (
    <View>
      <Text className="font-semibold text-lg pb-2">{title}</Text>
      <TextInput
        placeholder={description}
        className="w-full px-4 h-12 rounded-lg border-gray-300 border"
      />
    </View>
  );
};



export default CadastroForm;
