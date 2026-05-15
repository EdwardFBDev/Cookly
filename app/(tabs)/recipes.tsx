import { DrawerActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { RecipeCard } from "../../src/components/RecipeCard";
import { SearchInput } from "../../src/components/SearchInput";
import { AppHeader } from "../../src/components/AppHeader";
import { colors } from "../../src/constants/theme";
import { suggestedRecipes } from "../../src/data/recipesData";

export default function RecipesScreen() {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}
      >
      </Pressable>

      <AppHeader title="Recetas sugeridas" centered/>

      <SearchInput placeholder="Buscar recetas" />

      <Text style={styles.sectionTitle}>Basadas en tus ingredientes</Text>

      <FlatList
        data={suggestedRecipes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href="/recipe-detail" asChild>
            <Pressable>
              <RecipeCard
                image={item.image}
                title={item.title}
                match={item.match}
                time={item.time}
              />
            </Pressable>
          </Link>
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  drawerButton: {
    marginTop: 12,
    marginBottom: 8,
    width: 44,
  },
  drawerIcon: {
    color: colors.text,
    fontSize: 32,
  },
  header: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 8,
    textAlign: "center",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  list: {
    paddingBottom: 40,
  },
});