import React from "react";
import { View } from "react-native";
import { ScrollView, Text } from "react-native";
import CardCardapio from "./components/Cardapio";

const Cardapio = () => {
  return (
    <ScrollView className="h-full w-full">
      <Text className="font-bold text-2xl p-4">Cardápio</Text>
      <View className="flex flex-col gap-4 p-2">
        <CardCardapio
          title="Pão de Batata"
          description="Pão macio e levemente adocicado, com um toque de batata que confere uma textura suave e um sabor delicado."
          value="9,90"
          image="https://fastly.picsum.photos/id/296/200/300.jpg?hmac=3w6L7NcSbkDRHC36vvfj4JuF0yOHmTjqQS5F9biJyKA"
        />
        <CardCardapio
          title="Café Expresso"
          description="Bebida intensa e aromática, preparada sob pressão, com sabor forte e encorpado, ideal para quem aprecia um café marcante."
          value="3,50"
          image="https://fastly.picsum.photos/id/527/200/300.jpg?hmac=6Lf2qU7Zdc2yYQxeUig2n8w34lTZbsLR6qgw9x9zbfE"
        />
        <CardCardapio
          title="Pão de Queijo"
          description="Clássico brasileiro, com casquinha crocante por fora e miolo macio e recheado de queijo, perfeito para acompanhar o café."
          value="2,50"
          image="https://fastly.picsum.photos/id/558/200/300.jpg?hmac=RQvEcTitB2RoOqzwdtXcjckM1FybfSHIq676zecLvkw"
        />
        <CardCardapio
          title="Folheado de Frango"
          description="Massa folhada crocante recheada com frango temperado, oferecendo um sabor suculento, ideal para um lanche rápido."
          value="5,90"
          image="https://fastly.picsum.photos/id/995/200/300.jpg?hmac=eFU8vnJxVDadyN4EfO1gKTmd6m9u3C-jglYq9Gi34ew"
        />
      </View>
    </ScrollView>
  );
};

export default Cardapio;
