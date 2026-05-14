import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../constants/theme";

type FoodCardProps = {
  name: string;
  quantity: string;
  expiration: string;
  status: string;
  icon: string;
};

export function FoodCard({
  name,
  quantity,
  expiration,
  status,
  icon,
}: FoodCardProps) {
  const statusColor =
    status === "Fresco"
      ? colors.success
      : status === "Vencido"
      ? colors.danger
      : colors.warning;

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{quantity}</Text>
        <Text style={styles.text}>{expiration}</Text>
      </View>

      <View style={[styles.badge, { backgroundColor: `${statusColor}22` }]}>
        <Text style={[styles.badgeText, { color: statusColor }]}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 30,
  },
  content: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  text: {
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
});