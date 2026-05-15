import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../src/components/AppScreen";
import { colors, radius } from "../src/constants/theme";
import { mealPlannerItems } from "../src/data/mealPlannerData";

export default function MealPlannerScreen() {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}
      >
        <Text style={styles.drawerIcon}>☰</Text>
      </Pressable>

      <Text style={styles.header}>Meal Planner</Text>

      <View style={styles.weekHeader}>
        <Ionicons name="chevron-back-outline" size={22} color={colors.text} />

        <Text style={styles.weekText}>13 - 19 May</Text>

        <Ionicons name="chevron-forward-outline" size={22} color={colors.text} />

        <View style={styles.favoriteIcon}>
          <Ionicons name="heart-outline" size={22} color={colors.text} />
        </View>
      </View>

      <View style={styles.listContainer}>
        {mealPlannerItems.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.day}>{item.day}</Text>

            <Text
              style={[
                styles.meal,
                item.assigned ? styles.assignedMeal : styles.emptyMeal,
              ]}
            >
              {item.meal}
            </Text>
          </View>
        ))}
      </View>
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
    marginBottom: 26,
  },
  weekHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  weekText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginHorizontal: 16,
  },
  favoriteIcon: {
    marginLeft: "auto",
  },
  listContainer: {
    gap: 10,
  },
  row: {
    minHeight: 54,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  day: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  meal: {
    fontSize: 15,
    fontWeight: "800",
  },
  assignedMeal: {
    color: colors.primary,
  },
  emptyMeal: {
    color: colors.textMuted,
  },
});