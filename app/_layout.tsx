import { Drawer } from "expo-router/drawer";
import { colors } from "../src/constants/theme";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerActiveBackgroundColor: colors.surface,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Inicio"}}
      />

      <Drawer.Screen 
        name="alerts"
        options={{ title: "Alertas" }} 
      />

      <Drawer.Screen 
        name="favorites" 
        options={{ title: "Favoritos" }} 
      />

      <Drawer.Screen 
        name="meal-planner" 
        options={{ title: "Meal Planner" }} 
      />
      <Drawer.Screen 
        name="settings" 
        options={{ title: "Configuración" }} 
      />
    </Drawer>
  );
}