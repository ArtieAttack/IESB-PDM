import { Link } from "expo-router";
import { View, Text, Image } from "react-native";

const Header = () => {
  return (
    <View className="w-full p-4 flex flex-row justify-between items-center bg-[#ce77bb]">
      <Image
        source={{
          uri: "https://elements-resized.envatousercontent.com/elements-cover-images/1cf64e9c-f09d-43d2-8e76-67a31c98500e?w=433&cf_fit=scale-down&q=85&format=auto&s=43e830f19da9b18eb70ed010438dd16dee9c16ba9c78f5d69d253928e6baf839",
        }}
        style={{ width: 85, height: 85, borderRadius: 46 }}
      />
      <Link
        href="/auth/login/Login"
        className="rounded-lg w-1/3 py-3 text-center text-[#ce77bb] bg-white font-semibold"
      >
        <Text>Login</Text>
      </Link>
    </View>
  );
};

export default Header;
