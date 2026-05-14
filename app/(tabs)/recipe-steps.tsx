import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "../../src/components/AppScreen";
import { colors, radius } from "../../src/constants/theme";

export default function RecipeStepsScreen() {
  return (
    <AppScreen>
      <Text style={styles.title}>Paso a paso</Text>
      <Text style={styles.subtitle}>Pasta Alfredo</Text>

      <View style={styles.card}>
        <Text style={styles.stepNumber}>Paso 1 de 3</Text>
        <Text style={styles.stepText}>
          Cocina la pasta en agua con sal durante 8 a 10 minutos.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepNumber}>Paso 2 de 3</Text>
        <Text style={styles.stepText}>
          Prepara la salsa mezclando leche, ajo y queso parmesano.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepNumber}>Paso 3 de 3</Text>
        <Text style={styles.stepText}>
          Mezcla la pasta con la salsa y sirve caliente.
        </Text>
      </View>

      <Link href="/recipes" style={styles.button}>
        Finalizar
      </Link>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    marginTop: 10,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  stepNumber: {
    color: colors.primary,
    fontWeight: "800",
    marginBottom: 8,
  },
  stepText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.primary,
    color: "#000",
    textAlign: "center",
    padding: 16,
    borderRadius: radius.md,
    fontWeight: "800",
    marginTop: 18,
  },
});