import { DrawerActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { CategoryChip } from "../../src/components/CategoryChip";
import { FoodCard } from "../../src/components/FoodCard";
import { PrimaryButton } from "../../src/components/PrimaryButton";
import { AppHeader } from "../../src/components/AppHeader";
import { SearchInput } from "../../src/components/SearchInput";
import { colors } from "../../src/constants/theme";
import { pantryItems } from "../../src/data/pantryData";

const categories = ["Todos", "Carnes", "Lácteos", "Vegetales"];

export default function PantryScreen() {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}
      >
      </Pressable>

      <AppHeader title="Mi Despensa" centered />

      <SearchInput placeholder="Buscar alimento" />

      <View style={styles.chipRow}>
        {categories.map((category, index) => (
          <CategoryChip key={category} label={category} active={index === 0} />
        ))}
      </View>

      <FlatList
        data={pantryItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href="/pantry-detail" asChild>
            <Pressable>
              <FoodCard
                name={item.name}
                quantity={item.quantity}
                expiration={item.expiration}
                status={item.status}
                icon={item.icon}
              />
            </Pressable>
          </Link>
        )}
        ListFooterComponent={<PrimaryButton title="Agregar alimento" />}
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
    textAlign: "center",
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  list: {
    paddingBottom: 40,
  },
});