import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../constants/theme";

type CategoryChipProps = {
  label: string;
  active?: boolean;
};

export function CategoryChip({ label, active = false }: CategoryChipProps) {
  return (
    <View style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeChip: {
    backgroundColor: "#3A2A12",
    borderColor: colors.primary,
  },
  text: {
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 12,
  },
  activeText: {
    color: colors.primary,
  },
});