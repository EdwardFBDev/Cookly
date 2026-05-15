import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { colors, radius } from "../../src/constants/theme";

const steps = [
  "Cocina la pasta en agua con sal durante 8 a 10 minutos.",
  "En una sartén, calienta la leche y agrega el ajo picado.",
  "Agrega el queso parmesano y mezcla hasta formar una salsa cremosa.",
  "Incorpora la pasta cocida y mezcla bien.",
  "Sirve caliente y agrega pimienta al gusto.",
];

export default function RecipeStepsScreen() {
  const router = useRouter();

  return (
    <AppScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color={colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>Paso a paso</Text>

          <Ionicons name="heart-outline" size={24} color={colors.text} />
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.image}>🍝</Text>
        </View>

        <Text style={styles.title}>Pasta Alfredo</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>25 min</Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons
              name="restaurant-outline"
              size={16}
              color={colors.textMuted}
            />
            <Text style={styles.metaText}>2 porciones</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Preparación</Text>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={step} style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>

              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <Pressable 
          style={styles.primaryButton} 
          onPress={() => router.push("/recipes")}
        >
          <Text style={styles.primaryButtonText}>Finalizar</Text>
        </Pressable>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 20,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  imageContainer: {
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    fontSize: 100,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 28,
    gap: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  stepsContainer: {
    gap: 12,
  },
  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    gap: 14,
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    color: "#111",
    fontWeight: "900",
  },
  stepText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  primaryButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  primaryButtonText: {
    color: "#111",
    fontWeight: "900",
    fontSize: 15,
  },
});