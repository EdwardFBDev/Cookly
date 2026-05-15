import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { colors, radius } from "../../src/constants/theme";

const ingredients = [
  { id: "1", name: "Pasta", amount: "200 g", available: true },
  { id: "2", name: "Leche Entera", amount: "200 ml", available: true },
  { id: "3", name: "Crema de leche", amount: "100 ml", available: false },
  { id: "4", name: "Queso Parmesano", amount: "50 g", available: true },
  { id: "5", name: "Ajo", amount: "1 diente", available: true },
  { id: "6", name: "Pimienta", amount: "Al gusto", available: true },
];

export default function RecipeDetailScreen() {
  const router = useRouter();

  return (
    <AppScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={colors.text}
            />
          </Pressable>

          <Text style={styles.headerTitle}>Detalle de Receta</Text>

          <Ionicons
            name="heart-outline"
            size={24}
            color={colors.text}
          />
        </View>

        {/* IMAGE */}
        <View style={styles.imageContainer}>
          <Text style={styles.image}>🍝</Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Pasta Alfredo</Text>

        {/* META */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color={colors.textMuted}
            />
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

        {/* INGREDIENTS */}
        <Text style={styles.sectionTitle}>Ingredientes</Text>

        <View style={styles.ingredientsContainer}>
          {ingredients.map((ingredient) => (
            <View key={ingredient.id} style={styles.ingredientRow}>
              <View style={styles.ingredientLeft}>
                <Ionicons
                  name={
                    ingredient.available
                      ? "checkmark-outline"
                      : "close-outline"
                  }
                  size={18}
                  color={
                    ingredient.available
                      ? colors.success
                      : colors.danger
                  }
                />

                <Text
                  style={[
                    styles.ingredientText,
                    {
                      color: ingredient.available
                        ? colors.text
                        : colors.danger,
                    },
                  ]}
                >
                  {ingredient.name}
                </Text>
              </View>

              <Text style={styles.amount}>
                {ingredient.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* BUTTONS */}
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Agregar faltantes
          </Text>
        </Pressable>

        <Pressable 
          style={styles.primaryButton}
          onPress={() => router.push("/recipe-steps")}>
          
          <Text style={styles.primaryButtonText}>
            Ver receta
          </Text>
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
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
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
    overflow: "hidden",
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

  ingredientsContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  ingredientLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  ingredientText: {
    fontSize: 14,
  },

  amount: {
    color: colors.textMuted,
    fontSize: 13,
  },

  secondaryButton: {
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  secondaryButtonText: {
    color: colors.text,
    fontWeight: "700",
  },

  primaryButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  primaryButtonText: {
    color: "#111",
    fontWeight: "900",
    fontSize: 15,
  },
});