import { Input } from "@/components/Input";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface LoginFormProps {
  title: string;
  description: string;
}

const LoginForm = ({ title, description }: LoginFormProps) => {
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

export default LoginForm;
