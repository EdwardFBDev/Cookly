import { StyleSheet, Text, View } from "react-native";
import { colors, radius, typography } from "../constants/theme";

type StatusBadgeProps = {
  status: "Fresco" | "Próximo" | "Vencido";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styleMap = {
    Fresco: {
      backgroundColor: colors.successSoft,
      color: colors.success,
    },
    Próximo: {
      backgroundColor: colors.warningSoft,
      color: colors.warning,
    },
    Vencido: {
      backgroundColor: colors.dangerSoft,
      color: colors.danger,
    },
  };

  const currentStyle = styleMap[status];

  return (
    <View style={[styles.badge, { backgroundColor: currentStyle.backgroundColor }]}>
      <Text style={[styles.text, { color: currentStyle.color }]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  text: {
    ...typography.caption,
  },
});