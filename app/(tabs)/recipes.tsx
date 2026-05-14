import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AppScreen } from "../../src/components/AppScreen";
import { colors, radius } from "../../src/constants/theme";

const recipes = [
  {
    id: "1",
    name: "Pasta Alfredo",
    time: "25 min",
    match: "85% ingredientes",
    category: "Cena",
  },
  {
    id: "2",
    name: "Pollo al horno",
    time: "45 min",
    match: "70% ingredientes",
    category: "Almuerzo",
  },
  {
    id: "3",
    name: "Ensalada César",
    time: "15 min",
    match: "60% ingredientes",
    category: "Snack",
  },
];

export default function RecipesScreen() {
  return (
    <AppScreen>
      <Text style={styles.title}>Recetas sugeridas</Text>
      <Text style={styles.subtitle}>Basadas en tus ingredientes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
        <Link href="/recipe-detail" asChild>
          <Pressable style={styles.card}>
            <View style={styles.imagePlaceholder} />

            <View style={styles.content}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.match}</Text>
              <Text style={styles.cardMeta}>
                {item.time} · {item.category}
              </Text>
            </View>

            <Text style={styles.favorite}>♡</Text>
          </Pressable>
        </Link>
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 10,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 20,
  },
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 78,
    height: 78,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  cardText: {
    color: colors.primary,
    marginTop: 5,
    fontWeight: "600",
  },
  cardMeta: {
    color: colors.textMuted,
    marginTop: 5,
    fontSize: 12,
  },
  favorite: {
    color: colors.text,
    fontSize: 24,
  },
});