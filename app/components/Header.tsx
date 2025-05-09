import { View, Text, Image } from "react-native";

const Header = () => {
  return (
    <View className="w-full p-4 flex flex-row justify-between items-center bg-[#e8dbad]">
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 120, height: 60 }}
      />
    </View>
  );
};

export default Header;
