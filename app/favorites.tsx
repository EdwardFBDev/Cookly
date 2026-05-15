import { DrawerActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppScreen } from "../src/components/AppScreen";
import { AppHeader } from "../src/components/AppHeader";
import { colors, radius } from "../src/constants/theme";
import { favoriteRecipes } from "../src/data/favoritesData";

export default function FavoritesScreen() {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}
      >
      </Pressable>

      <AppHeader title="Favoritos" centered />

      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href="/recipe-detail" asChild>
            <Pressable style={styles.card}>
              <View style={styles.imageBox}>
                <Text style={styles.image}>{item.image}</Text>
              </View>

              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <Ionicons name="heart" size={24} color={colors.primary} />
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
    marginBottom: 22,
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  imageBox: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  image: {
    fontSize: 42,
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  time: {
    color: colors.textMuted,
    marginTop: 8,
    fontSize: 13,
  },
});