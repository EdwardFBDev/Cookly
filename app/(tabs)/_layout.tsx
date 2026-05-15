import { Tabs } from "expo-router";

import { BottomTabIcon } from "../../src/components/BottomTabIcon";
import { colors } from "../../src/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 120,
          paddingBottom: 14,
          paddingTop: 8,
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginTop: 2,
        },
      }}
    >
      {/* =========================
          TABS PRINCIPALES
      ========================== */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Despensa",

          tabBarIcon: ({ color, size }) => (
            <BottomTabIcon
              name="basket-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recetas",

          tabBarIcon: ({ color, size }) => (
            <BottomTabIcon
              name="restaurant-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="my-recipes"
        options={{
          title: "Mis Recetas",

          tabBarIcon: ({ color, size }) => (
            <BottomTabIcon
              name="book-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="shopping"
        options={{
          title: "Compras",

          tabBarIcon: ({ color, size }) => (
            <BottomTabIcon
              name="cart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* =========================
          PANTALLAS OCULTAS
      ========================== */}

      <Tabs.Screen
        name="pantry-detail"
        options={{
          href: null,
          title: "Detalle alimento",
        }}
      />

      <Tabs.Screen
        name="recipe-detail"
        options={{
          href: null,
          title: "Detalle receta",
        }}
      />

      <Tabs.Screen
        name="recipe-steps"
        options={{
          href: null,
          title: "Paso a paso",
        }}
      />

      <Tabs.Screen
        name="create-recipe"
        options={{
          href: null,
          title: "Nueva receta",
        }}
      />

      <Tabs.Screen
        name="add-shopping-item"
        options={{
          href: null,
          title: "Agregar producto",
        }}
      />
    </Tabs>
  );
}