import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppScreen } from "../../src/components/AppScreen";
import { colors, radius } from "../../src/constants/theme";
import { ScrollView } from "react-native";


export default function RecipeDetailScreen() {
  return (
    <AppScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.hero} />

        <Text style={styles.title}>Pasta Alfredo</Text>
        <Text style={styles.subtitle}>25 min · 2 porciones</Text>

        <Text style={styles.sectionTitle}>Ingredientes</Text>

        <View style={styles.ingredient}>
          <Text style={styles.available}>✓ Pasta</Text>
          <Text style={styles.amount}>200 g</Text>
        </View>

        <View style={styles.ingredient}>
          <Text style={styles.available}>✓ Leche entera</Text>
          <Text style={styles.amount}>200 ml</Text>
        </View>

        <View style={styles.ingredient}>
          <Text style={styles.missing}>× Queso parmesano</Text>
          <Text style={styles.amount}>50 g</Text>
        </View>

        <View style={styles.ingredient}>
          <Text style={styles.available}>✓ Ajo</Text>
          <Text style={styles.amount}>1 diente</Text>
        </View>

        <Link href="../recipe-steps" style={styles.button}>
          <Text style={styles.buttonText}>Ver receta</Text>
        </Link>
      </ScrollView>
      
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
  paddingBottom: 40,
},
  hero: {
    height: 180,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    marginBottom: 20,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  ingredient: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  available: {
    color: colors.success,
    fontWeight: "600",
  },
  missing: {
    color: colors.danger,
    fontWeight: "600",
  },
  amount: {
    color: colors.textMuted,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: 18,
  },
  buttonText: {
    color: "#000",
    fontWeight: "800",
  },
});