import { Tabs } from "expo-router";
import { colors } from "../../src/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { 
            backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 110,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
        <Tabs.Screen 
            name="index" 
            options={{ title: "Despensa" }} 
        />

        <Tabs.Screen 
            name="recipes" 
            options={{ title: "Recetas" }} 
        />

        <Tabs.Screen 
            name="my-recipes" 
            options={{ title: "Mis Recetas" }} 
        />

        <Tabs.Screen 
            name="shopping"
            options={{ title: "Compras" }} 
        />

        <Tabs.Screen 
            name="pantry-detail" 
            options={{ href: null, title: "Detalle de alimento" }} 
        />

        <Tabs.Screen 
            name="recipe-detail" 
            options={{ href: null, title: "Detalle de receta" }} 
        />

        <Tabs.Screen 
            name="recipe-steps" 
            options={{ href: null, title: "Paso a paso" }} 
        />

        <Tabs.Screen 
            name="create-recipe" 
            options={{ href: null, title: "Nueva receta" }} 
        />

        <Tabs.Screen 
            name="add-shopping-item" 
            options={{ href: null, title: "Agregar producto" }} 
        />
    </Tabs>
  );
}