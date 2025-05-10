# 📱 IESB PDM - Aplicativo de Gerenciamento de Medicamentos

![Tecnologias](https://go-skill-icons.vercel.app/api/icons?i=typescript,reactnative,expo,reactquery,tailwindcss,jwt)

[![React Native](https://img.shields.io/badge/React_Native-0.79.2-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.75.7-red.svg)](https://tanstack.com/query/latest)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.1.23-cyan.svg)](https://www.nativewind.dev/)

## 📝 Descrição do Projeto

Este é um aplicativo mobile de gerenciamento de medicamentos desenvolvido com Expo e React Native. A aplicação permite que usuários gerenciem seus medicamentos, configurem lembretes e acompanhem seu uso regular. O frontend se comunica com uma [API RESTful](https://github.com/Danzokka/backend-pdm) desenvolvida em Node.js.

## 🚀 Tecnologias Utilizadas

### Base do Projeto

- **[React Native](https://reactnative.dev/)**: Framework para desenvolvimento mobile cross-platform
- **[Expo](https://expo.dev/)**: Plataforma para simplificar o desenvolvimento React Native
- **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript tipado

### UI/UX

- **[NativeWind](https://www.nativewind.dev/)**: TailwindCSS para React Native
- **[React Native Primitives](https://rn-primitives.vercel.app/)**: Componentes acessíveis e customizáveis
- **[Lucide React Native](https://lucide.dev/)**: Biblioteca de ícones
- **[Expo Router](https://docs.expo.dev/router/introduction/)**: Sistema de roteamento baseado em arquivos

### Gerenciamento de Estado e Dados

- **[TanStack Query](https://tanstack.com/query/latest)**: Gerenciamento de estado assíncrono
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)**: Armazenamento local persistente
- **[Axios](https://axios-http.com/)**: Cliente HTTP para comunicação com a API

### Componentes e Animações

- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)**: Animações fluidas
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)**: Gestos nativos
- **[Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)**: Feedback tátil

## 🏗️ Estrutura do Projeto

```
IESB-PDM/
├── src/
│   ├── app/                   # Páginas da aplicação (usando Expo Router)
│   │   ├── _layout.tsx        # Layout principal com controle de autenticação
│   │   ├── index.tsx          # Tela principal/Home
│   │   ├── auth/              # Rotas de autenticação
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── medication/        # Rotas relacionadas a medicamentos
│   │   └── profile/           # Rotas de perfil do usuário
│   │
│   ├── assets/                # Imagens, fontes e outros arquivos estáticos
│   │
│   ├── components/            # Componentes reutilizáveis da UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useMedication.ts   # Hook para gerenciamento de medicamentos
│   │   └── useUser.ts         # Hook para gerenciamento de usuários
│   │
│   ├── providers/             # Provedores de contexto
│   │   ├── AuthProvider.tsx   # Gerencia autenticação e usuário
│   │   └── QueryProvider.tsx  # Configuração do TanStack Query
│   │
│   ├── services/              # Serviços externos
│   │   └── api.ts             # Cliente Axios e configurações da API
│   │
│   └── types/                 # Definições de tipos TypeScript
│       └── auth.ts            # Tipos para autenticação
│
├── global.css                 # Estilos globais
├── tailwind.config.js         # Configuração do TailwindCSS
└── package.json               # Dependências do projeto
```

## 📊 Providers e Contextos

### 1. AuthProvider

Responsável pelo gerenciamento da autenticação:

- **Estado gerenciado**: usuário logado, token JWT, status de autenticação
- **Principais funções**: login, logout, cadastro de usuários
- **Armazenamento persistente**: AsyncStorage para tokens e dados do usuário

### 2. QueryProvider

Configuração do TanStack Query para gerenciamento de estado assíncrono:

- **Cache**: configurado para otimizar solicitações à API
- **Estratégia de invalidação**: atualizações automáticas de dados
- **Configuração de staleTime e gcTime**: otimizado para performance mobile

## 🔄 Fluxo de Dados

1. **Autenticação**:

   - Login/Registro via interface do usuário
   - Validação de credenciais pelo backend
   - Armazenamento do token JWT no AsyncStorage
   - Configuração automática do token em requisições subsequentes

2. **Gerenciamento de Medicamentos**:

   - Busca de medicamentos via hook `useMedication`
   - Caching e refetch automático gerenciados pelo TanStack Query
   - Mutações para criar/editar/excluir medicamentos

3. **Navegação e Proteção de Rotas**:
   - Sistema de navegação baseado em arquivos com Expo Router
   - Proteção de rotas via `AuthGuard` no `_layout.tsx`
   - Redirecionamento automático com base no estado de autenticação

## 🔧 Começando

1. Clone o repositório

   ```bash
   git clone https://github.com/seu-usuario/IESB-PDM.git
   cd IESB-PDM
   ```

2. Instale as dependências

   ```bash
   npm install
   ```

3. Configure o endpoint da API
   Edite o arquivo `src/services/api.ts` e atualize a baseURL para o seu backend:

   ```typescript
   baseURL: "http://seu-ip:5000", // Substitua pelo IP do seu backend
   ```

4. Inicie o aplicativo

   ```bash
   npx expo start
   ```

5. Escolha onde executar:
   - Pressione `a` para Android
   - Pressione `i` para iOS (requer macOS)
   - Escaneie o QR code com o app Expo Go em seu dispositivo

## 🤝 Integração com Backend

Este aplicativo se integra com uma API RESTful disponível em [github.com/Danzokka/backend-pdm](https://github.com/Danzokka/backend-pdm). Para uma experiência completa, certifique-se de que o backend esteja em execução.
