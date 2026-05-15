import { DrawerActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { CategoryChip } from "../../src/components/CategoryChip";
import { PrimaryButton } from "../../src/components/PrimaryButton";
import { RecipeCard } from "../../src/components/RecipeCard";
import { colors } from "../../src/constants/theme";
import { myRecipes } from "../../src/data/myRecipesData";

const tabs = ["Todas", "Creadas por mí", "Guardadas"];

export default function MyRecipesScreen() {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}
      >
        <Text style={styles.drawerIcon}>☰</Text>
      </Pressable>

      <Text style={styles.header}>Mis Recetas</Text>

      <View style={styles.chipRow}>
        {tabs.map((tab, index) => (
          <CategoryChip key={tab} label={tab} active={index === 0} />
        ))}
      </View>

      <FlatList
        data={myRecipes}
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
        ListFooterComponent={<PrimaryButton title="Nueva receta" />}
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
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: "row",
    marginBottom: 18,
  },
  list: {
    paddingBottom: 40,
  },
});