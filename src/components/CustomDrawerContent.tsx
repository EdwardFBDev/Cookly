import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/theme";

export function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/cookly-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Cookly</Text>
          <Text style={styles.subtitle}>Cocina inteligente,</Text>
          <Text style={styles.subtitleAccent}>vive mejor.</Text>
        </View>
      </View>

      <DrawerItem
        label="Inicio"
        labelStyle={styles.label}
        icon={({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )}
        onPress={() => router.push("/")}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textMuted}
      />

      <DrawerItem
        label="Alertas"
        labelStyle={styles.label}
        icon={({ color, size }) => (
          <Ionicons name="notifications-outline" size={size} color={color} />
        )}
        onPress={() => router.push("/alerts")}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textMuted}
      />

      <DrawerItem
        label="Favoritos"
        labelStyle={styles.label}
        icon={({ color, size }) => (
          <Ionicons name="heart-outline" size={size} color={color} />
        )}
        onPress={() => router.push("/favorites")}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textMuted}
      />

      <DrawerItem
        label="Meal Planner"
        labelStyle={styles.label}
        icon={({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        )}
        onPress={() => router.push("/meal-planner")}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textMuted}
      />

      <DrawerItem
        label="Configuración"
        labelStyle={styles.label}
        icon={({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        )}
        onPress={() => router.push("/settings")}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textMuted}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 40,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 2,
  },
  subtitleAccent: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
});