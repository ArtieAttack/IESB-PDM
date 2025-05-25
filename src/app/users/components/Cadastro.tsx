import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useDependentUser } from "@/src/hooks/useDependentUser";
import { useDisease, Disease } from "@/src/hooks/useDisease";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [error, setError] = useState("");

  const [modalDoencasVisible, setModalDoencasVisible] = useState(false);
  const [doencasSelecionadas, setDoencasSelecionadas] = useState<Disease[]>([]);

  const router = useRouter();
  const { addDependentUser, isAdding } = useDependentUser();
  const {
    diseases,
    isLoading: isLoadingDiseases,
    addDisease,
    isAdding: isAddingDisease,
  } = useDisease();

  // Estado para adicionar nova doença
  const [novaDoenca, setNovaDoenca] = useState("");
  const [modalNovaDoencaVisible, setModalNovaDoencaVisible] = useState(false);

  const toggleDoenca = (doenca: Disease) => {
    if (doencasSelecionadas.find((d) => d.id === doenca.id)) {
      setDoencasSelecionadas(
        doencasSelecionadas.filter((d) => d.id !== doenca.id)
      );
    } else {
      setDoencasSelecionadas([...doencasSelecionadas, doenca]);
    }
  };

  const formatarData = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 8); // Apenas números, máx 8
    const parts = [];

    if (cleaned.length > 0) parts.push(cleaned.slice(0, 2));
    if (cleaned.length > 2) parts.push(cleaned.slice(2, 4));
    if (cleaned.length > 4) parts.push(cleaned.slice(4, 8));

    return parts.join("/");
  };

  const handleCadastrarNovaDoenca = async () => {
    if (!novaDoenca) {
      return;
    }

    try {
      await addDisease(
        { name: novaDoenca },
        {
          onSuccess: (data) => {
            setModalNovaDoencaVisible(false);
            setNovaDoenca("");
            // Se adicionada com sucesso, selecione-a automaticamente
            if (data) {
              setDoencasSelecionadas([...doencasSelecionadas, data]);
            }
          },
        }
      );
    } catch (err) {
      console.error("Erro ao cadastrar doença:", err);
    }
  };

  const handleCadastrar = async () => {
    if (!nome || !nascimento) {
      setError("Nome e data de nascimento são obrigatórios");
      return;
    }

    // Validar e converter a data de nascimento
    const [day, month, year] = nascimento.split("/");
    if (!day || !month || !year || year.length !== 4) {
      setError("Data de nascimento inválida. Use o formato DD/MM/AAAA");
      return;
    }

    try {
      setError("");
      const birthDate = `${year}-${month}-${day}T00:00:00.000Z`;

      await addDependentUser(
        {
          name: nome,
          description: descricao || `Usuário dependente: ${nome}`,
          birthDate,
          diseases: doencasSelecionadas.map((d) => ({ id: d.id })),
        },
        {
          onSuccess: () => {
            router.back();
          },
        }
      );
    } catch (err) {
      setError("Erro ao cadastrar usuário dependente. Tente novamente.");
      console.error("Erro no cadastro:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 py-16 bg-[#feffe4]">
      <ScrollView className="px-4">
        <View className="items-center pt-10">
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 160, height: 80 }}
          />
        </View>

        <View className="pt-8">
          <Text className="font-bold text-2xl text-[#0b8185]">
            Cadastro de Usuários Dependentes
          </Text>
          <Text className="text-base text-[#0b8185] mb-2">
            Aqui você pode cadastrar uma pessoa dependente que irá tomar
            medicamentos
          </Text>
        </View>

        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}

        <View>
          <Text className="text-xl font-bold text-[#0b8185] mt-2">
            Nome do usuário*
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite o nome do usuário"
            keyboardType="default"
            value={nome}
            onChangeText={setNome}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Descrição
          </Text>
          <TextInput
            className="bg-white h-auto px-4 py-2 rounded-md shadow"
            placeholder="Informações adicionais sobre o usuário"
            keyboardType="default"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Data de Nascimento*
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Ex: 01/01/2000"
            keyboardType="number-pad"
            value={nascimento}
            onChangeText={(text) => setNascimento(formatarData(text))}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Doenças Relacionadas
          </Text>
          <TouchableOpacity
            className="bg-white h-12 px-4 rounded-md shadow justify-center"
            onPress={() => setModalDoencasVisible(true)}
          >
            <Text className="text-[#0b8185]">
              {doencasSelecionadas.length > 0
                ? doencasSelecionadas.map((d) => d.name).join(", ")
                : "Selecione doenças (opcional)"}
            </Text>
          </TouchableOpacity>

          {/* Modal de seleção de doenças */}
          <Modal visible={modalDoencasVisible} transparent animationType="fade">
            <View className="flex-1 bg-black/40 justify-center items-center">
              <View className="bg-white w-4/5 rounded-lg shadow p-4 max-h-[80%]">
                <Text className="text-lg font-bold text-[#0b8185] mb-2">
                  Selecione as doenças
                </Text>

                {isLoadingDiseases ? (
                  <ActivityIndicator
                    color="#0b8185"
                    size="small"
                    style={{ marginVertical: 10 }}
                  />
                ) : diseases && diseases.length > 0 ? (
                  <ScrollView className="mb-4 max-h-60">
                    {diseases.map((doenca: Disease) => {
                      const selecionada = doencasSelecionadas.some(
                        (d) => d.id === doenca.id
                      );
                      return (
                        <TouchableOpacity
                          key={doenca.id}
                          className="flex-row items-center py-2"
                          onPress={() => toggleDoenca(doenca)}
                        >
                          <View
                            className={`w-5 h-5 mr-3 rounded border border-[#0b8185] ${
                              selecionada ? "bg-[#0b8185]" : "bg-white"
                            }`}
                          />
                          <Text className="text-[#0b8185]">{doenca.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <Text className="text-gray-500 py-2">
                    Nenhuma doença cadastrada
                  </Text>
                )}

                <TouchableOpacity
                  className="mt-2 bg-[#86c7c9] py-2 rounded"
                  onPress={() => setModalNovaDoencaVisible(true)}
                >
                  <Text className="text-white text-center font-bold">
                    Cadastrar Nova Doença
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="mt-2 bg-[#0b8185] py-2 rounded"
                  onPress={() => setModalDoencasVisible(false)}
                >
                  <Text className="text-white text-center font-bold">
                    Confirmar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="mt-2 bg-[#e8dbad] py-2 rounded"
                  onPress={() => setModalDoencasVisible(false)}
                >
                  <Text className="text-[#0b8185] text-center font-bold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal para adicionar nova doença */}
          <Modal
            visible={modalNovaDoencaVisible}
            transparent
            animationType="fade"
          >
            <View className="flex-1 bg-black/40 justify-center items-center">
              <View className="bg-white w-4/5 rounded-lg shadow p-4">
                <Text className="text-lg font-bold text-[#0b8185] mb-4">
                  Cadastrar Nova Doença
                </Text>

                <TextInput
                  className="bg-gray-100 h-12 px-4 rounded-md mb-4"
                  placeholder="Nome da doença"
                  value={novaDoenca}
                  onChangeText={setNovaDoenca}
                />

                <View className="flex-row justify-end space-x-2">
                  <TouchableOpacity
                    className="bg-[#e8dbad] py-2 px-4 rounded"
                    onPress={() => setModalNovaDoencaVisible(false)}
                    disabled={isAddingDisease}
                  >
                    <Text className="text-[#0b8185] text-center font-bold">
                      Cancelar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-[#0b8185] py-2 px-4 rounded"
                    onPress={handleCadastrarNovaDoenca}
                    disabled={isAddingDisease || !novaDoenca}
                  >
                    {isAddingDisease ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text className="text-white text-center font-bold">
                        Cadastrar
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View className="py-12">
          <TouchableOpacity
            className="bg-[#0b8185] rounded-lg py-2"
            onPress={handleCadastrar}
            disabled={isAdding}
          >
            {isAdding ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center text-lg font-bold">
                Cadastrar usuário dependente
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6 bg-[#e8dbad] rounded-lg py-2"
            onPress={() => router.back()}
            disabled={isAdding}
          >
            <Text className="text-[#0b8185] text-center text-lg font-bold">
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;
