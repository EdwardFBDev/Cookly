import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { AppHeader } from "../../src/components/AppHeader";
import { PrimaryButton } from "../../src/components/PrimaryButton";
import { ShoppingItemCard } from "../../src/components/ShoppingItemCard";
import { colors } from "../../src/constants/theme";
import { shoppingItems } from "../../src/data/shoppingData";

export default function ShoppingScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const manualItems = shoppingItems.filter((item) => item.origin === "manual");
  const recipeItems = shoppingItems.filter((item) => item.origin === "recipe");

  return (
    <AppScreen>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}
      >

      </Pressable>

      <AppHeader title="Lista de compras" centered />

      <Pressable onPress={() => router.push("/add-shopping-item")}>
        <PrimaryButton title="Agregar producto" />
      </Pressable>

      <Text style={styles.sectionTitle}>Pendientes ({manualItems.length})</Text>

      <FlatList
        data={manualItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ShoppingItemCard name={item.name} quantity={item.quantity} />
        )}
        ListFooterComponent={
          <View>
            <Text style={styles.sectionTitle}>
              Agregados desde recetas ({recipeItems.length})
            </Text>

            {recipeItems.map((item) => (
              <ShoppingItemCard
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                checked
              />
            ))}
          </View>
        }
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
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    paddingBottom: 40,
  },
});