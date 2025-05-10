import { Link } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/providers/AuthProvider";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  return (
    <SafeAreaView className="w-full h-36 px-4 flex flex-row justify-between items-center bg-[#e8dbad]">
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 120, height: 60 }}
      />
      {isAuthenticated ? (
        <Link
          href="/profile"
        >
          <Image source={{uri: user?.image}} className="w-12 h-12 rounded-full" />
        </Link>
      ) : null}
    </SafeAreaView>
  );
};

export default Header;
