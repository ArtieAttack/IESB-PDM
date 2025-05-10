import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { useAuth } from '../../providers/AuthProvider';
import { User } from '../../types/auth';

export default function ProfileScreen() {
  const { user, isLoading, error, updateProfile, isUpdating, refetch } = useUser();
  const { logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState<Partial<User>>({});

  // Inicializando o estado de edição com os dados do usuário
  React.useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        // Outros campos conforme necessário
      });
    }
  }, [user]);

  const handleUpdateProfile = () => {
    updateProfile(userData, {
      onSuccess: () => {
        setEditing(false);
        // Atualizado automaticamente graças ao React Query
      }
    });
  };

  const handleLogout = async () => {
    await logout();
    // A navegação para a tela de login acontecerá automaticamente graças ao estado de autenticação
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0b8185" />
        <Text className="mt-2">Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-destructive text-lg mb-4">
          Erro ao carregar os dados do perfil!
        </Text>
        <TouchableOpacity 
          className="bg-primary px-4 py-2 rounded-md"
          onPress={() => refetch()}
        >
          <Text className="text-white font-bold">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="py-8 px-4">
        <Text className="text-2xl font-bold text-foreground mb-6">Meu Perfil</Text>
        
        {editing ? (
          <View className="space-y-4">
            <View className="space-y-2">
              <Text className="text-base font-medium text-foreground">Nome</Text>
              <TextInput
                className="border border-input rounded-md p-2 bg-background"
                value={userData.name}
                onChangeText={(text) => setUserData({...userData, name: text})}
              />
            </View>
            
            <View className="space-y-2">
              <Text className="text-base font-medium text-foreground">Email</Text>
              <TextInput
                className="border border-input rounded-md p-2 bg-background"
                value={userData.email}
                onChangeText={(text) => setUserData({...userData, email: text})}
                keyboardType="email-address"
              />
            </View>
            
            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="bg-muted px-4 py-2 rounded-md"
                onPress={() => setEditing(false)}
                disabled={isUpdating}
              >
                <Text className="font-medium">Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="bg-primary px-4 py-2 rounded-md"
                onPress={handleUpdateProfile}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-white font-bold">Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="space-y-4">
            <View className="border-b border-border pb-2">
              <Text className="text-sm text-muted-foreground">Nome</Text>
              <Text className="text-lg">{user?.name}</Text>
            </View>
            
            <View className="border-b border-border pb-2">
              <Text className="text-sm text-muted-foreground">Email</Text>
              <Text className="text-lg">{user?.email}</Text>
            </View>
            
            <TouchableOpacity
              className="bg-primary mt-6 px-4 py-2 rounded-md self-start"
              onPress={() => setEditing(true)}
            >
              <Text className="text-white font-bold">Editar Perfil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-destructive mt-4 px-4 py-2 rounded-md self-start"
              onPress={handleLogout}
            >
              <Text className="text-white font-bold">Sair</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}