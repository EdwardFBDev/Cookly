import { StyleSheet, Text, View } from "react-native";

import { colors, radius, typography } from "../constants/theme";
import { StatusBadge } from "./StatusBadge";

type FoodStatus = "Fresco" | "Próximo" | "Vencido";

type FoodCardProps = {
  name: string;
  quantity: string;
  expiration: string;
  status: FoodStatus;
  icon: string;
};

export function FoodCard({
  name,
  quantity,
  expiration,
  status,
  icon,
}: FoodCardProps) {
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

      <StatusBadge status={status} />
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
    borderRadius: radius.md,
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
    ...typography.cardTitle,
  },
  text: {
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 12,
  },
});