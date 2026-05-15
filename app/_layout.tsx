import { Drawer } from "expo-router/drawer";

import { CustomDrawerContent } from "../src/components/CustomDrawerContent";
import { colors } from "../src/constants/theme";

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "Inicio" }} />
      <Drawer.Screen name="alerts" options={{ title: "Alertas" }} />
      <Drawer.Screen name="favorites" options={{ title: "Favoritos" }} />
      <Drawer.Screen name="meal-planner" options={{ title: "Meal Planner" }} />
      <Drawer.Screen name="settings" options={{ title: "Configuración" }} />
    </Drawer>
  );
}