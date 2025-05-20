import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { QueryProvider } from "../providers/QueryProvider";
import { AuthProvider, useAuth } from "../providers/AuthProvider";

// Import your global CSS file
import "../../global.css";

// Componente para controle de autenticação e redirecionamento
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

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
