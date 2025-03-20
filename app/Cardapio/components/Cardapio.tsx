import { View, Text, Image } from "react-native";

interface CardCardapioProps {
  title: string;
  description: string;
  value: string;
  image: string;
}

const CardCardapio = ({ title, description, value, image }: CardCardapioProps) => {
  return (
    <View
      className="flex flex-row w-full gap-6 p-2 bg-white rounded-lg shadow-black shadow-md"
    >
      <Image
        source={{ uri: image }}
        style={{ width: 150, height: 190, borderRadius: 5 }}
      />
      <View style={{ flex: 1 }}>
        <Text className="font-bold text-lg pb-4 text-[#2E8B57]">
          {title}
        </Text>
        <Text className="pb-4 text-justify text-[#666]">
          {description}
        </Text>
        <View
          className="flex flex-row justify-between items-center"
        >
          <Text className="font-semibold text-lg">R$ {value}</Text>
          <Text
            className="rounded-md w-1/2 text-center py-2 bg-[#2E8B57] text-white"
          >
            Comprar
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardCardapio;
