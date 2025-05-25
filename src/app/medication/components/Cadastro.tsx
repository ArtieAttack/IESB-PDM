import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  Switch,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useMedication } from "@/src/hooks/useMedication";
import { useDependentUser, DependentUser } from "@/src/hooks/useDependentUser";
import {
  scheduleMedicationReminder,
  registerForPushNotificationsAsync,
} from "@/src/services/notifications";

const DIAS_SEMANA = [
  { id: "0", nome: "Domingo" },
  { id: "1", nome: "Segunda" },
  { id: "2", nome: "Terça" },
  { id: "3", nome: "Quarta" },
  { id: "4", nome: "Quinta" },
  { id: "5", nome: "Sexta" },
  { id: "6", nome: "Sábado" },
];

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [horario, setHorario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [error, setError] = useState("");

  const [dependenteSelecionado, setDependenteSelecionado] =
    useState<DependentUser | null>(null);
  const [modalDependentesVisible, setModalDependentesVisible] = useState(false);
  const [modalDiasVisible, setModalDiasVisible] = useState(false);
  const [todosOsDias, setTodosOsDias] = useState(false);

  const { addMedication, isAdding } = useMedication();
  const { dependentUsers, isLoading: isLoadingDependentes } =
    useDependentUser();
  const router = useRouter();

  // Quando todos os dias for alterado
  useEffect(() => {
    if (todosOsDias) {
      setDiasSelecionados(DIAS_SEMANA.map((dia) => dia.id));
    } else if (diasSelecionados.length === 7) {
      // Se estava marcado todos os dias e desmarcou
      setDiasSelecionados([]);
    }
  }, [todosOsDias]);

  // Quando os dias selecionados mudarem
  useEffect(() => {
    setTodosOsDias(diasSelecionados.length === 7);
  }, [diasSelecionados]);

  const toggleDia = (id: string) => {
    if (diasSelecionados.includes(id)) {
      setDiasSelecionados(diasSelecionados.filter((dia) => dia !== id));
    } else {
      setDiasSelecionados([...diasSelecionados, id]);
    }
  };
  // Solicitar permissão para notificações ao carregar o componente
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleCadastro = async () => {
    if (!nome || !horario || !descricao) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (diasSelecionados.length === 0) {
      setError("Por favor, selecione pelo menos um dia da semana");
      return;
    }

    try {
      setError("");
      const imagem =
        "https://avatar.vercel.sh/" + nome.toLowerCase().replace(/\s+/g, "-");

      const horarioFormatado = horario.replace(/[^0-9]/g, "");
      const horas = horarioFormatado.slice(0, 2);
      const minutos = horarioFormatado.slice(2, 4);
      const horarioDate = new Date();
      horarioDate.setHours(parseInt(horas, 10));
      horarioDate.setMinutes(parseInt(minutos, 10));

      // Dados do medicamento para passar para a API e para as notificações
      const medicationData = {
        nome,
        horario: horarioDate.toISOString(),
        descricao,
        imagem,
        daysOfWeek: diasSelecionados.join(","),
        dependentUserId: dependenteSelecionado?.id,
      };

      await addMedication(medicationData, {
        onSuccess: async (data) => {
          // Agendar notificações para este medicamento
          try {
            const notificationIds = await scheduleMedicationReminder({
              id: data.id,
              nome: data.nome,
              horario: data.horario,
              descricao: data.descricao,
              daysOfWeek: data.daysOfWeek,
            });

            // Atualizar o medicamento com os IDs das notificações
            // (opcional - pode ser implementado no backend para rastreamento)
            if (notificationIds) {
              console.log(
                "Notificações agendadas com sucesso:",
                notificationIds
              );
            }

            Alert.alert(
              "Sucesso",
              "Medicamento cadastrado e lembretes configurados com sucesso!",
              [{ text: "OK", onPress: () => router.replace("/") }]
            );
          } catch (notificationError) {
            console.error("Erro ao agendar notificações:", notificationError);
            // Continua mesmo se as notificações falharem
            router.replace("/");
          }
        },
      });
    } catch (err) {
      setError("Erro ao cadastrar medicamento. Tente novamente.");
      console.error("Erro no cadastro de medicamento:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#feffe4]">
      <ScrollView className="px-4">
        <View className="items-center pt-10">
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 160, height: 80 }}
          />
        </View>

        <View className="pt-8">
          <Text className="font-bold text-2xl text-[#0b8185]">
            Cadastro de Medicamentos
          </Text>
          <Text className="text-base text-[#0b8185] mb-2">
            Aqui você pode cadastrar um novo medicamento
          </Text>
        </View>

        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}

        <View>
          <Text className="text-xl font-bold text-[#0b8185] mt-2">
            Nome do medicamento*
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite o nome do medicamento"
            keyboardType="default"
            value={nome}
            onChangeText={setNome}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Horário*
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite o horário (ex: 08:30)"
            keyboardType="number-pad"
            value={horario}
            onChangeText={(text) => {
              const formattedText = text.replace(/[^0-9]/g, "").slice(0, 4);
              const hours = formattedText.slice(0, 2);
              const minutes = formattedText.slice(2, 4);
              setHorario(`${hours}${minutes ? ":" + minutes : ""}`);
            }}
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Descrição*
          </Text>
          <TextInput
            className="bg-white h-12 px-4 rounded-md shadow"
            placeholder="Digite a descrição do medicamento"
            keyboardType="default"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Dias da Semana*
          </Text>
          <TouchableOpacity
            className="bg-white h-12 px-4 rounded-md shadow justify-center"
            onPress={() => setModalDiasVisible(true)}
          >
            <Text className="text-[#0b8185]">
              {diasSelecionados.length > 0
                ? todosOsDias
                  ? "Todos os dias"
                  : DIAS_SEMANA.filter((dia) =>
                      diasSelecionados.includes(dia.id)
                    )
                      .map((dia) => dia.nome)
                      .join(", ")
                : "Selecione os dias da semana"}
            </Text>
          </TouchableOpacity>

          <Text className="text-xl font-bold text-[#0b8185] mt-4">
            Usuário Dependente
          </Text>
          <TouchableOpacity
            className="bg-white h-12 px-4 rounded-md shadow justify-center"
            onPress={() => setModalDependentesVisible(true)}
          >
            <Text className="text-[#0b8185]">
              {dependenteSelecionado
                ? dependenteSelecionado.name
                : "Selecione um usuário dependente (opcional)"}
            </Text>
          </TouchableOpacity>

          {/* Modal de seleção de dias da semana */}
          <Modal transparent visible={modalDiasVisible} animationType="fade">
            <View className="flex-1 bg-black/40 justify-center items-center">
              <View className="bg-white w-4/5 rounded-lg shadow p-4">
                <Text className="text-lg font-bold text-[#0b8185] mb-2">
                  Selecione os dias da semana
                </Text>

                <View className="flex-row items-center justify-between mb-2 py-2 border-b border-gray-200">
                  <Text className="text-[#0b8185] font-bold">
                    Todos os dias
                  </Text>
                  <Switch
                    value={todosOsDias}
                    onValueChange={setTodosOsDias}
                    trackColor={{ false: "#e8e8e8", true: "#0b8185" }}
                  />
                </View>

                {!todosOsDias && (
                  <ScrollView className="max-h-60 mb-2">
                    {DIAS_SEMANA.map((dia) => (
                      <TouchableOpacity
                        key={dia.id}
                        className="flex-row items-center py-2"
                        onPress={() => toggleDia(dia.id)}
                      >
                        <View
                          className={`w-5 h-5 mr-3 rounded border border-[#0b8185] ${
                            diasSelecionados.includes(dia.id)
                              ? "bg-[#0b8185]"
                              : "bg-white"
                          }`}
                        />
                        <Text className="text-[#0b8185]">{dia.nome}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                <TouchableOpacity
                  className="mt-2 bg-[#0b8185] py-2 rounded"
                  onPress={() => setModalDiasVisible(false)}
                >
                  <Text className="text-white text-center font-bold">
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal de seleção de dependentes */}
          <Modal
            transparent
            visible={modalDependentesVisible}
            animationType="fade"
          >
            <View className="flex-1 bg-black/40 justify-center items-center">
              <View className="bg-white w-4/5 rounded-lg shadow p-4">
                <Text className="text-lg font-bold text-[#0b8185] mb-2">
                  Selecione um usuário dependente
                </Text>
                <TouchableOpacity
                  className="py-2 border-b border-gray-200"
                  onPress={() => {
                    setDependenteSelecionado(null);
                    setModalDependentesVisible(false);
                  }}
                >
                  <Text className="text-[#0b8185]">
                    Nenhum (medicamento para você)
                  </Text>
                </TouchableOpacity>{" "}
                {isLoadingDependentes ? (
                  <ActivityIndicator
                    color="#0b8185"
                    size="small"
                    style={{ marginVertical: 10 }}
                  />
                ) : dependentUsers && dependentUsers.length > 0 ? (
                  <ScrollView className="max-h-60 mb-2">
                    {dependentUsers.map((dependente: DependentUser) => (
                      <TouchableOpacity
                        key={dependente.id}
                        className="py-2 border-b border-gray-200"
                        onPress={() => {
                          setDependenteSelecionado(dependente);
                          setModalDependentesVisible(false);
                        }}
                      >
                        <Text className="text-[#0b8185]">
                          {dependente.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                ) : (
                  <Text className="text-gray-500 py-2">
                    Nenhum usuário dependente cadastrado
                  </Text>
                )}
                <TouchableOpacity
                  className="mt-2 bg-[#e8dbad] py-2 rounded"
                  onPress={() => setModalDependentesVisible(false)}
                >
                  <Text className="text-center text-[#0b8185] font-bold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View className="py-12">
            <TouchableOpacity
              className="bg-[#0b8185] rounded-lg py-2"
              onPress={handleCadastro}
              disabled={isAdding}
            >
              {isAdding ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center text-lg font-bold">
                  Cadastrar medicamento
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;
