import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { CategoryChip } from "../../src/components/CategoryChip";
import { FoodCard } from "../../src/components/FoodCard";
import { PrimaryButton } from "../../src/components/PrimaryButton";
import { SearchInput } from "../../src/components/SearchInput";
import { colors } from "../../src/constants/theme";
import { pantryItems } from "../../src/data/pantryData";

const categories = ["Todos", "Carnes", "Lácteos", "Vegetales"];

export default function PantryScreen() {
  return (
    <AppScreen>
      <Text style={styles.header}>Mi Despensa</Text>

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
  header: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  list: {
    paddingBottom: 40,
  },
});