import React, { useEffect, useState } from "react";
import { Redirect, Slot, useRouter, useSegments } from "expo-router";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { QueryProvider } from "../providers/QueryProvider";
import { AuthProvider, useAuth } from "../providers/AuthProvider";
import { setupNotificationListeners } from "../services/notifications";
import { useMedication } from "../hooks/useMedication";

// Import your global CSS file
import "../../global.css";

// Define o manipulador de notificações no foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Componente para controle de autenticação e redirecionamento
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { takeMedication } = useMedication();
  const segments = useSegments();
  const router = useRouter();

  // Configurar os listeners de notificações
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Configurar listener para notificações recebidas com o app em primeiro plano
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        const { medicationId } = notification.request.content.data as {
          medicationId: string;
        };
        const title = notification.request.content.title;

        if (medicationId) {
          Alert.alert(
            title || "Hora de tomar seu medicamento!",
            notification.request.content.body || "",
            [
              { text: "Adiar", style: "cancel" },
              {
                text: "Tomei",
                onPress: () => {
                  takeMedication(
                    { id: medicationId },
                    {
                      onSuccess: () => {
                        console.log("Medicamento marcado como tomado!");
                      },
                    }
                  );
                },
              },
            ]
          );
        }
      });

    // Configurar listener para quando o usuário toca em uma notificação
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { medicationId } = response.notification.request.content.data as {
          medicationId: string;
        };

        if (medicationId) {
          // Navegar para a tela apropriada quando o usuário toca na notificação
          router.push("/");
        }
      });

    // Limpar os listeners quando o componente é desmontado
    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, [isAuthenticated, takeMedication, router]);

  useEffect(() => {
    // Se ainda está carregando os dados de autenticação, não faz nada
    if (isLoading) return;

    const inAuthGroup = segments[0] === "auth";

    // Usuário está autenticado, mas está em uma rota de autenticação
    // (login/signup) -> redireciona para home
    if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }

    // Usuário não está autenticado e não está em uma rota de autenticação
    // -> redireciona para login
    /*else if (!isAuthenticated && !inAuthGroup) {
      router.replace("/auth/login");
    }*/
  }, [isAuthenticated, isLoading, segments, router]);

  // Enquanto está carregando, ou quando está redirecionando,
  // pode mostrar um splash screen ou nada
  if (isLoading) {
    return null; // ou algum componente de loading
  }

  // Se chegou aqui, está tudo certo para renderizar
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AuthGuard>
          <Slot />
        </AuthGuard>
      </AuthProvider>
    </QueryProvider>
  );
}
