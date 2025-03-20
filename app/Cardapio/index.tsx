import { View, Text, Image } from "react-native";

interface CardapioProps {
  title: string;
  description: string;
  value: string;
  image: string;
}

const Cardapio = ({ title, description, value, image }: CardapioProps) => {
  return (
    <View
      className="flex flex-row w-full gap-6 p-4"
      style={{
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 150, height: 180, borderRadius: 5 }}
      />
      <View style={{ flex: 1 }}>
        <Text className="font-bold text-lg pb-4" style={{ color: "#2E8B57" }}>
          {title}
        </Text>
        <Text className="pb-4" style={{ textAlign: "justify", color: "#666" }}>
          {description}
        </Text>
        <View
          className="flex flex-row"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Text className="font-semibold text-lg">R$ {value}</Text>
          <Text
            className="border"
            style={{
              borderRadius: 5,
              borderColor: "#2E8B57",
              padding: 6,
              backgroundColor: "#2E8B57",
              color: "#FFF",
            }}
          >
            Comprar
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Cardapio;
