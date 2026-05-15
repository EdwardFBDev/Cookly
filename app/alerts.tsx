import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../src/components/AppScreen";
import { CategoryChip } from "../src/components/CategoryChip";
import { FoodCard } from "../src/components/FoodCard";
import { colors } from "../src/constants/theme";
import { alertItems } from "../src/data/alertsData";

const tabs = ["Próximos a vencer", "Vencidos"];

export default function AlertsScreen() {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}
      >
        <Text style={styles.drawerIcon}>☰</Text>
      </Pressable>

      <Text style={styles.header}>Alertas</Text>

      <View style={styles.chipRow}>
        {tabs.map((tab, index) => (
          <CategoryChip key={tab} label={tab} active={index === 0} />
        ))}
      </View>

      <FlatList
        data={alertItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FoodCard
            name={item.name}
            quantity={item.quantity}
            expiration={item.expiration}
            status={item.status}
            icon={item.icon}
          />
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
    marginBottom: 18,
  },
  chipRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 40,
  },
});