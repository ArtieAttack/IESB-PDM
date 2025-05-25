import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configurar o comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Solicita permissões para enviar notificações
export async function registerForPushNotificationsAsync() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Se ainda não temos permissão, solicite-a
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Se o usuário não concedeu permissão, não podemos mostrar notificações
    if (finalStatus !== "granted") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao registrar para notificações:", error);
    return false;
  }
}

// Agendar uma notificação para um medicamento
export async function scheduleMedicationReminder(medication: {
  id: string;
  nome: string;
  horario: string;
  descricao: string;
  daysOfWeek?: string;
}) {
  try {
    // Obter permissões primeiro
    const hasPermission = await registerForPushNotificationsAsync();
    if (!hasPermission) {
      console.log("Permissão para notificações não concedida");
      return null;
    }

    // Converter o horário para um objeto Date
    const horarioDate = new Date(medication.horario);

    if (medication.daysOfWeek) {
      const weekdays = medication.daysOfWeek
        .split(",")
        .map((day) => parseInt(day, 10));

      // Cria um gatilho para cada dia da semana
      const notificationIds: string[] = [];

      for (const weekday of weekdays) {
        // Agenda notificação para este dia da semana usando um objeto simples
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: `Hora de tomar ${medication.nome}!`,
            body: medication.descricao,
            data: { medicationId: medication.id },
            sound: true,
          },
          trigger: {
            // Agendando para o próximo horário específico
            date: new Date(
              Date.now() + 60 * 1000 // Por agora, agende para 1 minuto no futuro para teste
            ),
          },
        });

        notificationIds.push(id);
      }

      return notificationIds;
    } else {
      // Se não tem dias específicos, agenda para o horário hoje      // Converter o horário para um objeto Date
      const horarioDate = new Date(medication.horario);

      // Criar um objeto Date para hoje com o horário especificado
      const notificationDate = new Date();
      notificationDate.setHours(horarioDate.getHours());
      notificationDate.setMinutes(horarioDate.getMinutes());
      notificationDate.setSeconds(0);

      // Se o horário já passou hoje, agende para amanhã
      if (notificationDate < new Date()) {
        notificationDate.setDate(notificationDate.getDate() + 1);
      }

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Hora de tomar ${medication.nome}!`,
          body: medication.descricao,
          data: { medicationId: medication.id },
          sound: true,
        },
        trigger: {
          type: "date",
          channelId: "medication-reminders",
          date: notificationDate,
        },
      });

      return [id];
    }
  } catch (error) {
    console.error("Erro ao agendar notificação:", error);
    return null;
  }
}

// Cancelar notificações agendadas
export async function cancelMedicationReminders(notificationIds: string[]) {
  try {
    for (const id of notificationIds) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
    return true;
  } catch (error) {
    console.error("Erro ao cancelar notificações:", error);
    return false;
  }
}

// Mostrar uma notificação imediatamente (para teste ou alerta em app)
export async function showNotificationNow(
  title: string,
  body: string,
  data = {}
) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: null, // Mostrar imediatamente
    });
    return true;
  } catch (error) {
    console.error("Erro ao mostrar notificação:", error);
    return false;
  }
}

// Configuração do listener de notificações (para quando o app estiver aberto)
export function setupNotificationListeners(
  onNotificationReceived: (notification: Notifications.Notification) => void
) {
  const subscription = Notifications.addNotificationReceivedListener(
    onNotificationReceived
  );

  // Retorna a função de limpeza para ser usada em useEffect
  return () => subscription.remove();
}
