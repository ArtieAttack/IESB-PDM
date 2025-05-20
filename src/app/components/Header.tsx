import { Link } from "expo-router";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/providers/AuthProvider";

const Header = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#e8dbad" }}>
      <View className="w-full px-4 py-3 flex flex-row justify-between items-center">
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 120, height: 60 }}
        />
        {isAuthenticated && (
          <Link href="/profile">
            <Image
              source={{ uri: user?.image }}
              className="w-12 h-12 rounded-full"
            />
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
