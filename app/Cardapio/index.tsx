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
          image="https://amopaocaseiro.com.br/wp-content/uploads/2020/04/pao-de-batata_IMG_4534.jpg"
        />
        <CardCardapio
          title="Café Expresso"
          description="Bebida intensa e aromática, preparada sob pressão, com sabor forte e encorpado, ideal para quem aprecia um café marcante."
          value="3,50"
          image="https://cdn.sistemawbuy.com.br/arquivos/f101ef5b9be464a6c8854310ae5f5327/produtos/65bb164199b0d/6e27f4ba5394340b118531f3d7ecd53c-65bb1641ed7bb.jpg"
        />
        <CardCardapio
          title="Pão de Queijo"
          description="Clássico brasileiro, com casquinha crocante por fora e miolo macio e recheado de queijo, perfeito para acompanhar o café."
          value="2,50"
          image="https://receitadaboa.com.br/wp-content/uploads/2024/08/Imagem-ilustrativa-de-pao-de-queijo-3.webp"
        />
        <CardCardapio
          title="Folheado de Frango"
          description="Massa folhada crocante recheada com frango temperado, oferecendo um sabor suculento, ideal para um lanche rápido."
          value="5,90"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNFp6IT-zugisQ57dL6R0_5uWx8tF2r4tDg&s"
        />
        <CardCardapio
          title="Torta de Chocolate"
          description="Feita com um bolo macio e recheio cremoso de chocolate, perfeita para adoçar o seu dia."
          value="6,50"
          image="https://i.panelinha.com.br/i1/228-q-7415-torta-receita.webp"
        />
        <CardCardapio
          title="Suco de Laranja com Limão e Hortelã"
          description="Suco natural, acompanhado com gelo, limão e hortelã para adocicar seu dia."
          value="4,70"
          image="https://minhasreceitinhas.com.br/wp-content/uploads/2017/09/iStock-692125364.jpg"
        />
        <CardCardapio
          title="Enroladinho de Salcicha"
          description="Massa dourada e recheio suculento, ideal para qualquer momento!"
          value="5,50"
          image="https://i.ytimg.com/vi/xKGaNJHN1cA/maxresdefault.jpg"
        />
      </View>
    </ScrollView>
  );
};

export default Cardapio;
