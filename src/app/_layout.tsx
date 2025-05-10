import { Slot } from "expo-router";
import { QueryProvider } from "../providers/QueryProvider";
import { AuthProvider } from "../providers/AuthProvider";

// Import your global CSS file
import "../../global.css";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </QueryProvider>
  );
}
