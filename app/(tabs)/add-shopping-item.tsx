import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { colors, radius } from "../../src/constants/theme";

export default function AddShoppingItemScreen() {
  const router = useRouter();

  return (
    <AppScreen>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/shopping")}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Agregar a la lista</Text>

        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.label}>Producto</Text>
      <TextInput
        placeholder="Ej. Arroz, jabón, tomate..."
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        placeholder="Ej. 1 unidad, 500 g, 2 paquetes"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Agregar</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 28,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 18,
  },
  optionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    color: colors.text,
    fontWeight: "700",
  },
  optionTextMuted: {
    color: colors.textMuted,
    fontWeight: "700",
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    padding: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  buttonText: {
    color: "#111",
    fontWeight: "900",
  },
});