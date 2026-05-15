import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../constants/theme";

type ShoppingItemCardProps = {
  name: string;
  quantity: string;
  checked?: boolean;
};

export function ShoppingItemCard({
  name,
  quantity,
  checked = false,
}: ShoppingItemCardProps) {
  return (
    <View style={styles.card}>
      <Ionicons
        name={checked ? "checkbox-outline" : "square-outline"}
        size={22}
        color={checked ? colors.primary : colors.textMuted}
      />

      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  quantity: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3,
  },
});