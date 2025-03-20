import { Link } from 'expo-router';
import { View, Text, Linking } from 'react-native';

const Header = () => {
  return (
    <View className="w-full p-4 flex flex-row justify-between items-center">
      <Text className="text-3xl font-bold">Padaria</Text>
      <Text className="rounded-lg w-1/3 py-3 text-center text-white bg-[#2E8B57]">
        <Link href="/auth/cadastro/Cadastro">Login</Link>
      </Text>
    </View>
  );
}

export default Header