import { Link } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView className="w-full h-36 px-4 flex flex-row justify-between items-center bg-[#e8dbad]">
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 120, height: 60 }}
      />
      <Link 
        href="./auth/login"
        className="bg-[#0b8185] px-16 py-2 rounded-md"
      >
        <Text className="text-white font-bold">Login</Text>
        </Link>
    </SafeAreaView>
  );
};

export default Header;
