import { FlatList, StyleSheet, View } from "react-native";

import { AppHeader } from "../src/components/AppHeader";
import { AppScreen } from "../src/components/AppScreen";
import { CategoryChip } from "../src/components/CategoryChip";
import { FoodCard } from "../src/components/FoodCard";
import { alertItems } from "../src/data/alertsData";

const tabs = ["Próximos a vencer", "Vencidos"];

export default function AlertsScreen() {
  return (
    <AppScreen>
      <AppHeader title="Alertas" centered />

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
            status={item.status as any}
            icon={item.icon}
          />
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 40,
  },
});